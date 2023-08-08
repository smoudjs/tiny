var CanvasGraphics = function () {};

CanvasGraphics.renderGraphics = function (graphics, context) {
    var worldAlpha = graphics.worldAlpha;

    if (graphics.dirty) {
        this.updateGraphicsTint(graphics);
        graphics.dirty = false;
    }

    for (var i = 0; i < graphics.graphicsData.length; i++) {
        var data = graphics.graphicsData[i];
        var shape = data.shape;

        var fillColor = data._fillTint;
        var lineColor = data._lineTint;

        context.lineWidth = data.lineWidth;

        if (data.type === Tiny.Primitives.POLY) {
            context.beginPath();

            var points = shape.points;

            context.moveTo(points[0], points[1]);

            for (var j = 1; j < points.length / 2; j++) {
                context.lineTo(points[j * 2], points[j * 2 + 1]);
            }

            if (shape.closed) {
                context.lineTo(points[0], points[1]);
            }

            // if the first and last point are the same close the path - much neater :)
            if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
                context.closePath();
            }

            if (data.fill) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = fillColor;
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = lineColor;
                context.stroke();
            }
        } else if (data.type === Tiny.Primitives.RECT) {
            if (data.fillColor) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = fillColor;
                context.fillRect(shape.x, shape.y, shape.width, shape.height);
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = lineColor;
                context.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
        } else if (data.type === Tiny.Primitives.CIRC) {
            // TODO - need to be Undefined!
            context.beginPath();
            context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            context.closePath();

            if (data.fill) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = fillColor;
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = lineColor;
                context.stroke();
            }
        } else if (data.type === Tiny.Primitives.ELIP) {
            // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

            var w = shape.width * 2;
            var h = shape.height * 2;

            var x = shape.x - w / 2;
            var y = shape.y - h / 2;

            context.beginPath();

            var kappa = 0.5522848,
                ox = (w / 2) * kappa, // control point offset horizontal
                oy = (h / 2) * kappa, // control point offset vertical
                xe = x + w, // x-end
                ye = y + h, // y-end
                xm = x + w / 2, // x-middle
                ym = y + h / 2; // y-middle

            context.moveTo(x, ym);
            context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

            context.closePath();

            if (data.fill) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = fillColor;
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = lineColor;
                context.stroke();
            }
        } else if (data.type === Tiny.Primitives.RREC) {
            var rx = shape.x;
            var ry = shape.y;
            var width = shape.width;
            var height = shape.height;
            var radius = shape.radius;

            var maxRadius = (Math.min(width, height) / 2) | 0;
            radius = radius > maxRadius ? maxRadius : radius;

            context.beginPath();
            context.moveTo(rx, ry + radius);
            context.lineTo(rx, ry + height - radius);
            context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
            context.lineTo(rx + width - radius, ry + height);
            context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
            context.lineTo(rx + width, ry + radius);
            context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
            context.lineTo(rx + radius, ry);
            context.quadraticCurveTo(rx, ry, rx, ry + radius);
            context.closePath();

            if (data.fillColor) {
                context.globalAlpha = data.fillAlpha * worldAlpha;
                context.fillStyle = fillColor;
                context.fill();
            }

            if (data.lineWidth) {
                context.globalAlpha = data.lineAlpha * worldAlpha;
                context.strokeStyle = lineColor;
                context.stroke();
            }
        }
        // else if (data.type === Tiny.Primitives.RREC_LJOIN)
        // {
        //     var rx = shape.x;
        //     var ry = shape.y;
        //     var width = shape.width;
        //     var height = shape.height;
        //     var radius = shape.radius;

        //     if (data.fillColor)
        //     {
        //         context.globalAlpha = data.fillAlpha * worldAlpha;
        //         context.fillStyle = fillColor;
        //         context.strokeStyle = fillColor;
        //     }

        //     context.lineJoin = "round";
        //     context.lineWidth = radius;

        //     context.strokeRect(rx + (radius / 2), ry + (radius / 2), width - radius, height - radius);
        //     context.fillRect(rx + (radius / 2), ry + (radius / 2), width - radius, height - radius);
        // }
    }
};

