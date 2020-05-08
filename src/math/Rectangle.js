
Tiny.Rectangle = function (x, y, width, height) {

    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.type = Tiny.Primitives.RECT
};

Tiny.Rectangle.prototype = {

    // offset: function (dx, dy) {

    //     this.x += dx;
    //     this.y += dy;

    //     return this;

    // },

    // offsetPoint: function (point) {

    //     return this.offset(point.x, point.y);

    // },

    setTo: function (x, y, width, height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;

    },

    // scale: function (x, y) {

    //     if (typeof y === 'undefined') { y = x; }

    //     this.width *= x;
    //     this.height *= y;

    //     return this;

    // },

    // centerOn: function (x, y) {

    //     this.centerX = x;
    //     this.centerY = y;

    //     return this;

    // },

    // floor: function () {

    //     this.x = Math.floor(this.x);
    //     this.y = Math.floor(this.y);

    // },

    // floorAll: function () {

    //     this.x = Math.floor(this.x);
    //     this.y = Math.floor(this.y);
    //     this.width = Math.floor(this.width);
    //     this.height = Math.floor(this.height);

    // },

    // copyFrom: function (source) {

    //     return this.setTo(source.x, source.y, source.width, source.height);

    // },

    // copyTo: function (dest) {

    //     dest.x = this.x;
    //     dest.y = this.y;
    //     dest.width = this.width;
    //     dest.height = this.height;

    //     return dest;

    // },

    // inflate: function (dx, dy) {

    //     return Tiny.Rectangle.inflate(this, dx, dy);

    // },

    // size: function (output) {

    //     return Tiny.Rectangle.size(this, output);

    // },

    // clone: function (output) {

    //     return Tiny.Rectangle.clone(this, output);

    // },

    contains: function (x, y) {

        return Tiny.Rectangle.contains(this, x, y);

    },

    // containsRect: function (b) {

    //     return Tiny.Rectangle.containsRect(b, this);

    // },

    // equals: function (b) {

    //     return Tiny.Rectangle.equals(this, b);

    // },

    // intersection: function (b, out) {

    //     return Tiny.Rectangle.intersection(this, b, out);

    // },


    intersects: function (b) {

        return Tiny.Rectangle.intersects(this, b);

    },

    // intersectsRaw: function (left, right, top, bottom, tolerance) {

    //     return Tiny.Rectangle.intersectsRaw(this, left, right, top, bottom, tolerance);

    // },

    // union: function (b, out) {

    //     return Tiny.Rectangle.union(this, b, out);

    // }

};

// Object.defineProperty(Tiny.Rectangle.prototype, "halfWidth", {

