import { ObjectRenderer } from '../ObjectRenderer.js';
import { WebGLRenderer } from '../../WebGLRenderer.js';
import { generateMultiTextureShader } from './generateMultiTextureShader';
import { checkMaxIfStatmentsInShader } from '../../utils/checkMaxIfStatmentsInShader.js';
// import settings from '../settings.js';
import { _Math } from '../../../math/Math.js';
// import { getAdjustedBlendMode } from '../../utils/getAdjustedBlendMode.js';
import { GLBuffer } from '../core/GLBuffer.js';
import { GLGeometry } from '../core/GLGeometry.js';
import { BaseTexture } from '../../../textures/BaseTexture.js';
import { premultiplyTint } from '../../utils/premultiplyTint.js';
import { canUploadSameBuffer, maxRecommendedTextures } from '../../utils/capabilities.js';
// import glCore from 'pixi-gl-core';

let TICK = 0;
let TEXTURE_TICK = 0;
const CAN_UPLOAD_SAME_BUFFER = canUploadSameBuffer();
const SPRITE_MAX_TEXTURES = maxRecommendedTextures(32);
const SPRITE_BATCH_SIZE = 4096;

const emptyTexture = new BaseTexture();

/**
 * Renderer dedicated to drawing and batching sprites.
 *
 * @class
 * @private
 * @memberof PIXI
 * @extends PIXI.ObjectRenderer
 */
function SpriteRenderer(renderer) {
    ObjectRenderer.call(this, renderer);

    /**
     * Number of values sent in the vertex buffer.
     * aVertexPosition(2), aTextureCoord(1), aColor(1), aTextureId(1) = 5
     *
     * @member {number}
     */
    this.vertSize = 5;

    /**
     * The size of the vertex information in bytes.
     *
     * @member {number}
     */
    this.vertByteSize = this.vertSize * 4;

    /**
     * The number of images in the SpriteRenderer before it flushes.
     *
     * @member {number}
     */
    this.size = SPRITE_BATCH_SIZE; // 2000 is a nice balance between mobile / desktop

    // the total number of bytes in our batch
    // let numVerts = this.size * 4 * this.vertByteSize;

    this.buffers = [];
    for (let i = 1; i <= _Math.nextPow2(this.size); i *= 2) {
        this.buffers.push(new BatchBuffer(i * 4 * this.vertByteSize));
    }

    // window.g = this;

    /**
     * Holds the indices of the geometry (quads) to draw
     *
     * @member {Uint16Array}
     */
    this.indices = createIndicesForQuads(this.size);

    /**
     * The default shaders that is used if a sprite doesn't have a more specific one.
     * there is a shader for each number of textures that can be rendererd.
     * These shaders will also be generated on the fly as required.
     * @member {PIXI.Shader[]}
     */
    this.shader = null;

    this.currentIndex = 0;
    this.groups = [];

    for (let k = 0; k < this.size; k++) {
        this.groups[k] = {
            textures: [],
            textureCount: 0,
            ids: [],
            size: 0,
            start: 0,
            blend: 0,
            premultipliedAlpha: true
        };
    }

    this.sprites = [];

    this.vertexBuffers = [];
    this.vaos = [];

    this.vaoMax = 2;
    this.vertexCount = 0;

    this.renderer.on('prerender', this.onPrerender, this);
}

