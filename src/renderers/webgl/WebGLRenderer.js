import { StencilManager } from './managers/StencilManager';
import { SpriteBatch } from './utils/SpriteBatch';
import { ShaderManager } from './managers/ShaderManager';
import { MaskManager } from './managers/MaskManager';
import { FilterManager } from './managers/FilterManager';
import { BlendModeManager } from './managers/BlendModeManager';
import { Vec2 } from '../../math/Vec2';
import { isPow2 } from '../../utils';
import { SCALE_MODES } from '../../constants';
import { Cache } from '../../loaders/Cache';
import { BLEND_MODES } from '../../constants';
import { Color } from '../../math/Color';

Tiny.glContexts = []; // this is where we store the webGL contexts for easy access.
Tiny.instances = [];

/**
 * The WebGLRenderer draws the stage and all its content onto a webGL enabled canvas. This renderer
 * should be used for browsers that support webGL. This Render works by automatically managing webGLBatchs.
 * So no need for Sprite Batches or Sprite Clouds.
 * Don't forget to add the view to your DOM or you will not see anything :)
 *
 * @class WebGLRenderer
 * @constructor
 * @param [width=0] {Number} the width of the canvas view
 * @param [height=0] {Number} the height of the canvas view
 * @param [options] {Object} The optional renderer parameters
 * @param [options.view] {HTMLCanvasElement} the canvas to use as a view, optional
 * @param [options.transparent=false] {Boolean} If the render view is transparent, default false
 * @param [options.autoResize=false] {Boolean} If the render view is automatically resized, default false
 * @param [options.antialias=false] {Boolean} sets antialias (only applicable in chrome at the moment)
 * @param [options.preserveDrawingBuffer=false] {Boolean} enables drawing buffer preservation, enable this if you need to call toDataUrl on the webgl context
 * @param [options.resolution=1] {Number} the resolution of the renderer retina would be 2
 */
