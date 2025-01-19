import { Object2D } from './Object2D.js';
import { Vec2 } from '../math/Vec2.js';
import { Color } from '../math/Color.js';
import { Cache } from '../loaders/Cache.js';
import { Texture } from '../textures/Texture.js';
import { NormalBlending } from '../constants.js';

var Sprite = function (texture, key) {
    Object2D.call(this);

    this.anchor = new Vec2();

    this.setTexture(texture, key, false);
    this.vertexData = new Float32Array(8);

    this._width = 0;

    this._height = 0;

    // this._frame = 0;

    this.tint = new Color();

    this.blending = NormalBlending;

    if (this.texture.valid) {
        this.onTextureUpdate();
    }

    this.renderable = true;
};

Sprite.prototype = Object.assign(Object.create(Object2D.prototype), {
    constructor: Sprite,

    calculateVertices: function () {
        const texture = this.texture;
        const wt = this.worldTransform.elements;
        const a = wt[0];
        const b = wt[1];
        const c = wt[3];
        const d = wt[4];
        const tx = wt[6];
        const ty = wt[7];
        const vertexData = this.vertexData;
        const trim = texture.trim;
        const frame = texture.frame;
        const aX = this.anchor.x;
        const aY = this.anchor.y;

        let w0 = 0;
        let w1 = 0;
        let h0 = 0;
        let h1 = 0;

        if (trim) {
            // if the sprite is trimmed then we need to add the extra space before transforming the sprite coords..

            w1 = trim.x - aX * trim.width;
            w0 = w1 + texture.crop.width;

            h1 = trim.y - aY * trim.height;
            h0 = h1 + texture.crop.height;
        } else {
            w0 = frame.width * (1 - aX);
            w1 = frame.width * -aX;

            h0 = frame.height * (1 - aY);
            h1 = frame.height * -aY;
        }

        // xy
        vertexData[0] = a * w1 + c * h1 + tx;
        vertexData[1] = d * h1 + b * w1 + ty;

        // xy
        vertexData[2] = a * w0 + c * h1 + tx;
        vertexData[3] = d * h1 + b * w0 + ty;

        // xy
        vertexData[4] = a * w0 + c * h0 + tx;
        vertexData[5] = d * h0 + b * w0 + ty;

        // xy
        vertexData[6] = a * w1 + c * h0 + tx;
        vertexData[7] = d * h0 + b * w1 + ty;
    },

    setTexture: function (texture, frameName, updateDimension) {
        if (typeof texture == 'string') {
            var imagePath = texture;

            if (frameName != undefined) {
                imagePath = imagePath + '.' + frameName;
            }

            texture = Cache.texture[imagePath];

            if (!texture) {
                texture = new Texture(imagePath);
                // throw new Error('Cache Error: image ' + imagePath + ' does`t found in cache');
            }
        }

        if (this.texture === texture) return false;

        this.texture = texture;
        this.cachedTint = '#ffffff';

        if (updateDimension === true) {
            this.onTextureUpdate();
        }

        return true;
    },

    onTextureUpdate: function () {
        // so if _width is 0 then width was not set..
        if (this._width) this.scale.x = this._width / this.texture.frame.width;
        if (this._height) this.scale.y = this._height / this.texture.frame.height;
    },

    // animate: function(delay, yoyo) {
    //     this.reverse = false;
    //     this.yoyo = yoyo;

    //     if (this.texture.lastFrame) {
    //         delay = delay || this.texture.frame.duration || 100;

    //         if (!this.animation) {
    //             this.animation = this.game.timer.loop(
    //                 delay,
    //                 function () {
    //                     if (this.yoyo) {
    //                         if (this.frame === 0) this.reverse = false;
    //                         else if (this.frame === this.texture.lastFrame) this.reverse = true;
    //                     }

    //                     this.frame += this.reverse ? -1 : 1;
    //                     this.animation.delay = delay || this.texture.frame.duration || 100;
    //                 },
    //                 this
    //             );

    //             this.animation.start();
    //         } else {
    //             this.animation.delay = delay;
    //             this.animation.start();
    //         }
    //     }
    // };

    getBounds: function (matrix) {
        var width = this.texture.frame.width / this.texture.base.resolution;
        var height = this.texture.frame.height / this.texture.base.resolution;

        var w0 = width * (1 - this.anchor.x);
        var w1 = width * -this.anchor.x;

        var h0 = height * (1 - this.anchor.y);
        var h1 = height * -this.anchor.y;

        var worldTransform = (matrix || this.worldTransform).elements;

        const a = worldTransform[0];
        const b = worldTransform[1];
        const c = worldTransform[3];
        const d = worldTransform[4];
        const tx = worldTransform[6];
        const ty = worldTransform[7];
        

        var maxX = -Infinity;
        var maxY = -Infinity;

        var minX = Infinity;
        var minY = Infinity;

        if (b === 0 && c === 0) {
            // // scale may be negative!
            // if (a < 0) a *= -1;
            // if (d < 0) d *= -1;

            // // this means there is no rotation going on right? RIGHT?
            // // if thats the case then we can avoid checking the bound values! yay
            // minX = a * w1 + tx;
            // maxX = a * w0 + tx;
            // minY = d * h1 + ty;
            // maxY = d * h0 + ty;

            if (a < 0) {
                minX = a * w0 + tx;
                maxX = a * w1 + tx;
            } else {
                minX = a * w1 + tx;
                maxX = a * w0 + tx;
            }

            if (d < 0) {
                minY = d * h0 + ty;
                maxY = d * h1 + ty;
            } else {
                minY = d * h1 + ty;
                maxY = d * h0 + ty;
            }
        } else {
            var x1 = a * w1 + c * h1 + tx;
            var y1 = d * h1 + b * w1 + ty;

            var x2 = a * w0 + c * h1 + tx;
            var y2 = d * h1 + b * w0 + ty;

            var x3 = a * w0 + c * h0 + tx;
            var y3 = d * h0 + b * w0 + ty;

            var x4 = a * w1 + c * h0 + tx;
            var y4 = d * h0 + b * w1 + ty;

            minX = x1 < minX ? x1 : minX;
            minX = x2 < minX ? x2 : minX;
            minX = x3 < minX ? x3 : minX;
            minX = x4 < minX ? x4 : minX;

            minY = y1 < minY ? y1 : minY;
            minY = y2 < minY ? y2 : minY;
            minY = y3 < minY ? y3 : minY;
            minY = y4 < minY ? y4 : minY;

            maxX = x1 > maxX ? x1 : maxX;
            maxX = x2 > maxX ? x2 : maxX;
            maxX = x3 > maxX ? x3 : maxX;
            maxX = x4 > maxX ? x4 : maxX;

            maxY = y1 > maxY ? y1 : maxY;
            maxY = y2 > maxY ? y2 : maxY;
            maxY = y3 > maxY ? y3 : maxY;
            maxY = y4 > maxY ? y4 : maxY;
        }

        var bounds = this._bounds;

        bounds.x = minX;
        bounds.width = maxX - minX;

        bounds.y = minY;
        bounds.height = maxY - minY;

        // store a reference so that if this function gets called again in the render cycle we do not have to recalculate
        this._currentBounds = bounds;

        return bounds;
    },

    _render: function (renderer) {
        this.calculateVertices();
        
        renderer.setObjectRenderer(renderer.systems.sprite);
        renderer.systems.sprite.render(this);

        // // if the sprite is not visible or the alpha is 0 then no need to render this element
        // if (!this.visible || this.alpha <= 0) return;

        // var i, j;

        // // do a quick check to see if this element has a mask or a filter.
        // if (this._mask || this._filters) {
        //     var spriteBatch = renderer.spriteBatch;

        //     // push filter first as we need to ensure the stencil buffer is correct for any masking
        //     if (this._filters) {
        //         spriteBatch.flush();
        //         renderer.filterManager.pushFilter(this._filterBlock);
        //     }

        //     if (this._mask) {
        //         spriteBatch.stop();
        //         renderer.maskManager.pushMask(this.mask, renderer);
        //         spriteBatch.start();
        //     }

        //     // add this sprite to the batch
        //     spriteBatch.render(this);

        //     // now loop through the children and make sure they get rendered
        //     for (i = 0, j = this.children.length; i < j; i++) {
        //         this.children[i].render(renderer);
        //     }

        //     // time to stop the sprite batch as either a mask element or a filter draw will happen next
        //     spriteBatch.stop();

        //     if (this._mask) renderer.maskManager.popMask(this._mask, renderer);
        //     if (this._filters) renderer.filterManager.popFilter();

        //     spriteBatch.start();
        // } else {
        //     renderer.spriteBatch.render(this);

        //     // simple render children!
        //     for (i = 0, j = this.children.length; i < j; i++) {
        //         this.children[i].render(renderer);
        //     }
        // }
    }
});

Object.defineProperty(Sprite.prototype, 'frameName', {
    get: function () {
        return this.texture.frame.name;
    },

    set: function (value) {
        if (this.texture.frame.name) {
            this.setTexture(Cache.texture[this.texture.key + '.' + value]);
        }
    }
});

// Object.defineProperty(Sprite.prototype, 'frame', {
//     get: function () {
//         return this._frame;
//     },

//     set: function (value) {
//         if (this.texture.lastFrame) {
//             this._frame = value;
//             if (this._frame > this.texture.lastFrame) this._frame = 0;
//             else if (this._frame < 0) this._frame = this.texture.lastFrame;
//             this.setTexture(Cache.texture[this.texture.key + '.' + this._frame]);
//         }
//     }
// });

Object.defineProperty(Sprite.prototype, 'width', {
    get: function () {
        return this.scale.x * this.texture.frame.width;
    },

    set: function (value) {
        this.scale.x = value / this.texture.frame.width;
        this._width = value;
    }
});

Object.defineProperty(Sprite.prototype, 'height', {
    get: function () {
        return this.scale.y * this.texture.frame.height;
    },

    set: function (value) {
        this.scale.y = value / this.texture.frame.height;
        this._height = value;
    }
});

export { Sprite };
