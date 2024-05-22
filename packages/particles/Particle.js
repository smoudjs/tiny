var Particle = function (emitter) {
    Tiny.BaseObject2D.call(this);

    this.parent = emitter;

    this.anchor = new Tiny.Vec2();

    this.texture = { valid: false };

    this._frame = 0;

    this.lifespan = 0;
};

Particle.prototype = Object.create(Tiny.BaseObject2D.prototype);
Particle.prototype.constructor = Particle;

Particle.prototype.setTexture = function (texture, key) {
    if (typeof texture == 'string') {
        var imagePath = texture;

        if (key != undefined) {
            imagePath = imagePath + '.' + key;
        }

        texture = Tiny.Cache.texture[imagePath];

        if (!texture) texture = new Tiny.Texture(imagePath);
    }

    this.texture = texture;
};

Object.defineProperty(Particle.prototype, 'frameName', {
    get: function () {
        return this.texture.frame.name;
    },

    set: function (value) {
        if (this.texture.frame.name) {
            this.setTexture(Tiny.Cache.texture[this.texture.key + '.' + value]);
        }
    }
});

Particle.prototype.drawTexture = function (renderSession) {
    var dx = this.anchor.x * -this.texture.frame.width;
    var dy = this.anchor.y * -this.texture.frame.height;

    var resolution = this.texture.base.resolution / renderSession.resolution;

    renderSession.context.drawImage(
        this.texture.base.source,
        this.texture.crop.x,
        this.texture.crop.y,
        this.texture.crop.width,
        this.texture.crop.height,
        dx / resolution,
        dy / resolution,
        this.texture.crop.width / resolution,
        this.texture.crop.height / resolution
    );
};

Particle.prototype.reset = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;

    this.alpha = 1;
    this.scale.set(1);
};

Particle.prototype.update = function (time, delta) {};

Particle.prototype.onEmit = function () {};

Particle.prototype.draw = function (renderSession) {};

Particle.prototype._update = function (delta) {
    if (this.visible === false) return false;

    this.lifespan -= delta;

    if (this.lifespan <= 0) {
        this.visible = false;
        return false;
    }

    this.update(this.lifespan, delta);
};

Particle.prototype.renderCanvas = function (renderSession) {
    if (this.visible === false || this.alpha === 0) return;

    this.updateTransform();

    renderSession.context.globalAlpha = this.worldAlpha;

    renderSession.context.setTransform(
        this.worldTransform.a,
        this.worldTransform.b,
        this.worldTransform.c,
        this.worldTransform.d,
        this.worldTransform.tx * renderSession.resolution,
        this.worldTransform.ty * renderSession.resolution
    );

    if (this.texture.valid) this.drawTexture(renderSession);
    else this.draw(renderSession.context, renderSession.resolution);
};

export { Particle };
