Tiny.RenderLayer = function () {
    Tiny.Object2D.call(this);
};

Tiny.RenderLayer.prototype = Object.create(Tiny.Object2D.prototype);
Tiny.RenderLayer.prototype.constructor = Tiny.RenderLayer;

var noop = function () {};

Tiny.RenderLayer.prototype.addChildAt = function (child, index) {
    if (index >= 0 && index <= this.children.length) {

        child._RenderLayer_render = child.render;
        child.render = noop;

        this.children.splice(index, 0, child);

        return child;
    } else {
        throw new Error(
            child + "addChildAt: The index " + index + " supplied is out of bounds " + this.children.length
        );
    }
};

Tiny.RenderLayer.prototype.removeChildAt = function (index) {
    var child = this.getChildAt(index);
    this.children.splice(index, 1);

    child.render = child._RenderLayer_render;
    child._RenderLayer_render = null;

    return child;
};

Tiny.RenderLayer.prototype.updateTransform = function () {}


Tiny.RenderLayer.prototype.render = function (renderSession) {
    if (this.visible === false || this.alpha === 0) return;

    if (this._cacheAsBitmap) {
        this._renderCachedSprite(renderSession);
        return;
    }

    if (this._mask) {
        renderSession.maskManager.pushMask(this._mask, renderSession);
    }

    for (var i = 0; i < this.children.length; i++) {
        this.children[i]._RenderLayer_render(renderSession);
    }

    if (this._mask) {
        renderSession.maskManager.popMask(renderSession);
    }
};
