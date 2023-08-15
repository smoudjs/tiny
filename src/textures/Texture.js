import { Rectangle } from '../math/shapes/Rectangle';
import { Cache } from '../app/Cache';
import { TextureUvs } from './TextureUvs';
import { BaseTexture } from './BaseTexture';

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

    this._uvs = null;

    this.width = 0;

    this.height = 0;

    this.crop = crop || new Rectangle(0, 0, 1, 1);

    if (base.valid) {
        this.onBaseUpdate();
    } else {
        base.onload = this.onBaseUpdate.bind(this);
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

Texture.prototype.constructor = Texture;

Texture.prototype.onBaseUpdate = function () {
    // this.hasLoaded = true;
    // this.width = this.source.naturalWidth || this.source.width;
    // this.height = this.source.naturalHeight || this.source.height;

    var baseTexture = this.base;

    if (this.noFrame) this.frame = new Rectangle(0, 0, baseTexture.width, baseTexture.height);

    this.setFrame(this.frame);
};

Texture.prototype.addToCache = function (key, frameName) {
    this.key = this.key || key;
    this.frame.name = this.frame.name || frameName;

    if (this.frame.name) key += '.' + this.frame.name;

    Cache.texture[key] = this;
};

Texture.prototype.destroy = function (destroyBase) {
    if (destroyBase) this.base.destroy();

    if (this.key) {
        delete Cache.texture[this.key];
    }
    // this.source = null;
    this.valid = false;
};

Texture.prototype.setFrame = function (frame) {
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

    if (this.valid) this._updateUvs();
};

Texture.prototype._updateUvs = function () {
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
};

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
