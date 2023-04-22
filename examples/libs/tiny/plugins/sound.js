/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./plugins/sound/index.js ***!
  \********************************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9zb3VuZC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL3NvdW5kL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBjb250ZXh0ID0gd2luZG93O1xyXG5cclxuY2xhc3MgU291bmRNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKGdhbWUpIHtcclxuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHZvbHVtZSh2b2wpIHtcclxuICAgICAgICBpZiAoY29udGV4dC5Ib3dsZXIpIHtcclxuICAgICAgICAgICAgY29udGV4dC5Ib3dsZXIudm9sdW1lKHZvbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvb3AoYXVkaW8sIHZvbHVtZSkge1xyXG4gICAgICAgIHZhciBzb3VuZCA9IFRpbnkuQ2FjaGUuc291bmRbYXVkaW9dO1xyXG5cclxuICAgICAgICBpZiAoc291bmQpIHtcclxuICAgICAgICAgICAgaWYgKHZvbHVtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzb3VuZC52b2x1bWUodm9sdW1lKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc291bmQubG9vcCh0cnVlKTtcclxuICAgICAgICAgICAgc291bmQucGxheSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNvdW5kO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoYXVkaW8sIHZvbHVtZSkge1xyXG4gICAgICAgIHZhciBzb3VuZCA9IFRpbnkuQ2FjaGUuc291bmRbYXVkaW9dO1xyXG5cclxuICAgICAgICBpZiAoc291bmQpIHtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuSG93bGVyLnN0YXRlID09PSBcInJ1bm5pbmdcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZvbHVtZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291bmQudm9sdW1lKHZvbHVtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc291bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgZmFkZShhdWRpbywgdm9sdW1lLCBkdXJhdGlvbikge1xyXG4gICAgICAgIHZhciBzb3VuZCA9IFRpbnkuQ2FjaGUuc291bmRbYXVkaW9dO1xyXG5cclxuICAgICAgICBpZiAodm9sdW1lID09IHVuZGVmaW5lZCkgdm9sdW1lID0gMTtcclxuICAgICAgICBpZiAoZHVyYXRpb24gPT0gdW5kZWZpbmVkKSBkdXJhdGlvbiA9IDYwMDtcclxuXHJcbiAgICAgICAgaWYgKHNvdW5kKSB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lkhvd2xlci5zdGF0ZSA9PT0gXCJydW5uaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHNvdW5kLmZhZGUodm9sdW1lLCAwLCBkdXJhdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc291bmQ7XHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveShjbGVhckNhY2hlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgeSBpbiBUaW55LkNhY2hlLnNvdW5kKSBUaW55LkNhY2hlLnNvdW5kW3ldLnN0b3AoKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyQ2FjaGUpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeSBpbiBUaW55LkNhY2hlLnNvdW5kKSBUaW55LkNhY2hlLnNvdW5kW3ldLnVubG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuVGlueS5DYWNoZS5zb3VuZCA9IHt9O1xyXG5cclxuVGlueS5Mb2FkZXIucHJvdG90eXBlLnNvdW5kID0gZnVuY3Rpb24gKGtleSwgc3JjKSB7XHJcbiAgICBpZiAoc3JjKSB7XHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2goe1xyXG4gICAgICAgICAgICBrZXk6IGtleSxcclxuICAgICAgICAgICAgc3JjOiBzcmMsXHJcbiAgICAgICAgICAgIHR5cGU6IFwic291bmRcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5Mb2FkZXIuc291bmQgPSBmdW5jdGlvbiAocmVzb3VyY2UsIGNiKSB7XHJcbiAgICBcclxuICAgIGlmIChUaW55LkNhY2hlLnNvdW5kW3Jlc291cmNlLmtleV0pIHJldHVybiBjYigpO1xyXG5cclxuICAgIHZhciBzb3VuZCA9IG5ldyB3aW5kb3cuSG93bCh7XHJcbiAgICAgICAgc3JjOiBbcmVzb3VyY2Uuc3JjXVxyXG4gICAgfSk7XHJcblxyXG4gICAgc291bmQub25jZShcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIFRpbnkuQ2FjaGUuc291bmRbcmVzb3VyY2Uua2V5XSA9IHNvdW5kO1xyXG4gICAgICAgIGNiKCk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vIFRpbnkuU291bmRNYW5hZ2VyID0gU291bmRNYW5hZ2VyO1xyXG5UaW55LnJlZ2lzdGVyU3lzdGVtKFwic291bmRcIiwgU291bmRNYW5hZ2VyKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9