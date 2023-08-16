import { GLTFLoader } from './GLTFLoader';

Tiny.Cache.gltf = {};
// Tiny.Cache.texture3d = {};
// Tiny.Cache.mesh3d = {};
// Tiny.Cache.animation3d = {};

Tiny.Loader.prototype.gltf = function (key, json, splitObjects, cb) {
    this.list.push({
        key: key,
        src: json,
        type: 'gltf',
        split: splitObjects,
        cb: cb
    });
};

// Tiny.Loader.prototype.texture3d = function (key, src, cb) {
//     this.list.push({
//         key: key,
//         src: src,
//         type: "texture3d",
//         cb: cb
//     });
// };

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

    if (resource.src.length > 200) {
        GLTFLoader.parse(resource.src, '', loaded);
    } else {
        GLTFLoader.load(resource.src, loaded);
    }
};

// Tiny.Loader.texture3d = function (resource, cb) {
//     var key = resource.key;

//     Tiny.Loader.image(resource, function (resource, image) {
//         var texture = new Texture(image);
//         texture.encoding = sRGBEncoding;
//         texture.flipY = false;
//         texture.needsUpdate = true;
//         texture.key = key;

//         Tiny.Cache.texture3d[resource.key] = texture;

//         cb();
//     });
// };
