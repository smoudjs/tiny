var Ellipse = function (x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;

    this.width = width || 0;
    this.height = height || 0;

    this.type = Tiny.ELIP;
};

Ellipse.prototype.constructor = Ellipse;

Tiny.Graphics.prototype.drawEllipse = function (x, y, width, height) {
    this.drawShape(new Ellipse(x, y, width, height));

    return this;
};

export { Ellipse };
