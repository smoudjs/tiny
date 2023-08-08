import { BaseObject2D } from './BaseObject2D';
import { identityMatrix } from '../math/Mat3';
import { Rectangle, EmptyRectangle } from '../math/shapes/Rectangle';

var Object2D = function () {
    BaseObject2D.call(this);

    this.children = [];
    this._bounds = new Rectangle(0, 0, 1, 1);
    this._currentBounds = null;
    this._mask = null;
};

Object2D.prototype = Object.create(BaseObject2D.prototype);
Object2D.prototype.constructor = Object2D;

// Object.defineProperty(Object2D.prototype, 'inputEnabled', {

//     get: function() {
//         return (this.input && this.input.enabled)
//     },

//     set: function(value) {
//         if (value) {
//             if (this.input === null) {
//                 this.input = {enabled: true, parent: this}
//                 Tiny.EventTarget.mixin(this.input)
//             } else
//                 this.input.enabled = true
//         } else {
//             this.input !== null && (this.input.enabled = false)
//         }
//     }

// });

Object.defineProperty(Object2D.prototype, 'width', {
    get: function () {
        return this.scale.x * this.getLocalBounds().width;
    },

    set: function (value) {
        var width = this.getLocalBounds().width;

        if (width !== 0) {
            this.scale.x = value / width;
        } else {
            this.scale.x = 1;
        }

        this._width = value;
    }
});

Object.defineProperty(Object2D.prototype, 'height', {
    get: function () {
        return this.scale.y * this.getLocalBounds().height;
    },

    set: function (value) {
        var height = this.getLocalBounds().height;

        if (height !== 0) {
            this.scale.y = value / height;
        } else {
            this.scale.y = 1;
        }

        this._height = value;
    }
});

Object.defineProperty(Object2D.prototype, 'mask', {
    get: function () {
        return this._mask;
    },

    set: function (value) {
        if (this._mask) this._mask.isMask = false;

        this._mask = value;

        if (this._mask) this._mask.isMask = true;
    }
});

Object2D.prototype.destroy = function () {
    var i = this.children.length;

    while (i--) {
        this.children[i].destroy();
    }

    this.children = [];

    BaseObject2D.prototype.destroy.call(this);

    this._bounds = null;
    this._currentBounds = null;
    this._mask = null;

    if (this.input) this.input.system.remove(this);
};

Object2D.prototype.add = function (child) {
    return this.addChildAt(child, this.children.length);
};

Object2D.prototype.addChildAt = function (child, index) {
    if (index >= 0 && index <= this.children.length) {
        if (child.parent) {
            child.parent.remove(child);
        }

        child.parent = this;

        if (this.game) child.game = this.game;

        this.children.splice(index, 0, child);

        return child;
    } else {
        throw new Error(
            child + 'addChildAt: The index ' + index + ' supplied is out of bounds ' + this.children.length
        );
    }
};

Object2D.prototype.swapChildren = function (child, child2) {
    if (child === child2) {
        return;
    }

    var index1 = this.getChildIndex(child);
    var index2 = this.getChildIndex(child2);

    if (index1 < 0 || index2 < 0) {
        throw new Error('swapChildren: Both the supplied Objects must be a child of the caller.');
    }

    this.children[index1] = child2;
    this.children[index2] = child;
};

Object2D.prototype.getChildIndex = function (child) {
    var index = this.children.indexOf(child);
    if (index === -1) {
        throw new Error('The supplied Object must be a child of the caller');
    }
    return index;
};

Object2D.prototype.setChildIndex = function (child, index) {
    if (index < 0 || index >= this.children.length) {
        throw new Error('The supplied index is out of bounds');
    }
    var currentIndex = this.getChildIndex(child);
    this.children.splice(currentIndex, 1); //remove from old position
    this.children.splice(index, 0, child); //add at new position
};

Object2D.prototype.getChildAt = function (index) {
    if (index < 0 || index >= this.children.length) {
        throw new Error(
            'getChildAt: Supplied index ' +
                index +
                ' does not exist in the child list, or the supplied Object must be a child of the caller'
        );
    }
    return this.children[index];
};

Object2D.prototype.remove = function (child) {
    var index = this.children.indexOf(child);
    if (index === -1) return;

    return this.removeChildAt(index);
};

Object2D.prototype.removeChildAt = function (index) {
    var child = this.getChildAt(index);
    child.parent = undefined;
    this.children.splice(index, 1);
    return child;
};

Object2D.prototype.updateTransform = function () {
    if (!this.visible) return;

    this.displayObjectUpdateTransform();

    if (this._cacheAsBitmap) return;

    for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i].updateTransform();
    }
};

// performance increase to avoid using call.. (10x faster)
Object2D.prototype.displayObjectContainerUpdateTransform = Object2D.prototype.updateTransform;

Object2D.prototype.getBounds = function () {
    if (this.children.length === 0) return EmptyRectangle;
    if (this._cachedSprite) return this._cachedSprite.getBounds();

    // TODO the bounds have already been calculated this render session so return what we have

    var minX = Infinity;
    var minY = Infinity;

    var maxX = -Infinity;
    var maxY = -Infinity;

    var childBounds;
    var childMaxX;
    var childMaxY;

    var childVisible = false;

    for (var i = 0, j = this.children.length; i < j; i++) {
        var child = this.children[i];

        if (!child.visible) continue;

        childVisible = true;

        childBounds = this.children[i].getBounds();

        minX = minX < childBounds.x ? minX : childBounds.x;
        minY = minY < childBounds.y ? minY : childBounds.y;

        childMaxX = childBounds.width + childBounds.x;
        childMaxY = childBounds.height + childBounds.y;

        maxX = maxX > childMaxX ? maxX : childMaxX;
        maxY = maxY > childMaxY ? maxY : childMaxY;
    }

    if (!childVisible) return EmptyRectangle;

    var bounds = this._bounds;

    bounds.x = minX;
    bounds.y = minY;
    bounds.width = maxX - minX;
    bounds.height = maxY - minY;

    // TODO: store a reference so that if this function gets called again in the render cycle we do not have to recalculate
    //this._currentBounds = bounds;

    return bounds;
};

Object2D.prototype.getLocalBounds = function () {
    var matrixCache = this.worldTransform;

    this.worldTransform = identityMatrix;

    for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i].updateTransform();
    }

    var bounds = this.getBounds();

    this.worldTransform = matrixCache;

    return bounds;
};

Object2D.prototype.render = function (renderSession) {
    if (!this.visible || this.alpha <= 0) return;

    if (this._cacheAsBitmap) {
        this._renderCachedSprite(renderSession);
        return;
    }

    var i, j;

    if (this._mask || this._filters) {
        // push filter first as we need to ensure the stencil buffer is correct for any masking
        if (this._filters) {
            renderSession.spriteBatch.flush();
            renderSession.filterManager.pushFilter(this._filterBlock);
        }

        if (this._mask) {
            renderSession.spriteBatch.stop();
            renderSession.maskManager.pushMask(this.mask, renderSession);
            renderSession.spriteBatch.start();
        }

        // simple render children!
        for (i = 0, j = this.children.length; i < j; i++) {
            this.children[i].render(renderSession);
        }

        renderSession.spriteBatch.stop();

        if (this._mask) renderSession.maskManager.popMask(this._mask, renderSession);
        if (this._filters) renderSession.filterManager.popFilter();

        renderSession.spriteBatch.start();
    } else {
        // simple render children!
        for (i = 0, j = this.children.length; i < j; i++) {
            this.children[i].render(renderSession);
        }
    }
};

export { Object2D };
