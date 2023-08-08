import { CanvasBuffer } from '../../../src/utils/CanvasBuffer';

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

        if (!Tiny.canHandleAlpha) {
            var alpha = pixels[i + 3];

            pixels[i + 0] /= 255 / alpha;
            pixels[i + 1] /= 255 / alpha;
            pixels[i + 2] /= 255 / alpha;
        }
    }

    context.putImageData(pixelData, 0, 0);
};

function checkInverseAlpha() {
    var canvas = new CanvasBuffer(2, 1, { willReadFrequently: true });

    canvas.context.fillStyle = 'rgba(10, 20, 30, 0.5)';

    //  Draw a single pixel
    canvas.context.fillRect(0, 0, 1, 1);

    //  Get the color values
    var s1 = canvas.context.getImageData(0, 0, 1, 1);

    //  Plot them to x2
    canvas.context.putImageData(s1, 1, 0);

    //  Get those values
    var s2 = canvas.context.getImageData(1, 0, 1, 1);

    //  Compare and return
    return (
        s2.data[0] === s1.data[0] &&
        s2.data[1] === s1.data[1] &&
        s2.data[2] === s1.data[2] &&
        s2.data[3] === s1.data[3]
    );
}

function checkBlendMode() {
    var pngHead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/';
    var pngEnd = 'AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';

    var magenta = new Image();

    magenta.onload = function () {
        var yellow = new Image();

        yellow.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = 6;
            canvas.height = 1;
            var context = canvas.getContext('2d', { willReadFrequently: true });

            context.globalCompositeOperation = 'multiply';

            context.drawImage(magenta, 0, 0);
            context.drawImage(yellow, 2, 0);

            if (!context.getImageData(2, 0, 1, 1)) {
                return false;
            }

            var data = context.getImageData(2, 0, 1, 1).data;

            Tiny.supportNewBlendModes = data[0] === 255 && data[1] === 0 && data[2] === 0;
            CanvasTinter.tintMethod = CanvasTinter.tintWithMultiply;
        };

        yellow.src = pngHead + '/wCKxvRF' + pngEnd;
    };

    magenta.src = pngHead + 'AP804Oa6' + pngEnd;

    return false;
}

CanvasTinter.convertTintToImage = false;

CanvasTinter.cacheTint = false;

Tiny.canHandleAlpha = checkInverseAlpha();

Tiny.supportNewBlendModes = checkBlendMode();

CanvasTinter.tintMethod = Tiny.supportNewBlendModes
    ? CanvasTinter.tintWithMultiply
    : CanvasTinter.tintWithPerPixel;

export { CanvasTinter };
