class KeyframesAnim extends Tiny.Anim {
    constructor(obj, options) {
        super(obj, options);

        this.data = options.data;
        this.valid = true;
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

Tiny.Anim.keyframes = KeyframesAnim;
