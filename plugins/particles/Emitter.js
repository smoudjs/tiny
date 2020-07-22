Tiny.Emitter = function( maxParticles )
{
    Tiny.DisplayObjectContainer.call(this);

    this.anchor = new Tiny.Point();

    this.maxParticles = maxParticles

    this.particles = []

    this.pattern = Tiny.Particle

    this.fillStyle = "#f54545"

    this.particleAnchor = new Tiny.Point(0.5, 0.5);

    this.on = false;

    this._timer = 0

    this._quantity = 0;

    this._counter = 0;

    this._flowQuantity = 0;

    this._flowTotal = 0;

    this.blendMode = "source-over";
};


Tiny.Emitter.prototype = Object.create(Tiny.DisplayObjectContainer.prototype);
Tiny.Emitter.prototype.constructor = Tiny.Emitter;

Object.defineProperty(Tiny.Emitter.prototype, 'width', {

    get: function() {
        return this._width
    },

    set: function(value) {
        this._width = value;
    }
});

Object.defineProperty(Tiny.Emitter.prototype, 'height', {

    get: function() {
        return this._height
    },

    set: function(value) {
        this._height = value;
    }
});


Tiny.Emitter.prototype.makeParticles = function(texture, quantity)
{


    var particle;

    if (quantity === undefined) { quantity = this.maxParticles; }

    var i = this.particles.length;

    if (quantity > this.maxParticles)
    {
        this.maxParticles = quantity;
    }

    while (i < quantity)
    {
        // if (Array.isArray(keys))
        // {
        //     rndKey = this.game.rnd.pick(keys);
        // }

        // if (Array.isArray(frames))
        // {
        //     rndFrame = this.game.rnd.pick(frames);
        // }

        particle = new this.pattern( this );

        if (texture) 
        {
            particle.setTexture(texture);
        }

        particle.visible = false;
        particle.anchor.set(this.particleAnchor.x, this.particleAnchor.y)

        this.particles.push(particle);

        i++;
    }

};

Tiny.Emitter.prototype.flow = function (lifespan, frequency, quantity, total, immediate) {

    if (quantity === undefined || quantity === 0) { quantity = 1; }
    if (total === undefined) { total = -1; }
    if (immediate === undefined) { immediate = true; }

    if (quantity > this.maxParticles)
    {
        quantity = this.maxParticles;
    }

    this._counter = 0;
    this._flowQuantity = quantity;
    this._flowTotal = total;

    if (immediate)
    {
        this.start(true, lifespan, frequency, quantity);

        this._counter += quantity;
        this.on = true;
        this._timer = frequency
    }
    else
    {
        this.start(false, lifespan, frequency, quantity);
    }

    return this;

};

Tiny.Emitter.prototype.explode = function (lifespan, quantity) {

    this._flowTotal = 0;

    if (quantity === undefined) { quantity = this.particles.length }

    this.start(true, lifespan, 0, quantity, false);

    return this;

};


Tiny.Emitter.prototype.start = function (explode, lifespan, frequency, quantity) {

    if (explode === undefined) { explode = true; }
    if (lifespan === undefined) { lifespan = 0; }
    if (frequency === undefined || frequency === null) { frequency = 250; }
    if (quantity === undefined) { quantity = 0; }

    if (quantity > this.maxParticles)
    {
        quantity = this.maxParticles;
    }

    this.visible = true;

    this.lifespan = lifespan;
    this.frequency = frequency;

    //this.updateTransform()

    if (explode)
    {
        for (var i = 0; i < quantity; i++)
        {
            this.emitParticle();
        }
    }
    else
    {
        this.on = true;
        this._quantity = quantity;
        this._counter = 0;
        this._timer = frequency
    }

    return this;

};


Tiny.Emitter.prototype.emitParticle = function (x, y) {

    if (x === undefined) { x = null; }
    if (y === undefined) { y = null; }

    var particle = null

    var i = this.particles.length;

    while (i--)
    {
        if (!this.particles[i].visible) {
            particle = this.particles[i]
            break;
        }
    }


    if (particle === null)
    {
        return false;
    }



    var halfSize;

    var emitX = 0;
    var emitY = 0;

    if (x !== null)
    {
        emitX = x;
    }
    else if (this._width > 1)
    {
        halfSize = this._width / 2
        emitX = Tiny.rnd(-halfSize, halfSize)
    }

    if (y !== null)
    {
        emitY = y;
    }
    else if (this._height > 1)
    {
        halfSize = this._height / 2
        emitY = Tiny.rnd(-halfSize, halfSize)
    }

    particle.reset(emitX, emitY);

    particle.rotation = 0;
    particle.lifespan = this.lifespan;


    //particle.blendMode = this.blendMode;

    particle.onEmit();

    particle.visible = true

    return true;

};



Tiny.Emitter.prototype.destroy = function() {

    this.game.particles.remove(this);

    Tiny.DisplayObjectContainer.prototype.destroy.call(this);

}



Tiny.Emitter.prototype.update = function( delta ) {

    if (this.visible === false) return;

    if (this.on)
    {
        this._timer -= delta

        if (this._timer <= 0) {

            this._timer = this.frequency;

            if (this._flowTotal !== 0)
            {
                if (this._flowQuantity > 0)
                {
                    for (var i = 0; i < this._flowQuantity; i++)
                    {
                        if (this.emitParticle())
                        {
                            this._counter++;

                            if (this._flowTotal !== -1 && this._counter >= this._flowTotal)
                            {
                                this.on = false;
                                break;
                            }
                        }
                    }
                }
                else
                {
                    if (this.emitParticle())
                    {
                        this._counter++;

                        if (this._flowTotal !== -1 && this._counter >= this._flowTotal)
                        {
                            this.on = false;
                        }
                    }
                }
            }
            else
            {
                if (this.emitParticle())
                {
                    this._counter++;

                    if (this._quantity > 0 && this._counter >= this._quantity)
                    {
                        this.on = false;
                    }
                }
            }
        }
    }

    var i = this.particles.length;

    while (i--)
    {
        this.particles[i]._update( delta );
    }

    //console.log(time)
}

Tiny.Emitter.prototype._renderCanvas = function(renderSession)
{
    if (this.visible === false || this.alpha === 0) return;

    if (this._cacheAsBitmap)
    {
        this._renderCachedSprite(renderSession);
        return;
    }

    if (this._mask)
    {
        renderSession.maskManager.pushMask(this._mask, renderSession);
    }

    renderSession.context.fillStyle = this.fillStyle

    renderSession.context.globalAlpha = this.worldAlpha;

    renderSession.context.setTransform(
            this.worldTransform.a,
            this.worldTransform.b,
            this.worldTransform.c,
            this.worldTransform.d,
            this.worldTransform.tx * renderSession.resolution,
            this.worldTransform.ty * renderSession.resolution);

    var i = 0;

    for (i = 0; i < this.particles.length; i++)
    {
        this.particles[i]._renderCanvas(renderSession);
    }

    for (i = 0; i < this.children.length; i++)
    {
        this.children[i]._renderCanvas(renderSession);
    }

    if (this._mask)
    {
        renderSession.maskManager.popMask(renderSession);
    }
};


Tiny.ObjectCreator.prototype.emitter = function(x, y, maxParticles) {
    var emitter = new Tiny.Emitter( maxParticles )
    emitter.x = x || 0
    emitter.y = y || 0

    this.game.stage.addChild(emitter)

    return this.game.particles.add(emitter)
}