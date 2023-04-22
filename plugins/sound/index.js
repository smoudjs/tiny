var context = window;

class SoundManager {
    constructor(game) {
        this.game = game;
    }

    volume(vol) {
        if (context.Howler) {
            context.Howler.volume(vol);
        }
    }

    loop(audio, volume) {
        var sound = Tiny.Cache.sound[audio];

        if (sound) {
            if (volume !== undefined) {
                sound.volume(volume);
            }

            sound.loop(true);
            sound.play();
        }

        return sound;
    }

    play(audio, volume) {
        var sound = Tiny.Cache.sound[audio];

        if (sound) {
            if (context.Howler.state === "running") {
                if (volume !== undefined) {
                    sound.volume(volume);
                }

                sound.play();
            }
        }

        return sound;
    }

    fade(audio, volume, duration) {
        var sound = Tiny.Cache.sound[audio];

        if (volume == undefined) volume = 1;
        if (duration == undefined) duration = 600;

        if (sound) {
            if (context.Howler.state === "running") {
                sound.fade(volume, 0, duration);

                sound.play();
            }
        }

        return sound;
    }

    destroy(clearCache) {
        for (var y in Tiny.Cache.sound) Tiny.Cache.sound[y].stop();

        if (clearCache) {
            for (var y in Tiny.Cache.sound) Tiny.Cache.sound[y].unload();
        }
    }
}

Tiny.Cache.sound = {};

Tiny.Loader.prototype.sound = function (key, src) {
    if (src) {
        this.list.push({
            key: key,
            src: src,
            type: "sound"
        });
    }
};

Tiny.Loader.sound = function (resource, cb) {
    
    if (Tiny.Cache.sound[resource.key]) return cb();

    var sound = new window.Howl({
        src: [resource.src]
    });

    sound.once("load", function () {
        Tiny.Cache.sound[resource.key] = sound;
        cb();
    });
};

// Tiny.SoundManager = SoundManager;
Tiny.registerSystem("sound", SoundManager);
