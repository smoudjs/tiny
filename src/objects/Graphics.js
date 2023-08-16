import { Object2D } from './Object2D';
import { Sprite } from './Sprite';
import { CanvasBuffer } from '../utils/CanvasBuffer';
import { Texture } from '../textures/Texture';
import { Rectangle, EmptyRectangle } from '../math/shapes/Rectangle';
import { Circle } from '../math/shapes/Circle';
import { Polygon } from '../math/shapes/Polygon';
import { RoundedRectangle } from '../math/shapes/RoundedRectangle';
import { Vec2 } from '../math/Vec2';
import { Color } from '../math/Color';
import { BLEND_MODES, SHAPES } from '../constants';

var GraphicsData = function (lineWidth, lineColor, fillColor, fill, shape) {
    this.lineWidth = lineWidth;
    this.lineColor = lineColor;
    // this.lineAlpha = lineAlpha;
    this._lineTint = lineColor;
    this.fillColor = fillColor;
    // this.fillAlpha = fillAlpha;
    this._fillTint = fillColor;
    this.fill = fill;
    this.shape = shape;
    this.type = shape.type;
};

GraphicsData.prototype.constructor = GraphicsData;

// GraphicsData.prototype.clone = function () {
//     return new GraphicsData(
//         this.lineWidth,
//         this.lineColor,
//         this.lineAlpha,
//         this.fillColor,
//         this.fillAlpha,
//         this.fill,
//         this.shape
//     );
// };

var Graphics = function () {
    Object2D.call(this);

    this.renderable = true;

    /**
     * The alpha value used when filling the Graphics object.
     *
     * @property fillAlpha
     * @type Number
     */
    // this.fillAlpha = 1;

    /**
     * The width (thickness) of any lines drawn.
     *
     * @property lineWidth
     * @type Number
     */
    this.lineWidth = 0;

    /**
     * The color of any lines drawn.
     *
     * @property lineColor
     * @type String
     * @default 0
     */
    this.lineColor = new Color();

    /**
     * Graphics data
     *
     * @property graphicsData
     * @type Array
     * @private
     */
    this.graphicsData = [];

    /**
     * The tint applied to the graphic shape. This is a hex value. Apply a value of 0xFFFFFF to reset the tint.
     *
     * @property tint
     * @type Number
     * @default 0xFFFFFF
     */
    this.tint = new Color();

    /**
     * The blend mode to be applied to the graphic shape. Apply a value of PIXI.blendModes.NORMAL to reset the blend mode.
     *
     * @property blendMode
     * @type Number
     * @default PIXI.blendModes.NORMAL;
     */
    this.blendMode = BLEND_MODES.NORMAL;

    /**
     * Current path
     *
     * @property currentPath
     * @type Object
     * @private
     */
    this.currentPath = null;

    /**
     * Array containing some WebGL-related properties used by the WebGL renderer.
     *
     * @property _webGL
     * @type Array
     * @private
     */
    this._webGL = [];

    /**
     * Whether this shape is being used as a mask.
     *
     * @property isMask
     * @type Boolean
     */
    this.isMask = false;

    /**
     * The bounds' padding used for bounds calculation.
     *
     * @property boundsPadding
     * @type Number
     */
    this.boundsPadding = 0;

    this._localBounds = new Rectangle(0, 0, 1, 1);

    /**
     * Used to detect if the graphics object has changed. If this is set to true then the graphics object will be recalculated.
     *
     * @property dirty
     * @type Boolean
     * @private
     */
    this.dirty = true;

    /**
     * Used to detect if the webgl graphics object has changed. If this is set to true then the graphics object will be recalculated.
     *
     * @property webGLDirty
     * @type Boolean
     * @private
     */
    this.webGLDirty = false;

    /**
     * Used to detect if the cached sprite object needs to be updated.
     *
     * @property cachedSpriteDirty
     * @type Boolean
     * @private
     */
    this.cachedSpriteDirty = false;
};

// constructor
Graphics.prototype = Object.create(Object2D.prototype);
Graphics.prototype.constructor = Graphics;

