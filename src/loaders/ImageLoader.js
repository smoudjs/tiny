import { LoadingManager } from './LoadingManager';
import { BaseTexture } from '../textures/BaseTexture';
import { Cache } from './Cache';

var ImageLoader = function (resource, cb) {
    // if (Cache["image"][resource.key]) return cb(resource, Cache["image"][resource.key]);

    var image = new Image();

    image.addEventListener('load', function () {
        var baseTexture = new BaseTexture(image);
        Cache.image[resource.key] = baseTexture;

        cb(resource, baseTexture);
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