var WebGLRenderer = function (width, height, options) {
    var defaultRenderOptions = {
        view: null,
        transparent: false,
        antialias: false,
        preserveDrawingBuffer: false,
        resolution: 1,
        clearBeforeRender: true,
        autoResize: false
    };

    options = Object.assign({}, defaultRenderOptions, options);

    if (!Tiny.defaultRenderer) Tiny.defaultRenderer = this;

    /**
     * The resolution of the renderer
     *
     * @property resolution
     * @type Number
     * @default 1
     */
    this.resolution = this._resolution = options.resolution;

    // do a catch.. only 1 webGL renderer..

    /**
     * Whether the render view is transparent
     *
     * @property transparent
     * @type Boolean
     */
    this.transparent = options.transparent;

    /**
     * Whether the render view should be resized automatically
     *
     * @property autoResize
     * @type Boolean
     */
    this.autoResize = options.autoResize || false;

    /**
     * The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.
     *
     * @property preserveDrawingBuffer
     * @type Boolean
     */
    this.preserveDrawingBuffer = options.preserveDrawingBuffer;

    /**
     * This sets if the WebGLRenderer will clear the context texture or not before the new render pass. If true:
     * If the Stage is NOT transparent, Pixi will clear to alpha (0, 0, 0, 0).
     * If the Stage is transparent, Pixi will clear to the target Stage's background color.
     * Disable this by setting this to false. For example: if your game has a canvas filling background image, you often don't need this set.
     *
     * @property clearBeforeRender
     * @type Boolean
     * @default
     */
    this.clearBeforeRender = options.clearBeforeRender;

    /**
     * The width of the canvas view
     *
     * @property width
     * @type Number
     * @default 800
     */
    this.width = width || 800;

    /**
     * The height of the canvas view
     *
     * @property height
     * @type Number
     * @default 600
     */
    this.height = height || 600;

    /**
     * The canvas element that everything is drawn to
     *
     * @property view
     * @type HTMLCanvasElement
     */
    this.view = options.view || document.createElement('canvas');

    this.domElement = this.view;

    // deal with losing context..

    /**
     * @property contextLostBound
     * @type Function
     */
    this.contextLostBound = this.handleContextLost.bind(this);

    /**
     * @property contextRestoredBound
     * @type Function
     */
    this.contextRestoredBound = this.handleContextRestored.bind(this);

    this.view.addEventListener('webglcontextlost', this.contextLostBound, false);
    this.view.addEventListener('webglcontextrestored', this.contextRestoredBound, false);

    /**
     * @property _contextOptions
     * @type Object
     * @private
     */
    this._contextOptions = {
        alpha: this.transparent,
        antialias: options.antialias, // SPEED UP??
        premultipliedAlpha: this.transparent && this.transparent !== 'notMultiplied',
        stencil: true,
        preserveDrawingBuffer: options.preserveDrawingBuffer
    };

    /**
     * @property projection
     * @type Point
     */
    this.projection = new Vec2();
    this._projection = new Vec2();

    /**
     * @property offset
     * @type Point
     */
    this.offset = new Vec2(0, 0);

    this.clearColor = new Color();

    // time to create the render managers! each one focuses on managing a state in webGL

    /**
     * Deals with managing the shader programs and their attribs
     * @property shaderManager
     * @type ShaderManager
     */
    this.shaderManager = new ShaderManager();

    /**
     * Manages the rendering of sprites
     * @property spriteBatch
     * @type SpriteBatch
     */
    this.spriteBatch = new SpriteBatch(this);

    /**
     * Manages the masks using the stencil buffer
     * @property maskManager
     * @type MaskManager
     */
    this.maskManager = new MaskManager();

    /**
     * Manages the filters
     * @property filterManager
     * @type FilterManager
     */
    this.filterManager = new FilterManager(this);

    /**
     * Manages the stencil buffer
     * @property stencilManager
     * @type StencilManager
     */
    this.stencilManager = new StencilManager();

    /**
     * Manages the blendModes
     * @property blendModeManager
     * @type BlendModeManager
     */
    this.blendModeManager = new BlendModeManager(this);

    /**
     * TODO remove
     * @property renderSession
     * @type Object
     */
    // this.renderSession = {
    //     gl: this.gl,
    //     drawCount: 0,
    //     shaderManager: this.shaderManager,
    //     maskManager: this.maskManager,
    //     filterManager: this.filterManager,
    //     blendModeManager: this.blendModeManager,
    //     spriteBatch: this.spriteBatch,
    //     stencilManager: this.stencilManager,
    //     renderer: this,
    //     resolution: this.resolution
    // };

    // time init the context..
    this.initContext();

    // map some webGL blend modes..
    // this.mapBlendModes();
};

// constructor
WebGLRenderer.prototype.constructor = WebGLRenderer;

/**
 * @method initContext
 */
WebGLRenderer.prototype.initContext = function () {
    var gl =
        this.view.getContext('webgl', this._contextOptions) ||
        this.view.getContext('experimental-webgl', this._contextOptions);
    this.gl = gl;

    if (!gl) {
        // fail, not able to get a context
        throw new Error('This browser does not support webGL. Try using the canvas renderer');
    }

    this.glContextId = gl.id = WebGLRenderer.glContextId++;

    Tiny.glContexts[this.glContextId] = gl;

    Tiny.instances[this.glContextId] = this;

    // set up the default pixi settings..
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.enable(gl.BLEND);

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

    // need to set the context for all the managers...
    this.shaderManager.setContext(gl);
    this.spriteBatch.setContext(gl);
    this.maskManager.setContext(gl);
    this.filterManager.setContext(gl);
    this.blendModeManager.setContext(gl);
    this.stencilManager.setContext(gl);

    // this.renderSession.gl = this.gl;

    // now resize and we are good to go!
    this.resize(this.width, this.height);
};

