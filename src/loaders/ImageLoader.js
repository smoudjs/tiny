import { LoadingManager } from './LoadingManager';
import { Texture } from '../textures/Texture';
import { Cache } from './Cache';

var ImageLoader = function (resource, cb) {
    // if (Cache["image"][resource.key]) return cb(resource, Cache["image"][resource.key]);

    var image = new Image();

    image.addEventListener('load', function () {
        var texture = new Texture(image);
        Cache.texture[resource.key] = texture;
        Cache.image[resource.key] = texture.base;

        cb(resource, texture.base);
    });

    // image.addEventListener('error', function()
    // {
    //     cb(resource, image);
    // })

    image.src = resource.src;
};

LoadingManager.image = ImageLoader;
LoadingManager.prototype.image = function (key, source) {
    this.list.push({
        src: source,
        key: key,
        type: 'image'
    });
};

export { ImageLoader };
