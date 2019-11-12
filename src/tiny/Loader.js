var AssetLoader = {};

AssetLoader.maxConcurrency = Infinity;

AssetLoader.assetProgress = {};
AssetLoader.loadedAssets = {};
AssetLoader.queue = [];
AssetLoader.queueIdx = 0;

AssetLoader.load = function(callback) {
    AssetLoader.asyncQueue(AssetLoader.queue, function() {
        // Reset queue and progress for future loading
        AssetLoader.queue = [];
        AssetLoader.assetProgress = {};

        if (typeof callback === 'function') {
            callback();
        }
    });
};

AssetLoader.queueNext = function() {
    AssetLoader.queueIdx++;
};

AssetLoader.loadingCallback = function() {}

AssetLoader.done = function(key, asset) {
    AssetLoader.loadedAssets[key] = asset;
    AssetLoader.updateAssetProgress(key, 1, 1);
    AssetLoader.loadingCallback(key, asset)
};

AssetLoader.push = function(func) {
    if (typeof AssetLoader.queue[AssetLoader.queueIdx] === 'undefined') {
        AssetLoader.queue[AssetLoader.queueIdx] = [];
    }

    AssetLoader.queue[AssetLoader.queueIdx].push(func);
};

AssetLoader.progressListener = null;

AssetLoader.getProgress = function() {
    if (AssetLoader.queue.length <= 0) {
        return 1;
    }

    var total = 0;
    Object.keys(AssetLoader.assetProgress).forEach(function(asset) {
        total += AssetLoader.assetProgress[asset];
    });

    var totalLoaders = 0;
    AssetLoader.queue.forEach(function(collection) {
        totalLoaders += collection.length;
    });

    return total / totalLoaders;
};

AssetLoader.updateAssetProgress = function(asset, done, total) {
    if (AssetLoader.assetProgress[asset] === 1 || total < done || total <= 0) return;

    var progress = 1;
    if (typeof done !== 'undefined' && typeof total !== 'undefined') {
        progress = done / total;
    }

    AssetLoader.assetProgress[asset] = progress;

    if (typeof AssetLoader.progressListener === 'function') {
        AssetLoader.progressListener(AssetLoader.getProgress());
    }
};

AssetLoader.getAssetById = function(id) {
    return AssetLoader.loadedAssets[id];
};


AssetLoader.asyncQueue = function(queue, callback) {
    if (queue.length == 0)
        return callback()
    var workingQueue = queue.slice();
    var next = function() {
        var collection = workingQueue.shift();
        AssetLoader.asyncCollection(collection, function() {
            if (workingQueue.length > 0) {
                next();
            } else {
                callback();
            }
        });
    };
    next();
};


AssetLoader.asyncCollection = function(collection, callback) {
    var collection = collection.slice();
    var numLoading = Math.min(AssetLoader.maxConcurrency, collection.length);

    var loadAndContinue = function(func) {
        func(function() {
            numLoading--;
            if (collection.length > 0) {
                // Load the next one from the collection
                numLoading++;
                loadAndContinue(collection.shift());
            } else if (numLoading === 0) {
                // We're all done, move forward
                callback();
            }
        });
    };

    collection.splice(0, AssetLoader.maxConcurrency).forEach(loadAndContinue);
};

AssetLoader.add = function(key, asset) {
    var fileType = asset.split('.').pop();
    if (fileType === 'png') {
        AssetLoader.add.image(key, asset);
    } else if (fileType === 'json') {
        AssetLoader.add.json(key, asset);
    } else if (fileType === 'css') {
        AssetLoader.add.css(key, asset);
    } else {
        throw new Error('Unsupported file-type (' + fileType + ') passed to AssetLoader.add.');
    }
};

AssetLoader.add.image = function(key, asset) {
    AssetLoader.push(function(done) {
        var img = new Image();
        img.onload = function() {
            AssetLoader.done(key, img);
            // @TODO: Can use XHR instead so we can get actual image loading progress
            AssetLoader.updateAssetProgress(asset, 1, 1);
            done();
        };
        img.src = asset;
    });
};

Tiny.Loader = function (game)
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

Tiny.Loader.prototype = {

    image: function (key, source) {
        AssetLoader.add.image(key, source);
    },

    start: function( _cb_ ) {
        AssetLoader.load(function() {
            _cb_.call(this)
        }.bind(this.game));
    }
};