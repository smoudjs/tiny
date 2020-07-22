var Tiny = function(width, height, parentNode, enableRAF, states)
{
    parentNode = parentNode ? document.getElementById(parentNode) : document.body;
    this._preboot(width, height, enableRAF, states);

    this.renderer = new Tiny.CanvasRenderer(this.width, this.height,
    {
        autoResize: true
    });

    var view = this.canvas = this.inputView = this.renderer.view;

    parentNode.appendChild(view);
    view.style.position = 'absolute';

    view.style.top = "0px";
    view.style.left = "0px";

    view.style.transformOrigin = '0% 0%';
    view.style.perspective = '1000px';

    this._boot();
}

Tiny.prototype._preload = function()
{
    this.preload.call(this.callbackContext);
    this.state = 1;

    if (Tiny.Loader) 
    {
        this.load.start(this._create);
    }
    else 
    {
        this._create();
    }
};

Tiny.prototype.setPixelRatio = function(dpr)
{
    this.renderer.resolution = dpr;
};

Tiny.prototype._render = function()
{
    this.renderer.render(this.stage);
};

Tiny.prototype.resize = function(width, height, scale)
{
    this._resize(width, height, scale);
};

Tiny.prototype.destroy = function()
{
    this._destroy();
};

module.exports = Tiny;