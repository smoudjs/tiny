
Tiny.Cache.texture3d = {};

Tiny.Loader.prototype.texture3d = function (key, src, cb) {
    this.list.push({
        key: key,
        src: src,
        type: "texture3d",
        cb: cb
    });
};

Tiny.Loader.texture3d = function (resource, cb) {
    Tiny.Loader.image(resource, function (resource, image) {
        var texture = new Tiny.WebGlTexture(game.renderer.gl, {
            image: image.source,
            flipY: false
        });

        Tiny.Cache.texture3d[resource.key] = texture;

        cb();
    });
};
