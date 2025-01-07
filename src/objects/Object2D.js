import { Vec2 } from '../math/Vec2.js';
import { Mat3 } from '../math/Mat3.js';
// import { Entity2D } from './Entity2D';
import { identityMatrix } from '../math/Mat3';
import { Rectangle, EmptyRectangle } from '../math/shapes/Rectangle';
import { Container } from './Container.js';

var pi2 = Math.PI * 2;

var Object2D = function () {
    // Entity2D.call(this);
    Container.call(this);

    this.position = new Vec2(0, 0);
    this.scale = new Vec2(1, 1);
    this.pivot = new Vec2(0, 0);
    this.skew = new Vec2(0, 0);
    this.rotation = 0;
    this.opacity = 1;
    this.visible = true;
    this.renderable = false;
    // this.parent = null;
    this.worldOpacity = 1;
    this.worldTransform = new Mat3();
    this._cx = 1; // cos rotation + skewY;
    this._sx = 0; // sin rotation + skewY;
    this._cy = 0; // cos rotation + Math.PI/2 - skewX;
    this._sy = 1; // sin rotation + Math.PI/2 - skewX;
    this._cacheAsBitmap = false;

    // this.children = [];
    this._bounds = new Rectangle(0, 0, 1, 1);
    this._currentBounds = null;
    this._mask = null;
};

Object2D.prototype = Object.assign(Object.create(Container.prototype), {
    constructor: Object2D,

    isObject: true
});

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

Object2D.prototype.dispose = function (options) {
    Container.prototype.dispose.call(this, options);

    this.worldTransform = null;

    this.visible = false;
    this.renderable = false;
    this._destroyCachedSprite();

    // Entity2D.prototype.destroy.call(this);

    this._bounds = null;
    this._currentBounds = null;
    this._mask = null;

    this.emit('dispose');
    // if (this.input) this.input.system.remove(this);
};

// Object2D.prototype.add = function (child) {
//     return this.addChildAt(child, this.children.length);
// };

// Object2D.prototype.addChildAt = function (child, index) {
//     if (index >= 0 && index <= this.children.length) {
//         if (child.parent) {
//             child.parent.remove(child);
//         }

//         child.parent = this;

//         if (this.game) child.game = this.game;

//         this.children.splice(index, 0, child);

//         return child;
//     } else {
//         throw new Error(
//             child + 'addChildAt: The index ' + index + ' supplied is out of bounds ' + this.children.length
//         );
//     }
// };

// Object2D.prototype.swapChildren = function (child, child2) {
//     if (child === child2) {
//         return;
//     }

//     var index1 = this.getChildIndex(child);
//     var index2 = this.getChildIndex(child2);

//     if (index1 < 0 || index2 < 0) {
//         throw new Error('swapChildren: Both the supplied Objects must be a child of the caller.');
//     }

//     this.children[index1] = child2;
//     this.children[index2] = child;
// };

// Object2D.prototype.getChildIndex = function (child) {
//     var index = this.children.indexOf(child);
//     if (index === -1) {
//         throw new Error('The supplied Object must be a child of the caller');
//     }
//     return index;
// };

// Object2D.prototype.setChildIndex = function (child, index) {
//     if (index < 0 || index >= this.children.length) {
//         throw new Error('The supplied index is out of bounds');
//     }
//     var currentIndex = this.getChildIndex(child);
//     this.children.splice(currentIndex, 1); //remove from old position
//     this.children.splice(index, 0, child); //add at new position
// };

// Object2D.prototype.getChildAt = function (index) {
//     if (index < 0 || index >= this.children.length) {
//         throw new Error(
//             'getChildAt: Supplied index ' +
//                 index +
//                 ' does not exist in the child list, or the supplied Object must be a child of the caller'
//         );
//     }
//     return this.children[index];
// };

// Object2D.prototype.remove = function (child) {
//     var index = this.children.indexOf(child);
//     if (index === -1) return;

//     return this.removeChildAt(index);
// };

// Object2D.prototype.removeChildAt = function (index) {
//     var child = this.getChildAt(index);
//     child.parent = undefined;
//     this.children.splice(index, 1);
//     return child;
// };

