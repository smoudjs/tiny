var Opaque = function (options) {
    // Tiny.BaseObject2D.call(this);

    var canvas = new Tiny.CanvasBuffer(1, 1);
    var ctx = canvas.context;

    ctx.fillStyle = options.color || '#000000';
    ctx.rect(0, 0, 1000, 1000);
    ctx.fill();

    Tiny.Sprite.call(this, new Tiny.Texture(canvas.canvas));

    var game = (this.game = options.game);
    this.visible = true;
    this._bounds = new Tiny.Rectangle(0, 0, 1, 1);

    // this.color = options.color || '#000000';
    this.alpha = options.alpha || 0.5;

    if (options.input !== false) {
        game.input.add(this, { transparent: options.transparent });
    }
};

Opaque.prototype = Object.assign(Object.create(Tiny.Sprite.prototype), {
    constructor: Opaque,

    updateTransform: function () {
        var wt = this.worldTransform;
        wt.a = this.game.width;
        wt.d = this.game.height;
        this.worldAlpha = this.alpha;
    },
    getBounds: function () {
        this._bounds.width = this.game.width;
        this._bounds.height = this.game.height;
        return this._bounds;
    }
});

Object.defineProperty(Opaque.prototype, 'worldVisible', {
    get: function () {
        return this.visible;
    }
});

// Opaque.prototype.render = function () {};

// Opaque.prototype.renderCanvas = function (renderSession) {
//     if (this.visible === false || this.alpha === 0) return;

//     renderSession.context.setTransform(1, 0, 0, 1, 0, 0);
//     // renderSession.context.resetTransform();

//     renderSession.context.globalAlpha = this.alpha;
//     renderSession.context.fillStyle = this.color;
//     renderSession.context.fillRect(
//         0,
//         0,
//         renderSession.context.canvas.width,
//         renderSession.context.canvas.height
//     );

//     renderSession.context.globalAlpha = 1;
// };

export { Opaque };
