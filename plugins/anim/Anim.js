class Anim {
    constructor(obj, options) {
        this.parent = obj;
        this.duration = options.duration || 1000;
        this._time = 0;
        this.running = false;
        this.repeat = options.repeat || 0;
        this._reverse = options.reverse || false;
        this.yoyo = options.yoyo || false;
        this.repeatDelay = options.repeatDelay || 0;
        this._delay = 0;
        if (options.delay) this._delay = -options.delay;
    }
    setValue() {}
    reverse() {
        this._reverse = !this._reverse;
    }
    start() {
        this.running = true;
    }
    pause() {
        this.running = false;
    }
    stop() {
        this.running = false;
        this._time = 0;
        this.setValue(0);
    }
    update(delta) {
        if (!this.parent.worldTransform || !this.valid) return false;

        if (this.running) {
            if (this._delay < 0) {
                this._delay += delta;
                return;
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
                } else {
                    this._time = this.duration;
                    this.running = false;
                    return false;
                }
            }
            var progress = this._time / this.duration;
            if (this._reverse) progress = 1 - progress;
            this.setValue(progress);
        }
    }
}

Tiny.Anim = Anim;