SpriteRenderer.prototype = Object.assign(Object.create(ObjectRenderer.prototype), {
    constructor: SpriteRenderer,
    /**
     * Sets up the renderer context and necessary buffers.
     *
     * @private
     */
    onContextChange: function () {
        const renderer = this.renderer;
        const gl = renderer.getContext();

        if (renderer.legacy) {
            this.MAX_TEXTURES = 1;
        } else {
            // console.log(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
            // console.log(SPRITE_MAX_TEXTURES);
            // step 1: first check max textures the GPU can handle.
            this.MAX_TEXTURES = Math.min(renderer.capabilities.maxTextures, SPRITE_MAX_TEXTURES);

            // step 2: check the maximum number of if statements the shader can have too..
            this.MAX_TEXTURES = checkMaxIfStatmentsInShader(this.MAX_TEXTURES, gl);
        }

        // alert(renderer.capabilities.maxTextures + ' ' + this.MAX_TEXTURES)

        this.shader = generateMultiTextureShader(renderer, this.MAX_TEXTURES);

        // create a couple of buffers
        this.indexBuffer = new GLBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        // we use the second shader as the first one depending on your browser may omit aTextureId
        // as it is not used by the shader so is optimized out.

        renderer.state.bindGeometry(null);

        const attrs = this.shader.attributes;

        for (let i = 0; i < this.vaoMax; i++) {
            /* eslint-disable max-len */
            const vertexBuffer = (this.vertexBuffers[i] = new GLBuffer(
                gl,
                gl.ARRAY_BUFFER,
                null,
                gl.STREAM_DRAW
            ));
            /* eslint-enable max-len */

            // build the vao object that will render..
            const vao = new GLGeometry(gl, renderer.state.attribs2D)
                .addIndex(this.indexBuffer)
                .addAttribute(vertexBuffer, attrs.aVertexPosition, gl.FLOAT, false, this.vertByteSize, 0)
                .addAttribute(
                    vertexBuffer,
                    attrs.aTextureCoord,
                    gl.UNSIGNED_SHORT,
                    true,
                    this.vertByteSize,
                    2 * 4
                )
                .addAttribute(vertexBuffer, attrs.aColor, gl.UNSIGNED_BYTE, true, this.vertByteSize, 3 * 4);

            if (attrs.aTextureId) {
                vao.addAttribute(vertexBuffer, attrs.aTextureId, gl.FLOAT, false, this.vertByteSize, 4 * 4);
            }

            this.vaos[i] = vao;
        }

        this.vao = this.vaos[0];
        this.currentBlendMode = 99999;

        this.boundTextures = new Array(this.MAX_TEXTURES);
    },

    /**
     * Called before the renderer starts rendering.
     *
     */
    onPrerender: function () {
        this.vertexCount = 0;
    },

    /**
     * Renders the sprite object.
     *
     * @param {PIXI.Sprite} sprite - the sprite to render when using this spritebatch
     */
    render(sprite) {
        // TODO set blend modes..
        // check texture..
        if (this.currentIndex >= this.size) {
            this.flush();
        }

        // get the uvs for the texture

        // if the uvs have not updated then no point rendering just yet!
        // window.s = sprite.texture;
        if (!sprite.texture._uvs) {
            return;
        }

        // push a texture.
        // increment the batchsize
        this.sprites[this.currentIndex++] = sprite;
    },

    /**
     * Renders the content and empties the current batch.
     *
     */
    flush: function () {
        if (this.currentIndex === 0) {
            return;
        }

        const renderer = this.renderer;
        const gl = renderer.getContext();
        const MAX_TEXTURES = this.MAX_TEXTURES;

        const np2 = _Math.nextPow2(this.currentIndex);
        const log2 = _Math.log2(np2);
        const buffer = this.buffers[log2];

        const sprites = this.sprites;
        const groups = this.groups;

        const float32View = buffer.float32View;
        const uint32View = buffer.uint32View;

        const boundTextures = this.boundTextures;
        const rendererBoundTextures = renderer.textures.boundTextures;
        const touch = renderer.textureGC.count;

        let index = 0;
        let nextTexture;
        let currentTexture;
        let groupCount = 1;
        let textureCount = 0;
        let currentGroup = groups[0];
        let vertexData;
        let uvs;
        let blending = sprites[0].blending;
        let premultipliedAlpha = sprites[0].texture.base.premultipliedAlpha;

        currentGroup.textureCount = 0;
        currentGroup.start = 0;
        currentGroup.blend = blending;
        currentGroup.premultipliedAlpha = premultipliedAlpha;

        TICK++;

        let i;

        // copy textures..
        for (i = 0; i < MAX_TEXTURES; ++i) {
            const bt = rendererBoundTextures[i];

            if (bt._enabled === TICK) {
                boundTextures[i] = emptyTexture; // renderer.textures.emptyTextures[i];
                continue;
            }

            // console.log(bt)
            boundTextures[i] = bt;
            bt._virtalBoundId = i;
            bt._enabled = TICK;
        }
        TICK++;

        for (i = 0; i < this.currentIndex; ++i) {
            // upload the sprite elemetns...
            // they have all ready been calculated so we just need to push them into the buffer.
            const sprite = sprites[i];
            sprites[i] = null;

            nextTexture = sprite.texture.base;

            // const spriteBlendMode = getAdjustedBlendMode(sprite.blending, nextTexture);

            if (blending !== sprite.blending || premultipliedAlpha !== nextTexture.premultipliedAlpha) {
                // finish a group..
                blending = sprite.blending;
                premultipliedAlpha = nextTexture.premultipliedAlpha;

                // force the batch to break!
                currentTexture = null;
                textureCount = MAX_TEXTURES;
                TICK++;
            }

            if (currentTexture !== nextTexture) {
                currentTexture = nextTexture;

                if (nextTexture._enabled !== TICK) {
                    if (textureCount === MAX_TEXTURES) {
                        TICK++;

                        currentGroup.size = i - currentGroup.start;

                        textureCount = 0;

                        currentGroup = groups[groupCount++];
                        currentGroup.blend = blending;
                        currentGroup.premultipliedAlpha = premultipliedAlpha;
                        currentGroup.textureCount = 0;
                        currentGroup.start = i;
                    }

                    nextTexture.touched = touch;

                    if (nextTexture._virtalBoundId === -1) {
                        for (let j = 0; j < MAX_TEXTURES; ++j) {
                            let tIndex = (j + TEXTURE_TICK) % MAX_TEXTURES;

                            // tIndex = 2;
                            const t = boundTextures[tIndex];

                            if (t._enabled !== TICK) {
                                // console.log(tIndex);
                                TEXTURE_TICK++;

                                t._virtalBoundId = -1;

                                nextTexture._virtalBoundId = tIndex;

                                boundTextures[tIndex] = nextTexture;
                                break;
                            }
                        }
                    }

                    nextTexture._enabled = TICK;

                    currentGroup.textureCount++;
                    currentGroup.ids[textureCount] = nextTexture._virtalBoundId;
                    currentGroup.textures[textureCount++] = nextTexture;
                }
            }

            vertexData = sprite.vertexData;

            // TODO this sum does not need to be set each frame..
            uvs = sprite.texture._uvs;

            // window.s = sprite.texture;

            if (renderer.roundPixels) {
                const resolution = renderer.resolution;

                // xy
                float32View[index] = ((vertexData[0] * resolution) | 0) / resolution;
                float32View[index + 1] = ((vertexData[1] * resolution) | 0) / resolution;

                // xy
                float32View[index + 5] = ((vertexData[2] * resolution) | 0) / resolution;
                float32View[index + 6] = ((vertexData[3] * resolution) | 0) / resolution;

                // xy
                float32View[index + 10] = ((vertexData[4] * resolution) | 0) / resolution;
                float32View[index + 11] = ((vertexData[5] * resolution) | 0) / resolution;

                // xy
                float32View[index + 15] = ((vertexData[6] * resolution) | 0) / resolution;
                float32View[index + 16] = ((vertexData[7] * resolution) | 0) / resolution;
            } else {
                // xy
                float32View[index] = vertexData[0];
                float32View[index + 1] = vertexData[1];

                // xy
                float32View[index + 5] = vertexData[2];
                float32View[index + 6] = vertexData[3];

                // xy
                float32View[index + 10] = vertexData[4];
                float32View[index + 11] = vertexData[5];

                // xy
                float32View[index + 15] = vertexData[6];
                float32View[index + 16] = vertexData[7];
            }

            uint32View[index + 2] = uvs[0];
            uint32View[index + 7] = uvs[1];
            uint32View[index + 12] = uvs[2];
            uint32View[index + 17] = uvs[3];
            /* eslint-disable max-len */
            const alpha = Math.min(sprite.worldOpacity, 1.0);
            // we dont call extra function if alpha is 1.0, that's faster
            const argb =
                alpha < 1.0 && nextTexture.premultipliedAlpha
                    ? premultiplyTint(sprite.tint, alpha)
                    : sprite.tint._bgr + ((alpha * 255) << 24);
            // window.argb = argb;

            uint32View[index + 3] =
                uint32View[index + 8] =
                uint32View[index + 13] =
                uint32View[index + 18] =
                    argb;

            float32View[index + 4] =
                float32View[index + 9] =
                float32View[index + 14] =
                float32View[index + 19] =
                    nextTexture._virtalBoundId;
            /* eslint-enable max-len */

            index += 20;
        }

        currentGroup.size = i - currentGroup.start;

        if (!CAN_UPLOAD_SAME_BUFFER) {
            // this is still needed for IOS performance..
            // it really does not like uploading to the same buffer in a single frame!
            if (this.vaoMax <= this.vertexCount) {
                this.vaoMax++;

                const attrs = this.shader.attributes;

                /* eslint-disable max-len */
                const vertexBuffer = (this.vertexBuffers[this.vertexCount] = new GLBuffer(
                    gl,
                    gl.ARRAY_BUFFER,
                    null,
                    gl.STREAM_DRAW
                ));

                /* eslint-enable max-len */

                const vao = new GLGeometry(gl, renderer.state.attribs2D);

                vao.addIndex(this.indexBuffer)
                    .addAttribute(vertexBuffer, attrs.aVertexPosition, gl.FLOAT, false, this.vertByteSize, 0)
                    .addAttribute(
                        vertexBuffer,
                        attrs.aTextureCoord,
                        gl.UNSIGNED_SHORT,
                        true,
                        this.vertByteSize,
                        2 * 4
                    )
                    .addAttribute(
                        vertexBuffer,
                        attrs.aColor,
                        gl.UNSIGNED_BYTE,
                        true,
                        this.vertByteSize,
                        3 * 4
                    );

                if (attrs.aTextureId) {
                    vao.addAttribute(
                        vertexBuffer,
                        attrs.aTextureId,
                        gl.FLOAT,
                        false,
                        this.vertByteSize,
                        4 * 4
                    );
                }

                this.vaos[this.vertexCount] = vao;
            }

            renderer.state.bindGeometry(this.vaos[this.vertexCount]);

            this.vertexBuffers[this.vertexCount].upload(buffer.vertices, 0, false);

            this.vertexCount++;
        } else {
            // lets use the faster option, always use buffer number 0
            this.vertexBuffers[this.vertexCount].upload(buffer.vertices, 0, true);
        }

        for (i = 0; i < MAX_TEXTURES; ++i) {
            rendererBoundTextures[i]._virtalBoundId = -1;
        }

        // render the groups..
        for (i = 0; i < groupCount; ++i) {
            const group = groups[i];
            const groupTextureCount = group.textureCount;

            for (let j = 0; j < groupTextureCount; j++) {
                currentTexture = group.textures[j];

                // // reset virtual ids..
                // // lets do a quick check..
                // if (rendererBoundTextures[group.ids[j]] !== currentTexture) {
                // console.log(currentTexture._virtalBoundId, group.ids[j])
                renderer.textures.setTexture2D(currentTexture, group.ids[j]); //, true);
                // }

                // reset the virtualId..
                currentTexture._virtalBoundId = -1;
            }

            // set the blend mode..
            renderer.state.setBlending(group.blend, group.premultipliedAlpha);

            gl.drawElements(gl.TRIANGLES, group.size * 6, gl.UNSIGNED_SHORT, group.start * 6 * 2);
        }

        // window.currentGroup = currentGroup;
        // window.rendererBoundTextures = rendererBoundTextures;

        // reset elements for the next flush
        this.currentIndex = 0;
    },

    /**
     * Starts a new sprite batch.
     */
    start: function () {
        const renderer = this.renderer;
        renderer.textures.resetTextureUnits();
        renderer.state.bindShader(this.shader);

        if (CAN_UPLOAD_SAME_BUFFER) {
            // bind buffer #0, we don't need others
            renderer.state.bindGeometry(this.vaos[this.vertexCount]);

            this.vertexBuffers[this.vertexCount].bind();
        }
    },

    /**
     * Stops and flushes the current batch.
     *
     */
    stop: function () {
        this.flush();
    },

    /**
     * Destroys the SpriteRenderer.
     *
     */
    destroy: function () {
        for (let i = 0; i < this.vaoMax; i++) {
            if (this.vertexBuffers[i]) {
                this.vertexBuffers[i].destroy();
            }
            if (this.vaos[i]) {
                this.vaos[i].destroy();
            }
        }

        if (this.indexBuffer) {
            this.indexBuffer.destroy();
        }

        this.renderer.off('prerender', this.onPrerender, this);

        ObjectRenderer.prototype.destroy.call(this);

        if (this.shader) {
            this.shader.destroy();
            this.shader = null;
        }

        this.vertexBuffers = null;
        this.vaos = null;
        this.indexBuffer = null;
        this.indices = null;

        this.sprites = null;

        for (let i = 0; i < this.buffers.length; ++i) {
            this.buffers[i].destroy();
        }
    }
});

