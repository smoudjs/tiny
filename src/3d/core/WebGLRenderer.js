import {Vec3} from '../math/Vec3.js';
import {Texture} from "./Texture";

// TODO: Handle context loss https://www.khronos.org/webgl/wiki/HandlingContextLost

// Not automatic - devs to use these methods manually
// gl.colorMask( colorMask, colorMask, colorMask, colorMask );
// gl.clearColor( r, g, b, a );
// gl.stencilMask( stencilMask );
// gl.stencilFunc( stencilFunc, stencilRef, stencilMask );
// gl.stencilOp( stencilFail, stencilZFail, stencilZPass );
// gl.clearStencil( stencil );

var tempVec3 = new Vec3();

var ID = 1;

function WebGLRenderer(
    {
        canvas = document.createElement('canvas'),
        width = 300,
        height = 150,
        dpr = 1,
        alpha = false,
        depth = true,
        stencil = true,
        antialias = false,
        premultipliedAlpha = false,
        preserveDrawingBuffer = true,
        powerPreference = 'default',
        autoClear = true,
        webgl = 2,
    } = {}
) {
    var attributes = {alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer, powerPreference};
    this.dpr = dpr;
    this.alpha = alpha;
    this.color = true;
    this.depth = depth;
    this.stencil = stencil;
    this.premultipliedAlpha = premultipliedAlpha;
    this.autoClear = autoClear;
    this.id = ID++;
    this.domElement = canvas;

    // Attempt WebGL2 unless forced to 1, if not supported fallback to WebGL1
    if (webgl === 2) this.gl = canvas.getContext('webgl2', attributes);
    this.isWebgl2 = !!this.gl;
    if (!this.gl) this.gl = canvas.getContext('webgl', attributes);
    if (!this.gl) console.error('unable to create webgl context');

    // Attach renderer to gl so that all classes have access to internal state functions
    this.gl.renderer = this;

    // initialise size values
    this.resize(width, height);

    // gl state stores to avoid redundant calls on methods used internally
    this.state = {};
    this.state.blendFunc = {src: this.gl.ONE, dst: this.gl.ZERO};
    this.state.blendEquation = {modeRGB: this.gl.FUNC_ADD};
    this.state.cullFace = null;
    this.state.frontFace = this.gl.CCW;
    this.state.depthMask = true;
    this.state.depthFunc = this.gl.LESS;
    this.state.premultiplyAlpha = false;
    this.state.flipY = false;
    this.state.unpackAlignment = 4;
    this.state.framebuffer = null;
    this.state.viewport = {x: 0, y: 0, width: null, height: null};
    this.state.textureUnits = [];
    this.state.activeTextureUnit = 0;
    this.state.boundBuffer = null;
    this.state.uniformLocations = new Map();
    this.state.currentProgram = null;

    // store requested extensions
    this.extensions = {};

    // Initialise extra format types
    if (this.isWebgl2) {
        this.getExtension('EXT_color_buffer_float');
        this.getExtension('OES_texture_float_linear');
    } else {
        this.getExtension('OES_texture_float');
        this.getExtension('OES_texture_float_linear');
        this.getExtension('OES_texture_half_float');
        this.getExtension('OES_texture_half_float_linear');
        this.getExtension('OES_element_index_uint');
        this.getExtension('OES_standard_derivatives');
        this.getExtension('EXT_sRGB');
        this.getExtension('WEBGL_depth_texture');
        this.getExtension('WEBGL_draw_buffers');
    }
    this.getExtension('WEBGL_compressed_texture_astc');
    this.getExtension('EXT_texture_compression_bptc');
    this.getExtension('WEBGL_compressed_texture_s3tc');
    this.getExtension('WEBGL_compressed_texture_etc1');
    this.getExtension('WEBGL_compressed_texture_pvrtc');
    this.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');

    // Create method aliases using extension (WebGL1) or native if available (WebGL2)
    this.vertexAttribDivisor = this.getExtension('ANGLE_instanced_arrays', 'vertexAttribDivisor', 'vertexAttribDivisorANGLE');
    this.drawArraysInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawArraysInstanced', 'drawArraysInstancedANGLE');
    this.drawElementsInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawElementsInstanced', 'drawElementsInstancedANGLE');
    this.createVertexArray = this.getExtension('OES_vertex_array_object', 'createVertexArray', 'createVertexArrayOES');
    this.bindVertexArray = this.getExtension('OES_vertex_array_object', 'bindVertexArray', 'bindVertexArrayOES');
    this.deleteVertexArray = this.getExtension('OES_vertex_array_object', 'deleteVertexArray', 'deleteVertexArrayOES');
    this.drawBuffers = this.getExtension('WEBGL_draw_buffers', 'drawBuffers', 'drawBuffersWEBGL');

    // Store device parameters
    this.parameters = {};
    this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
    this.parameters.maxAnisotropy = this.getExtension('EXT_texture_filter_anisotropic')
        ? this.gl.getParameter(this.getExtension('EXT_texture_filter_anisotropic').MAX_TEXTURE_MAX_ANISOTROPY_EXT)
        : 0;

    //@TODO remove later, just for non mapped objects currently
    Texture.WHITE = new Texture(
        this.gl,
        {
            image: new Uint8Array([255, 255, 255, 255]),
            width: 1,
            height: 1
        }
    );
}

