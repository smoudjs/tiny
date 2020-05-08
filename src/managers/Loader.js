Tiny.Loader = function(game)
{
    this.game = game;
    this.cache = [];
};

Tiny.Loader.loadSpriteSheet = function(key, frameData)
{
    var max_no_frame = (frameData.length - 1);

    for (var i = 0; i <= max_no_frame; i++)
    {
        var uuid = key + "_" + i;

        Tiny.TextureCache[uuid] = new Tiny.Texture(Tiny.BaseTextureCache[key],
        {
            index: i,
            x: Math.floor(frameData[i].x),
            y: Math.floor(frameData[i].y),
            width: Math.floor(frameData[i].width),
            height: Math.floor(frameData[i].height),
            duration: frameData[i].duration
        });
        Tiny.TextureCache[uuid].key = key;
        Tiny.TextureCache[uuid].max_no_frame = max_no_frame;
    }

    return max_no_frame;
}

Tiny.Loader.parseSpriteSheet = function(key, frameWidth, frameHeight, duration)
{
    var img = Tiny.BaseTextureCache[key];

    var width = img.width;
    var height = img.height;

    if (frameWidth <= 0)
    {
        frameWidth = Math.floor(-width / Math.min(-1, frameWidth));
    }

    if (frameHeight <= 0)
    {
        frameHeight = Math.floor(-height / Math.min(-1, frameHeight));
    }

    var row = Math.floor((width) / (frameWidth));
    var column = Math.floor((height) / (frameHeight));
    var total = row * column;

    if (total === 0) 
    {
        return null;
    }

    var x = 0;
    var y = 0;

    var max_no_frame = total - 1;
    var frameData = {};

    for (var i = 0; i < total; i++)
    {
        frameData = {
            index: i,
            x: x,
            y: y,
            width: frameWidth,
            height: frameHeight,
            duration: duration
        }
        var uuid = key + "_" + i;
        Tiny.TextureCache[uuid] = new Tiny.Texture(img, frameData);
        Tiny.TextureCache[uuid].key = key;
        Tiny.TextureCache[uuid].max_no_frame = max_no_frame;

        x += frameWidth;

        if (x + frameWidth > width)
        {
            x = 0;
            y += frameHeight;
        }
    }

    return max_no_frame;
}

Tiny.Loader.loadAtlas = function(key, atlasData)
{
    for (var i = 0; i < atlasData.length; i++)
    {
        var keyframe = key + "_" + atlasData[i].name

        Tiny.TextureCache[keyframe] = new Tiny.Texture(Tiny.BaseTextureCache[key], atlasData[i]);
        Tiny.TextureCache[keyframe].key = key;
    }
}

Tiny.Loader.prototype = {

    image: function(key, source)
    {
        this.cache.push(
        {
            src: source,
            key: key,
            cb: function() {}
        })
    },

    spritesheet: function(key, source, arg_1, arg_2, duration)
    {
        this.cache.push(
        {
            src: source,
            key: key,
            cb: function()
            {
                if (typeof arg_1 == "number") 
                {
                    Tiny.TextureCache[key].max_no_frame = Tiny.Loader.parseSpriteSheet(key, arg_1, arg_2, duration);
                }
                else if (arg_1.length > 0) 
                {
                    Tiny.TextureCache[key].max_no_frame = Tiny.Loader.loadSpriteSheet(key, arg_1);
                }
            }
        })
    },

    atlas: function(key, source, atlasData)
    {
        this.cache.push(
        {
            src: source,
            key: key,
            cb: function()
            {
                Tiny.Loader.loadAtlas(key, atlasData);
            }
        })
    },

    start: function(_cb_)
    {
        var game = this.game;
        var cache = this.cache;

        if (cache.length == 0)
        {
            _cb_.call(game);
            return;
        }

        function loadNextData()
        {
            var done = false;
            var _current_data = cache.shift();
            var img = new Image();
            img.onload = dataLoaded;
            img.src = _current_data.src

            function dataLoaded()
            {
                Tiny.BaseTextureCache[_current_data.key] = new Tiny.BaseTexture(img);
                Tiny.TextureCache[_current_data.key] = new Tiny.Texture(Tiny.BaseTextureCache[_current_data.key]);
                Tiny.TextureCache[_current_data.key].key = _current_data.key

                _current_data.cb()
                if (!done)
                {
                    img.onload = null;
                    done = true;
                    if (cache.length != 0)
                    {
                        loadNextData();
                    }
                    else
                    {
                        _cb_.call(game)
                    }
                }
            }
        }
        loadNextData();
    }
};