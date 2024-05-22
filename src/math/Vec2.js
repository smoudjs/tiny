var Vec2 = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Object.assign(Vec2.prototype, {
    isVec2: true,

    set: function (x, y) {
        this.x = x || 0;
        this.y = y || (y !== 0 ? this.x : 0);

        return this;
    },

    // setScalar: function (scalar) {
    //     this.x = scalar;
    //     this.y = scalar;

    //     return this;
    // },

    // setX: function (x) {
    //     this.x = x;

    //     return this;
    // },

    // setY: function (y) {
    //     this.y = y;

    //     return this;
    // },

    /**
     *  START: Uses by Orbit controls
     */
    sub2: function (a, b) {
        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;
    },

    mulScalar: function (scalar) {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    },
    copy: function (v) {
        this.x = v.x;
        this.y = v.y;

        return this;
    },
    mul: function (v) {
        this.x *= v.x;
        this.y *= v.y;

        return this;
    },
    clone: function () {
        return new this.constructor(this.x, this.y);
    }

    /**
     *  END: Uses by Orbit controls
     */
});

export { Vec2 };
