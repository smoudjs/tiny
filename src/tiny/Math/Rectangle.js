
Tiny.Rectangle = function (x, y, width, height) {

    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;
};

Tiny.Rectangle.prototype = {

    offset: function (dx, dy) {

        this.x += dx;
        this.y += dy;

        return this;

    },

    offsetPoint: function (point) {

        return this.offset(point.x, point.y);

    },

    setTo: function (x, y, width, height) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        return this;

    },

    scale: function (x, y) {

        if (typeof y === 'undefined') { y = x; }

        this.width *= x;
        this.height *= y;

        return this;

    },

    centerOn: function (x, y) {

        this.centerX = x;
        this.centerY = y;

        return this;

    },

    floor: function () {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

    },

    floorAll: function () {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);

    },

    copyFrom: function (source) {

        return this.setTo(source.x, source.y, source.width, source.height);

    },

    copyTo: function (dest) {

        dest.x = this.x;
        dest.y = this.y;
        dest.width = this.width;
        dest.height = this.height;

        return dest;

    },

    inflate: function (dx, dy) {

        return Tiny.Rectangle.inflate(this, dx, dy);

    },

    size: function (output) {

        return Tiny.Rectangle.size(this, output);

    },

    clone: function (output) {

        return Tiny.Rectangle.clone(this, output);

    },

    contains: function (x, y) {

        return Tiny.Rectangle.contains(this, x, y);

    },

    containsRect: function (b) {

        return Tiny.Rectangle.containsRect(b, this);

    },

    equals: function (b) {

        return Tiny.Rectangle.equals(this, b);

    },

    intersection: function (b, out) {

        return Tiny.Rectangle.intersection(this, b, out);

    },


    intersects: function (b) {

        return Tiny.Rectangle.intersects(this, b);

    },

    /**
    * Determines whether the coordinates given intersects (overlaps) with this Rectangle.
    *
    * @method Tiny.Rectangle#intersectsRaw
    * @param {number} left - The x coordinate of the left of the area.
    * @param {number} right - The right coordinate of the area.
    * @param {number} top - The y coordinate of the area.
    * @param {number} bottom - The bottom coordinate of the area.
    * @param {number} tolerance - A tolerance value to allow for an intersection test with padding, default to 0
    * @return {boolean} A value of true if the specified object intersects with the Rectangle; otherwise false.
    */
    intersectsRaw: function (left, right, top, bottom, tolerance) {

        return Tiny.Rectangle.intersectsRaw(this, left, right, top, bottom, tolerance);

    },

    /**
    * Adds two Rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two Rectangles.
    * @method Tiny.Rectangle#union
    * @param {Tiny.Rectangle} b - The second Rectangle object.
    * @param {Tiny.Rectangle} [out] - Optional Rectangle object. If given the new values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
    * @return {Tiny.Rectangle} A Rectangle object that is the union of the two Rectangles.
    */
    union: function (b, out) {

        return Tiny.Rectangle.union(this, b, out);

    },

    /**
    * Returns a string representation of this object.
    * @method Tiny.Rectangle#toString
    * @return {string} A string representation of the instance.
    */
    toString: function () {

        return "[{Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + " empty=" + this.empty + ")}]";

    }

};

/**
* @name Tiny.Rectangle#halfWidth
* @property {number} halfWidth - Half of the width of the Rectangle.
* @readonly
*/
Object.defineProperty(Tiny.Rectangle.prototype, "halfWidth", {

    get: function () {
        return Math.round(this.width / 2);
    }

});

/**
* @name Tiny.Rectangle#halfHeight
* @property {number} halfHeight - Half of the height of the Rectangle.
* @readonly
*/
Object.defineProperty(Tiny.Rectangle.prototype, "halfHeight", {

    get: function () {
        return Math.round(this.height / 2);
    }

});

/**
* The sum of the y and height properties. Changing the bottom property of a Rectangle object has no effect on the x, y and width properties, but does change the height property.
* @name Tiny.Rectangle#bottom
* @property {number} bottom - The sum of the y and height properties.
*/
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

