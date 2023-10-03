var Vec2 = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Vec2.prototype = {
    clone: function () {
        return new Vec2(this.x, this.y);
    },

    set: function (x, y) {
        this.x = x || 0;
        this.y = y || (y !== 0 ? this.x : 0);

        return this;
    },

    add: function (vec) {
        this.x += vec.x;
        this.y += vec.y;

        return this;
    },

    sub: function (vec) {
        this.x -= vec.x;
        this.y -= vec.y;

        return this;
    },

    /** 
     *  START: Uses by Orbit controls
     */
    subVectors: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;
    },

    multiplyScalar: function (scalar) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    },

    divideScalar: function (scalar) {
        this.x /= scalar;
        this.y /= scalar;

        return this;
    },

    negate: function () {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    },

    rotateAround: function ( center, angle ) {
        var c = Math.cos( angle ), s = Math.sin( angle );

        var x = this.x - center.x;
        var y = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;

        return this;
    },

    copy: function (v) {
        this.x = v.x;
        this.y = v.y;

        return this;
    },
    multiply: function (v) {
        this.x *= v.x;
        this.y *= v.y;

        return this;
    }
    /** 
     *  END: Uses by Orbit controls
     */
};

export { Vec2 };
