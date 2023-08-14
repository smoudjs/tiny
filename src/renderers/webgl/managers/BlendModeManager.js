import { BLEND_MODES } from '../../../constants';

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * @class BlendModeManager
 * @constructor
 * @param gl {WebGLContext} the current WebGL drawing context
 */
var BlendModeManager = function (renderer) {
    /**
     * @property currentBlendMode
     * @type Number
     */
    this.currentBlendMode = 99999;
    this.renderer = renderer;
};

BlendModeManager.prototype.constructor = BlendModeManager;

/**
 * Sets the WebGL Context.
 *
 * @method setContext
 * @param gl {WebGLContext} the current WebGL drawing context
 */
BlendModeManager.prototype.setContext = function (gl) {
    this.gl = gl;
};

/**
 * Sets-up the given blendMode from WebGL's point of view.
 *
 * @method setBlendMode
 * @param blendMode {Number} the blendMode, should be a Pixi const, such as PIXI.BlendModes.ADD
 */
BlendModeManager.prototype.setBlendMode = function (blendMode) {
    if (this.currentBlendMode === blendMode) return false;

    this.currentBlendMode = blendMode;

    var blendModeWebGL = this.renderer.blendModes[this.currentBlendMode];
    this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);

    return true;
};

/**
 * Destroys this object.
 *
 * @method destroy
 */
BlendModeManager.prototype.destroy = function () {
    this.gl = null;
};

export { BlendModeManager };