WebGLRenderer.prototype.setClearColor = function (color) {
    this.clearColor = new Color(color);

    // if (color === null) {
    //     this.clearColor = null;
    //     return;
    // }

    // this.clearColor = color || 0x000000;
    // // this.backgroundColorSplit = Tiny.hex2rgb(this.backgroundColor);
    // var hex = this.clearColor.toString(16);
    // hex = '000000'.substr(0, 6 - hex.length) + hex;
    // this._clearColor = '#' + hex;
};

/**
 * Renders the stage to its webGL view
 *
 * @method render
 * @param stage {Stage} the Stage element to be rendered
 */
WebGLRenderer.prototype.render = function (scene) {
    // no point rendering if our context has been blown up!
    if (this.contextLost) return;

    // if rendering a new scene clear the batches..
    // if (this.__scene !== scene) {
    //     if (scene.interactive) scene.interactionManager.removeEvents();

    //     // TODO make this work
    //     // dont think this is needed any more?
    //     this.__scene = scene;
    // }

    // update the scene graph
    scene.updateTransform();

    var gl = this.gl;

    // interaction
    // if (scene._interactive) {
    //     //need to add some events!
    //     if (!scene._interactiveEventsAdded) {
    //         scene._interactiveEventsAdded = true;
    //         scene.interactionManager.setTarget(this);
    //     }
    // } else {
    //     if (scene._interactiveEventsAdded) {
    //         scene._interactiveEventsAdded = false;
    //         scene.interactionManager.setTarget(this);
    //     }
    // }

    // -- Does this need to be set every frame? -- //
    gl.viewport(0, 0, this._width, this._height);

    // make sure we are bound to the main frame buffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    if (this.clearBeforeRender) {
        if (this.transparent) {
            gl.clearColor(0, 0, 0, 0);
        } else {
            gl.clearColor(this.clearColor.r, this.clearColor.g, this.clearColor.b, this.clearColor.a);
        }

        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    this.renderObject(scene, this._projection);
};

/**
 * Renders a Display Object.
 *
 * @method renderObject
 * @param displayObject {DisplayObject} The DisplayObject to render
 * @param projection {Point} The projection
 * @param buffer {Array} a standard WebGL buffer
 */
WebGLRenderer.prototype.renderObject = function (displayObject, projection, buffer) {
    this.blendModeManager.setBlendMode(BLEND_MODES.NORMAL);

    // reset the render session data..
    this.drawCount = 0;

    // make sure to flip the Y if using a render texture..
    this.flipY = buffer ? -1 : 1;

    // set the default projection
    this.projection = projection || this._projection;

    //set the default offset
    // this.offset = this.offset;

    // start the sprite batch
    this.spriteBatch.begin(this);

    // start the filter manager
    this.filterManager.begin(this, buffer);

    // render the scene!
    displayObject.render(this);

    // finish the sprite batch
    this.spriteBatch.flush();
};

/**
 * Resizes the webGL view to the specified width and height.
 *
 * @method resize
 * @param width {Number} the new width of the webGL view
 * @param height {Number} the new height of the webGL view
 */
WebGLRenderer.prototype.resize = function (width, height) {
    this.width = width;
    this.height = height;

    this._width = width = Math.floor(width * this._resolution);
    this._height = height = Math.floor(height * this._resolution);

    var view = this.view;

    view.width = width;
    view.height = height;

    if (this.autoResize) {
        view.style.width = this.width + 'px';
        view.style.height = this.height + 'px';
    }

    this.gl.viewport(0, 0, width, height);

    this._projection.x = this.width / 2;
    this._projection.y = -this.height / 2;
};

WebGLRenderer.prototype.setPixelRatio = function (resolution) {
    this._resolution = this.resolution = resolution;
    this.resize(this.width, this.height);

    // var view = this.domElement;

    // view.width = Math.floor(this.width * this._resolution);
    // view.height = Math.floor(this.height * this._resolution);
};

