import { LoadingManager } from './LoadingManager';
import { ImageLoader } from './ImageLoader';
import { Texture } from '../textures/Texture';
import { Cache } from './Cache';

var AtlasLoader = function (resource, cb) {
    var key = resource.key;

    ImageLoader(resource, function (resource, base) {
        for (var i = 0; i < resource.data.length; i++) {
            var uuid = key + '.' + resource.data[i].name;
            var texture = new Texture(base, resource.data[i]);
            texture.key = key;

            Cache.texture[uuid] = texture;
        }

        cb();
    });
};

LoadingManager.atlas = AtlasLoader;
LoadingManager.prototype.atlas = function (key, source, atlasData) {
    this.list.push({
        src: source,
        key: key,
        data: atlasData,
        type: 'atlas'
    });
};

export { AtlasLoader };
