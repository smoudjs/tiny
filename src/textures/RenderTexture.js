import { Texture } from './Texture';
import { CanvasBuffer } from '../utils/CanvasBuffer';
import { Rectangle } from '../math/shapes/Rectangle';

var RenderTexture = function (width, height, renderer, resolution) {
    this.width = width || 100;
    this.height = height || 100;

    // console.log(this);
    resolution = resolution || 1;

    // this.frame = new Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);

    // this.crop = new Rectangle(0, 0, this.width * this.resolution, this.height * this.resolution);

    // this.baseTexture = new Tiny.BaseTexture();
    // this.baseTexture.width = this.width * this.resolution;
    // this.baseTexture.height = this.height * this.resolution;
    // this.baseTexture.resolution = this.resolution;

    // this.baseTexture.hasLoaded = true;
    this.textureBuffer = new CanvasBuffer(this.width * resolution, this.height * resolution);

    Texture.call(
        this,
        this.textureBuffer.canvas,
        new Rectangle(0, 0, Math.floor(this.width * resolution), Math.floor(this.height * resolution))
    );

    this.resolution = resolution;

    // this.hasLoaded = true;

    this.renderer = renderer || Tiny.defaultRenderer;

    this.valid = true;
};

RenderTexture.prototype = Object.create(Texture.prototype);
RenderTexture.prototype.constructor = RenderTexture;

RenderTexture.prototype.resize = function (width, height, updateBase) {
    if (width === this.width && height === this.height) return;

    this.valid = width > 0 && height > 0;

    this.width = width;
    this.height = height;
    this.frame.width = this.crop.width = width * this.resolution;
    this.frame.height = this.crop.height = height * this.resolution;

    if (updateBase) {
        // this.baseTexture.width = this.width * this.resolution;
        // this.baseTexture.height = this.height * this.resolution;
    }

    if (!this.valid) return;

    this.textureBuffer.resize(this.width * this.resolution, this.height * this.resolution);
};

RenderTexture.prototype.clear = function () {
    if (!this.valid) return;

    this.textureBuffer.clear();
};

RenderTexture.prototype.render = function (displayObject, matrix, clear) {
    if (!this.valid) return;

    var wt = displayObject.worldTransform;
    wt.identity();
    if (matrix) wt.append(matrix);

    // setWorld Alpha to ensure that the object is renderer at full opacity
    displayObject.worldAlpha = 1;

    // Time to update all the children of the displayObject with the new matrix..
    var children = displayObject.children;

    for (var i = 0, j = children.length; i < j; i++) {
        children[i].updateTransform();
    }

    if (clear) this.textureBuffer.clear();

    var context = this.textureBuffer.context;

    var realResolution = this.renderer.resolution;

    this.renderer.resolution = this.resolution;

    this.renderer.renderObject(displayObject, context);

    this.renderer.resolution = realResolution;
};

RenderTexture.prototype.getImage = function () {
    var image = new Image();
    image.src = this.getBase64();
    return image;
};

RenderTexture.prototype.getBase64 = function () {
    return this.getCanvas().toDataURL();
};

RenderTexture.prototype.getCanvas = function () {
    return this.textureBuffer.canvas;
};

export { RenderTexture };