/**
 * Updates and Creates a WebGL texture for the renderers context.
 *
 * @method updateTexture
 * @param texture {Texture} the texture to update
 */
WebGLRenderer.prototype.updateTexture = function (texture) {
    if (!texture.valid) return;

    var gl = this.gl;

    if (!texture._glTextures[gl.id]) texture._glTextures[gl.id] = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);

    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultipliedAlpha);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);

    gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MAG_FILTER,
        texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR : gl.NEAREST
    );

    if (texture.mipmap && isPow2(texture.width) && isPow2(texture.height)) {
        gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_MIN_FILTER,
            texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR_MIPMAP_LINEAR : gl.NEAREST_MIPMAP_NEAREST
        );
        gl.generateMipmap(gl.TEXTURE_2D);
    } else {
        gl.texParameteri(
            gl.TEXTURE_2D,
            gl.TEXTURE_MIN_FILTER,
            texture.scaleMode === SCALE_MODES.LINEAR ? gl.LINEAR : gl.NEAREST
        );
    }

    // reguler...
    if (!texture._powerOf2) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } else {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }

    texture._dirty[gl.id] = false;

    return texture._glTextures[gl.id];
};

/**
 * Handles a lost webgl context
 *
 * @method handleContextLost
 * @param event {Event}
 * @private
 */
WebGLRenderer.prototype.handleContextLost = function (event) {
    event.preventDefault();
    this.contextLost = true;
};

/**
 * Handles a restored webgl context
 *
 * @method handleContextRestored
 * @param event {Event}
 * @private
 */
WebGLRenderer.prototype.handleContextRestored = function () {
    this.initContext();

    // empty all the ol gl textures as they are useless now
    for (var key in Cache.image) {
        Cache.image[key]._glTextures = [];
    }

    this.contextLost = false;
};

/**
 * Removes everything from the renderer (event listeners, spritebatch, etc...)
 *
 * @method destroy
 */
WebGLRenderer.prototype.destroy = function (removeView) {
    // remove listeners
    this.view.removeEventListener('webglcontextlost', this.contextLostBound);
    this.view.removeEventListener('webglcontextrestored', this.contextRestoredBound);

    Tiny.glContexts[this.glContextId] = null;

    this.projection = null;
    this.offset = null;

    // time to create the render managers! each one focuses on managine a state in webGL
    this.shaderManager.destroy();
    this.spriteBatch.destroy();
    this.maskManager.destroy();
    this.filterManager.destroy();

    this.shaderManager = null;
    this.spriteBatch = null;
    this.maskManager = null;
    this.filterManager = null;

    this.gl = null;

    if (removeView !== false && this.domElement.parentNode) {
        this.domElement.parentNode.removeChild(this.domElement);
    }
    // this.renderSession = null;
};

/**
 * Maps Pixi blend modes to WebGL blend modes.
 *
 * @method mapBlendModes
 */
// WebGLRenderer.prototype.mapBlendModes = function () {
//     var gl = this.gl;

//     if (!Tiny.blendModesWebGL) {
//         Tiny.blendModesWebGL = [];

//         Tiny.blendModesWebGL[Tiny.blendModes.NORMAL] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.ADD] = [gl.SRC_ALPHA, gl.DST_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.MULTIPLY] = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.SCREEN] = [gl.SRC_ALPHA, gl.ONE];
//         Tiny.blendModesWebGL[Tiny.blendModes.OVERLAY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.DARKEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.LIGHTEN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.COLOR_DODGE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.COLOR_BURN] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.HARD_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.SOFT_LIGHT] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.DIFFERENCE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.EXCLUSION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.HUE] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.SATURATION] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.COLOR] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//         Tiny.blendModesWebGL[Tiny.blendModes.LUMINOSITY] = [gl.ONE, gl.ONE_MINUS_SRC_ALPHA];
//     }
// };

WebGLRenderer.glContextId = 0;

export { WebGLRenderer };
