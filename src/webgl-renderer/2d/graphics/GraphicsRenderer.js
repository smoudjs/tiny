import {
    PolygonShape,
    RectangleShape,
    CircleShape,
    EllipseShape,
    RoundedRectangleShape
} from '../../../constants.js';
import { ObjectRenderer } from '../ObjectRenderer.js';
import { WebGLRenderer } from '../../WebGLRenderer.js';
import { WebGLGraphicsData } from './WebGLGraphicsData.js';
import { PrimitiveShader } from './shaders/PrimitiveShader.js';

import { buildPoly } from './utils/buildPoly.js';
import { buildRectangle } from './utils/buildRectangle.js';
import { buildRoundedRectangle } from './utils/buildRoundedRectangle.js';
import { buildCircle } from './utils/buildCircle.js';

let CONTEXT_UID = 0;

/**
 * Renders the graphics object.
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.ObjectRenderer
 */
function GraphicsRenderer(renderer) {
    ObjectRenderer.call(this, renderer);

    this.graphicsDataPool = [];

    this.primitiveShader = null;

    this.gl = renderer.gl;

    // easy access!
    this.CONTEXT_UID = CONTEXT_UID++;
}

GraphicsRenderer.prototype = Object.assign(Object.create(ObjectRenderer.prototype), {
    constructor: GraphicsRenderer,

    /**
     * Called when there is a WebGL context change
     *
     * @private
     *
     */
    onContextChange: function () {
        this.gl = this.renderer.gl;
        this.primitiveShader = new PrimitiveShader(this.renderer);
    },

    /**
     * Destroys this renderer.
     *
     */
    dispose: function () {
        ObjectRenderer.prototype.dispose.call(this);

        for (let i = 0; i < this.graphicsDataPool.length; ++i) {
            this.graphicsDataPool[i].dispose();
        }

        this.graphicsDataPool = null;
    },

    /**
     * Renders a graphics object.
     *
     * @param {PIXI.Graphics} graphics - The graphics object to render.
     */
    render: function (graphics) {
        const renderer = this.renderer;
        const gl = renderer.gl;

        let webGLData;
        let webGL = graphics._webGL[this.CONTEXT_UID];

        if (!webGL || graphics.dirty !== webGL.dirty) {
            this.updateGraphics(graphics);

            webGL = graphics._webGL[this.CONTEXT_UID];
        }

        // This  could be speeded up for sure!
        const shader = this.primitiveShader;

        renderer.state.bindShader(shader);
        renderer.state.setBlending(graphics.blending);

        for (let i = 0, n = webGL.data.length; i < n; i++) {
            webGLData = webGL.data[i];
            const shaderTemp = webGLData.shader;

            renderer.state.bindShader(shaderTemp);
            // console.log(graphics.worldTransform.elements)
            shaderTemp._uniforms.translationMatrix.setValue(gl, graphics.worldTransform);
            shaderTemp._uniforms.tint.setValue(gl, graphics.tint);
            shaderTemp._uniforms.alpha.setValue(gl, graphics.worldOpacity);

            renderer.state.bindGeometry(webGLData.vao);

            webGLData.vao.draw(gl.TRIANGLE_STRIP, webGLData.indices.length);
            
        }
    },

    /**
     * Updates the graphics object
     *
     * @private
     * @param {PIXI.Graphics} graphics - The graphics object to update
     */
    updateGraphics: function (graphics) {
        const gl = this.renderer.gl;

        // get the contexts graphics object
        let webGL = graphics._webGL[this.CONTEXT_UID];

        // if the graphics object does not exist in the webGL context time to create it!
        if (!webGL) {
            webGL = graphics._webGL[this.CONTEXT_UID] = {
                lastIndex: 0,
                data: [],
                gl,
                clearDirty: -1,
                dirty: -1
            };
        }

        // flag the graphics as not dirty as we are about to update it...
        webGL.dirty = graphics.dirty;

        // if the user cleared the graphics object we will need to clear every object
        if (graphics.clearDirty !== webGL.clearDirty) {
            webGL.clearDirty = graphics.clearDirty;

            // loop through and return all the webGLDatas to the object pool so than can be reused later on
            for (let i = 0; i < webGL.data.length; i++) {
                this.graphicsDataPool.push(webGL.data[i]);
            }

            // clear the array and reset the index..
            webGL.data.length = 0;
            webGL.lastIndex = 0;
        }

        let webGLData;

        // loop through the graphics datas and construct each one..
        // if the object is a complex fill then the new stencil buffer technique will be used
        // other wise graphics objects will be pushed into a batch..
        for (let i = webGL.lastIndex; i < graphics.graphicsData.length; i++) {
            const data = graphics.graphicsData[i];

            // TODO - this can be simplified
            webGLData = this.getWebGLData(webGL, 0);

            if (data.type === PolygonShape) {
                buildPoly(data, webGLData);
            }
            if (data.type === RectangleShape) {
                buildRectangle(data, webGLData);
            } else if (data.type === CircleShape || data.type === EllipseShape) {
                buildCircle(data, webGLData);
            } else if (data.type === RoundedRectangleShape) {
                buildRoundedRectangle(data, webGLData);
            }

            webGL.lastIndex++;
        }

        this.renderer.state.bindGeometry(null);

        // upload all the dirty data...
        for (let i = 0; i < webGL.data.length; i++) {
            webGLData = webGL.data[i];

            if (webGLData.dirty) {
                webGLData.upload();
            }
        }
    },

    /**
     *
     * @private
     * @param {WebGLRenderingContext} gl - the current WebGL drawing context
     * @param {number} type - TODO @Alvin
     * @return {*} TODO
     */
    getWebGLData: function (gl, type) {
        let webGLData = gl.data[gl.data.length - 1];

        if (!webGLData || webGLData.points.length > 320000) {
            webGLData =
                this.graphicsDataPool.pop() ||
                new WebGLGraphicsData(
                    this.renderer.gl,
                    this.primitiveShader,
                    this.renderer.state.attribs2D
                );
            webGLData.reset(type);
            gl.data.push(webGLData);
        }

        webGLData.dirty = true;

        return webGLData;
    }
});

GraphicsRenderer.system = {
    name: 'graphics'
};

WebGLRenderer.registerSystem(GraphicsRenderer);

export { GraphicsRenderer };
