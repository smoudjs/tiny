import { Rectangle } from '../math/shapes/Rectangle.js';
import { Cache } from '../loaders/Cache.js';
import { TextureUvs } from './TextureUvs.js';
import { BaseTexture } from './BaseTexture.js';
import { Mat3 } from '../math/Mat3.js';
import { Vec2 } from '../math/Vec2.js';

// Tiny.TextureCache = {};
// Tiny.FrameCache = {};
// Tiny.TextureCacheIdGenerator = 0;
// Tiny.TextureSilentFail = false;

var Texture = function (base, frame, crop, trim) {
    // console.log(this);
    this.noFrame = false;

    // this.resolution = 1;

    // this.hasLoaded = false;

    if (!frame) {
        this.noFrame = true;
        frame = new Rectangle(0, 0, 1, 1);
    }

    if (typeof base == 'string') {
        var key = base;

        base = Cache.image[key];
        if (!base) throw new Error('Cache Error: image ' + key + ' does`t found in cache');

        Cache.texture[key] = this;

        this.key = key;
    } else if (base instanceof Texture) {
        base = base.base;
    } else if (!(base instanceof BaseTexture)) {
        base = new BaseTexture(base);
    }

    this.base = base;

    this.frame = frame;

    this.trim = trim;

    this.valid = false;

    this.matrixAutoUpdate = false;
    // this.matrix = new Mat3();
    this.matrix = null;
    this.center = new Vec2(0, 0);

    this._uvs = null;

    this.width = 0;

    this.height = 0;

    this.rotation = 0;

    this.crop = crop || new Rectangle(0, 0, 1, 1);

    if (base.valid) {
        this.onBaseUpdate();
    } else {
        base.once('load', this.onBaseUpdate, this);
    }

    // if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height) {
    //     this.onSourceLoaded();
    // } else {
    //     var scope = this;
    //     this.source.onload = function () {
    //         scope.onSourceLoaded();
    //     };
    // }
};

