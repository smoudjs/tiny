class AnimationManager {
    constructor(game) {
        this.game = game;
        this.anims = {};
        // this._addedAnims = {};
        this.cache = {};
    }

    create(options) {
        options.system = this;
        options.type = options.type || 'spritesheet';
        this.cache[options.key] = options;
        // this.list.push(options);
    }

    removeAnim(animation) {
        var uuid = animation.uuid;
        delete this.anims[uuid];
        // delete this._addedAnims[uuid];

        // var index = this.list.indexOf(animation);
        // if (index > -1) this.list.splice(index, 1);
    }

    addAnim(anim) {
        var uuid = anim.uuid;
        this.anims[uuid] = anim;
        // this._addedAnims[uuid] = anim;
    }

    add(obj, data) {
        let manager = this;

        obj.anim = {
            cache: {},
            data: data || {},
            current: null,
            system: this
        };

        obj.play = function (options) {
            if (obj.anim.current) manager.removeAnim(obj.anim.current);

            if (typeof options === 'string') options = { key: options };

            var source = manager.cache[options.key];
            var __class__ = Tiny.Anim[source.type];

            for (var key in source) {
                if (options[key] === undefined) options[key] = source[key];
            }

            var animation = new __class__(obj, options);
            obj.anim.current = animation;

            // manager.list.push(animation);
            animation.start();
            // manager.addAnim(animation);

            return animation;

            // body...
        };

        obj.resume = function () {
            obj.anim.current && obj.anim.current.start();
        };

        obj.pause = function () {
            obj.anim.current && obj.anim.current.pause();
        };

        obj.stop = function () {
            obj.anim.current && obj.anim.current.stop();
        };
    }

    update(delta) {
        // for (var i = 0; i < this.list.length; i++) {
        //     this.list[i].update(delta);
        // }

        var _ids = Object.keys(this.anims);

        if (_ids.length === 0) return;

        // do {
        //     this._addedAnims = {};

        for (var i = 0; i < _ids.length; i++) {
            var anim = this.anims[_ids[i]];

            if (anim && anim.update(delta) === false) {
                // anim.running = false;

                // if (!preserve) {
                delete this.anims[_ids[i]];
                // }
            }
        }

        //     _ids = Object.keys(this._addedAnims);

        // } while (_ids.length > 0);

        // while (ids.length > 0) {
        //     this._addedAnims = {};

        // for (var i = 0; i < ids.length; i++) {
        //     var anim = this.anims[ids[i]];

        //     if (anim && anim.update(delta) === false) {
        //         // anim.running = false;

        //         // if (!preserve) {
        //         delete this.anims[ids[i]];
        //         // }
        //     }
        // }

        // ids = Object.keys(this._addedAnims);
        // }

        return true;
    }

    destroy(clearCache) {
        // this.list.length = 0;
        this.cache = {};
        this.anims = {};
        // this._addedAnims = {};
    }
}

Tiny.registerSystem('anim', AnimationManager);
