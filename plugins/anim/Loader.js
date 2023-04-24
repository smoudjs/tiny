Tiny.Cache.keyframes = {};

Tiny.Loader.prototype.keyframes = function (key, src) {
    if (src) {
        this.list.push({
            key: key,
            src: src,
            type: 'keyframes'
        });
    }
};

Tiny.Loader.keyframes = function (resource, cb) {
    Tiny.Cache.sound[resource.key] = resource.src;
    cb();
};
