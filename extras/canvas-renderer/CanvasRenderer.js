import { canUseNewCanvasBlendModes } from './utils';

var CanvasRenderer = function (width, height, options) {
    options = options || {};

    this.resolution = options.resolution != undefined ? options.resolution : 1;
    this._resolution = this.resolution;

    this.clearBeforeRender = options.clearBeforeRender != undefined ? options.clearBeforeRender : true;

    this.transparent = options.transparent != undefined ? options.transparent : false;

    this.autoResize = options.autoResize || false;

    // this.width = width || 800;
    // this.height = height || 600;

    // this.width *= this.resolution;
    // this.height *= this.resolution;

    if (!Tiny.defaultRenderer) Tiny.defaultRenderer = this;

    var view = (this.domElement = options.domElement || document.createElement('canvas'));

    this.context = view.getContext('2d', { alpha: this.transparent });

    this._context = this.context;

    // view.width = this.width * this.resolution;
    // view.height = this.height * this.resolution;

    this.resize(width || 800, height || 600);

    this.setClearColor(0xffffff);

    if (Tiny.CanvasMaskManager) this.maskManager = new Tiny.CanvasMaskManager();

    this.roundPixels = false;

    if ('imageSmoothingEnabled' in this.context) this.smoothProperty = 'imageSmoothingEnabled';
    else if ('webkitImageSmoothingEnabled' in this.context)
        this.smoothProperty = 'webkitImageSmoothingEnabled';
    else if ('mozImageSmoothingEnabled' in this.context) this.smoothProperty = 'mozImageSmoothingEnabled';
    else if ('oImageSmoothingEnabled' in this.context) this.smoothProperty = 'oImageSmoothingEnabled';
    else if ('msImageSmoothingEnabled' in this.context) this.smoothProperty = 'msImageSmoothingEnabled';

    var BlendModes = [];

    var modes = Tiny;

    BlendModes[modes.NORMAL] = 'source-over';
    BlendModes[modes.ADD] = 'lighter'; //IS THIS OK???

    var canUse = canUseNewCanvasBlendModes();

    BlendModes[modes.MULTIPLY] = canUse ? 'multiply' : 'source-over';
    BlendModes[modes.SCREEN] = canUse ? 'screen' : 'source-over';
    BlendModes[modes.OVERLAY] = canUse ? 'overlay' : 'source-over';
    BlendModes[modes.DARKEN] = canUse ? 'darken' : 'source-over';
    BlendModes[modes.LIGHTEN] = canUse ? 'lighten' : 'source-over';
    BlendModes[modes.COLOR_DODGE] = canUse ? 'color-dodge' : 'source-over';
    BlendModes[modes.COLOR_BURN] = canUse ? 'color-burn' : 'source-over';
    BlendModes[modes.HARD_LIGHT] = canUse ? 'hard-light' : 'source-over';
    BlendModes[modes.SOFT_LIGHT] = canUse ? 'soft-light' : 'source-over';
    BlendModes[modes.DIFFERENCE] = canUse ? 'difference' : 'source-over';
    BlendModes[modes.EXCLUSION] = canUse ? 'exclusion' : 'source-over';
    BlendModes[modes.HUE] = canUse ? 'hue' : 'source-over';
    BlendModes[modes.SATURATION] = canUse ? 'saturation' : 'source-over';
    BlendModes[modes.COLOR] = canUse ? 'color' : 'source-over';
    BlendModes[modes.LUMINOSITY] = canUse ? 'luminosity' : 'source-over';

    this.blendModes = BlendModes;
};

CanvasRenderer.prototype.constructor = CanvasRenderer;

CanvasRenderer.prototype.setClearColor = function (color) {
    this.clearColor = new Tiny.Color(color).toStyle();

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

// CanvasRenderer.prototype.setPixelArt = function() {

//     var canvas = this.domElement;

//     var types = [ 'optimizeSpeed', '-moz-crisp-edges', '-o-crisp-edges', '-webkit-optimize-contrast', 'optimize-contrast', 'crisp-edges', 'pixelated' ];

//     types.forEach(function (type)
//     {
//         canvas.style['image-rendering'] = type;
//     });

//     canvas.style.msInterpolationMode = 'nearest-neighbor';
//     this.renderSession.roundPixels = true;
// }

CanvasRenderer.prototype.render = function (scene) {
    scene.updateTransform();

    this.context.setTransform(1, 0, 0, 1, 0, 0);

    this.context.globalAlpha = 1;

    this.currentBlendMode = Tiny.NORMAL;
    this.context.globalCompositeOperation = this.blendModes[Tiny.NORMAL];

    if (navigator.isCocoonJS && this.domElement.screencanvas) {
        this.context.fillStyle = 'black';
        this.context.clear();
    }

    if (this.clearBeforeRender) {
        if (this.transparent) {
            this.context.clearRect(0, 0, this.width * this._resolution, this.height * this._resolution);
        } else {
            this.context.fillStyle = this.clearColor;
            this.context.fillRect(0, 0, this.width * this._resolution, this.height * this._resolution);
        }
    }

    this.renderObject(scene);
};

CanvasRenderer.prototype.destroy = function (removeView) {
    if (typeof removeView === 'undefined') {
        removeView = true;
    }

    if (removeView && this.domElement.parentNode) {
        this.domElement.parentNode.removeChild(this.domElement);
    }

    this.domElement = null;
    this.context = null;
    this.maskManager = null;
    // this.renderSession = null;

    if (Tiny.defaultRenderer === this) Tiny.defaultRenderer = null;
};

CanvasRenderer.prototype.resize = function (width, height) {
    this.width = width;
    this.height = height;

    var view = this.domElement;

    view.width = Math.floor(this.width * this._resolution);
    view.height = Math.floor(this.height * this._resolution);

    if (this.autoResize) {
        view.style.width = width + 'px';
        view.style.height = height + 'px';
    }
};

CanvasRenderer.prototype.setPixelRatio = function (resolution) {
    this._resolution = this.resolution = resolution;

    var view = this.domElement;

    view.width = Math.floor(this.width * this._resolution);
    view.height = Math.floor(this.height * this._resolution);
};

CanvasRenderer.prototype.renderObject = function (displayObject, context) {
    this.context = context || this._context;
    this.resolution = this._resolution;
    displayObject.renderCanvas(this);
};

export { CanvasRenderer };