/**
* The location of the Rectangles bottom right corner as a Point object.
* @name Tiny.Rectangle#bottom
* @property {Tiny.Point} bottomRight - Gets or sets the location of the Rectangles bottom right corner as a Point object.
*/
Object.defineProperty(Tiny.Rectangle.prototype, "bottomRight", {

    get: function () {
        return new Tiny.Point(this.right, this.bottom);
    },

    set: function (value) {
        this.right = value.x;
        this.bottom = value.y;
    }

});

/**
* The x coordinate of the left of the Rectangle. Changing the left property of a Rectangle object has no effect on the y and height properties. However it does affect the width property, whereas changing the x value does not affect the width property.
* @name Tiny.Rectangle#left
* @property {number} left - The x coordinate of the left of the Rectangle.
*/
Object.defineProperty(Tiny.Rectangle.prototype, "left", {

    get: function () {
        return this.x;
    },

    set: function (value) {
        if (value >= this.right) {
            this.width = 0;
        } else {
            this.width = this.right - value;
        }
        this.x = value;
    }

});

/**
* The sum of the x and width properties. Changing the right property of a Rectangle object has no effect on the x, y and height properties, however it does affect the width property.
* @name Tiny.Rectangle#right
* @property {number} right - The sum of the x and width properties.
*/
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

/**
* The volume of the Rectangle derived from width * height.
* @name Tiny.Rectangle#volume
* @property {number} volume - The volume of the Rectangle derived from width * height.
* @readonly
*/
Object.defineProperty(Tiny.Rectangle.prototype, "volume", {

    get: function () {
        return this.width * this.height;
    }

});

/**
* The perimeter size of the Rectangle. This is the sum of all 4 sides.
* @name Tiny.Rectangle#perimeter
* @property {number} perimeter - The perimeter size of the Rectangle. This is the sum of all 4 sides.
* @readonly
*/
Object.defineProperty(Tiny.Rectangle.prototype, "perimeter", {

    get: function () {
        return (this.width * 2) + (this.height * 2);
    }

});

/**
* The x coordinate of the center of the Rectangle.
* @name Tiny.Rectangle#centerX
* @property {number} centerX - The x coordinate of the center of the Rectangle.
*/
Object.defineProperty(Tiny.Rectangle.prototype, "centerX", {

    get: function () {
        return this.x + this.halfWidth;
    },

    set: function (value) {
        this.x = value - this.halfWidth;
    }

});

/**
* The y coordinate of the center of the Rectangle.
* @name Tiny.Rectangle#centerY
* @property {number} centerY - The y coordinate of the center of the Rectangle.
*/
Object.defineProperty(Tiny.Rectangle.prototype, "centerY", {

    get: function () {
        return this.y + this.halfHeight;
    },

    set: function (value) {
        this.y = value - this.halfHeight;
    }

});

/**
* A random value between the left and right values (inclusive) of the Rectangle.
*
* @name Tiny.Rectangle#randomX
* @property {number} randomX - A random value between the left and right values (inclusive) of the Rectangle.
*/
Object.defineProperty(Tiny.Rectangle.prototype, "randomX", {

    get: function () {

        return this.x + (Math.random() * this.width);

    }

});

/**
* A random value between the top and bottom values (inclusive) of the Rectangle.
*
* @name Tiny.Rectangle#randomY
* @property {number} randomY - A random value between the top and bottom values (inclusive) of the Rectangle.
*/
Object.defineProperty(Tiny.Rectangle.prototype, "randomY", {

    get: function () {

        return this.y + (Math.random() * this.height);

    }

});

/**
* The y coordinate of the top of the Rectangle. Changing the top property of a Rectangle object has no effect on the x and width properties.
* However it does affect the height property, whereas changing the y value does not affect the height property.
* @name Tiny.Rectangle#top
* @property {number} top - The y coordinate of the top of the Rectangle.
*/
Object.defineProperty(Tiny.Rectangle.prototype, "top", {

    get: function () {
        return this.y;
    },

    set: function (value) {
        if (value >= this.bottom) {
            this.height = 0;
            this.y = value;
        } else {
            this.height = (this.bottom - value);
        }
    }

});

