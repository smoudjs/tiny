import { EllipseShape } from '../../constants.js';

var Ellipse = function (x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;

    this.width = width || 0;
    this.height = height || 0;

    this.type = EllipseShape;
};

Ellipse.prototype.constructor = Ellipse;


export { Ellipse };