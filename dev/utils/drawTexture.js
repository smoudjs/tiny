import { randomIn } from './Math';

function rgbToInt(r, g, b) {
    return ((r * 255) << 16) + ((g * 255) << 8) + ((b * 255) | 0);
}
function toStyle(int) {
    return '#' + ('00000' + int.toString(16)).slice(-6);
}

export function drawTexture(size, index) {
    size = size || 32;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        var color = Math.random() * 0.3 + 0.2;

        ctx.fillStyle = toStyle(rgbToInt(color + randomIn(0.1), color + randomIn(0.1), color + randomIn(0.1)));
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = toStyle(
            rgbToInt(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5)
        );
        ctx.save();
        ctx.rotate((Math.PI / 180) * randomIn(60));
        var w = Math.floor((Math.random() * 0.65 + 0.3) * size);

        ctx.shadowBlur = size * 0.1 + 3;

        ctx.shadowColor = toStyle(
            rgbToInt(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5)
        );

        if (Math.random() > 0.5) {
            ctx.fillRect(
                Math.floor(Math.random() * size * 0.25),
                Math.floor(Math.random() * size * 0.25),
                w,
                w
            );
        } else {
            ctx.arc(
                Math.floor(Math.random() * size * 0.5),
                Math.floor(Math.random() * size * 0.5),
                w * 0.8,
                0,
                Math.PI * 2,
                true
            );
            ctx.fill();
        }
        ctx.restore();
        // ctx.fillStyle = '#ffffff';
        // ctx.font = 'bold 28px serif';
        var s = 0.5 - ('' + index).length * 0.2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#ffffff';

        ctx.font = 'bold 23px serif';
        ctx.fillStyle = '#000000';
        ctx.fillText(index, size * s, size * 0.6);

        // ctx.strokeRect(50, 50, 50, 50);
    }

    return canvas;
}