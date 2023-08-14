import { Anim } from './Anim';

class SpritesheetAnim extends Anim {
    constructor(obj, options) {
        super(obj, options);

        this.frames = [];
        this.currentIndex = 0;

        var data = options.data;

        if (typeof data === 'string') {
            data = { key: data };
        }

        if (Array.isArray(data)) this.frames = data;
        else if (data.key) {
            var texture = Tiny.Cache.texture[data.key + '.0'];

            if (texture) {
                var from = data.from || 0;
                var to = data.to || texture.lastFrame;

                for (var frame = from; frame <= to; frame++) {
                    this.frames.push(texture.key + '.' + frame);
                }
            }
        }

        if (this.frames.length > 0) {
            if (options.fps) this.duration = (1000 / options.fps) * this.frames.length;

            this.valid = true;
        }
    }

    reverse() {
        super.reverse();
        if (!this.repeatDelay) this._time += this.duration / this.frames.length;
    }

    setValue(progress) {
        var index = (this.frames.length * progress) | 0;
        if (index > this.frames.length - 1) index = this.frames.length - 1;

        // console.log(index);

        if (index != this.currentIndex) {
            this.currentIndex = index;
            // if (this.reverse) index = this.frames.length - index - 1;
            var frame = this.frames[index];

            // console.log(index);
            var texture = Tiny.Cache.texture[frame];

            // texture &&
            this.parent.setTexture(texture);
            // this.parent.setTexture(Tiny.Cache.texture[this.texture.key + "." +frame]);
            // console.log(progress);
        }
    }
}

Anim.spritesheet = SpritesheetAnim;

export { SpritesheetAnim };
