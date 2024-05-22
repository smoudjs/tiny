var context = window;

var SoundManager = function (game) {
    this.game = game;
};

SoundManager.prototype.constructor = SoundManager;

Object.assign(SoundManager.prototype, {
    volume: function (vol) {
        if (context.Howler) {
            context.Howler.volume(vol);
        }
    },

    loop: function (audio, volume) {
        var sound = Tiny.Cache.sound[audio];

        if (sound) {
            if (volume !== undefined) {
                sound.volume(volume);
            }

            sound.loop(true);
            sound.play();
        }

        return sound;
    },

    play: function (audio, volume) {
        var sound = Tiny.Cache.sound[audio];

        if (sound) {
            if (context.Howler.state === 'running') {
                if (volume !== undefined) {
                    sound.volume(volume);
                }

                sound.play();
            }
        }

        return sound;
    },

    fade: function (audio, volume, duration) {
        var sound = Tiny.Cache.sound[audio];

        if (volume == undefined) volume = 1;
        if (duration == undefined) duration = 600;

        if (sound) {
            if (context.Howler.state === 'running') {
                sound.fade(volume, 0, duration);

                sound.play();
            }
        }

        return sound;
    },

    destroy: function (clearCache) {
        for (var y in Tiny.Cache.sound) Tiny.Cache.sound[y].stop();

        if (clearCache) {
            for (var y in Tiny.Cache.sound) Tiny.Cache.sound[y].unload();
        }
    }
});

// Tiny.SoundManager = SoundManager;
Tiny.registerSystem('sound', SoundManager);