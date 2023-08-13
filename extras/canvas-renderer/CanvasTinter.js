import { canUseNewCanvasBlendModes, checkInverseAlpha } from './utils';

var canHandleAlpha = checkInverseAlpha();

var CanvasTinter = function () {};

CanvasTinter.getTintedTexture = function (sprite, color) {
    var texture = sprite.texture;

    if (!texture._tintCache) texture._tintCache = {};

    if (texture._tintCache[color]) return texture._tintCache[color];

    var canvas = CanvasTinter.canvas || document.createElement('canvas');

    CanvasTinter.tintMethod(texture, color, canvas);

    if (CanvasTinter.convertTintToImage) {
        // is this better?
        var tintImage = new Image();
        tintImage.src = canvas.toDataURL();

        // texture._tintCache[stringColor] = tintImage;
    } else {
        CanvasTinter.canvas = null;
    }

    if (CanvasTinter.cacheTint) texture._tintCache[color] = canvas;

    return canvas;
};

CanvasTinter.tintWithMultiply = function (texture, color, canvas) {
    var context = canvas.getContext('2d');

    var crop = texture.crop;

    canvas.width = crop.width;
    canvas.height = crop.height;

    context.fillStyle = color;

    context.fillRect(0, 0, crop.width, crop.height);

    context.globalCompositeOperation = 'multiply';

    context.drawImage(texture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

    context.globalCompositeOperation = 'destination-atop';

    context.drawImage(texture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
};

CanvasTinter.tintWithPerPixel = function (texture, color, canvas) {
    var context = canvas.getContext('2d');

    var crop = texture.crop;

    canvas.width = crop.width;
    canvas.height = crop.height;

    context.globalCompositeOperation = 'copy';
    context.drawImage(texture.source, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

    var rgbValues = Tiny.hex2rgb(Tiny.style2hex(color));
    var r = rgbValues[0],
        g = rgbValues[1],
        b = rgbValues[2];

    var pixelData = context.getImageData(0, 0, crop.width, crop.height);

    var pixels = pixelData.data;

    for (var i = 0; i < pixels.length; i += 4) {
        pixels[i + 0] *= r;
        pixels[i + 1] *= g;
        pixels[i + 2] *= b;

        if (!canHandleAlpha) {
            var alpha = pixels[i + 3];

            pixels[i + 0] /= 255 / alpha;
            pixels[i + 1] /= 255 / alpha;
            pixels[i + 2] /= 255 / alpha;
        }
    }

    context.putImageData(pixelData, 0, 0);
};

CanvasTinter.convertTintToImage = false;

CanvasTinter.cacheTint = false;

CanvasTinter.tintMethod = canUseNewCanvasBlendModes()
    ? CanvasTinter.tintWithMultiply
    : CanvasTinter.tintWithPerPixel;

export { CanvasTinter };