Object2D.prototype.updateTransform = function () {
    if (!this.visible) return;

    if (!this.parent) {
        return;
    }

    var worldTransform;
    var worldOpacity;
    if (this.parent.isScene) {
        worldTransform = identityMatrix;
        worldOpacity = 1;
    } else {
        worldTransform = this.parent.worldTransform;
        worldOpacity = this.parent.worldOpacity;
    }

    // create some matrix refs for easy access
    var pt = worldTransform.elements;
    var wt = this.worldTransform.elements;

    // temporary matrix variables
    var a, b, c, d, tx, ty;

    // so if rotation is between 0 then we can simplify the multiplication process..
    if (this.rotation % pi2 || this.skew.x !== 0 || this.skew.y !== 0) {
        // check to see if the rotation is the same as the previous render. This means we only need to use sin and cos when rotation actually changes
        if (this.rotation !== this._rot || this._skX !== this.skew.x || this._skY !== this.skew.y) {
            this._rot = this.rotation;
            this._skX = this.skew.x;
            this._skY = this.skew.y;
            this._cx = Math.cos(this.rotation + this._skY);
            this._sx = Math.sin(this.rotation + this._skY);
            this._cy = -Math.sin(this.rotation - this._skX); // cos, added PI/2
            this._sy = Math.cos(this.rotation - this._skX);
        }

        // get the matrix values of the displayobject based on its transform properties..
        a = this._cx * this.scale.x;
        b = this._sx * this.scale.x;
        c = this._cy * this.scale.y;
        d = this._sy * this.scale.y;
        tx = this.position.x;
        ty = this.position.y;

        // check for pivot.. not often used so geared towards that fact!
        if (this.pivot.x || this.pivot.y) {
            tx -= this.pivot.x * a + this.pivot.y * c;
            ty -= this.pivot.x * b + this.pivot.y * d;
        }

        // concat the parent matrix with the objects transform.
        wt[0] = a * pt[0] + b * pt[3];
        wt[1] = a * pt[1] + b * pt[4];
        wt[3] = c * pt[0] + d * pt[3];
        wt[4] = c * pt[1] + d * pt[4];
        wt[6] = tx * pt[0] + ty * pt[3] + pt[6];
        wt[7] = tx * pt[1] + ty * pt[4] + pt[7];
    } else {
        // lets do the fast version as we know there is no rotation..
        a = this.scale.x;
        d = this.scale.y;

        tx = this.position.x - this.pivot.x * a;
        ty = this.position.y - this.pivot.y * d;

        wt[0] = a * pt[0];
        wt[1] = a * pt[1];
        wt[3] = d * pt[3];
        wt[4] = d * pt[4];
        wt[6] = tx * pt[0] + ty * pt[3] + pt[6];
        wt[7] = tx * pt[1] + ty * pt[4] + pt[7];
    }

    // multiply the alphas..
    this.worldOpacity = this.opacity * worldOpacity;

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

Object2D.prototype._render = function () {};

Object2D.prototype.render = function (renderer) {
    // if the object is not visible or the alpha is 0 then no need to render this element
    if (!this.visible || this.worldOpacity <= 0) {
        return;
    }

    // do a quick check to see if this element has a mask or a filter.
    if (this._mask || this._filters) {
        this.renderAdvancedWebGL(renderer);
    } else {
        this._render(renderer);

        // simple render children!
        for (let i = 0, j = this.children.length; i < j; ++i) {
            this.children[i].render(renderer);
        }
    }
};

/**
 * Render the object using the WebGL renderer and advanced features.
 *
 * @private
 * @param {PIXI.WebGLRenderer} renderer - The renderer
 */
Object2D.prototype.renderAdvancedWebGL = function (renderer) {
    renderer.flush();

    const filters = this._filters;
    const mask = this._mask;

    // push filter first as we need to ensure the stencil buffer is correct for any masking
    if (filters) {
        if (!this._enabledFilters) {
            this._enabledFilters = [];
        }

        this._enabledFilters.length = 0;

        for (let i = 0; i < filters.length; i++) {
            if (filters[i].enabled) {
                this._enabledFilters.push(filters[i]);
            }
        }

        if (this._enabledFilters.length) {
            renderer.filterManager.pushFilter(this, this._enabledFilters);
        }
    }

    if (mask) {
        renderer.maskManager.pushMask(this, this._mask);
    }

    // add this object to the batch, only rendered if it has a texture.
    this._render(renderer);

    // now loop through the children and make sure they get rendered
    for (let i = 0, j = this.children.length; i < j; i++) {
        this.children[i].render(renderer);
    }

    renderer.flush();

    if (mask) {
        renderer.maskManager.popMask(this, this._mask);
    }

    if (filters && this._enabledFilters && this._enabledFilters.length) {
        renderer.filterManager.popFilter();
    }
};

Object2D.prototype.renderOLD = function (renderSession) {
    if (!this.visible || this.opacity <= 0) return;

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