/**
* The location of the Rectangles top left corner as a Point object.
* @name Tiny.Rectangle#topLeft
* @property {Tiny.Point} topLeft - The location of the Rectangles top left corner as a Point object.
*/
Object.defineProperty(Tiny.Rectangle.prototype, "topLeft", {

    get: function () {
        return new Tiny.Point(this.x, this.y);
    },

    set: function (value) {
        this.x = value.x;
        this.y = value.y;
    }

});

/**
* The location of the Rectangles top right corner as a Point object.
* @name Tiny.Rectangle#topRight
* @property {Tiny.Point} topRight - The location of the Rectangles top left corner as a Point object.
*/
Object.defineProperty(Tiny.Rectangle.prototype, "topRight", {

    get: function () {
        return new Tiny.Point(this.x + this.width, this.y);
    },

    set: function (value) {
        this.right = value.x;
        this.y = value.y;
    }

});

/**
* Determines whether or not this Rectangle object is empty. A Rectangle object is empty if its width or height is less than or equal to 0.
* If set to true then all of the Rectangle properties are set to 0.
* @name Tiny.Rectangle#empty
* @property {boolean} empty - Gets or sets the Rectangles empty state.
*/
Object.defineProperty(Tiny.Rectangle.prototype, "empty", {

    get: function () {
        return (!this.width || !this.height);
    },

    set: function (value) {

        if (value === true)
        {
            this.setTo(0, 0, 0, 0);
        }

    }

});

Tiny.Rectangle.prototype.constructor = Tiny.Rectangle;

/**
* Increases the size of the Rectangle object by the specified amounts. The center point of the Rectangle object stays the same, and its size increases to the left and right by the dx value, and to the top and the bottom by the dy value.
* @method Tiny.Rectangle.inflate
* @param {Tiny.Rectangle} a - The Rectangle object.
* @param {number} dx - The amount to be added to the left side of the Rectangle.
* @param {number} dy - The amount to be added to the bottom side of the Rectangle.
* @return {Tiny.Rectangle} This Rectangle object.
*/
Tiny.Rectangle.inflate = function (a, dx, dy) {

    a.x -= dx;
    a.width += 2 * dx;
    a.y -= dy;
    a.height += 2 * dy;

    return a;

};

/**
* Increases the size of the Rectangle object. This method is similar to the Rectangle.inflate() method except it takes a Point object as a parameter.
* @method Tiny.Rectangle.inflatePoint
* @param {Tiny.Rectangle} a - The Rectangle object.
* @param {Tiny.Point} point - The x property of this Point object is used to increase the horizontal dimension of the Rectangle object. The y property is used to increase the vertical dimension of the Rectangle object.
* @return {Tiny.Rectangle} The Rectangle object.
*/
Tiny.Rectangle.inflatePoint = function (a, point) {

    return Tiny.Rectangle.inflate(a, point.x, point.y);

};

/**
* The size of the Rectangle object, expressed as a Point object with the values of the width and height properties.
* @method Tiny.Rectangle.size
* @param {Tiny.Rectangle} a - The Rectangle object.
* @param {Tiny.Point} [output] - Optional Point object. If given the values will be set into the object, otherwise a brand new Point object will be created and returned.
* @return {Tiny.Point} The size of the Rectangle object
*/
Tiny.Rectangle.size = function (a, output) {

    if (typeof output === "undefined" || output === null)
    {
        output = new Tiny.Point(a.width, a.height);
    }
    else
    {
        output.setTo(a.width, a.height);
    }

    return output;

};

/**
* Returns a new Rectangle object with the same values for the x, y, width, and height properties as the original Rectangle object.
* @method Tiny.Rectangle.clone
* @param {Tiny.Rectangle} a - The Rectangle object.
* @param {Tiny.Rectangle} [output] - Optional Rectangle object. If given the values will be set into the object, otherwise a brand new Rectangle object will be created and returned.
* @return {Tiny.Rectangle}
*/
Tiny.Rectangle.clone = function (a, output) {

    if (typeof output === "undefined" || output === null)
    {
        output = new Tiny.Rectangle(a.x, a.y, a.width, a.height);
    }
    else
    {
        output.setTo(a.x, a.y, a.width, a.height);
    }

    return output;

};

