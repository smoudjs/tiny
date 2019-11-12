
Tiny.Loader = function (game)
{
    this.game = game;
    this.cache = []
};

Tiny.Loader.getFrameData = function(key, frameData) {
    var data = []
    for (var i = 0; i < frameData.length; i++) {
        var uuid = "frame_" + Tiny.TextureCacheIdGenerator++
        frameData[i].uuid = uuid
        data.push(frameData[i])

        Tiny.TextureCache[uuid] = new Tiny.Texture(Tiny.BaseTextureCache[key], frameData[i]);
    }
    return data
}

Tiny.Loader.prototype = {

    _getFrameData: function() {

    },

    image: function (key, source) {
        this.cache.push({
            src: source,
            cb: function(asset) {
                Tiny.BaseTextureCache[key] = new Tiny.BaseTexture(asset);
                Tiny.TextureCache[key] = new Tiny.Texture(Tiny.BaseTextureCache[key]);
            }
        })
    },

    spritesheet: function(key, source, frameData) {
        this.cache.push({
            src: source,
            cb: function(asset) {
                Tiny.BaseTextureCache[key] = new Tiny.BaseTexture(asset);
                Tiny.TextureCache[key] = new Tiny.Texture(Tiny.BaseTextureCache[key]);
                Tiny.TextureCache[key].frameData = Tiny.Loader.getFrameData(key, frameData)
            }
        })
    },

    start: function( _cb_ ) {
        var game = this.game
        var cache = this.cache

        if (cache.length == 0) {
          _cb_.call(game)
          return;
        }
        function loadNextData() {
            var done = false;
            var _current_data = cache.shift();
            var img = new Image();
            img.onload = dataLoaded;
            img.src = _current_data.src

            function dataLoaded() {
                _current_data.cb(img)
                if (!done) {
                    img.onload = null;
                    done = true;
                    if (cache.length != 0) {
                        loadNextData();
                    } else {
                        _cb_.call(game)
                    }
                }
            }
        }
        loadNextData();
    }
};