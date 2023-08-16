Tiny.Cache.sound = {};

Tiny.Loader.prototype.sound = function (key, src) {
    if (src) {
        this.list.push({
            key: key,
            src: src,
            type: 'sound'
        });
    }
};

Tiny.Loader.sound = function (resource, cb) {
    if (Tiny.Cache.sound[resource.key]) return cb();

    var sound = new window.Howl({
        src: [resource.src]
    });

    sound.once('load', function () {
        Tiny.Cache.sound[resource.key] = sound;
        cb();
    });
};