/**
* Determines whether the specified coordinates are contained within the region defined by this Rectangle object.
* @method Tiny.Rectangle.contains
* @param {Tiny.Rectangle} a - The Rectangle object.
* @param {number} x - The x coordinate of the point to test.
* @param {number} y - The y coordinate of the point to test.
* @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Tiny.Rectangle.contains = function (a, x, y) {

    if (a.width <= 0 || a.height <= 0)
    {
        return false;
    }

    return (x >= a.x && x < a.right && y >= a.y && y < a.bottom);

};

/**
* Determines whether the specified coordinates are contained within the region defined by the given raw values.
* @method Tiny.Rectangle.containsRaw
* @param {number} rx - The x coordinate of the top left of the area.
* @param {number} ry - The y coordinate of the top left of the area.
* @param {number} rw - The width of the area.
* @param {number} rh - The height of the area.
* @param {number} x - The x coordinate of the point to test.
* @param {number} y - The y coordinate of the point to test.
* @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Tiny.Rectangle.containsRaw = function (rx, ry, rw, rh, x, y) {

    return (x >= rx && x < (rx + rw) && y >= ry && y < (ry + rh));

};

/**
* Determines whether the specified point is contained within the rectangular region defined by this Rectangle object. This method is similar to the Rectangle.contains() method, except that it takes a Point object as a parameter.
* @method Tiny.Rectangle.containsPoint
* @param {Tiny.Rectangle} a - The Rectangle object.
* @param {Tiny.Point} point - The point object being checked. Can be Point or any object with .x and .y values.
* @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Tiny.Rectangle.containsPoint = function (a, point) {

    return Tiny.Rectangle.contains(a, point.x, point.y);

};

/**
* Determines whether the first Rectangle object is fully contained within the second Rectangle object.
* A Rectangle object is said to contain another if the second Rectangle object falls entirely within the boundaries of the first.
* @method Tiny.Rectangle.containsRect
* @param {Tiny.Rectangle} a - The first Rectangle object.
* @param {Tiny.Rectangle} b - The second Rectangle object.
* @return {boolean} A value of true if the Rectangle object contains the specified point; otherwise false.
*/
Tiny.Rectangle.containsRect = function (a, b) {

    //  If the given rect has a larger volume than this one then it can never contain it
    if (a.volume > b.volume)
    {
        return false;
    }

    return (a.x >= b.x && a.y >= b.y && a.right < b.right && a.bottom < b.bottom);

};

/**
* Determines whether the two Rectangles are equal.
* This method compares the x, y, width and height properties of each Rectangle.
* @method Tiny.Rectangle.equals
* @param {Tiny.Rectangle} a - The first Rectangle object.
* @param {Tiny.Rectangle} b - The second Rectangle object.
* @return {boolean} A value of true if the two Rectangles have exactly the same values for the x, y, width and height properties; otherwise false.
*/
Tiny.Rectangle.equals = function (a, b) {

    return (a.x == b.x && a.y == b.y && a.width == b.width && a.height == b.height);

};

/**
* Determines if the two objects (either Rectangles or Rectangle-like) have the same width and height values under strict equality.
* @method Tiny.Rectangle.sameDimensions
* @param {Rectangle-like} a - The first Rectangle object.
* @param {Rectangle-like} b - The second Rectangle object.
* @return {boolean} True if the object have equivalent values for the width and height properties.
*/
Tiny.Rectangle.sameDimensions = function (a, b) {

    return (a.width === b.width && a.height === b.height);

};

