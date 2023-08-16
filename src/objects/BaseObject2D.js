import { Vec2 } from '../math/Vec2';
import { Mat3, identityMatrix } from '../math/Mat3';
import { EmptyRectangle } from '../math/shapes/Rectangle';

var pi2 = Math.PI * 2;

var BaseObject2D = function () {
    this.position = new Vec2(0, 0);
    this.scale = new Vec2(1, 1);
    this.pivot = new Vec2(0, 0);
    this.rotation = 0;
    this.alpha = 1;
    this.visible = true;
    this.renderable = false;
    this.parent = null;
    this.worldAlpha = 1;
    this.worldTransform = new Mat3();
    this._sr = 0;
    this._cr = 1;
    this._cacheAsBitmap = false;
};

BaseObject2D.prototype.constructor = BaseObject2D;

BaseObject2D.prototype.destroy = function () {
    if (this.parent) this.parent.remove(this);

    this.parent = null;
    this.worldTransform = null;
    this.visible = false;
    this.renderable = false;
    this._destroyCachedSprite();
};

Object.defineProperty(BaseObject2D.prototype, 'worldVisible', {
    get: function () {
        var item = this;

        do {
            if (!item.visible) return false;
            item = item.parent;
        } while (item);

        return true;
    }
});

Object.defineProperty(BaseObject2D.prototype, 'cacheAsBitmap', {
    get: function () {
        return this._cacheAsBitmap;
    },

    set: function (value) {
        if (this._cacheAsBitmap === value) return;

        if (value) {
            this._generateCachedSprite();
        } else {
            this._destroyCachedSprite();
        }

        this._cacheAsBitmap = value;
    }
});

BaseObject2D.prototype.updateTransform = function () {
    if (!this.parent) {
        return;
    }

    // create some matrix refs for easy access
    var pt = this.parent.worldTransform;
    var wt = this.worldTransform;

    // temporary matrix variables
    var a, b, c, d, tx, ty;

    // so if rotation is between 0 then we can simplify the multiplication process..
    if (this.rotation % pi2) {
        // check to see if the rotation is the same as the previous render. This means we only need to use sin and cos when rotation actually changes
        if (this.rotation !== this.rotationCache) {
            this.rotationCache = this.rotation;
            this._sr = Math.sin(this.rotation);
            this._cr = Math.cos(this.rotation);
        }

        // get the matrix values of the displayobject based on its transform properties..
        a = this._cr * this.scale.x;
        b = this._sr * this.scale.x;
        c = -this._sr * this.scale.y;
        d = this._cr * this.scale.y;
        tx = this.position.x;
        ty = this.position.y;

        // check for pivot.. not often used so geared towards that fact!
        if (this.pivot.x || this.pivot.y) {
            tx -= this.pivot.x * a + this.pivot.y * c;
            ty -= this.pivot.x * b + this.pivot.y * d;
        }

        // concat the parent matrix with the objects transform.
        wt.a = a * pt.a + b * pt.c;
        wt.b = a * pt.b + b * pt.d;
        wt.c = c * pt.a + d * pt.c;
        wt.d = c * pt.b + d * pt.d;
        wt.tx = tx * pt.a + ty * pt.c + pt.tx;
        wt.ty = tx * pt.b + ty * pt.d + pt.ty;
    } else {
        // lets do the fast version as we know there is no rotation..
        a = this.scale.x;
        d = this.scale.y;

        tx = this.position.x - this.pivot.x * a;
        ty = this.position.y - this.pivot.y * d;

        wt.a = a * pt.a;
        wt.b = a * pt.b;
        wt.c = d * pt.c;
        wt.d = d * pt.d;
        wt.tx = tx * pt.a + ty * pt.c + pt.tx;
        wt.ty = tx * pt.b + ty * pt.d + pt.ty;
    }

    // multiply the alphas..
    this.worldAlpha = this.alpha * this.parent.worldAlpha;
};

// performance increase to avoid using call.. (10x faster)
BaseObject2D.prototype.displayObjectUpdateTransform = BaseObject2D.prototype.updateTransform;

BaseObject2D.prototype.getBounds = function (matrix) {
    // matrix = matrix;//just to get passed js hinting (and preserve inheritance)
    return EmptyRectangle;
};

BaseObject2D.prototype.getLocalBounds = function () {
    return this.getBounds(identityMatrix);
};

BaseObject2D.prototype.generateTexture = function (resolution, renderer) {
    var bounds = this.getLocalBounds();

    var renderTexture = new Tiny.RenderTexture(bounds.width | 0, bounds.height | 0, renderer, resolution);

    BaseObject2D._tempMatrix.tx = -bounds.x;
    BaseObject2D._tempMatrix.ty = -bounds.y;

    renderTexture.render(this, BaseObject2D._tempMatrix);

    return renderTexture;
};

BaseObject2D.prototype.updateCache = function () {
    this._generateCachedSprite();
};

BaseObject2D.prototype.toGlobal = function (position) {
    // don't need to u[date the lot
    this.displayObjectUpdateTransform();
    return this.worldTransform.apply(position);
};

BaseObject2D.prototype.toLocal = function (position, from) {
    if (from) {
        position = from.toGlobal(position);
    }

    // don't need to u[date the lot
    this.displayObjectUpdateTransform();

    return this.worldTransform.applyInverse(position);
};

BaseObject2D.prototype._renderCachedSprite = function (renderSession) {
    this._cachedSprite.worldAlpha = this.worldAlpha;

    if (renderSession.gl) {
        Tiny.Sprite.prototype.render.call(this._cachedSprite, renderSession);
    } else {
        Tiny.Sprite.prototype.renderCanvas.call(this._cachedSprite, renderSession);
    }
};

BaseObject2D.prototype._generateCachedSprite = function () {
    this._cachedSprite = null;
    this._cacheAsBitmap = false;

    var bounds = this.getLocalBounds();

    // if (!this._cachedSprite) {
    var renderTexture = new Tiny.RenderTexture(bounds.width | 0, bounds.height | 0); //, renderSession.renderer);

    this._cachedSprite = new Tiny.Sprite(renderTexture);
    this._cachedSprite.worldTransform = this.worldTransform;
    // } else {
    //     this._cachedSprite.texture.resize(bounds.width | 0, bounds.height | 0);
    // }

    var tempFilters = this._filters;
    this._filters = null;

    this._cachedSprite.filters = tempFilters;

    BaseObject2D._tempMatrix.tx = -bounds.x;
    BaseObject2D._tempMatrix.ty = -bounds.y;

    this._cachedSprite.texture.render(this, BaseObject2D._tempMatrix, true);

    this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
    this._cachedSprite.anchor.y = -(bounds.y / bounds.height);

    this._cacheAsBitmap = true;
};

BaseObject2D.prototype._destroyCachedSprite = function () {
    if (!this._cachedSprite) return;

    this._cachedSprite.texture.destroy(true);

    this._cachedSprite = null;
};

BaseObject2D.prototype.render = function (renderSession) {};

Object.defineProperty(BaseObject2D.prototype, 'x', {
    get: function () {
        return this.position.x;
    },

    set: function (value) {
        this.position.x = value;
    }
});

Object.defineProperty(BaseObject2D.prototype, 'y', {
    get: function () {
        return this.position.y;
    },

    set: function (value) {
        this.position.y = value;
    }
});

BaseObject2D._tempMatrix = new Mat3();

export { BaseObject2D };
