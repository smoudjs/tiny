// export const canUseNewCanvasBlendModes = function () {
//     var canvas = document.createElement('canvas');
//     canvas.width = 1;
//     canvas.height = 1;
//     var context = canvas.getContext('2d');
//     context.fillStyle = '#000';
//     context.fillRect(0, 0, 1, 1);
//     context.globalCompositeOperation = 'multiply';
//     context.fillStyle = '#fff';
//     context.fillRect(0, 0, 1, 1);
//     return context.getImageData(0, 0, 1, 1).data[0] === 0;
// };

// function canUseNewCanvasBlendModes() {
//     var pngHead = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/';
//     var pngEnd = 'AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';

//     var magenta = new Image();

//     magenta.onload = function () {
//         var yellow = new Image();

//         yellow.onload = function () {
//             var canvas = document.createElement('canvas');
//             canvas.width = 6;
//             canvas.height = 1;
//             var context = canvas.getContext('2d', { willReadFrequently: true });

//             context.globalCompositeOperation = 'multiply';

//             context.drawImage(magenta, 0, 0);
//             context.drawImage(yellow, 2, 0);

//             if (!context.getImageData(2, 0, 1, 1)) {
//                 return false;
//             }

//             var data = context.getImageData(2, 0, 1, 1).data;

//             Tiny.supportNewBlendModes = data[0] === 255 && data[1] === 0 && data[2] === 0;
//             CanvasTinter.tintMethod = CanvasTinter.tintWithMultiply;
//         };

//         yellow.src = pngHead + '/wCKxvRF' + pngEnd;
//     };

//     magenta.src = pngHead + 'AP804Oa6' + pngEnd;

//     return false;
// }

function createColoredCanvas(color) {
    var canvas = document.createElement('canvas');
    canvas.width = 6;
    canvas.height = 1;
    var context = canvas.getContext('2d');

    context.fillStyle = color;
    context.fillRect(0, 0, 6, 1);

    return canvas;
}

var canUseNewCanvasBlendModesValue;

export function canUseNewCanvasBlendModes() {
    if (canUseNewCanvasBlendModesValue !== undefined) {
        return canUseNewCanvasBlendModesValue;
    }

    var magenta = createColoredCanvas('#ff00ff');
    var yellow = createColoredCanvas('#ffff00');

    var canvas = document.createElement('canvas');
    canvas.width = 6;
    canvas.height = 1;
    var context = canvas.getContext('2d');

    context.globalCompositeOperation = 'multiply';
    context.drawImage(magenta, 0, 0);
    context.drawImage(yellow, 2, 0);

    var imageData = context.getImageData(2, 0, 1, 1);

    if (!imageData) {
        canUseNewCanvasBlendModesValue = false;
    } else {
        var data = imageData.data;

        canUseNewCanvasBlendModesValue = data[0] === 255 && data[1] === 0 && data[2] === 0;
    }

    return canUseNewCanvasBlendModesValue;
}


export function checkInverseAlpha() {
    var canvas = new Tiny.CanvasBuffer(2, 1, { willReadFrequently: true });

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