/**
* If the Rectangle object specified in the toIntersect parameter intersects with this Rectangle object, returns the area of intersection as a Rectangle object. If the Rectangles do not intersect, this method returns an empty Rectangle object with its properties set to 0.
* @method Tiny.Rectangle.intersection
* @param {Tiny.Rectangle} a - The first Rectangle object.
* @param {Tiny.Rectangle} b - The second Rectangle object.
* @param {Tiny.Rectangle} [output] - Optional Rectangle object. If given the intersection values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
* @return {Tiny.Rectangle} A Rectangle object that equals the area of intersection. If the Rectangles do not intersect, this method returns an empty Rectangle object; that is, a Rectangle with its x, y, width, and height properties set to 0.
*/
Tiny.Rectangle.intersection = function (a, b, output) {

    if (typeof output === "undefined")
    {
        output = new Tiny.Rectangle();
    }

    if (Tiny.Rectangle.intersects(a, b))
    {
        output.x = Math.max(a.x, b.x);
        output.y = Math.max(a.y, b.y);
        output.width = Math.min(a.right, b.right) - output.x;
        output.height = Math.min(a.bottom, b.bottom) - output.y;
    }

    return output;

};

/**
* Determines whether the two Rectangles intersect with each other.
* This method checks the x, y, width, and height properties of the Rectangles.
* @method Tiny.Rectangle.intersects
* @param {Tiny.Rectangle} a - The first Rectangle object.
* @param {Tiny.Rectangle} b - The second Rectangle object.
* @return {boolean} A value of true if the specified object intersects with this Rectangle object; otherwise false.
*/
Tiny.Rectangle.intersects = function (a, b) {

    if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0)
    {
        return false;
    }

    return !(a.right < b.x || a.bottom < b.y || a.x > b.right || a.y > b.bottom);

};

/**
* Determines whether the object specified intersects (overlaps) with the given values.
* @method Tiny.Rectangle.intersectsRaw
* @param {number} left - The x coordinate of the left of the area.
* @param {number} right - The right coordinate of the area.
* @param {number} top - The y coordinate of the area.
* @param {number} bottom - The bottom coordinate of the area.
* @param {number} tolerance - A tolerance value to allow for an intersection test with padding, default to 0
* @return {boolean} A value of true if the specified object intersects with the Rectangle; otherwise false.
*/
Tiny.Rectangle.intersectsRaw = function (a, left, right, top, bottom, tolerance) {

    if (typeof tolerance === "undefined") { tolerance = 0; }

    return !(left > a.right + tolerance || right < a.left - tolerance || top > a.bottom + tolerance || bottom < a.top - tolerance);

};

/**
* Adds two Rectangles together to create a new Rectangle object, by filling in the horizontal and vertical space between the two Rectangles.
* @method Tiny.Rectangle.union
* @param {Tiny.Rectangle} a - The first Rectangle object.
* @param {Tiny.Rectangle} b - The second Rectangle object.
* @param {Tiny.Rectangle} [output] - Optional Rectangle object. If given the new values will be set into this object, otherwise a brand new Rectangle object will be created and returned.
* @return {Tiny.Rectangle} A Rectangle object that is the union of the two Rectangles.
*/
Tiny.Rectangle.union = function (a, b, output) {

    if (typeof output === "undefined")
    {
        output = new Tiny.Rectangle();
    }

    return output.setTo(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.max(a.right, b.right) - Math.min(a.left, b.left), Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top));

};

/**
* Calculates the Axis Aligned Bounding Box (or aabb) from an array of points.
*
* @method Tiny.Rectangle#aabb
* @param {Tiny.Point[]} points - The array of one or more points.
* @param {Tiny.Rectangle} [out] - Optional Rectangle to store the value in, if not supplied a new Rectangle object will be created.
* @return {Tiny.Rectangle} The new Rectangle object.
* @static
*/
Tiny.Rectangle.aabb = function(points, out) {

    if (typeof out === "undefined") {
        out = new Tiny.Rectangle();
    }

    var xMax = Number.MIN_VALUE,
        xMin = Number.MAX_VALUE,
        yMax = Number.MIN_VALUE,
        yMin = Number.MAX_VALUE;

    points.forEach(function(point) {
        if (point.x > xMax) {
            xMax = point.x;
        }
        if (point.x < xMin) {
            xMin = point.x;
        }

        if (point.y > yMax) {
            yMax = point.y;
        }
        if (point.y < yMin) {
            yMin = point.y;
        }
    });

    out.setTo(xMin, yMin, xMax - xMin, yMax - yMin);

    return out;
};

Tiny.EmptyRectangle = new Tiny.Rectangle(0, 0, 0, 0);