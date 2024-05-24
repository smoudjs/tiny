/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * @class MaskManager
 * @constructor
 * @private
 */
var MaskManager = function () {};

MaskManager.prototype.constructor = MaskManager;

/**
 * Sets the drawing context to the one given in parameter.
 *
 * @method setContext
 * @param gl {WebGLContext} the current WebGL drawing context
 */
MaskManager.prototype.setContext = function (gl) {
    this.gl = gl;
};

/**
 * Applies the Mask and adds it to the current filter stack.
 *
 * @method pushMask
 * @param maskData {Array}
 * @param renderer {Object}
 */
MaskManager.prototype.pushMask = function (maskData, renderer) {
    var gl = renderer.gl;

    if (maskData.dirty) {
        Tiny.WebGLGraphics.updateGraphics(maskData, gl);
    }

    if (!maskData._webGL[gl.id].data.length) return;

    renderer.stencilManager.pushStencil(maskData, maskData._webGL[gl.id].data[0], renderer);
};

/**
 * Removes the last filter from the filter stack and doesn't return it.
 *
 * @method popMask
 * @param maskData {Array}
 * @param renderer {Object} an object containing all the useful parameters
 */
MaskManager.prototype.popMask = function (maskData, renderer) {
    var gl = this.gl;
    renderer.stencilManager.popStencil(maskData, maskData._webGL[gl.id].data[0], renderer);
};

/**
 * Destroys the mask stack.
 *
 * @method destroy
 */
MaskManager.prototype.destroy = function () {
    this.gl = null;
};

export { MaskManager };