SpriteRenderer.system = {
    name: 'sprite'
};

WebGLRenderer.registerSystem(SpriteRenderer);

function BatchBuffer(size) {
    this.vertices = new ArrayBuffer(size);

    /**
     * View on the vertices as a Float32Array for positions
     *
     * @member {Float32Array}
     */
    this.float32View = new Float32Array(this.vertices);

    /**
     * View on the vertices as a Uint32Array for uvs
     *
     * @member {Float32Array}
     */
    this.uint32View = new Uint32Array(this.vertices);
}

Object.assign(BatchBuffer.prototype, {
    constructor: BatchBuffer,

    destroy: function () {
        this.vertices = null;
        this.positions = null;
        // this.uvs = null;
        // this.colors = null;
    }
});

function createIndicesForQuads(size) {
    // the total number of indices in our array, there are 6 points per quad.

    const totalIndices = size * 6;

    const indices = new Uint16Array(totalIndices);

    // fill the indices with the quads to draw
    for (let i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
        indices[i + 0] = j + 0;
        indices[i + 1] = j + 1;
        indices[i + 2] = j + 2;
        indices[i + 3] = j + 0;
        indices[i + 4] = j + 2;
        indices[i + 5] = j + 3;
    }

    return indices;
}

export { SpriteRenderer };
