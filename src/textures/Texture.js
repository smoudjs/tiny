import { Rectangle } from '../math/shapes/Rectangle';
import { Cache } from '../systems/Loader';

// Tiny.TextureCache = {};
// Tiny.FrameCache = {};
Tiny.TextureCacheIdGenerator = 0;
Tiny.TextureSilentFail = false;

var Texture = function (source, frame, crop, trim) {
    // console.log(this);
    this.noFrame = false;

    this.resolution = 1;

    this.hasLoaded = false;

    if (!frame) {
        this.noFrame = true;
        frame = new Rectangle(0, 0, 1, 1);
    }

    if (typeof source == 'string') {
        var key = source;

        source = Cache.image[key];

        if (!source) throw new Error('Cache Error: image ' + key + ' does`t found in cache');

        Cache.texture[key] = this;

        this.key = key;
    }

    this.source = source;

    this.frame = frame;

    this.trim = trim;

    this.valid = false;

    this.width = 0;

    this.height = 0;

    this.crop = crop || new Rectangle(0, 0, 1, 1);

    if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height) {
        this.onSourceLoaded();
    } else {
        var scope = this;
        this.source.onload = function () {
            scope.onSourceLoaded();
        };
    }
};

Texture.prototype.constructor = Texture;

Texture.prototype.onSourceLoaded = function () {
    this.hasLoaded = true;
    this.width = this.source.naturalWidth || this.source.width;
    this.height = this.source.naturalHeight || this.source.height;

    if (this.noFrame) this.frame = new Rectangle(0, 0, this.width, this.height);

    this.setFrame(this.frame);
};

Texture.prototype.addToCache = function (key, frameName) {
    this.key = this.key || key;
    this.frame.name = this.frame.name || frameName;

    if (this.frame.name) key += '.' + this.frame.name;

    Cache.texture[key] = this;
};

Texture.prototype.destroy = function () {
    if (this.key) {
        delete Cache.texture[this.key];
    }

    this.source = null;
    this.valid = false;
};

Texture.prototype.setFrame = function (frame) {
    this.noFrame = false;

    this.frame = frame;

    this.valid = frame && frame.width && frame.height && this.source && this.hasLoaded;

    if (!this.valid) return;

    // this.width = frame.width;
    // this.height = frame.height;

    this.crop.x = frame.x;
    this.crop.y = frame.y;
    this.crop.width = frame.width;
    this.crop.height = frame.height;

    if (!this.trim && (frame.x + frame.width > this.width || frame.y + frame.height > this.height)) {
        if (!TextureSilentFail) {
            throw new Error('Texture Error: frame does not fit inside the base Texture dimensions ' + this);
        }

        this.valid = false;
        return;
    }

    if (this.trim) {
        // this.width = this.trim.width;
        // this.height = this.trim.height;
        this.frame.width = this.trim.width;
        this.frame.height = this.trim.height;
    }
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

Texture.fromCanvas = function (canvas) {
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
    return new Texture(canvas);
};

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
