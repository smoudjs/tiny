Tiny.Cache.font = {};

Tiny.Loader.prototype.font = function (key, src, weight) {
    this.list.push({
        key: key,
        src: src,
        weight: weight,
        type: "font"
    });
};

Tiny.Loader.font = function (resource, cb) {

    var weight = resource.weight || 'normal';
    var key = resource.key + '-' + weight;

    if (Tiny.Cache.font[key]) return cb();

    var font = new FontFace(resource.key, 'url(' + resource.src + ')', { weight: weight });
    font.load().then(
        function () {
            document.fonts.add(font);
            Tiny.Cache.font[key] = font;
            cb();
        },
        function () {
            console.error(err);
        }
    );
};