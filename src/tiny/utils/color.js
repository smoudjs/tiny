Tiny.Color = {
    RED: 0xff0000,
    ORANGE: 0xff9900,
    YELLOW: 0xffff00,
    GREEN: 0x00ff00,
    AQUA: 0x00ffff,
    BLUE: 0x0000ff,
    VIOLET: 0xff00ff,
    WHITE: 0xffffff,
    BLACK: 0,
    GRAY: 0x666666,
    packPixel: function (r, g, b, a)
    {

        if (Tiny.Device.LITTLE_ENDIAN)
        {
            return ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;
        }
        else
        {
            return ((r << 24) | (g << 16) | (b << 8) | a) >>> 0;
        }

    },

    unpackPixel: function (rgba, out, hsl, hsv)
    {

        if (out === undefined || out === null) { out = Tiny.Color.createColor(); }
        if (hsl === undefined || hsl === null) { hsl = false; }
        if (hsv === undefined || hsv === null) { hsv = false; }

        if (Tiny.Device.LITTLE_ENDIAN)
        {
            out.a = ((rgba & 0xff000000) >>> 24);
            out.b = ((rgba & 0x00ff0000) >>> 16);
            out.g = ((rgba & 0x0000ff00) >>> 8);
            out.r = ((rgba & 0x000000ff));
        }
        else
        {
            out.r = ((rgba & 0xff000000) >>> 24);
            out.g = ((rgba & 0x00ff0000) >>> 16);
            out.b = ((rgba & 0x0000ff00) >>> 8);
            out.a = ((rgba & 0x000000ff));
        }

        out.color = rgba;
        out.rgba = 'rgba(' + out.r + ',' + out.g + ',' + out.b + ',' + (out.a / 255) + ')';

        if (hsl)
        {
            Tiny.Color.RGBtoHSL(out.r, out.g, out.b, out);
        }

        if (hsv)
        {
            Tiny.Color.RGBtoHSV(out.r, out.g, out.b, out);
        }

        return out;

    },

    fromRGBA: function (rgba, out)
    {

        if (!out)
        {
            out = Tiny.Color.createColor();
        }

        out.r = ((rgba & 0xff000000) >>> 24);
        out.g = ((rgba & 0x00ff0000) >>> 16);
        out.b = ((rgba & 0x0000ff00) >>> 8);
        out.a = ((rgba & 0x000000ff));

        out.rgba = 'rgba(' + out.r + ',' + out.g + ',' + out.b + ',' + out.a + ')';

        return out;

    },

    toRGBA: function (r, g, b, a)
    {

        return (r << 24) | (g << 16) | (b << 8) | a;

    },

    toABGR: function (r, g, b, a)
    {

        return ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;

    },

    hexToRGBArray: function (color)
    {

        return [
            (color >> 16 & 0xFF) / 255,
            (color >> 8 & 0xFF) / 255,
            (color & 0xFF) / 255
        ];

    },

    RGBArrayToHex: function (rgb)
    {

        return ((rgb[0] * 255 << 16) + (rgb[1] * 255 << 8) + rgb[2] * 255);

    },

    RGBtoHSL: function (r, g, b, out)
    {

        if (!out)
        {
            out = Tiny.Color.createColor(r, g, b, 1);
        }

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        // achromatic by default
        out.h = 0;
        out.s = 0;
        out.l = (max + min) / 2;

        if (max !== min)
        {
            var d = max - min;

            out.s = out.l > 0.5 ? d / (2 - max - min) : d / (max + min);

            if (max === r)
            {
                out.h = (g - b) / d + (g < b ? 6 : 0);
            }
            else if (max === g)
            {
                out.h = (b - r) / d + 2;
            }
            else if (max === b)
            {
                out.h = (r - g) / d + 4;
            }

            out.h /= 6;
        }

        return out;

    },

    HSLtoRGB: function (h, s, l, out)
    {

        if (!out)
        {
            out = Tiny.Color.createColor(l, l, l);
        }
        else
        {
            // achromatic by default
            out.r = l;
            out.g = l;
            out.b = l;
        }

        if (s !== 0)
        {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            out.r = Tiny.Color.hueToColor(p, q, h + 1 / 3);
            out.g = Tiny.Color.hueToColor(p, q, h);
            out.b = Tiny.Color.hueToColor(p, q, h - 1 / 3);
        }

        out.r = Math.floor((out.r * 255 | 0));
        out.g = Math.floor((out.g * 255 | 0));
        out.b = Math.floor((out.b * 255 | 0));

        Tiny.Color.updateColor(out);

        return out;

    },

    RGBtoHSV: function (r, g, b, out)
    {

        if (!out)
        {
            out = Tiny.Color.createColor(r, g, b, 255);
        }

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var d = max - min;

        // achromatic by default
        out.h = 0;
        out.s = max === 0 ? 0 : d / max;
        out.v = max;

        if (max !== min)
        {
            if (max === r)
            {
                out.h = (g - b) / d + (g < b ? 6 : 0);
            }
            else if (max === g)
            {
                out.h = (b - r) / d + 2;
            }
            else if (max === b)
            {
                out.h = (r - g) / d + 4;
            }

            out.h /= 6;
        }

        return out;

    },

    HSVtoRGB: function (h, s, v, out)
    {

        if (out === undefined) { out = Tiny.Color.createColor(0, 0, 0, 1, h, s, 0, v); }

        var r, g, b;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

        switch (i % 6)
        {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }

        out.r = Math.floor(r * 255);
        out.g = Math.floor(g * 255);
        out.b = Math.floor(b * 255);

        Tiny.Color.updateColor(out);

        return out;

    },

    hueToColor: function (p, q, t)
    {

        if (t < 0)
        {
            t += 1;
        }

        if (t > 1)
        {
            t -= 1;
        }

        if (t < 1 / 6)
        {
            return p + (q - p) * 6 * t;
        }

        if (t < 1 / 2)
        {
            return q;
        }

        if (t < 2 / 3)
        {
            return p + (q - p) * (2 / 3 - t) * 6;
        }

        return p;

    },
    createColor: function (r, g, b, a, h, s, l, v)
    {

        var out = { r: r || 0, g: g || 0, b: b || 0, a: a || 1, h: h || 0, s: s || 0, l: l || 0, v: v || 0, color: 0, color32: 0, rgba: '' };

        return Tiny.Color.updateColor(out);

    },

    updateColor: function (out)
    {

        out.rgba = 'rgba(' + out.r.toFixed() + ',' + out.g.toFixed() + ',' + out.b.toFixed() + ',' + out.a.toString() + ')';
        out.color = Tiny.Color.getColor(out.r, out.g, out.b);
        out.color32 = Tiny.Color.getColor32(out.a * 255, out.r, out.g, out.b);

        return out;

    },

    getColor32: function (a, r, g, b)
    {

        return a << 24 | r << 16 | g << 8 | b;

    },

    getColor: function (r, g, b)
    {

        return r << 16 | g << 8 | b;

    },

    RGBtoString: function (r, g, b, a, prefix)
    {

        if (a === undefined) { a = 255; }
        if (prefix === undefined) { prefix = '#'; }

        if (prefix === '#')
        {
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
        else
        {
            return '0x' + Tiny.Color.componentToHex(a) + Tiny.Color.componentToHex(r) + Tiny.Color.componentToHex(g) + Tiny.Color.componentToHex(b);
        }

    },

    hexToRGB: function (hex)
    {

        var rgb = Tiny.Color.hexToColor(hex);

        if (rgb)
        {
            return Tiny.Color.getColor32(rgb.a, rgb.r, rgb.g, rgb.b);
        }

    },

    hexToColor: function (hex, out)
    {

        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        hex = hex.replace(/^(?:#|0x)?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b)
        {
            return r + r + g + g + b + b;
        });

        var result = (/^(?:#|0x)?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(hex);

        if (result)
        {
            var r = parseInt(result[1], 16);
            var g = parseInt(result[2], 16);
            var b = parseInt(result[3], 16);

            if (!out)
            {
                out = Tiny.Color.createColor(r, g, b);
            }
            else
            {
                out.r = r;
                out.g = g;
                out.b = b;
            }
        }

        return out;

    },

    webToColor: function (web, out)
    {

        if (!out)
        {
            out = Tiny.Color.createColor();
        }

        var result = (/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)$/).exec(web);

        if (result)
        {
            out.r = ~~Number(result[1]);
            out.g = ~~Number(result[2]);
            out.b = ~~Number(result[3]);
            out.a = result[4] !== undefined ? Number(result[4]) : 1;
            Tiny.Color.updateColor(out);
        }

        return out;

    },

    valueToColor: function (value, out)
    {

        //  The behavior is not consistent between hexToColor/webToColor on invalid input.
        //  This unifies both by returning a new object, but returning null may be better.
        if (!out)
        {
            out = Tiny.Color.createColor();
        }

        if (typeof value === 'string')
        {
            if (value.indexOf('rgb') === 0)
            {
                return Tiny.Color.webToColor(value, out);
            }
            else
            {
                //  `hexToColor` does not support alpha; match `createColor`.
                out.a = 1;
                return Tiny.Color.hexToColor(value, out);
            }
        }
        else if (typeof value === 'number')
        {
            //  `getRGB` does not take optional object to modify;
            //  alpha is also adjusted to match `createColor`.
            var tempColor = Tiny.Color.getRGB(value);
            out.r = tempColor.r;
            out.g = tempColor.g;
            out.b = tempColor.b;
            out.a = tempColor.a / 255;
            return out;
        }
        else
        {
            return out;
        }

    },

    componentToHex: function (color)
    {

        var hex = color.toString(16);

        return (hex.length === 1) ? '0' + hex : hex;

    },

    HSVColorWheel: function (s, v)
    {

        if (s === undefined) { s = 1.0; }
        if (v === undefined) { v = 1.0; }

        var colors = [];

        for (var c = 0; c <= 359; c++)
        {
            colors.push(Tiny.Color.HSVtoRGB(c / 359, s, v));
        }

        return colors;

    },

    HSLColorWheel: function (s, l)
    {

        if (s === undefined) { s = 0.5; }
        if (l === undefined) { l = 0.5; }

        var colors = [];

        for (var c = 0; c <= 359; c++)
        {
            colors.push(Tiny.Color.HSLtoRGB(c / 359, s, l));
        }

        return colors;

    },

    interpolateColor: function (color1, color2, steps, currentStep, alpha, colorSpace)
    {

        if (alpha === undefined) { alpha = 255; }
        if (colorSpace === undefined) { colorSpace = 0; }

        var src1 = Tiny.Color.getRGB(color1);
        var src2 = Tiny.Color.getRGB(color2);

        if (colorSpace === 0)
        {
            var r = (((src2.red - src1.red) * currentStep) / steps) + src1.red;
            var g = (((src2.green - src1.green) * currentStep) / steps) + src1.green;
            var b = (((src2.blue - src1.blue) * currentStep) / steps) + src1.blue;
        }

        if (colorSpace === 1)
        {
            var hsv1 = Tiny.Color.RGBtoHSV(src1.r, src1.g, src1.b);
            var hsv2 = Tiny.Color.RGBtoHSV(src2.r, src2.g, src2.b);
            var dh = hsv2.h - hsv1.h;
            var h;

            if (hsv1.h > hsv2.h)
            {
                var h3 = hsv2.h;
                hsv2.h = hsv1.h;
                hsv1.h = h3;
                dh = -dh;
                currentStep = steps - currentStep;
            }

            if (dh > 0.5)
            {
                hsv1.h = hsv1.h + 1;
                h = (((hsv2.h - hsv1.h) * currentStep / steps) + hsv1.h) % 1;
            }

            if (dh <= 0.5)
            {
                h = ((hsv2.h - hsv1.h) * currentStep / steps) + hsv1.h;
            }

            var s = (((hsv2.s - hsv1.s) * currentStep) / steps) + hsv1.s;
            var v = (((hsv2.v - hsv1.v) * currentStep) / steps) + hsv1.v;

            var rgb = Tiny.Color.HSVtoRGB(h, s, v, rgb);
            var r = rgb.r;
            var g = rgb.g;
            var b = rgb.b;
        }

        return Tiny.Color.getColor32(alpha, r, g, b);

    },

    interpolateColorWithRGB: function (color, r, g, b, steps, currentStep)
    {

        var src = Tiny.Color.getRGB(color);
        var or = (((r - src.red) * currentStep) / steps) + src.red;
        var og = (((g - src.green) * currentStep) / steps) + src.green;
        var ob = (((b - src.blue) * currentStep) / steps) + src.blue;

        return Tiny.Color.getColor(or, og, ob);

    },

    interpolateRGB: function (r1, g1, b1, r2, g2, b2, steps, currentStep)
    {

        var r = (((r2 - r1) * currentStep) / steps) + r1;
        var g = (((g2 - g1) * currentStep) / steps) + g1;
        var b = (((b2 - b1) * currentStep) / steps) + b1;

        return Tiny.Color.getColor(r, g, b);

    },

    linear: function (color1, color2, t)
    {

        return this.interpolateColor(color1, color2, 1, t);

    },

    linearInterpolation: function (colors, t)
    {

        var k = Tiny.Math.linear(0, colors.length - 1, t);
        var color1 = colors[Math.floor(k)];
        var color2 = colors[Math.ceil(k)];

        return this.linear(color1, color2, k % 1);

    },

    getRandomColor: function (min, max, alpha)
    {

        if (min === undefined) { min = 0; }
        if (max === undefined) { max = 255; }
        if (alpha === undefined) { alpha = 255; }

        //  Sanity checks
        if (max > 255 || min > max)
        {
            return Tiny.Color.getColor(255, 255, 255);
        }

        var red = min + Math.round(Math.random() * (max - min));
        var green = min + Math.round(Math.random() * (max - min));
        var blue = min + Math.round(Math.random() * (max - min));

        return Tiny.Color.getColor32(alpha, red, green, blue);

    },

    getRGB: function (color)
    {

        if (color > 16777215)
        {
            //  The color value has an alpha component
            return {
                alpha: color >>> 24,
                red: color >> 16 & 0xFF,
                green: color >> 8 & 0xFF,
                blue: color & 0xFF,
                a: color >>> 24,
                r: color >> 16 & 0xFF,
                g: color >> 8 & 0xFF,
                b: color & 0xFF
            };
        }
        else
        {
            return {
                alpha: 255,
                red: color >> 16 & 0xFF,
                green: color >> 8 & 0xFF,
                blue: color & 0xFF,
                a: 255,
                r: color >> 16 & 0xFF,
                g: color >> 8 & 0xFF,
                b: color & 0xFF
            };
        }

    },

    getWebRGB: function (color)
    {

        if (typeof color === 'object')
        {
            return 'rgba(' + color.r.toString() + ',' + color.g.toString() + ',' + color.b.toString() + ',' + (color.a / 255).toString() + ')';
        }
        else
        {
            var rgb = Tiny.Color.getRGB(color);
            return 'rgba(' + rgb.r.toString() + ',' + rgb.g.toString() + ',' + rgb.b.toString() + ',' + (rgb.a / 255).toString() + ')';
        }

    },

    getAlpha: function (color)
    {
        return color >>> 24;
    },

    getAlphaFloat: function (color)
    {
        return (color >>> 24) / 255;
    },

    getRed: function (color)
    {
        return color >> 16 & 0xFF;
    },

    getGreen: function (color)
    {
        return color >> 8 & 0xFF;
    },

    getBlue: function (color)
    {
        return color & 0xFF;
    },

    blendNormal: function (a)
    {
        return a;
    },

    blendLighten: function (a, b)
    {
        return (b > a) ? b : a;
    },

    blendDarken: function (a, b)
    {
        return (b > a) ? a : b;
    },

    blendMultiply: function (a, b)
    {
        return (a * b) / 255;
    },

    blendAverage: function (a, b)
    {
        return (a + b) / 2;
    },

    blendAdd: function (a, b)
    {
        return Math.min(255, a + b);
    },

    blendSubtract: function (a, b)
    {
        return Math.max(0, a + b - 255);
    },

    blendDifference: function (a, b)
    {
        return Math.abs(a - b);
    },

    blendNegation: function (a, b)
    {
        return 255 - Math.abs(255 - a - b);
    },

    blendScreen: function (a, b)
    {
        return 255 - (((255 - a) * (255 - b)) >> 8);
    },

    blendExclusion: function (a, b)
    {
        return a + b - 2 * a * b / 255;
    },

    blendOverlay: function (a, b)
    {
        return b < 128 ? (2 * a * b / 255) : (255 - 2 * (255 - a) * (255 - b) / 255);
    },

    blendSoftLight: function (a, b)
    {
        return b < 128 ? (2 * ((a >> 1) + 64)) * (b / 255) : 255 - (2 * (255 - ((a >> 1) + 64)) * (255 - b) / 255);
    },

    blendHardLight: function (a, b)
    {
        return Tiny.Color.blendOverlay(b, a);
    },

    blendColorDodge: function (a, b)
    {
        return b === 255 ? b : Math.min(255, ((a << 8) / (255 - b)));
    },

    blendColorBurn: function (a, b)
    {
        return b === 0 ? b : Math.max(0, (255 - ((255 - a) << 8) / b));
    },

    blendLinearDodge: function (a, b)
    {
        return Tiny.Color.blendAdd(a, b);
    },

    blendLinearBurn: function (a, b)
    {
        return Tiny.Color.blendSubtract(a, b);
    },

    blendLinearLight: function (a, b)
    {
        return b < 128 ? Tiny.Color.blendLinearBurn(a, 2 * b) : Tiny.Color.blendLinearDodge(a, (2 * (b - 128)));
    },

    blendVividLight: function (a, b)
    {
        return b < 128 ? Tiny.Color.blendColorBurn(a, 2 * b) : Tiny.Color.blendColorDodge(a, (2 * (b - 128)));
    },

    blendPinLight: function (a, b)
    {
        return b < 128 ? Tiny.Color.blendDarken(a, 2 * b) : Tiny.Color.blendLighten(a, (2 * (b - 128)));
    },

    blendHardMix: function (a, b)
    {
        return Tiny.Color.blendVividLight(a, b) < 128 ? 0 : 255;
    },

    blendReflect: function (a, b)
    {
        return b === 255 ? b : Math.min(255, (a * a / (255 - b)));
    },

    blendGlow: function (a, b)
    {
        return Tiny.Color.blendReflect(b, a);
    },

    blendPhoenix: function (a, b)
    {
        return Math.min(a, b) - Math.max(a, b) + 255;
    }

};