/**
 * When cacheAsBitmap is set to true the graphics object will be rendered as if it was a sprite.
 * This is useful if your graphics element does not change often, as it will speed up the rendering of the object in exchange for taking up texture memory.
 * It is also useful if you need the graphics object to be anti-aliased, because it will be rendered using canvas.
 * This is not recommended if you are constantly redrawing the graphics element.
 *
 * @property cacheAsBitmap
 * @type Boolean
 * @default false
 * @private
 */
Object.defineProperty(Graphics.prototype, 'cacheAsBitmap', {
    get: function () {
        return this._cacheAsBitmap;
    },
    set: function (value) {
        this._cacheAsBitmap = value;

        if (this._cacheAsBitmap) {
            this._generateCachedSprite();
        } else {
            this.destroyCachedSprite();
            this.dirty = true;
        }
    }
});

Object.assign(Graphics.prototype, {
    /**
     * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method.
     *
     * @method lineStyle
     * @param lineWidth {Number} width of the line to draw, will update the objects stored style
     * @param color {Number} color of the line to draw, will update the objects stored style
     * @param alpha {Number} alpha of the line to draw, will update the objects stored style
     * @return {Graphics}
     */
    lineStyle: function (lineWidth, color, alpha) {
        this.lineWidth = lineWidth || 0;
        this.lineColor = new Color(color || 0);
        if (alpha !== undefined) this.lineColor.a = alpha;

        if (this.currentPath) {
            if (this.currentPath.shape.points.length) {
                // halfway through a line? start a new one!
                this.drawShape(new Polygon(this.currentPath.shape.points.slice(-2)));
                return this;
            }

            // otherwise its empty so lets just set the line properties
            this.currentPath.lineWidth = this.lineWidth;
            this.currentPath.lineColor = this.lineColor;
            // this.currentPath.lineAlpha = this.lineAlpha;
        }

        return this;
    },

    /**
     * Moves the current drawing position to x, y.
     *
     * @method moveTo
     * @param x {Number} the X coordinate to move to
     * @param y {Number} the Y coordinate to move to
     * @return {Graphics}
     */
    moveTo: function (x, y) {
        this.drawShape(new Polygon([x, y]));

        return this;
    },

    /**
     * Draws a line using the current line style from the current drawing position to (x, y);
     * The current drawing position is then set to (x, y).
     *
     * @method lineTo
     * @param x {Number} the X coordinate to draw to
     * @param y {Number} the Y coordinate to draw to
     * @return {Graphics}
     */
    lineTo: function (x, y) {
        if (!this.currentPath) {
            this.moveTo(0, 0);
        }
        this.currentPath.shape.points.push(x, y);
        this.dirty = true;

        return this;
    },

    /**
     * Calculate the points for a quadratic bezier curve and then draws it.
     * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
     *
     * @method quadraticCurveTo
     * @param cpX {Number} Control point x
     * @param cpY {Number} Control point y
     * @param toX {Number} Destination point x
     * @param toY {Number} Destination point y
     * @return {Graphics}
     */
    quadraticCurveTo: function (cpX, cpY, toX, toY) {
        if (this.currentPath) {
            if (this.currentPath.shape.points.length === 0) this.currentPath.shape.points = [0, 0];
        } else {
            this.moveTo(0, 0);
        }

        var xa,
            ya,
            n = 20,
            points = this.currentPath.shape.points;
        if (points.length === 0) this.moveTo(0, 0);

        var fromX = points[points.length - 2];
        var fromY = points[points.length - 1];

        var j = 0;
        for (var i = 1; i <= n; i++) {
            j = i / n;

            xa = fromX + (cpX - fromX) * j;
            ya = fromY + (cpY - fromY) * j;

            points.push(xa + (cpX + (toX - cpX) * j - xa) * j, ya + (cpY + (toY - cpY) * j - ya) * j);
        }

        this.dirty = true;

        return this;
    },

    /**
     * Calculate the points for a bezier curve and then draws it.
     *
     * @method bezierCurveTo
     * @param cpX {Number} Control point x
     * @param cpY {Number} Control point y
     * @param cpX2 {Number} Second Control point x
     * @param cpY2 {Number} Second Control point y
     * @param toX {Number} Destination point x
     * @param toY {Number} Destination point y
     * @return {Graphics}
     */
    bezierCurveTo: function (cpX, cpY, cpX2, cpY2, toX, toY) {
        if (this.currentPath) {
            if (this.currentPath.shape.points.length === 0) this.currentPath.shape.points = [0, 0];
        } else {
            this.moveTo(0, 0);
        }

        var n = 20,
            dt,
            dt2,
            dt3,
            t2,
            t3,
            points = this.currentPath.shape.points;

        var fromX = points[points.length - 2];
        var fromY = points[points.length - 1];

        var j = 0;

        for (var i = 1; i <= n; i++) {
            j = i / n;

            dt = 1 - j;
            dt2 = dt * dt;
            dt3 = dt2 * dt;

            t2 = j * j;
            t3 = t2 * j;

            points.push(
                dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX,
                dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY
            );
        }

        this.dirty = true;

        return this;
    },

    /*
     * The arcTo() method creates an arc/curve between two tangents on the canvas.
     *
     * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
     *
     * @method arcTo
     * @param x1 {Number} The x-coordinate of the beginning of the arc
     * @param y1 {Number} The y-coordinate of the beginning of the arc
     * @param x2 {Number} The x-coordinate of the end of the arc
     * @param y2 {Number} The y-coordinate of the end of the arc
     * @param radius {Number} The radius of the arc
     * @return {Graphics}
     */
    arcTo: function (x1, y1, x2, y2, radius) {
        if (this.currentPath) {
            if (this.currentPath.shape.points.length === 0) {
                this.currentPath.shape.points.push(x1, y1);
            }
        } else {
            this.moveTo(x1, y1);
        }

        var points = this.currentPath.shape.points;
        var fromX = points[points.length - 2];
        var fromY = points[points.length - 1];
        var a1 = fromY - y1;
        var b1 = fromX - x1;
        var a2 = y2 - y1;
        var b2 = x2 - x1;
        var mm = Math.abs(a1 * b2 - b1 * a2);

        if (mm < 1.0e-8 || radius === 0) {
            if (points[points.length - 2] !== x1 || points[points.length - 1] !== y1) {
                //console.log(">>")
                points.push(x1, y1);
            }
        } else {
            var dd = a1 * a1 + b1 * b1;
            var cc = a2 * a2 + b2 * b2;
            var tt = a1 * a2 + b1 * b2;
            var k1 = (radius * Math.sqrt(dd)) / mm;
            var k2 = (radius * Math.sqrt(cc)) / mm;
            var j1 = (k1 * tt) / dd;
            var j2 = (k2 * tt) / cc;
            var cx = k1 * b2 + k2 * b1;
            var cy = k1 * a2 + k2 * a1;
            var px = b1 * (k2 + j1);
            var py = a1 * (k2 + j1);
            var qx = b2 * (k1 + j2);
            var qy = a2 * (k1 + j2);
            var startAngle = Math.atan2(py - cy, px - cx);
            var endAngle = Math.atan2(qy - cy, qx - cx);

            this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
        }

        this.dirty = true;

        return this;
    },

    /**
     * The arc method creates an arc/curve (used to create circles, or parts of circles).
     *
     * @method arc
     * @param cx {Number} The x-coordinate of the center of the circle
     * @param cy {Number} The y-coordinate of the center of the circle
     * @param radius {Number} The radius of the circle
     * @param startAngle {Number} The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
     * @param endAngle {Number} The ending angle, in radians
     * @param anticlockwise {Boolean} Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.
     * @return {Graphics}
     */
    arc: function (cx, cy, radius, startAngle, endAngle, anticlockwise) {
        anticlockwise = anticlockwise || false;

        if (startAngle === endAngle) {
            return this;
        }

        if (!anticlockwise && endAngle <= startAngle) {
            endAngle += Math.PI * 2;
        } else if (anticlockwise && startAngle <= endAngle) {
            startAngle += Math.PI * 2;
        }

        var sweep = anticlockwise ? (startAngle - endAngle) * -1 : endAngle - startAngle;
        var segs = (Math.abs(sweep) / (Math.PI * 2)) * 40;

        if (sweep === 0) {
            return this;
        }

        var startX = cx + Math.cos(startAngle) * radius;
        var startY = cy + Math.sin(startAngle) * radius;

        if (anticlockwise && this.filling) {
            this.moveTo(cx, cy);
        } else {
            this.moveTo(startX, startY);
        }

        //  currentPath will always exist after calling a moveTo
        var points = this.currentPath.shape.points;

        var theta = sweep / (segs * 2);
        var theta2 = theta * 2;

        var cTheta = Math.cos(theta);
        var sTheta = Math.sin(theta);

        var segMinus = segs - 1;

        var remainder = (segMinus % 1) / segMinus;

        for (var i = 0; i <= segMinus; i++) {
            var real = i + remainder * i;

            var angle = theta + startAngle + theta2 * real;

            var c = Math.cos(angle);
            var s = -Math.sin(angle);

            points.push((cTheta * c + sTheta * s) * radius + cx, (cTheta * -s + sTheta * c) * radius + cy);
        }

        this.dirty = true;

        return this;
    },

    /**
     * Specifies a simple one-color fill that subsequent calls to other Graphics methods
     * (such as lineTo() or drawCircle()) use when drawing.
     *
     * @method beginFill
     * @param color {Number} the color of the fill
     * @param alpha {Number} the alpha of the fill
     * @return {Graphics}
     */
    beginFill: function (color, alpha) {
        this.filling = true;
        this.fillColor = new Color(color || 0);
        if (alpha !== undefined) this.fillColor.a = alpha;

        if (this.currentPath) {
            if (this.currentPath.shape.points.length <= 2) {
                this.currentPath.fill = this.filling;
                this.currentPath.fillColor = this.fillColor;
                // this.currentPath.fillAlpha = this.fillAlpha;
            }
        }
        return this;
    },

    /**
     * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
     *
     * @method endFill
     * @return {Graphics}
     */
    endFill: function () {
        this.filling = false;
        this.fillColor = null;
        // this.fillAlpha = 1;

        return this;
    },

    /**
     * Draws a rectangle.
     *
     * @method drawRect
     *
     * @param x {Number} The X coord of the top-left of the rectangle
     * @param y {Number} The Y coord of the top-left of the rectangle
     * @param width {Number} The width of the rectangle
     * @param height {Number} The height of the rectangle
     * @return {Graphics}
     */
    drawRect: function (x, y, width, height) {
        this.drawShape(new Rectangle(x, y, width, height));

        return this;
    },

    /**
     * Draws a rounded rectangle.
     *
     * @method drawRoundedRect
     *
     * @param x {Number} The X coord of the top-left of the rectangle
     * @param y {Number} The Y coord of the top-left of the rectangle
     * @param width {Number} The width of the rectangle
     * @param height {Number} The height of the rectangle
     * @param radius {Number} Radius of the rectangle corners
     * @return {Graphics}
     */
    drawRoundedRect: function (x, y, width, height, radius) {
        this.drawShape(new RoundedRectangle(x, y, width, height, radius));

        return this;
    },

    /**
     * Draws a circle.
     *
     * @method drawCircle
     * @param x {Number} The X coordinate of the center of the circle
     * @param y {Number} The Y coordinate of the center of the circle
     * @param radius {Number} The radius of the circle
     * @return {Graphics}
     */
    drawCircle: function (x, y, radius) {
        this.drawShape(new Circle(x, y, radius));

        return this;
    },

    /**
     * Draws a polygon using the given path.
     *
     * @method drawPolygon
     * @param path {Array} The path data used to construct the polygon.
     * @return {Graphics}
     */
    drawPolygon: function (path) {
        if (!(path instanceof Array)) path = Array.prototype.slice.call(arguments);
        this.drawShape(new Polygon(path));
        return this;
    },

    /**
     * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
     *
     * @method clear
     * @return {Graphics}
     */
    clear: function () {
        this.lineWidth = 0;
        this.filling = false;

        this.dirty = true;
        this.clearDirty = true;
        this.graphicsData = [];

        return this;
    },

    /**
     * Renders the object using the WebGL renderer
     *
     * @method render
     * @param renderer {RenderSession}
     * @private
     */
    render: function (renderer) {
        // if the sprite is not visible or the alpha is 0 then no need to render this element
        if (this.visible === false || this.alpha === 0 || this.isMask === true) return;

        if (this._cacheAsBitmap) {
            if (this.dirty || this.cachedSpriteDirty) {
                this._generateCachedSprite();

                // we will also need to update the texture on the gpu too!
                this.updateCachedSpriteTexture();

                this.cachedSpriteDirty = false;
                this.dirty = false;
            }

            this._cachedSprite.worldAlpha = this.worldAlpha;
            Sprite.prototype.render.call(this._cachedSprite, renderer);

            return;
        } else {
            renderer.spriteBatch.stop();
            renderer.blendModeManager.setBlendMode(this.blendMode);

            if (this._mask) renderer.maskManager.pushMask(this._mask, renderer);
            if (this._filters) renderer.filterManager.pushFilter(this._filterBlock);

            // check blend mode
            if (this.blendMode !== renderer.spriteBatch.currentBlendMode) {
                renderer.spriteBatch.currentBlendMode = this.blendMode;
                var blendModeWebGL = renderer.blendModes[renderer.spriteBatch.currentBlendMode];
                renderer.spriteBatch.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
            }

            // check if the webgl graphic needs to be updated
            if (this.webGLDirty) {
                this.dirty = true;
                this.webGLDirty = false;
            }

            Tiny.WebGLGraphics.renderGraphics(this, renderer);

            // only render if it has children!
            if (this.children.length) {
                renderer.spriteBatch.start();

                // simple render children!
                for (var i = 0, j = this.children.length; i < j; i++) {
                    this.children[i].render(renderer);
                }

                renderer.spriteBatch.stop();
            }

            if (this._filters) renderer.filterManager.popFilter();
            if (this._mask) renderer.maskManager.popMask(this.mask, renderer);

            renderer.drawCount++;

            renderer.spriteBatch.start();
        }
    },

    /**
     * Retrieves the bounds of the graphic shape as a rectangle object
     *
     * @method getBounds
     * @return {Rectangle} the rectangular bounding area
     */
    getBounds: function (matrix) {
        // return an empty object if the item is a mask!
        if (this.isMask) return EmptyRectangle;

        if (this.dirty) {
            this.updateLocalBounds();
            this.webGLDirty = true;
            this.cachedSpriteDirty = true;
            this.dirty = false;
        }

        var bounds = this._localBounds;

        var w0 = bounds.x;
        var w1 = bounds.width + bounds.x;

        var h0 = bounds.y;
        var h1 = bounds.height + bounds.y;

        var worldTransform = matrix || this.worldTransform;

        var a = worldTransform.a;
        var b = worldTransform.b;
        var c = worldTransform.c;
        var d = worldTransform.d;
        var tx = worldTransform.tx;
        var ty = worldTransform.ty;

        var x1 = a * w1 + c * h1 + tx;
        var y1 = d * h1 + b * w1 + ty;

        var x2 = a * w0 + c * h1 + tx;
        var y2 = d * h1 + b * w0 + ty;

        var x3 = a * w0 + c * h0 + tx;
        var y3 = d * h0 + b * w0 + ty;

        var x4 = a * w1 + c * h0 + tx;
        var y4 = d * h0 + b * w1 + ty;

        var maxX = x1;
        var maxY = y1;

        var minX = x1;
        var minY = y1;

        minX = x2 < minX ? x2 : minX;
        minX = x3 < minX ? x3 : minX;
        minX = x4 < minX ? x4 : minX;

        minY = y2 < minY ? y2 : minY;
        minY = y3 < minY ? y3 : minY;
        minY = y4 < minY ? y4 : minY;

        maxX = x2 > maxX ? x2 : maxX;
        maxX = x3 > maxX ? x3 : maxX;
        maxX = x4 > maxX ? x4 : maxX;

        maxY = y2 > maxY ? y2 : maxY;
        maxY = y3 > maxY ? y3 : maxY;
        maxY = y4 > maxY ? y4 : maxY;

        this._bounds.x = minX;
        this._bounds.width = maxX - minX;

        this._bounds.y = minY;
        this._bounds.height = maxY - minY;

        return this._bounds;
    },

    /**
     * Update the bounds of the object
     *
     * @method updateLocalBounds
     */
    updateLocalBounds: function () {
        var minX = Infinity;
        var maxX = -Infinity;

        var minY = Infinity;
        var maxY = -Infinity;

        if (this.graphicsData.length) {
            var shape, points, x, y, w, h;

            for (var i = 0; i < this.graphicsData.length; i++) {
                var data = this.graphicsData[i];
                var type = data.type;
                var lineWidth = data.lineWidth;
                shape = data.shape;

                if (type === SHAPES.RECT || type === SHAPES.RREC || type === SHAPES.ELIP) {
                    x = shape.x - lineWidth / 2;
                    y = shape.y - lineWidth / 2;
                    w = shape.width + lineWidth;
                    h = shape.height + lineWidth;

                    minX = x < minX ? x : minX;
                    maxX = x + w > maxX ? x + w : maxX;

                    minY = y < minY ? y : minY;
                    maxY = y + h > maxY ? y + h : maxY;
                } else if (type === SHAPES.CIRC) {
                    x = shape.x;
                    y = shape.y;
                    w = shape.radius + lineWidth / 2;
                    h = shape.radius + lineWidth / 2;

                    minX = x - w < minX ? x - w : minX;
                    maxX = x + w > maxX ? x + w : maxX;

                    minY = y - h < minY ? y - h : minY;
                    maxY = y + h > maxY ? y + h : maxY;
                }
                // else if(type === SHAPES.ELIP)
                // {
                //     x = shape.x;
                //     y = shape.y;
                //     w = shape.width + lineWidth/2;
                //     h = shape.height + lineWidth/2;

                //     minX = x - w < minX ? x - w : minX;
                //     maxX = x + w > maxX ? x + w : maxX;

                //     minY = y - h < minY ? y - h : minY;
                //     maxY = y + h > maxY ? y + h : maxY;
                // }
                else {
                    // POLY
                    points = shape.points;

                    for (var j = 0; j < points.length; j += 2) {
                        x = points[j];
                        y = points[j + 1];
                        minX = x - lineWidth < minX ? x - lineWidth : minX;
                        maxX = x + lineWidth > maxX ? x + lineWidth : maxX;

                        minY = y - lineWidth < minY ? y - lineWidth : minY;
                        maxY = y + lineWidth > maxY ? y + lineWidth : maxY;
                    }
                }
            }
        } else {
            minX = 0;
            maxX = 0;
            minY = 0;
            maxY = 0;
        }

        var padding = this.boundsPadding;

        this._localBounds.x = minX - padding;
        this._localBounds.width = maxX - minX + padding * 2;

        this._localBounds.y = minY - padding;
        this._localBounds.height = maxY - minY + padding * 2;
    },

    /**
     * Draws the given shape to this Graphics object. Can be any of Circle, Rectangle, Ellipse, Line or Polygon.
     *
     * @method drawShape
     * @param {Circle|Rectangle|Ellipse|Line|Polygon} shape The Shape object to draw.
     * @return {GraphicsData} The generated GraphicsData object.
     */
    drawShape: function (shape) {
        if (this.currentPath) {
            // check current path!
            if (this.currentPath.shape.points.length <= 2) this.graphicsData.pop();
        }

        this.currentPath = null;

        if (shape.type === SHAPES.POLY) {
            shape.flatten();
        }

        var data = new GraphicsData(this.lineWidth, this.lineColor, this.fillColor, this.filling, shape);

        this.graphicsData.push(data);

        if (data.type === SHAPES.POLY) {
            data.shape.closed = this.filling;
            this.currentPath = data;
        }

        this.dirty = true;

        return data;
    }
});

export { Graphics, GraphicsData };
