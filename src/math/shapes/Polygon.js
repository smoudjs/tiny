import { Vec2 } from '../Vec2';
import { SHAPES } from '../../constants';

var Polygon = function (points) {
    // this.area = 0;
    //if points isn't an array, use arguments as the array
    if (!(points instanceof Array)) points = Array.prototype.slice.call(arguments);

    //if this is a flat array of numbers, convert it to points
    if (typeof points[0] !== 'number') {
        var p = [];
        for (var i = 0, il = points.length; i < il; i++) {
            p.push(points[i].x, points[i].y);
        }

        points = p;
    }

    this.closed = true;

    /**
     * An array of the points of this polygon
     * @property points
     * @type Array(Point)|Array(Number)
     *
     */
    this.points = points;

    this.type = SHAPES.POLY;
};

Polygon.prototype = {
    toNumberArray: function (output) {
        if (typeof output === 'undefined') {
            output = [];
        }

        for (var i = 0; i < this.points.length; i++) {
            if (typeof this.points[i] === 'number') {
                output.push(this.points[i]);
                output.push(this.points[i + 1]);
                i++;
            } else {
                output.push(this.points[i].x);
                output.push(this.points[i].y);
            }
        }

        return output;
    },

    flatten: function () {
        this.points = this.toNumberArray();

        return this;
    },

    // clone: function (output) {
    //     var points = this._points.slice();

    //     if (typeof output === 'undefined' || output === null) {
    //         output = new Polygon(points);
    //     } else {
    //         output.setTo(points);
    //     }

    //     return output;
    // },

    // contains: function (x, y) {
    //     var length = this._points.length;
    //     var inside = false;

    //     for (var i = -1, j = length - 1; ++i < length; j = i) {
    //         var ix = this._points[i].x;
    //         var iy = this._points[i].y;

    //         var jx = this._points[j].x;
    //         var jy = this._points[j].y;

    //         if (((iy <= y && y < jy) || (jy <= y && y < iy)) && x < ((jx - ix) * (y - iy)) / (jy - iy) + ix) {
    //             inside = !inside;
    //         }
    //     }

    //     return inside;
    // },

    contains: function (x, y) {
        var inside = false;

        // use some raycasting to test hits
        // https://github.com/substack/point-in-polygon/blob/master/index.js
        var length = this.points.length / 2;

        for (var i = 0, j = length - 1; i < length; j = i++) {
            var xi = this.points[i * 2],
                yi = this.points[i * 2 + 1],
                xj = this.points[j * 2],
                yj = this.points[j * 2 + 1],
                intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

            if (intersect) inside = !inside;
        }

        return inside;
    }

    // setTo: function (points) {
    //     this.area = 0;
    //     this._points = [];

    //     if (arguments.length > 0) {
    //         //  If points isn't an array, use arguments as the array
    //         if (!Array.isArray(points)) {
    //             points = Array.prototype.slice.call(arguments);
    //         }

    //         var y0 = Number.MAX_VALUE;

    //         //  Allows for mixed-type arguments
    //         for (var i = 0, len = points.length; i < len; i++) {
    //             if (typeof points[i] === 'number') {
    //                 var p = new Vec2(points[i], points[i + 1]);
    //                 i++;
    //             } else {
    //                 var p = new Vec2(points[i].x, points[i].y);
    //             }

    //             this._points.push(p);

    //             //  Lowest boundary
    //             if (p.y < y0) {
    //                 y0 = p.y;
    //             }
    //         }

    //         this.calculateArea(y0);
    //     }

    //     return this;
    // },

    // calculateArea: function (y0) {
    //     var p1;
    //     var p2;
    //     var avgHeight;
    //     var width;

    //     for (var i = 0, len = this.points.length; i < len; i++) {
    //         p1 = this.points[i];

    //         if (i === len - 1) {
    //             p2 = this.points[0];
    //         } else {
    //             p2 = this.points[i + 1];
    //         }

    //         avgHeight = (p1.y - y0 + (p2.y - y0)) / 2;
    //         width = p1.x - p2.x;
    //         this.area += avgHeight * width;
    //     }

    //     return this.area;
    // }
};

Polygon.prototype.constructor = Polygon;

// Object.defineProperty(Polygon.prototype, 'points', {
//     get: function () {
//         return this._points;
//     },

//     set: function (points) {
//         if (points != null) {
//             this.setTo(points);
//         } else {
//             //  Clear the points
//             this.setTo();
//         }
//     }
// });

export { Polygon };
