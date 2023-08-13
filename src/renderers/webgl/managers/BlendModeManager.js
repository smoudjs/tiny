import { BLEND_MODES } from '../../../constants';

/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * @class BlendModeManager
 * @constructor
 * @param gl {WebGLContext} the current WebGL drawing context
 */
var BlendModeManager = function () {
    /**
     * @property currentBlendMode
     * @type Number
     */
    this.currentBlendMode = 99999;
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

    if (!this.blendModes) {
        var blendModes = {};

        blendModes[BLEND_MODES.NORMAL] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.ADD] = [gl.ONE, gl.DST_ALPHA];
        blendModes[BLEND_MODES.MULTIPLY] = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.SCREEN] = [gl.ONE, gl.ONE_MINUS_SRC_COLOR];
        blendModes[BLEND_MODES.OVERLAY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.DARKEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.LIGHTEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.COLOR_DODGE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.COLOR_BURN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.HARD_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.SOFT_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.DIFFERENCE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.EXCLUSION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.HUE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.SATURATION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.COLOR] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
        blendModes[BLEND_MODES.LUMINOSITY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];

        this.blendModes = blendModes;
    }
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

    var blendModeWebGL = this.blendModes[this.currentBlendMode];
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
