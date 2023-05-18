Tiny.Opaque = function (options) {
    // Tiny.BaseObject2D.call(this);

    var game = (this.game = options.game);
    this.visible = true;
    this._bounds = new Tiny.Rectangle(0, 0, 1, 1);
    this.color = options.color || '#000000';
    this.alpha = options.alpha || 0.5;

    if (options.input !== false) {
        game.input.add(this, { transparent: options.transparent });
    }
};

// Tiny.Opaque.prototype = Object.create(Tiny.BaseObject2D.prototype);
Tiny.Opaque.prototype.constructor = Tiny.Opaque;

Tiny.Opaque.prototype.destroy = function () {};
Tiny.Opaque.prototype.updateTransform = function () {};

Object.defineProperty(Tiny.Opaque.prototype, "worldVisible", {
    get: function () {
        return this.visible;
    }
});

Tiny.Opaque.prototype.getBounds = function () {
    this._bounds.setTo(0, 0, this.game.width, this.game.height);
    return this._bounds;
};

Tiny.Opaque.prototype.render = function (renderSession) {
    if (this.visible === false || this.alpha === 0) return;

    renderSession.context.resetTransform();

    renderSession.context.globalAlpha = this.alpha;
    renderSession.context.fillStyle = this.color;
    renderSession.context.fillRect(
        0,
        0,
        renderSession.context.canvas.width,
        renderSession.context.canvas.height
    );
};
