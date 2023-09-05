import {GLTFLoader} from './GLTFLoader';

const loader = new GLTFLoader();

Tiny.Cache.gltf = {};

Tiny.Loader.prototype.gltf = function (key, json, splitObjects, cb) {
    this.list.push({
        key: key,
        src: json,
        type: 'gltf',
        split: splitObjects,
        cb: cb
    });
};

Tiny.Loader.gltf = function (resource, cb) {
    var key = resource.key;

    function loaded(gltf) {
        Tiny.Cache.gltf[key] = gltf;

        if (resource.split) {
            gltf.scene.traverse(function (obj) {
                if (obj.isMesh) Tiny.Cache.mesh3d[key + '.' + obj.name] = obj;
            });

            for (var i = 0; i < gltf.animations.length; i++) {
                var obj = gltf.animations[i];
                Tiny.Cache.animation3d[key + '.' + obj.name] = obj;
            }
        }

        if (resource.cb) resource.cb(gltf);

        cb();
    }

    loader.parse(resource.src, '', loaded);
};