WebGLRenderer.prototype = {
    constructor: WebGLRenderer,

    setClearColor: function (color, a) {
        this.gl.clearColor(color.r, color.g, color.b, a);
    },

    setPixelRatio: function (value) {
        this.dpr = value;

        this.resize(this.width, this.height);
    },

    resize: function (width, height) {
        this.width = width;
        this.height = height;

        this.gl.canvas.width = width * this.dpr;
        this.gl.canvas.height = height * this.dpr;

        if (!this.gl.canvas.style) return;
        Object.assign(this.gl.canvas.style, {
            width: width + 'px',
            height: height + 'px',
        });
    },

    setViewport: function (width, height, x = 0, y = 0) {
        if (this.state.viewport.width === width && this.state.viewport.height === height) return;
        this.state.viewport.width = width;
        this.state.viewport.height = height;
        this.state.viewport.x = x;
        this.state.viewport.y = y;
        this.gl.viewport(x, y, width, height);
    },

    setScissor: function (width, height, x = 0, y = 0) {
        this.gl.scissor(x, y, width, height);
    },

    enable: function (id) {
        if (this.state[id] === true) return;
        this.gl.enable(id);
        this.state[id] = true;
    },

    disable: function (id) {
        if (this.state[id] === false) return;
        this.gl.disable(id);
        this.state[id] = false;
    },

    setBlendFunc: function (src, dst, srcAlpha, dstAlpha) {
        if (
            this.state.blendFunc.src === src &&
            this.state.blendFunc.dst === dst &&
            this.state.blendFunc.srcAlpha === srcAlpha &&
            this.state.blendFunc.dstAlpha === dstAlpha
        )
            return;
        this.state.blendFunc.src = src;
        this.state.blendFunc.dst = dst;
        this.state.blendFunc.srcAlpha = srcAlpha;
        this.state.blendFunc.dstAlpha = dstAlpha;
        if (srcAlpha !== undefined) this.gl.blendFuncSeparate(src, dst, srcAlpha, dstAlpha);
        else this.gl.blendFunc(src, dst);
    },

    setBlendEquation: function (modeRGB, modeAlpha) {
        modeRGB = modeRGB || this.gl.FUNC_ADD;
        if (this.state.blendEquation.modeRGB === modeRGB && this.state.blendEquation.modeAlpha === modeAlpha) return;
        this.state.blendEquation.modeRGB = modeRGB;
        this.state.blendEquation.modeAlpha = modeAlpha;
        if (modeAlpha !== undefined) this.gl.blendEquationSeparate(modeRGB, modeAlpha);
        else this.gl.blendEquation(modeRGB);
    },

    setCullFace: function (value) {
        if (this.state.cullFace === value) return;
        this.state.cullFace = value;
        this.gl.cullFace(value);
    },

    setFrontFace: function (value) {
        if (this.state.frontFace === value) return;
        this.state.frontFace = value;
        this.gl.frontFace(value);
    },

    setDepthMask: function (value) {
        if (this.state.depthMask === value) return;
        this.state.depthMask = value;
        this.gl.depthMask(value);
    },

    setDepthFunc: function (value) {
        if (this.state.depthFunc === value) return;
        this.state.depthFunc = value;
        this.gl.depthFunc(value);
    },

    activeTexture: function (value) {
        if (this.state.activeTextureUnit === value) return;
        this.state.activeTextureUnit = value;
        this.gl.activeTexture(this.gl.TEXTURE0 + value);
    },

    bindFramebuffer: function ({target = this.gl.FRAMEBUFFER, buffer = null} = {}) {
        if (this.state.framebuffer === buffer) return;
        this.state.framebuffer = buffer;
        this.gl.bindFramebuffer(target, buffer);
    },

    getExtension: function (extension, webgl2Func, extFunc) {
        // if webgl2 function supported, return func bound to gl context
        if (webgl2Func && this.gl[webgl2Func]) return this.gl[webgl2Func].bind(this.gl);

        // fetch extension once only
        if (!this.extensions[extension]) {
            this.extensions[extension] = this.gl.getExtension(extension);
        }

        // return extension if no function requested
        if (!webgl2Func) return this.extensions[extension];

        // Return null if extension not supported
        if (!this.extensions[extension]) return null;

        // return extension function, bound to extension
        return this.extensions[extension][extFunc].bind(this.extensions[extension]);
    },

    // @TODO maybe not need
    sortOpaque: function (a, b) {
        if (a.renderOrder !== b.renderOrder) {
            return a.renderOrder - b.renderOrder;
        } else if (a.program.id !== b.program.id) {
            return a.program.id - b.program.id;
        } else if (a.zDepth !== b.zDepth) {
            return a.zDepth - b.zDepth;
        } else {
            return b.id - a.id;
        }
    },

    sortTransparent: function (a, b) {
        if (a.renderOrder !== b.renderOrder) {
            return a.renderOrder - b.renderOrder;
        }
        if (a.zDepth !== b.zDepth) {
            return b.zDepth - a.zDepth;
        } else {
            return b.id - a.id;
        }
    },

    // @TODO maybe not need
    sortUI: function (a, b) {
        if (a.renderOrder !== b.renderOrder) {
            return a.renderOrder - b.renderOrder;
        } else if (a.program.id !== b.program.id) {
            return a.program.id - b.program.id;
        } else {
            return b.id - a.id;
        }
    },

    getRenderList: function ({scene, camera, frustumCull, sort}) {
        var renderList = [];

        if (camera && frustumCull) camera.updateFrustum();

        // Get visible
        scene.traverse((node) => {
            if (!node.visible) return true;
            if (!node.draw) return;

            if (frustumCull && node.frustumCulled && camera) {
                if (!camera.frustumIntersectsMesh(node)) return;
            }

            renderList.push(node);
        });

        if (sort) {
            var opaque = [];
            var transparent = []; // depthTest true
            var ui = []; // depthTest false

            for (var i = 0; i < renderList.length; i++) {
                var node = renderList[i];

                // Split into the 3 render groups
                if (!node.program.transparent) {
                    opaque.push(node);
                } else if (node.program.depthTest) {
                    transparent.push(node);
                } else {
                    ui.push(node);
                }

                node.zDepth = 0;

                // Only calculate z-depth if renderOrder unset and depthTest is true
                if (node.renderOrder !== 0 || !node.program.depthTest || !camera) return;

                tempVec3.set(
                    node.worldMatrix.elements[12],
                    node.worldMatrix.elements[13],
                    node.worldMatrix.elements[14]
                )

                // update z-depth
                // node.worldMatrix.getTranslation(tempVec3);
                tempVec3.applyMatrix4(camera.projectionViewMatrix);
                node.zDepth = tempVec3.z;
            }

            // @TODO really don't know if we need sort opaque
            // opaque.sort(this.sortOpaque);
            transparent.sort(this.sortTransparent);

            // @TODO don't know what ui means. I think should be deleted later
            // ui.sort(this.sortUI);

            renderList = opaque.concat(transparent, ui);
        }

        return renderList;
    },

    render: function ({
               scene,
               camera,
               directionalLight,
               ambientLight,
               target = null,
               update = true,
               sort = true,
               frustumCull = false,
               clear
           }) {
        if (target === null) {
            // make sure no render target bound so draws to canvas
            this.bindFramebuffer();
            this.setViewport(this.width * this.dpr, this.height * this.dpr);
        } else {
            // bind supplied render target and update viewport
            this.bindFramebuffer(target);
            this.setViewport(target.width, target.height);
        }

        if (clear || (this.autoClear && clear !== false)) {
            // Ensure depth buffer writing is enabled so it can be cleared
            if (this.depth && (!target || target.depth)) {
                this.enable(this.gl.DEPTH_TEST);
                this.setDepthMask(true);
            }
            this.gl.clear(
                (this.color ? this.gl.COLOR_BUFFER_BIT : 0) |
                (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) |
                (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0)
            );
        }

        // updates all scene graph matrices
        if (update) scene.updateMatrixWorld();

        // Update camera separately, in case not in scene graph
        if (camera) camera.updateMatrixWorld();

        // Get render list - entails culling and sorting
        var renderList = this.getRenderList({scene, camera, frustumCull, sort});

        for (var i = 0; i < renderList.length; i++) {
            var node = renderList[i];

            if (!node.geometry.gl) {
                node.geometry.initialize(this.gl);
            }

            if (!node.program.gl) {
                node.program.initialize(this.gl);
            }

            node.draw({camera, directionalLight, ambientLight});
        }

        //@TODO maybe move to different place, or create dirty flags for math objects
        camera.projectMatrixDirty = false;
    }
}

Tiny.WebGLRenderer = WebGLRenderer;

export {WebGLRenderer};