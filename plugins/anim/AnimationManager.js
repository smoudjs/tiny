class AnimationManager {
    constructor(game) {
        this.game = game;
        this.list = [];
        this.anims = {};
        this.uid = 0;
    }

    create(options) {
        options.type = options.type || 'spritesheet';
        this.anims[options.key] = options;
        // this.list.push(options);
    }

    remove(animation) {
        var index = this.list.indexOf(animation);
        if (index > -1) this.list.splice(index, 1);
    }

    add(obj) {
        let manager = this;

        obj.anim = {};

        obj.play = function (options) {
            
            if (obj.anim.current) manager.remove(obj.anim.current);

            if (typeof options === 'string') options = { key: options };

            var source = manager.anims[options.key];
            var __class__ = Tiny.Anim[source.type];

            for (var key in source) {
                if (options[key] === undefined) options[key] = source[key];
            }

            var animation = new __class__(obj, options);
            obj.anim.current = animation;
            // manager.list[++this.uid] = animation;
            manager.list.push(animation);
            animation.start();

            return animation;

            // body...
        };

        obj.pause = function () {
            obj.anim.current && obj.anim.current.pause();
        };

        obj.stop = function () {
            if (obj.anim.current) {
                obj.anim.current.stop();
                manager.remove(obj.anim.current);
            }
        };
    }

    update(delta) {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].update(delta);
        }
    }

    destroy(clearCache) {
        this.list.length = 0;
        this.anims = {};
    }
}

Tiny.registerSystem('anim', AnimationManager);
