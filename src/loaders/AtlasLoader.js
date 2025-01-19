import { LoadingSystem } from './LoadingSystem.js';
import { ImageLoader } from './ImageLoader.js';
import { Texture } from '../textures/Texture.js';
import { Cache } from './Cache.js';

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

LoadingSystem.atlas = AtlasLoader;
LoadingSystem.prototype.atlas = function (key, source, atlasData) {
    this.list.push({
        src: source,
        key: key,
        data: atlasData,
        type: 'atlas'
    });
};

export { AtlasLoader };
