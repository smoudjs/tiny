var defaultOptions = {
    bgColor: '#ffffff',
    bgAlpha: 1,
    value: 1,
    width: 230,
    height: 30,
    radius: 15,
    colors: ['#ff0000', '#ffc322', '#08c013'],
    animated: true,
    duration: 1000,
    easing: Tiny.Easing.Cubic.InOut,
    strokeColor: '#e1e1e1',
    strokeWidth: 0,
    strokeAlpha: 1,
    resolution: 1
};

var ProgressBar = function (options) {
    options = options || {};

    for (var key in defaultOptions) {
        if (options[key] == undefined) options[key] = defaultOptions[key];
    }

    var graphics = new Tiny.Graphics();

    graphics.beginFill(options.bgColor, options.bgAlpha);
    graphics.drawRoundedRect(
        options.strokeWidth / 2,
        options.strokeWidth / 2,
        options.width,
        options.height,
        options.radius
    );
    graphics.endFill();

    if (options.strokeWidth) {
        graphics.lineStyle(options.strokeWidth, options.strokeColor, options.strokeAlpha);
        graphics.drawRoundedRect(
            0,
            0,
            options.width + options.strokeWidth,
            options.height + options.strokeWidth,
            options.radius + options.strokeWidth / 2
        );
    }

    Tiny.Sprite.call(this, graphics.generateTexture(options.resolution));

    this.anchor.set(0.5);

    this.game = options.game || this.game;
    this.animated = options.animated;
    this.duration = options.duration;
    this.easing = options.easing;
    this.value = options.value;
    this.originalWidth = options.width * options.resolution;
    this._tween = null;
    this._crop = new Tiny.Rectangle(0, 0, this.originalWidth, options.height * options.resolution);
    this._frame = new Tiny.Rectangle(0, 0, this.originalWidth, options.height * options.resolution);
    this._trim = new Tiny.Rectangle(-this.originalWidth * 0.5, 0, 0, options.height * options.resolution);
    this._uvs = new Tiny.TextureUvs();
    this._sprites = [];

    for (var i = 0; i < options.colors.length; i++) {
        graphics.clear();
        graphics.beginFill(options.colors[i]);
        graphics.drawRoundedRect(0, 0, options.width, options.height, options.radius);
        graphics.endFill();

        var colorSprite = new Tiny.Sprite(graphics.generateTexture(options.resolution));
        colorSprite.anchor = this.anchor;
        colorSprite.texture.frame = this._frame;
        colorSprite.texture.crop = this._crop;
        colorSprite.texture.trim = this._trim;
        colorSprite.texture._uvs = this._uvs;

        this.add(colorSprite);
        this._sprites.push(colorSprite);
    }

    graphics.destroy();

    this._setValue(this.value);
};

ProgressBar.prototype = Object.create(Tiny.Sprite.prototype);
ProgressBar.prototype.constructor = ProgressBar;

ProgressBar.prototype._setValue = function (value) {
    value = Math.min(1, Math.max(0, value));

    if (value == this._value) return;

    this._value = value;

    this._frame.width = this.originalWidth * value;
    this._crop.width = this._frame.width

    this._sprites[0].texture._updateUvs();

    if (value == 0 || this._sprites.length === 1) return;
    if (value == 1) {
        this._sprites[this._sprites.length - 1].alpha = 1;
        return;
    }

    var step;
    if (this._sprites.length == 2) {
        this._sprites[1].alpha = value;
    } else if (this._sprites.length == 3) {
        step = 0.5;
        var lerp;

        if (value >= step) {
            lerp = 1 - (1 - value) / step;
            this._sprites[1].alpha = 1;
            this._sprites[2].alpha = lerp * lerp;
        } else if (value < step) {
            lerp = (1 - value - step) / step;
            this._sprites[1].alpha = 1 - lerp * lerp;
            this._sprites[2].alpha = 0;
        }
    } else {
        var mixes = this._sprites.length - 1;
        step = 1 / mixes;

        var index = Math.floor(value * mixes) + 1;
        var alpha = (value - step * (index - 1)) / step;

        for (var i = 0; i < this._sprites.length; i++) {
            this._sprites[i].alpha = 0;
        }

        this._sprites[index - 1].alpha = 1;
        this._sprites[index].alpha = alpha;
    }
};

ProgressBar.prototype.setValue = function (value) {
    value = Math.min(1, Math.max(0, value));
    this.value = value;

    if (this.animated) {
        if (this._tween) this._tween.stop();

        var _self = this;

        var tmpObj = { value: _self._value };

        this._tween = this.game.tweens
            .add(tmpObj)
            .to({ value: value }, this.duration)
            .easing(this.easing)
            .onUpdate(function () {
                _self._setValue(tmpObj.value);
            })
            .start();
    } else {
        this._setValue(value);
    }
};

ProgressBar.defaultOptions = defaultOptions;

export { ProgressBar };
