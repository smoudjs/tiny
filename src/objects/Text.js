import { Sprite } from './Sprite.js';
import { Texture } from '../textures/Texture.js';

var Text = function (text, style) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.resolution = 1;
    this.style = Object.assign({}, Text.defaultStyle);

    Sprite.call(this, new Texture(this.canvas));

    this.setText(text);
    this.setStyle(style);
};

Text.defaultStyle = {
    fontFamily: 'Arial',
    fontSize: 26,
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'bold',
    fill: 'black',
    align: 'left',
    stroke: 'black',
    strokeThickness: 0,
    wordWrap: false,
    lineSpacing: 0,
    wordWrapWidth: 100,
    dropShadow: false,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 4,
    dropShadowColor: 'black',
    dropShadowBlur: 0,
    lineJoin: "miter",
    miterLimit: 2
};

Text.prototype = Object.assign(Object.create(Sprite.prototype), {
    constructor: Text,

    setStyle: function (style) {
        // style = style || {};

        Object.assign(this.style, style);

        // style.font = style.font || 'bold 20pt Arial';
        // fontFamily: 'Arial';
        // fontSize: 26;
        // fontStyle: 'normal';
        // fontVariant: 'normal';
        // fontWeight: 'normal';

        // style.fill = style.fill || 'black';
        // style.align = style.align || 'left';
        // style.stroke = style.stroke || 'black';
        // style.strokeThickness = style.strokeThickness || 0;
        // style.wordWrap = style.wordWrap || false;
        // style.lineSpacing = style.lineSpacing || 0;
        // style.wordWrapWidth = style.wordWrapWidth !== undefined ? style.wordWrapWidth : 100;

        // style.dropShadow = style.dropShadow || false;
        // style.dropShadowAngle = style.dropShadowAngle !== undefined ? style.dropShadowAngle : Math.PI / 6;
        // style.dropShadowDistance = style.dropShadowDistance !== undefined ? style.dropShadowDistance : 4;
        // style.dropShadowColor = style.dropShadowColor || 'black';
        // style.dropShadowBlur = style.dropShadowBlur || 0;

        // this.style = style;
        this.dirty = true;
    },

    setText: function (text) {
        this.text = text.toString() || ' ';
        this.dirty = true;
    },

    getFontString: function () {
        const style = this.style;
        // build canvas api font setting from individual components. Convert a numeric this.fontSize to px
        let fontSizeString = style.fontSize;
        if (typeof fontSizeString === 'number') fontSizeString = fontSizeString + 'px';

        return (
            style.fontStyle +
            ' ' +
            style.fontVariant +
            ' ' +
            style.fontWeight +
            ' ' +
            fontSizeString +
            ' ' +
            style.fontFamily
        );
    },

    updateText: function () {
        var style = this.style;
        var context = this.context;

        const fontStyle = this.getFontString();

        context.font = fontStyle;

        var outputText = this.text;

        // word wrap
        // preserve original text
        if (style.wordWrap) outputText = this.wordWrap(this.text);

        //split text into lines
        var lines = outputText.split(/(?:\r\n|\r|\n)/);

        //calculate text width
        var lineWidths = [];
        var maxLineWidth = 0;
        var fontProperties = this.determineFontProperties(fontStyle);
        for (var i = 0; i < lines.length; i++) {
            var lineWidth = context.measureText(lines[i]).width;
            lineWidths[i] = lineWidth;
            maxLineWidth = Math.max(maxLineWidth, lineWidth);
        }

        var width = maxLineWidth + style.strokeThickness;
        if (style.dropShadow) width += style.dropShadowDistance;

        this.canvas.width = Math.ceil(width * this.resolution);

        //calculate text height
        var lineHeight = fontProperties.fontSize + style.strokeThickness + style.lineSpacing;

        var height = lineHeight * lines.length;
        if (style.dropShadow) height += style.dropShadowDistance;

        this.canvas.height = Math.ceil((height - style.lineSpacing) * this.resolution);


        // used for debugging..
        // context.fillStyle ="#FF0000"
        // context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        context.scale(this.resolution, this.resolution);

        if (navigator.isCocoonJS) context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        context.font = fontStyle;
        context.strokeStyle = style.stroke;
        context.lineWidth = style.strokeThickness;
        context.textBaseline = 'alphabetic';
        context.miterLimit = style.miterLimit;
        context.lineJoin = style.lineJoin;

        var linePositionX;
        var linePositionY;

        if (style.dropShadow) {
            context.fillStyle = style.dropShadowColor;
            context.shadowBlur = style.dropShadowBlur;

            if (style.dropShadowBlur > 0) {
                context.shadowColor = style.dropShadowColor;
            }

            var xShadowOffset = Math.sin(style.dropShadowAngle) * style.dropShadowDistance;
            var yShadowOffset = Math.cos(style.dropShadowAngle) * style.dropShadowDistance;

            for (i = 0; i < lines.length; i++) {
                linePositionX = style.strokeThickness / 2;
                linePositionY = style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent;

                if (style.align === 'right') {
                    linePositionX += maxLineWidth - lineWidths[i];
                } else if (style.align === 'center') {
                    linePositionX += (maxLineWidth - lineWidths[i]) / 2;
                }

                if (style.fill) {
                    context.fillText(lines[i], linePositionX + xShadowOffset, linePositionY + yShadowOffset);
                }

                //  if(dropShadow)
            }
        }

        context.shadowBlur = 0;

        //set canvas text styles
        context.fillStyle = style.fill;

        //draw lines line by line
        for (i = 0; i < lines.length; i++) {
            linePositionX = style.strokeThickness / 2;
            linePositionY = style.strokeThickness / 2 + i * lineHeight + fontProperties.ascent;

            if (style.align === 'right') {
                linePositionX += maxLineWidth - lineWidths[i];
            } else if (style.align === 'center') {
                linePositionX += (maxLineWidth - lineWidths[i]) / 2;
            }

            if (style.stroke && style.strokeThickness) {
                context.strokeText(lines[i], linePositionX, linePositionY);
            }

            if (style.fill) {
                context.fillText(lines[i], linePositionX, linePositionY);
            }

            //  if(dropShadow)
        }

        this.updateTexture();
    },

    updateTexture: function () {
        const baseTexture = this.texture.base;
        const canvas = this.canvas;

        const width = canvas.width / this.resolution;
        const height = canvas.height / this.resolution;

        // this.texture.width = this.canvas.width;
        // this.texture.height = this.canvas.height;
        this.texture.crop.width = this.texture.frame.width = width;
        this.texture.crop.height = this.texture.frame.height = height;

        this.texture.base.resolution = this.resolution;

        baseTexture.width = width;
        baseTexture.height = height;

        this._width = width;
        this._height = height;

        this.texture.base.needsUpdate = true

        // this.texture.base.dirty();
    },

    render: function (renderer) {
        if (this.dirty || this.resolution !== renderer.resolution) {
            // this.resolution = renderer.resolution;

            this.updateText();
            this.dirty = false;
        }

        Sprite.prototype.render.call(this, renderer);
    },

    determineFontProperties: function (fontStyle) {
        var properties = Text.fontPropertiesCache[fontStyle];

        if (!properties) {
            properties = {};

            var canvas = Text.fontPropertiesCanvas;
            var context = Text.fontPropertiesContext;

            context.font = fontStyle;

            var width = Math.ceil(context.measureText('|MÉq').width);
            var baseline = Math.ceil(context.measureText('|MÉq').width);
            var height = 2 * baseline;

            baseline = (baseline * 1.4) | 0;

            canvas.width = width;
            canvas.height = height;

            context.fillStyle = '#f00';
            context.fillRect(0, 0, width, height);

            context.font = fontStyle;

            context.textBaseline = 'alphabetic';
            context.fillStyle = '#000';
            context.fillText('|MÉq', 0, baseline);

            var imagedata = context.getImageData(0, 0, width, height).data;
            var pixels = imagedata.length;
            var line = width * 4;

            var i, j;

            var idx = 0;
            var stop = false;

            // ascent. scan from top to bottom until we find a non red pixel
            for (i = 0; i < baseline; i++) {
                for (j = 0; j < line; j += 4) {
                    if (imagedata[idx + j] !== 255) {
                        stop = true;
                        break;
                    }
                }
                if (!stop) {
                    idx += line;
                } else {
                    break;
                }
            }

            properties.ascent = baseline - i;

            idx = pixels - line;
            stop = false;

            // descent. scan from bottom to top until we find a non red pixel
            for (i = height; i > baseline; i--) {
                for (j = 0; j < line; j += 4) {
                    if (imagedata[idx + j] !== 255) {
                        stop = true;
                        break;
                    }
                }
                if (!stop) {
                    idx -= line;
                } else {
                    break;
                }
            }

            properties.descent = i - baseline;
            //TODO might need a tweak. kind of a temp fix!
            properties.descent += 6;
            properties.fontSize = properties.ascent + properties.descent;

            Text.fontPropertiesCache[fontStyle] = properties;
        }

        return properties;
    },

    wordWrap: function (text) {
        // Greedy wrapping algorithm that will wrap words as the line grows longer
        // than its horizontal bounds.
        var result = '';
        var lines = text.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var spaceLeft = this.style.wordWrapWidth;
            var words = lines[i].split(' ');
            for (var j = 0; j < words.length; j++) {
                var wordWidth = this.context.measureText(words[j]).width;
                var wordWidthWithSpace = wordWidth + this.context.measureText(' ').width;
                if (j === 0 || wordWidthWithSpace > spaceLeft) {
                    // Skip printing the newline if it's the first word of the line that is
                    // greater than the word wrap width.
                    if (j > 0) {
                        result += '\n';
                    }
                    result += words[j];
                    spaceLeft = this.style.wordWrapWidth - wordWidth;
                } else {
                    spaceLeft -= wordWidthWithSpace;
                    result += ' ' + words[j];
                }
            }

            if (i < lines.length - 1) {
                result += '\n';
            }
        }
        return result;
    },

    getBounds: function (matrix) {
        if (this.dirty) {
            this.updateText();
            this.dirty = false;
        }

        return Sprite.prototype.getBounds.call(this, matrix);
    },

    destroy: function () {
        // make sure to reset the the context and canvas.. dont want this hanging around in memory!
        this.context = null;
        this.canvas = null;

        this.texture.destroy();

        Sprite.prototype.destroy.call(this);
    }
});

Object.defineProperty(Text.prototype, 'width', {
    get: function () {
        if (this.dirty) {
            this.updateText();
            this.dirty = false;
        }

        return this.scale.x * this.texture.frame.width;
    },
    set: function (value) {
        this.scale.x = value / this.texture.frame.width;
        this._width = value;
    }
});

Object.defineProperty(Text.prototype, 'height', {
    get: function () {
        if (this.dirty) {
            this.updateText();
            this.dirty = false;
        }

        return this.scale.y * this.texture.frame.height;
    },
    set: function (value) {
        this.scale.y = value / this.texture.frame.height;
        this._height = value;
    }
});

Text.fontPropertiesCache = {};
Text.fontPropertiesCanvas = document.createElement('canvas');
Text.fontPropertiesContext = Text.fontPropertiesCanvas.getContext('2d');

export { Text };