CanvasGraphics.renderGraphicsMask = function (graphics, context) {
    var len = graphics.graphicsData.length;

    if (len === 0) {
        return;
    }

    context.beginPath();

    for (var i = 0; i < len; i++) {
        var data = graphics.graphicsData[i];
        var shape = data.shape;

        if (data.type === Tiny.Primitives.POLY) {
            var points = shape.points;

            context.moveTo(points[0], points[1]);

            for (var j = 1; j < points.length / 2; j++) {
                context.lineTo(points[j * 2], points[j * 2 + 1]);
            }

            // if the first and last point are the same close the path - much neater :)
            if (points[0] === points[points.length - 2] && points[1] === points[points.length - 1]) {
                context.closePath();
            }
        } else if (data.type === Tiny.Primitives.RECT) {
            context.rect(shape.x, shape.y, shape.width, shape.height);
            context.closePath();
        } else if (data.type === Tiny.Primitives.CIRC) {
            // TODO - need to be Undefined!
            context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
            context.closePath();
        } else if (data.type === Tiny.Primitives.ELIP) {
            // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

            var w = shape.width * 2;
            var h = shape.height * 2;

            var x = shape.x - w / 2;
            var y = shape.y - h / 2;

            var kappa = 0.5522848,
                ox = (w / 2) * kappa, // control point offset horizontal
                oy = (h / 2) * kappa, // control point offset vertical
                xe = x + w, // x-end
                ye = y + h, // y-end
                xm = x + w / 2, // x-middle
                ym = y + h / 2; // y-middle

            context.moveTo(x, ym);
            context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
            context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
            context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
            context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
            context.closePath();
        } else if (data.type === Tiny.Primitives.RREC) {
            var rx = shape.x;
            var ry = shape.y;
            var width = shape.width;
            var height = shape.height;
            var radius = shape.radius;

            var maxRadius = (Math.min(width, height) / 2) | 0;
            radius = radius > maxRadius ? maxRadius : radius;

            context.moveTo(rx, ry + radius);
            context.lineTo(rx, ry + height - radius);
            context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
            context.lineTo(rx + width - radius, ry + height);
            context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
            context.lineTo(rx + width, ry + radius);
            context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
            context.lineTo(rx + radius, ry);
            context.quadraticCurveTo(rx, ry, rx, ry + radius);
            context.closePath();
        }
    }
};

CanvasGraphics.updateGraphicsTint = function (graphics) {
    console.log(graphics.tint);

    if (graphics.tint === '#ffffff') {
        return;
    }

    var tintHex = Tiny.style2hex(graphics.tint);

    var tintR = ((tintHex >> 16) & 0xff) / 255;
    var tintG = ((tintHex >> 8) & 0xff) / 255;
    var tintB = (tintHex & 0xff) / 255;

    for (var i = 0; i < graphics.graphicsData.length; i++) {
        var data = graphics.graphicsData[i];

        var fillColor = Tiny.style2hex(data.fillColor);
        var lineColor = Tiny.style2hex(data.lineColor);

        /*
        var colorR = (fillColor >> 16 & 0xFF) / 255;
        var colorG = (fillColor >> 8 & 0xFF) / 255;
        var colorB = (fillColor & 0xFF) / 255; 
        colorR *= tintR;
        colorG *= tintG;
        colorB *= tintB;
        fillColor = ((colorR*255 << 16) + (colorG*255 << 8) + colorB*255);
        colorR = (lineColor >> 16 & 0xFF) / 255;
        colorG = (lineColor >> 8 & 0xFF) / 255;
        colorB = (lineColor & 0xFF) / 255; 
        colorR *= tintR;
        colorG *= tintG;
        colorB *= tintB;
        lineColor = ((colorR*255 << 16) + (colorG*255 << 8) + colorB*255);   
        */

        data._fillTint =
            (((((fillColor >> 16) & 0xff) / 255) * tintR * 255) << 16) +
            (((((fillColor >> 8) & 0xff) / 255) * tintG * 255) << 8) +
            ((fillColor & 0xff) / 255) * tintB * 255;
        data._lineTint =
            (((((lineColor >> 16) & 0xff) / 255) * tintR * 255) << 16) +
            (((((lineColor >> 8) & 0xff) / 255) * tintG * 255) << 8) +
            ((lineColor & 0xff) / 255) * tintB * 255;

        data._fillTint = Tiny.hex2style(data._fillTint);
        data._lineTint = Tiny.hex2style(data._lineTint);
    }
};

export { CanvasGraphics };
