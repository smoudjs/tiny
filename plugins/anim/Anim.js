var noop = function () {};

var _nextId = 0;

class Anim {
    constructor(obj, options) {
        this.uuid = _nextId++;
        this.key = options.key;
        this.system = options.system;
        this.parent = obj;
        this.valid = false;
        this.duration = options.duration || 1000;
        this._time = 0;
        this.running = false;
        this.repeat = options.repeat || 0;
        this._reverse = options.reverse || false;
        this.yoyo = options.yoyo || false;
        this.repeatDelay = options.repeatDelay || 0;
        this._delay = 0;
        this.onStart = options.onStart || noop;
        this.onStop = options.onStop || noop;
        this.onComplete = options.onComplete || noop;
        this.onRepeat = options.onRepeat || noop;
        if (options.delay) this._delay = -options.delay;
        this._onStartFired = false;
    }
    setValue() {}
    reverse() {
        this._reverse = !this._reverse;
    }
    start() {
        if (!this.running) {
            this.running = true;
            if (this.system) this.system.addAnim(this);
        }
    }
    pause() {
        if (this.running) {
            this.running = false;
            if (this.system) this.system.removeAnim(this);
        }
    }
    stop() {
        this.running = false;
        this._time = 0;
        this.setValue(0);
        if (this.system) this.system.removeAnim(this);
        this.onStop(this.parent);
    }
    update(delta) {
        if (!this.parent.worldTransform || !this.valid) return false;

        if (this.running) {
            if (this._delay < 0) {
                this._delay += delta;
                return true;
            }

            if (!this._onStartFired) {
                this._onStartFired = true;
                this.onStart(this.parent);
            }

            this._time += delta;
            if (this._time > this.duration) {
                if (this.repeat > 0 || this.repeat == -1) {
                    do {
                        this._time -= this.duration;
                    } while (this._time > this.duration);

                    if (this.repeat > 0) this.repeat--;

                    if (this.repeatDelay) {
                        this._delay = -this.repeatDelay;
                    }

                    if (this.yoyo) this.reverse();
                    this.onRepeat(this.parent);
                } else {
                    this.onComplete(this.parent);
                    this._time = this.duration;
                    this.running = false;
                    return false;
                }
            }
            var progress = this._time / this.duration;
            if (this._reverse) progress = 1 - progress;
            this.setValue(progress);
        }

        return true;
    }
}

Tiny.Anim = Anim;