Object.assign(Texture.prototype, {
    constructor: Texture,

    updateMatrix: function () {
        // return;
        // console.log('dasdasd');
        // if (!this._uvs) this._uvs = new TextureUvs();

        if (!this.matrix) this.matrix = new Mat3();

        var frame = this.crop;
        var tw = this.base.width;
        var th = this.base.height;

        var x0 = frame.x / tw;
        var y0 = frame.y / th;

        // var x1 = (frame.x + frame.width) / tw;
        // var y1 = frame.y / th;

        // var x2 = (frame.x + frame.width) / tw;
        // var y2 = (frame.y + frame.height) / th;

        // var x3 = frame.x / tw;
        // var y3 = (frame.y + frame.height) / th;

        var c = Math.cos(this.rotation);
        var s = Math.sin(this.rotation);

        var cx = this.center.x;
        var cy = this.center.y;

        // if (this.rotation !== 0) {
        // const w2 = frame.width / 2 / tw;
        // const h2 = frame.height / 2 / th;

        // const cX = (frame.x / tw) + w2;
        // const cY = (frame.y / th) + h2;

        // console.log(w2, h2)
        // console.log(cX, cY)

        // cx = 1- cX;
        // cy =  1- cY;
        // }

        var sx = frame.width / tw;
        var sy = frame.height / th;

        if (this.base.flipY) {
            // cy = 1 - cy;
            y0 = 1 - y0 - sy;
        }

        x0 -= (1 - sx) * cx;
        y0 -= (1 - sy) * cy;

        // if (this.base.id == 2) {
        //     console.log(y0);
        // }

        this.matrix.set(
            sx * c, sx * s, -sx * (c * cx + s * cy) + cx + x0,
            -sy * s, sy * c, -sy * (-s * cx + c * cy) + cy + y0,
            0, 0, 1
        );

        let elements = this.matrix.elements;

        if (this.base.flipY) {
            // cy = 1 - cy;
            y0 = 1 - y0 - sy;
        }

        const x1 = x0 + elements[0];
        const y1 = y0;
        const x2 = x0 + elements[0];
        const y2 = y0 + elements[4];
        const x3 = x0;
        const y3 = y0 + elements[4];

        if (!this._uvs) this._uvs = new Uint32Array(4);

        this._uvs[0] = ((Math.round(y0 * 65535) & 0xffff) << 16) | (Math.round(x0 * 65535) & 0xffff);
        this._uvs[1] = ((Math.round(y1 * 65535) & 0xffff) << 16) | (Math.round(x1 * 65535) & 0xffff);
        this._uvs[2] = ((Math.round(y2 * 65535) & 0xffff) << 16) | (Math.round(x2 * 65535) & 0xffff);
        this._uvs[3] = ((Math.round(y3 * 65535) & 0xffff) << 16) | (Math.round(x3 * 65535) & 0xffff);

        // console.log(y0, this.matrix.elements[7]);
        // this.matrix.setUvTransform(0.5, 0, 0.5, 1, 0, 0.5, 0.5);

        // setUvTransform: function ( tx, ty, sx, sy, rotation, cx, cy ) {

        // console.log(x0, y0)
        // console.log(x1, y1)
        // console.log(x2, y2)
        // console.log(x3, y3)

        // },

        // this.matrix.set(1, 0.5, 0, 0, 1, 0, 0, 0, 1);
        // this.matrix.set(
        //     this._uvs.x0, this._uvs.x1, this._uvs.x2,
        //     this._uvs.y1, this._uvs.y0, this._uvs.y2,
        //     0, 0, 1
        // );

        // this.matrix.setUvTransform(
        //     this.offset.x,
        //     this.offset.y,
        //     this.repeat.x,
        //     this.repeat.y,
        //     this.rotation,
        //     this.center.x,
        //     this.center.y
        // );
    },

    onBaseUpdate: function () {
        // this.hasLoaded = true;
        // this.width = this.source.naturalWidth || this.source.width;
        // this.height = this.source.naturalHeight || this.source.height;

        var baseTexture = this.base;

        if (this.noFrame) this.frame = new Rectangle(0, 0, baseTexture.width, baseTexture.height);

        this.setFrame(this.frame);
    },

    addToCache: function (key, frameName) {
        this.key = this.key || key;
        this.frame.name = this.frame.name || frameName;

        if (this.frame.name) key += '.' + this.frame.name;

        Cache.texture[key] = this;
    },

    destroy: function (destroyBase) {
        this.base.off('load', this.onBaseUpdate, this);
        if (destroyBase) this.base.destroy();

        if (this.key) {
            delete Cache.texture[this.key];
        }
        // this.source = null;
        this.valid = false;
    },

    setFrame: function (frame) {
        this.noFrame = false;

        this.frame = frame;
        this.width = frame.width;
        this.height = frame.height;

        this.crop.x = frame.x;
        this.crop.y = frame.y;
        this.crop.width = frame.width;
        this.crop.height = frame.height;

        if (
            !this.trim &&
            (frame.x + frame.width > this.base.width || frame.y + frame.height > this.base.height)
        ) {
            // throw new Error('Texture Error: frame does not fit inside the base Texture dimensions ' + this);

            this.valid = false;
            return;
        }

        this.valid = frame && frame.width && frame.height && this.base.valid;

        if (this.trim) {
            this.width = this.trim.width;
            this.height = this.trim.height;
            this.frame.width = this.trim.width;
            this.frame.height = this.trim.height;
        }

        if (this.valid) this.updateMatrix();
    },

    _updateUvs: function () {
        if (!this._uvs) this._uvs = new TextureUvs();

        var frame = this.crop;
        var tw = this.base.width;
        var th = this.base.height;

        this._uvs.x0 = frame.x / tw;
        this._uvs.y0 = frame.y / th;

        this._uvs.x1 = (frame.x + frame.width) / tw;
        this._uvs.y1 = frame.y / th;

        this._uvs.x2 = (frame.x + frame.width) / tw;
        this._uvs.y2 = (frame.y + frame.height) / th;

        this._uvs.x3 = frame.x / tw;
        this._uvs.y3 = (frame.y + frame.height) / th;

        this.uvsUint32 = [];

        this.uvsUint32[0] =
            ((Math.round(this._uvs.y0 * 65535) & 0xffff) << 16) | (Math.round(this._uvs.x0 * 65535) & 0xffff);
        this.uvsUint32[1] =
            ((Math.round(this._uvs.y1 * 65535) & 0xffff) << 16) | (Math.round(this._uvs.x1 * 65535) & 0xffff);
        this.uvsUint32[2] =
            ((Math.round(this._uvs.y2 * 65535) & 0xffff) << 16) | (Math.round(this._uvs.x2 * 65535) & 0xffff);
        this.uvsUint32[3] =
            ((Math.round(this._uvs.y3 * 65535) & 0xffff) << 16) | (Math.round(this._uvs.x3 * 65535) & 0xffff);
    }
});

// Texture.fromImage = function(key, imageUrl, crossorigin)
// {
//     var texture = TextureCache[key];

//     if(!texture)
//     {
//         texture = new Texture(Tiny.BaseTexture.fromImage(key, imageUrl, crossorigin));
//         texture.key = key
//         TextureCache[key] = texture;
//     }

//     return texture;
// };

// Texture.fromFrame = function(frameId)
// {
//     var texture = TextureCache[frameId];
//     if(!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache ');
//     return texture;
// };

// Texture.fromCanvas = function (canvas) {
// if(!canvas._tinyId)
// {
//     canvas._tinyId = '_from_canvas_' + TextureCacheIdGenerator++;
// }

// var texture = Cache.texture[canvas._tinyId];

// if(!texture)
// {
//     texture = new Texture( canvas );
//     Cache.texture[canvas._tinyId] = texture;
// }

// return texture;
// return new Texture(canvas);
// };

// Texture.addTextureToCache = function(texture, id)
// {
//     TextureCache[id] = texture;
// };

// Texture.removeTextureFromCache = function(id)
// {
//     var texture = TextureCache[id];
//     delete TextureCache[id];
//     delete Tiny.BaseTextureCache[id];
//     return texture;
// };

export { Texture };
