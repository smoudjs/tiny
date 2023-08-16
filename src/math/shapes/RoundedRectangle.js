import { SHAPES } from '../../constants';

var RoundedRectangle = function (x, y, width, height, radius) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;
    this.radius = radius || 0;
    this.type = SHAPES.RREC;
};

// RoundedRectangle.prototype.clone = function () {
//     return new RoundedRectangle(this.x, this.y, this.width, this.height, this.radius);
// };

RoundedRectangle.prototype.contains = function (x, y) {
    if (this.width <= 0 || this.height <= 0) {
        return false;
    }

    var x1 = this.x;

    if (x >= x1 && x <= x1 + this.width) {
        var y1 = this.y;

        if (y >= y1 && y <= y1 + this.height) {
            return true;
        }
    }

    return false;
};

RoundedRectangle.prototype.constructor = RoundedRectangle;

export { RoundedRectangle };
