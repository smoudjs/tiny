var Vec2 = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Vec2.prototype = {
    set: function (x, y) {
        this.x = x || 0;
        this.y = y || (y !== 0 ? this.x : 0);

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
