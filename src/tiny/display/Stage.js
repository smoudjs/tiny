Tiny.Stage = function()
{
    Tiny.DisplayObjectContainer.call( this );
    this.worldTransform = new Tiny.Matrix();
    this.stage = this;
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
