var Vec2 = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Vec2.prototype = {
    set: function (x, y) {
        this.x = x || 0;
        this.y = y || (y !== 0 ? this.x : 0);

        return this;
    }
};

export { Vec2 };