//     get: function () {
//         return Math.round(this.width / 2);
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "halfHeight", {

//     get: function () {
//         return Math.round(this.height / 2);
//     }

// });

Object.defineProperty(Tiny.Rectangle.prototype, "bottom", {

    get: function () {
        return this.y + this.height;
    },

    set: function (value) {
        if (value <= this.y) {
            this.height = 0;
        } else {
            this.height = value - this.y;
        }
    }

});

// Object.defineProperty(Tiny.Rectangle.prototype, "bottomRight", {

//     get: function () {
//         return new Tiny.Point(this.right, this.bottom);
//     },

//     set: function (value) {
//         this.right = value.x;
//         this.bottom = value.y;
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "left", {

//     get: function () {
//         return this.x;
//     },

//     set: function (value) {
//         if (value >= this.right) {
//             this.width = 0;
//         } else {
//             this.width = this.right - value;
//         }
//         this.x = value;
//     }

// });

Object.defineProperty(Tiny.Rectangle.prototype, "right", {

    get: function () {
        return this.x + this.width;
    },

    set: function (value) {
        if (value <= this.x) {
            this.width = 0;
        } else {
            this.width = value - this.x;
        }
    }

});

Object.defineProperty(Tiny.Rectangle.prototype, "volume", {

    get: function () {
        return this.width * this.height;
    }

});

// Object.defineProperty(Tiny.Rectangle.prototype, "perimeter", {

//     get: function () {
//         return (this.width * 2) + (this.height * 2);
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "centerX", {

//     get: function () {
//         return this.x + this.halfWidth;
//     },

//     set: function (value) {
//         this.x = value - this.halfWidth;
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "centerY", {

//     get: function () {
//         return this.y + this.halfHeight;
//     },

//     set: function (value) {
//         this.y = value - this.halfHeight;
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "randomX", {

//     get: function () {

//         return this.x + (Math.random() * this.width);

//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "randomY", {

//     get: function () {

//         return this.y + (Math.random() * this.height);

//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "top", {

//     get: function () {
//         return this.y;
//     },

//     set: function (value) {
//         if (value >= this.bottom) {
//             this.height = 0;
//             this.y = value;
//         } else {
//             this.height = (this.bottom - value);
//         }
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "topLeft", {

//     get: function () {
//         return new Tiny.Point(this.x, this.y);
//     },

//     set: function (value) {
//         this.x = value.x;
//         this.y = value.y;
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "topRight", {

//     get: function () {
//         return new Tiny.Point(this.x + this.width, this.y);
//     },

//     set: function (value) {
//         this.right = value.x;
//         this.y = value.y;
//     }

// });

// Object.defineProperty(Tiny.Rectangle.prototype, "empty", {

//     get: function () {
//         return (!this.width || !this.height);
//     },

//     set: function (value) {

//         if (value === true)
//         {
//             this.setTo(0, 0, 0, 0);
//         }

//     }

// });

Tiny.Rectangle.prototype.constructor = Tiny.Rectangle;

// Tiny.Rectangle.inflate = function (a, dx, dy) {

//     a.x -= dx;
//     a.width += 2 * dx;
//     a.y -= dy;
//     a.height += 2 * dy;

//     return a;

// };

// Tiny.Rectangle.inflatePoint = function (a, point) {

//     return Tiny.Rectangle.inflate(a, point.x, point.y);

// };

// Tiny.Rectangle.size = function (a, output) {

//     if (typeof output === "undefined" || output === null)
//     {
//         output = new Tiny.Point(a.width, a.height);
//     }
//     else
//     {
//         output.setTo(a.width, a.height);
//     }

//     return output;

// };

// Tiny.Rectangle.clone = function (a, output) {

//     if (typeof output === "undefined" || output === null)
//     {
//         output = new Tiny.Rectangle(a.x, a.y, a.width, a.height);
//     }
//     else
//     {
//         output.setTo(a.x, a.y, a.width, a.height);
//     }

//     return output;

// };

Tiny.Rectangle.contains = function (a, x, y) {

    if (a.width <= 0 || a.height <= 0)
    {
        return false;
    }

    return (x >= a.x && x < a.right && y >= a.y && y < a.bottom);

};

// Tiny.Rectangle.containsRaw = function (rx, ry, rw, rh, x, y) {

//     return (x >= rx && x < (rx + rw) && y >= ry && y < (ry + rh));

// };

Tiny.Rectangle.containsPoint = function (a, point) {

    return Tiny.Rectangle.contains(a, point.x, point.y);

};

Tiny.Rectangle.containsRect = function (a, b) {

    //  If the given rect has a larger volume than this one then it can never contain it
    if (a.volume > b.volume)
    {
        return false;
    }

    return (a.x >= b.x && a.y >= b.y && a.right < b.right && a.bottom < b.bottom);

};

// Tiny.Rectangle.equals = function (a, b) {

//     return (a.x == b.x && a.y == b.y && a.width == b.width && a.height == b.height);

// };

// Tiny.Rectangle.sameDimensions = function (a, b) {

//     return (a.width === b.width && a.height === b.height);

// };

// Tiny.Rectangle.intersection = function (a, b, output) {

//     if (typeof output === "undefined")
//     {
//         output = new Tiny.Rectangle();
//     }

//     if (Tiny.Rectangle.intersects(a, b))
//     {
//         output.x = Math.max(a.x, b.x);
//         output.y = Math.max(a.y, b.y);
//         output.width = Math.min(a.right, b.right) - output.x;
//         output.height = Math.min(a.bottom, b.bottom) - output.y;
//     }

//     return output;

// };

Tiny.Rectangle.intersects = function (a, b) {

    if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0)
    {
        return false;
    }

    return !(a.right < b.x || a.bottom < b.y || a.x > b.right || a.y > b.bottom);

};

// Tiny.Rectangle.intersectsRaw = function (a, left, right, top, bottom, tolerance) {

//     if (typeof tolerance === "undefined") { tolerance = 0; }

//     return !(left > a.right + tolerance || right < a.left - tolerance || top > a.bottom + tolerance || bottom < a.top - tolerance);

// };

// Tiny.Rectangle.union = function (a, b, output) {

//     if (typeof output === "undefined")
//     {
//         output = new Tiny.Rectangle();
//     }

//     return output.setTo(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.max(a.right, b.right) - Math.min(a.left, b.left), Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top));

// };

// Tiny.Rectangle.aabb = function(points, out) {

//     if (typeof out === "undefined") {
//         out = new Tiny.Rectangle();
//     }

//     var xMax = Number.MIN_VALUE,
//         xMin = Number.MAX_VALUE,
//         yMax = Number.MIN_VALUE,
//         yMin = Number.MAX_VALUE;

//     points.forEach(function(point) {
//         if (point.x > xMax) {
//             xMax = point.x;
//         }
//         if (point.x < xMin) {
//             xMin = point.x;
//         }

//         if (point.y > yMax) {
//             yMax = point.y;
//         }
//         if (point.y < yMin) {
//             yMin = point.y;
//         }
//     });

//     out.setTo(xMin, yMin, xMax - xMin, yMax - yMin);

//     return out;
// };

Tiny.EmptyRectangle = new Tiny.Rectangle(0, 0, 0, 0);