require('../asset-loader/AssetLoader.js');


var Loader = function (game)
{
    this.game = game;

    AssetLoader.loadingCallback = function(key, asset) {
        var basedTexture = new Tiny.BaseTexture(asset)
        game.textures[key] = new Tiny.Texture(basedTexture)
    }

    Object.defineProperty(this.game, 'cache', {
        get: function ()
        {
            return AssetLoader.loadedAssets
        }
    });
};

Loader.prototype = {

    image: function (key, source) {
        AssetLoader.add.image(key, source);
    },

    start: function( _cb_ ) {
        AssetLoader.load(function() {
            _cb_.call(this)
        }.bind(this.game));
    }
};

module.exports = Loader

