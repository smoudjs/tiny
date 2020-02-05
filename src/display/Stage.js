Tiny.Stage = function(game)
{
    Tiny.DisplayObjectContainer.call( this );
    this.worldTransform = new Tiny.Matrix();
    this.game = game
    this.stage = this;

    this.setBackgroundColor(0xffffff)
};

Tiny.Stage.prototype = Object.create( Tiny.DisplayObjectContainer.prototype );
Tiny.Stage.prototype.constructor = Tiny.Stage;

Tiny.Stage.prototype.updateTransform = function()
{
    this.worldAlpha = 1;

    for (var i = 0; i < this.children.length; i++)
    {
        this.children[i].updateTransform();
    }
};


Tiny.Stage.prototype.setBackgroundColor = function(backgroundColor)
{
    this.backgroundColor = backgroundColor || 0x000000;
    this.backgroundColorSplit = Tiny.hex2rgb(this.backgroundColor);
    var hex = this.backgroundColor.toString(16);
    hex = '000000'.substr(0, 6 - hex.length) + hex;
    this.backgroundColorString = '#' + hex;
};