Tiny.Scene = function (game) {
    Tiny.Object2D.call(this);
    this.worldTransform = new Tiny.Matrix();
    this.game = game;
};

Tiny.Scene.prototype = Object.create(Tiny.Object2D.prototype);
Tiny.Scene.prototype.constructor = Tiny.Scene;

Tiny.Scene.prototype.updateTransform = function () {
    this.worldAlpha = 1;

    for (var i = 0; i < this.children.length; i++) {
        this.children[i].updateTransform();
    }
};
