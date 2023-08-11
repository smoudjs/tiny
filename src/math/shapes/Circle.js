import { Rectangle } from './Rectangle';

var Circle = function (x, y, diameter) {
    x = x || 0;
    y = y || 0;
    diameter = diameter || 0;

    this.x = x;

    this.y = y;

    this._diameter = diameter;

    this._radius = 0;

    if (diameter > 0) {
        this._radius = diameter * 0.5;
    }

    this.type = Tiny.Primitives.CIRC;
};

Circle.prototype = {
    getBounds: function () {
        return new Rectangle(this.x - this.radius, this.y - this.radius, this.diameter, this.diameter);
    },

    setTo: function (x, y, diameter) {
        this.x = x;
        this.y = y;
        this._diameter = diameter;
        this._radius = diameter * 0.5;

        return this;
    },

    copyFrom: function (source) {
        return this.setTo(source.x, source.y, source.diameter);
    },

    copyTo: function (dest) {
        dest.x = this.x;
        dest.y = this.y;
        dest.diameter = this._diameter;

        return dest;
    },

    distance: function (dest, round) {
        var distance = Tiny.Math.distance(this.x, this.y, dest.x, dest.y);
        return round ? Math.round(distance) : distance;
    },

    clone: function (output) {
        if (typeof output === 'undefined' || output === null) {
            output = new Circle(this.x, this.y, this.diameter);
        } else {
            output.setTo(this.x, this.y, this.diameter);
        }

        return output;
    },

    contains: function (x, y) {
        return Circle.contains(this, x, y);
    },

    offset: function (dx, dy) {
        this.x += dx;
        this.y += dy;

        return this;
    },

    offsetPoint: function (point) {
        return this.offset(point.x, point.y);
    }
};

Circle.prototype.constructor = Circle;

Object.defineProperty(Circle.prototype, 'diameter', {
    get: function () {
        return this._diameter;
    },

    set: function (value) {
        if (value > 0) {
            this._diameter = value;
            this._radius = value * 0.5;
        }
    }
});

Object.defineProperty(Circle.prototype, 'radius', {
    get: function () {
        return this._radius;
    },

    set: function (value) {
        if (value > 0) {
            this._radius = value;
            this._diameter = value * 2;
        }
    }
});

Object.defineProperty(Circle.prototype, 'left', {
    get: function () {
        return this.x - this._radius;
    },

    set: function (value) {
        if (value > this.x) {
            this._radius = 0;
            this._diameter = 0;
        } else {
            this.radius = this.x - value;
        }
    }
});

Object.defineProperty(Circle.prototype, 'right', {
    get: function () {
        return this.x + this._radius;
    },

    set: function (value) {
        if (value < this.x) {
            this._radius = 0;
            this._diameter = 0;
        } else {
            this.radius = value - this.x;
        }
    }
});

Object.defineProperty(Circle.prototype, 'top', {
    get: function () {
        return this.y - this._radius;
    },

    set: function (value) {
        if (value > this.y) {
            this._radius = 0;
            this._diameter = 0;
        } else {
            this.radius = this.y - value;
        }
    }
});

Object.defineProperty(Circle.prototype, 'bottom', {
    get: function () {
        return this.y + this._radius;
    },

    set: function (value) {
        if (value < this.y) {
            this._radius = 0;
            this._diameter = 0;
        } else {
            this.radius = value - this.y;
        }
    }
});

Object.defineProperty(Circle.prototype, 'area', {
    get: function () {
        if (this._radius > 0) {
            return Math.PI * this._radius * this._radius;
        } else {
            return 0;
        }
    }
});

Object.defineProperty(Circle.prototype, 'empty', {
    get: function () {
        return this._diameter === 0;
    },

    set: function (value) {
        if (value === true) {
            this.setTo(0, 0, 0);
        }
    }
});

Circle.contains = function (a, x, y) {
    //  Check if x/y are within the bounds first
    if (a.radius > 0 && x >= a.left && x <= a.right && y >= a.top && y <= a.bottom) {
        var dx = (a.x - x) * (a.x - x);
        var dy = (a.y - y) * (a.y - y);

        return dx + dy <= a.radius * a.radius;
    } else {
        return false;
    }
};

Circle.equals = function (a, b) {
    return a.x == b.x && a.y == b.y && a.diameter == b.diameter;
};

Circle.intersects = function (a, b) {
    return Tiny.Math.distance(a.x, a.y, b.x, b.y) <= a.radius + b.radius;
};

Circle.intersectsRectangle = function (c, r) {
    var cx = Math.abs(c.x - r.x - r.halfWidth);
    var xDist = r.halfWidth + c.radius;

    if (cx > xDist) {
        return false;
    }

    var cy = Math.abs(c.y - r.y - r.halfHeight);
    var yDist = r.halfHeight + c.radius;

    if (cy > yDist) {
        return false;
    }

    if (cx <= r.halfWidth || cy <= r.halfHeight) {
        return true;
    }

    var xCornerDist = cx - r.halfWidth;
    var yCornerDist = cy - r.halfHeight;
    var xCornerDistSq = xCornerDist * xCornerDist;
    var yCornerDistSq = yCornerDist * yCornerDist;
    var maxCornerDistSq = c.radius * c.radius;

    return xCornerDistSq + yCornerDistSq <= maxCornerDistSq;
};

export { Circle };
