
Tiny.Ellipse = function (x, y, width, height) {

    x = x || 0;
    y = y || 0;
    width = width || 0;
    height = height || 0;

    this.x = x || 0;
    this.y = y || 0;

    this.width = width || 0;
    this.height = height || 0;

    this.type = Tiny.Primitives.ELIP
};

Tiny.Ellipse.prototype.constructor = Tiny.Ellipse;


Tiny.Graphics.prototype.drawEllipse = function(x, y, width, height)
{
    this.drawShape(new Tiny.Ellipse(x, y, width, height));

    return this;
};