/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./plugins/particles/Emitter.js":
/*!**************************************!*\
  !*** ./plugins/particles/Emitter.js ***!
  \**************************************/
/***/ (() => {

Tiny.Emitter = function( maxParticles )
{
    Tiny.Object2D.call(this);

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


Tiny.Emitter.prototype = Object.create(Tiny.Object2D.prototype);
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

    if (this.system) this.system.remove(this);

    Tiny.Object2D.prototype.destroy.call(this);
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

Tiny.Emitter.prototype.render = function(renderSession)
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
        this.particles[i].render(renderSession);
    }

    for (i = 0; i < this.children.length; i++)
    {
        this.children[i].render(renderSession);
    }

    if (this._mask)
    {
        renderSession.maskManager.popMask(renderSession);
    }
};


// Tiny.ObjectCreator.prototype.emitter = function(x, y, maxParticles) {
//     var emitter = new Tiny.Emitter( maxParticles )
//     emitter.x = x || 0
//     emitter.y = y || 0

//     this.game.stage.add(emitter)

//     return this.game.particles.add(emitter)
// }

/***/ }),

/***/ "./plugins/particles/Particle.js":
/*!***************************************!*\
  !*** ./plugins/particles/Particle.js ***!
  \***************************************/
/***/ (() => {


Tiny.Particle = function( emitter )
{
    Tiny.BaseObject2D.call( this );

    this.parent = emitter

    this.anchor = new Tiny.Point()

    this.texture = { valid: false }

    this._frame = 0;

    this.lifespan = 0
};

Tiny.Particle.prototype = Object.create( Tiny.BaseObject2D.prototype );
Tiny.Particle.prototype.constructor = Tiny.Particle;

Tiny.Particle.prototype.setTexture = function(texture, key)
{
    if (typeof texture == "string") 
    {
        var imagePath = texture;

        if (key != undefined) 
        {
            imagePath = imagePath + "_" + key;
        }

        texture = Tiny.Cache.texture[imagePath];

        if (!texture) texture = new Tiny.Texture(imagePath);
    }

    this.texture = texture;
};

Object.defineProperty(Tiny.Particle.prototype, 'frameName', {

    get: function() {
        return this.texture.frame.name
    },

    set: function(value) {
        if (this.texture.frame.name) {
            this.setTexture(Tiny.TextureCache[this.texture.key + "_" + value])
        }
    }

});

Object.defineProperty(Tiny.Particle.prototype, 'frame', {

    get: function() {
        return this._frame
    },

    set: function(value) {
        if (this.texture.max_no_frame) {
            this._frame = value
            if (this._frame > this.texture.max_no_frame)
                this._frame = 0
            this.setTexture(Tiny.TextureCache[this.texture.key + "_" + this._frame])
        }
    }

});


Tiny.Particle.prototype.drawTexture = function(renderSession)
{
    var dx = this.anchor.x * -this.texture.frame.width;
    var dy = this.anchor.y * -this.texture.frame.height;

    var resolution = this.texture.resolution / renderSession.resolution; 

    renderSession.context.drawImage(
                            this.texture.source,
                            this.texture.crop.x,
                            this.texture.crop.y,
                            this.texture.crop.width,
                            this.texture.crop.height,
                            dx / resolution,
                            dy / resolution,
                            this.texture.crop.width / resolution,
                            this.texture.crop.height / resolution);
};

Tiny.Particle.prototype.reset = function( x, y ) {

    this.x = x || 0
    this.y = y || 0

    this.alpha = 1;
    this.scale.set(1);
}

Tiny.Particle.prototype.update = function( time, delta )  {

};

Tiny.Particle.prototype.onEmit = function(  )  {

};

Tiny.Particle.prototype.draw = function(renderSession) {

};

Tiny.Particle.prototype._update = function( delta ) {
    if (this.visible === false) return false

    this.lifespan -= delta;

    if (this.lifespan <= 0)
    {
        this.visible = false
        return false;
    }

    this.update( this.lifespan, delta );
}

Tiny.Particle.prototype.render = function(renderSession)
{
    if (this.visible === false || this.alpha === 0) return;

    this.updateTransform();

    renderSession.context.globalAlpha = this.worldAlpha;

    renderSession.context.setTransform(
                this.worldTransform.a,
                this.worldTransform.b,
                this.worldTransform.c,
                this.worldTransform.d,
                this.worldTransform.tx * renderSession.resolution,
                this.worldTransform.ty * renderSession.resolution);

    if ( this.texture.valid )
        this.drawTexture( renderSession )
    else
        this.draw( renderSession.context, renderSession.resolution )
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./plugins/particles/index.js ***!
  \************************************/
Tiny.Particles = function (game) {

    this.game = game;

    this.list = [];

};

Tiny.Particles.prototype = {

    add: function (emitter) {

        emitter.system = this;

        this.list.push(emitter);

        return emitter;

    },

    remove: function (emitter) {
    	var indexOf = this.list.indexOf(emitter)

        if (indexOf > -1) {
            var emitter = this.list.splice(indexOf, 1);
            emitter.system = null;
            return emitter;
        }

    },


    update: function ( delta ) {

    	var i = this.list.length;

	    while (i--)
	    {
	        this.list[i].update( delta );
	    }
    },

    destroy: function() {
        this.list.length = 0;
    }

};

Tiny.Particles.prototype.constructor = Tiny.Particles;

__webpack_require__(/*! ./Particle */ "./plugins/particles/Particle.js");
__webpack_require__(/*! ./Emitter */ "./plugins/particles/Emitter.js");

Tiny.registerSystem("particles", Tiny.Particles);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9wYXJ0aWNsZXMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQsK0JBQStCO0FBQy9CLG1DQUFtQztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxrQ0FBa0M7QUFDbEMseURBQXlEO0FBQ3pELGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsY0FBYztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQiwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyx3QkFBd0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwyQkFBMkI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsMEJBQTBCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNqWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNoSkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLG1EQUFZO0FBQ3BCLG1CQUFPLENBQUMsaURBQVc7QUFDbkI7QUFDQSxpRCIsInNvdXJjZXMiOlsid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvcGFydGljbGVzL0VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9wYXJ0aWNsZXMvUGFydGljbGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvcGFydGljbGVzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlRpbnkuRW1pdHRlciA9IGZ1bmN0aW9uKCBtYXhQYXJ0aWNsZXMgKVxyXG57XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5hbmNob3IgPSBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHRoaXMubWF4UGFydGljbGVzID0gbWF4UGFydGljbGVzXHJcblxyXG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBbXVxyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IFRpbnkuUGFydGljbGVcclxuXHJcbiAgICB0aGlzLmZpbGxTdHlsZSA9IFwiI2Y1NDU0NVwiXHJcblxyXG4gICAgdGhpcy5wYXJ0aWNsZUFuY2hvciA9IG5ldyBUaW55LlBvaW50KDAuNSwgMC41KTtcclxuXHJcbiAgICB0aGlzLm9uID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fdGltZXIgPSAwXHJcblxyXG4gICAgdGhpcy5fcXVhbnRpdHkgPSAwO1xyXG5cclxuICAgIHRoaXMuX2NvdW50ZXIgPSAwO1xyXG5cclxuICAgIHRoaXMuX2Zsb3dRdWFudGl0eSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZmxvd1RvdGFsID0gMDtcclxuXHJcbiAgICB0aGlzLmJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxufTtcclxuXHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55Lk9iamVjdDJELnByb3RvdHlwZSk7XHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkVtaXR0ZXI7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5FbWl0dGVyLnByb3RvdHlwZSwgJ3dpZHRoJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoXHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkVtaXR0ZXIucHJvdG90eXBlLCAnaGVpZ2h0Jywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUubWFrZVBhcnRpY2xlcyA9IGZ1bmN0aW9uKHRleHR1cmUsIHF1YW50aXR5KVxyXG57XHJcblxyXG5cclxuICAgIHZhciBwYXJ0aWNsZTtcclxuXHJcbiAgICBpZiAocXVhbnRpdHkgPT09IHVuZGVmaW5lZCkgeyBxdWFudGl0eSA9IHRoaXMubWF4UGFydGljbGVzOyB9XHJcblxyXG4gICAgdmFyIGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID4gdGhpcy5tYXhQYXJ0aWNsZXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tYXhQYXJ0aWNsZXMgPSBxdWFudGl0eTtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAoaSA8IHF1YW50aXR5KVxyXG4gICAge1xyXG4gICAgICAgIC8vIGlmIChBcnJheS5pc0FycmF5KGtleXMpKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgcm5kS2V5ID0gdGhpcy5nYW1lLnJuZC5waWNrKGtleXMpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gaWYgKEFycmF5LmlzQXJyYXkoZnJhbWVzKSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHJuZEZyYW1lID0gdGhpcy5nYW1lLnJuZC5waWNrKGZyYW1lcyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBwYXJ0aWNsZSA9IG5ldyB0aGlzLnBhdHRlcm4oIHRoaXMgKTtcclxuXHJcbiAgICAgICAgaWYgKHRleHR1cmUpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGFydGljbGUuc2V0VGV4dHVyZSh0ZXh0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhcnRpY2xlLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBwYXJ0aWNsZS5hbmNob3Iuc2V0KHRoaXMucGFydGljbGVBbmNob3IueCwgdGhpcy5wYXJ0aWNsZUFuY2hvci55KVxyXG5cclxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKHBhcnRpY2xlKTtcclxuXHJcbiAgICAgICAgaSsrO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuZmxvdyA9IGZ1bmN0aW9uIChsaWZlc3BhbiwgZnJlcXVlbmN5LCBxdWFudGl0eSwgdG90YWwsIGltbWVkaWF0ZSkge1xyXG5cclxuICAgIGlmIChxdWFudGl0eSA9PT0gdW5kZWZpbmVkIHx8IHF1YW50aXR5ID09PSAwKSB7IHF1YW50aXR5ID0gMTsgfVxyXG4gICAgaWYgKHRvdGFsID09PSB1bmRlZmluZWQpIHsgdG90YWwgPSAtMTsgfVxyXG4gICAgaWYgKGltbWVkaWF0ZSA9PT0gdW5kZWZpbmVkKSB7IGltbWVkaWF0ZSA9IHRydWU7IH1cclxuXHJcbiAgICBpZiAocXVhbnRpdHkgPiB0aGlzLm1heFBhcnRpY2xlcylcclxuICAgIHtcclxuICAgICAgICBxdWFudGl0eSA9IHRoaXMubWF4UGFydGljbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5fZmxvd1F1YW50aXR5ID0gcXVhbnRpdHk7XHJcbiAgICB0aGlzLl9mbG93VG90YWwgPSB0b3RhbDtcclxuXHJcbiAgICBpZiAoaW1tZWRpYXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhcnQodHJ1ZSwgbGlmZXNwYW4sIGZyZXF1ZW5jeSwgcXVhbnRpdHkpO1xyXG5cclxuICAgICAgICB0aGlzLl9jb3VudGVyICs9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMub24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gZnJlcXVlbmN5XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdGFydChmYWxzZSwgbGlmZXNwYW4sIGZyZXF1ZW5jeSwgcXVhbnRpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxufTtcclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuZXhwbG9kZSA9IGZ1bmN0aW9uIChsaWZlc3BhbiwgcXVhbnRpdHkpIHtcclxuXHJcbiAgICB0aGlzLl9mbG93VG90YWwgPSAwO1xyXG5cclxuICAgIGlmIChxdWFudGl0eSA9PT0gdW5kZWZpbmVkKSB7IHF1YW50aXR5ID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoIH1cclxuXHJcbiAgICB0aGlzLnN0YXJ0KHRydWUsIGxpZmVzcGFuLCAwLCBxdWFudGl0eSwgZmFsc2UpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxufTtcclxuXHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKGV4cGxvZGUsIGxpZmVzcGFuLCBmcmVxdWVuY3ksIHF1YW50aXR5KSB7XHJcblxyXG4gICAgaWYgKGV4cGxvZGUgPT09IHVuZGVmaW5lZCkgeyBleHBsb2RlID0gdHJ1ZTsgfVxyXG4gICAgaWYgKGxpZmVzcGFuID09PSB1bmRlZmluZWQpIHsgbGlmZXNwYW4gPSAwOyB9XHJcbiAgICBpZiAoZnJlcXVlbmN5ID09PSB1bmRlZmluZWQgfHwgZnJlcXVlbmN5ID09PSBudWxsKSB7IGZyZXF1ZW5jeSA9IDI1MDsgfVxyXG4gICAgaWYgKHF1YW50aXR5ID09PSB1bmRlZmluZWQpIHsgcXVhbnRpdHkgPSAwOyB9XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID4gdGhpcy5tYXhQYXJ0aWNsZXMpXHJcbiAgICB7XHJcbiAgICAgICAgcXVhbnRpdHkgPSB0aGlzLm1heFBhcnRpY2xlcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMubGlmZXNwYW4gPSBsaWZlc3BhbjtcclxuICAgIHRoaXMuZnJlcXVlbmN5ID0gZnJlcXVlbmN5O1xyXG5cclxuICAgIC8vdGhpcy51cGRhdGVUcmFuc2Zvcm0oKVxyXG5cclxuICAgIGlmIChleHBsb2RlKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVhbnRpdHk7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdFBhcnRpY2xlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3F1YW50aXR5ID0gcXVhbnRpdHk7XHJcbiAgICAgICAgdGhpcy5fY291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZXIgPSBmcmVxdWVuY3lcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbn07XHJcblxyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS5lbWl0UGFydGljbGUgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG5cclxuICAgIGlmICh4ID09PSB1bmRlZmluZWQpIHsgeCA9IG51bGw7IH1cclxuICAgIGlmICh5ID09PSB1bmRlZmluZWQpIHsgeSA9IG51bGw7IH1cclxuXHJcbiAgICB2YXIgcGFydGljbGUgPSBudWxsXHJcblxyXG4gICAgdmFyIGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XHJcblxyXG4gICAgd2hpbGUgKGktLSlcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMucGFydGljbGVzW2ldLnZpc2libGUpIHtcclxuICAgICAgICAgICAgcGFydGljbGUgPSB0aGlzLnBhcnRpY2xlc1tpXVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChwYXJ0aWNsZSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICB2YXIgaGFsZlNpemU7XHJcblxyXG4gICAgdmFyIGVtaXRYID0gMDtcclxuICAgIHZhciBlbWl0WSA9IDA7XHJcblxyXG4gICAgaWYgKHggIT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgZW1pdFggPSB4O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5fd2lkdGggPiAxKVxyXG4gICAge1xyXG4gICAgICAgIGhhbGZTaXplID0gdGhpcy5fd2lkdGggLyAyXHJcbiAgICAgICAgZW1pdFggPSBUaW55LnJuZCgtaGFsZlNpemUsIGhhbGZTaXplKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh5ICE9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIGVtaXRZID0geTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuX2hlaWdodCA+IDEpXHJcbiAgICB7XHJcbiAgICAgICAgaGFsZlNpemUgPSB0aGlzLl9oZWlnaHQgLyAyXHJcbiAgICAgICAgZW1pdFkgPSBUaW55LnJuZCgtaGFsZlNpemUsIGhhbGZTaXplKVxyXG4gICAgfVxyXG5cclxuICAgIHBhcnRpY2xlLnJlc2V0KGVtaXRYLCBlbWl0WSk7XHJcblxyXG4gICAgcGFydGljbGUucm90YXRpb24gPSAwO1xyXG4gICAgcGFydGljbGUubGlmZXNwYW4gPSB0aGlzLmxpZmVzcGFuO1xyXG5cclxuXHJcbiAgICAvL3BhcnRpY2xlLmJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG5cclxuICAgIHBhcnRpY2xlLm9uRW1pdCgpO1xyXG5cclxuICAgIHBhcnRpY2xlLnZpc2libGUgPSB0cnVlXHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcblxyXG59O1xyXG5cclxuXHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAodGhpcy5zeXN0ZW0pIHRoaXMuc3lzdGVtLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICBUaW55Lk9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcbn1cclxuXHJcblxyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggZGVsdGEgKSB7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMub24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fdGltZXIgLT0gZGVsdGFcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3RpbWVyIDw9IDApIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gdGhpcy5mcmVxdWVuY3k7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZmxvd1RvdGFsICE9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmxvd1F1YW50aXR5ID4gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2Zsb3dRdWFudGl0eTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdFBhcnRpY2xlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmxvd1RvdGFsICE9PSAtMSAmJiB0aGlzLl9jb3VudGVyID49IHRoaXMuX2Zsb3dUb3RhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdFBhcnRpY2xlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmxvd1RvdGFsICE9PSAtMSAmJiB0aGlzLl9jb3VudGVyID49IHRoaXMuX2Zsb3dUb3RhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdFBhcnRpY2xlKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291bnRlcisrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcXVhbnRpdHkgPiAwICYmIHRoaXMuX2NvdW50ZXIgPj0gdGhpcy5fcXVhbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBpID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlIChpLS0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0uX3VwZGF0ZSggZGVsdGEgKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKHRpbWUpXHJcbn1cclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5hbHBoYSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlckNhY2hlZFNwcml0ZShyZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5maWxsU3R5bGVcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5hLFxyXG4gICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmIsXHJcbiAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5kLFxyXG4gICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR4ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMucGFydGljbGVzLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLy8gVGlueS5PYmplY3RDcmVhdG9yLnByb3RvdHlwZS5lbWl0dGVyID0gZnVuY3Rpb24oeCwgeSwgbWF4UGFydGljbGVzKSB7XHJcbi8vICAgICB2YXIgZW1pdHRlciA9IG5ldyBUaW55LkVtaXR0ZXIoIG1heFBhcnRpY2xlcyApXHJcbi8vICAgICBlbWl0dGVyLnggPSB4IHx8IDBcclxuLy8gICAgIGVtaXR0ZXIueSA9IHkgfHwgMFxyXG5cclxuLy8gICAgIHRoaXMuZ2FtZS5zdGFnZS5hZGQoZW1pdHRlcilcclxuXHJcbi8vICAgICByZXR1cm4gdGhpcy5nYW1lLnBhcnRpY2xlcy5hZGQoZW1pdHRlcilcclxuLy8gfSIsIlxyXG5UaW55LlBhcnRpY2xlID0gZnVuY3Rpb24oIGVtaXR0ZXIgKVxyXG57XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5jYWxsKCB0aGlzICk7XHJcblxyXG4gICAgdGhpcy5wYXJlbnQgPSBlbWl0dGVyXHJcblxyXG4gICAgdGhpcy5hbmNob3IgPSBuZXcgVGlueS5Qb2ludCgpXHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0geyB2YWxpZDogZmFsc2UgfVxyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLmxpZmVzcGFuID0gMFxyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUgKTtcclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlBhcnRpY2xlO1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0VGV4dHVyZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGtleSlcclxue1xyXG4gICAgaWYgKHR5cGVvZiB0ZXh0dXJlID09IFwic3RyaW5nXCIpIFxyXG4gICAge1xyXG4gICAgICAgIHZhciBpbWFnZVBhdGggPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICBpZiAoa2V5ICE9IHVuZGVmaW5lZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSBpbWFnZVBhdGggKyBcIl9cIiArIGtleTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbaW1hZ2VQYXRoXTtcclxuXHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZVBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUsICdmcmFtZU5hbWUnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlLmZyYW1lLm5hbWVcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUuZnJhbWUubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5UZXh0dXJlQ2FjaGVbdGhpcy50ZXh0dXJlLmtleSArIFwiX1wiICsgdmFsdWVdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUGFydGljbGUucHJvdG90eXBlLCAnZnJhbWUnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZnJhbWVcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUubWF4X25vX2ZyYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gdmFsdWVcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lID4gdGhpcy50ZXh0dXJlLm1heF9ub19mcmFtZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gMFxyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5UZXh0dXJlQ2FjaGVbdGhpcy50ZXh0dXJlLmtleSArIFwiX1wiICsgdGhpcy5fZnJhbWVdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLmRyYXdUZXh0dXJlID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgdmFyIGR4ID0gdGhpcy5hbmNob3IueCAqIC10aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICB2YXIgZHkgPSB0aGlzLmFuY2hvci55ICogLXRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgdmFyIHJlc29sdXRpb24gPSB0aGlzLnRleHR1cmUucmVzb2x1dGlvbiAvIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjsgXHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHkgLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IC8gcmVzb2x1dGlvbik7XHJcbn07XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCB4LCB5ICkge1xyXG5cclxuICAgIHRoaXMueCA9IHggfHwgMFxyXG4gICAgdGhpcy55ID0geSB8fCAwXHJcblxyXG4gICAgdGhpcy5hbHBoYSA9IDE7XHJcbiAgICB0aGlzLnNjYWxlLnNldCgxKTtcclxufVxyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHRpbWUsIGRlbHRhICkgIHtcclxuXHJcbn07XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5vbkVtaXQgPSBmdW5jdGlvbiggICkgIHtcclxuXHJcbn07XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbikge1xyXG5cclxufTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiggZGVsdGEgKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgdGhpcy5saWZlc3BhbiAtPSBkZWx0YTtcclxuXHJcbiAgICBpZiAodGhpcy5saWZlc3BhbiA8PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlKCB0aGlzLmxpZmVzcGFuLCBkZWx0YSApO1xyXG59XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy51cGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHggKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICBpZiAoIHRoaXMudGV4dHVyZS52YWxpZCApXHJcbiAgICAgICAgdGhpcy5kcmF3VGV4dHVyZSggcmVuZGVyU2Vzc2lvbiApXHJcbiAgICBlbHNlXHJcbiAgICAgICAgdGhpcy5kcmF3KCByZW5kZXJTZXNzaW9uLmNvbnRleHQsIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbiApXHJcbn07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlRpbnkuUGFydGljbGVzID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuXHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG5cclxuICAgIHRoaXMubGlzdCA9IFtdO1xyXG5cclxufTtcclxuXHJcblRpbnkuUGFydGljbGVzLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICBhZGQ6IGZ1bmN0aW9uIChlbWl0dGVyKSB7XHJcblxyXG4gICAgICAgIGVtaXR0ZXIuc3lzdGVtID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2goZW1pdHRlcik7XHJcblxyXG4gICAgICAgIHJldHVybiBlbWl0dGVyO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAoZW1pdHRlcikge1xyXG4gICAgXHR2YXIgaW5kZXhPZiA9IHRoaXMubGlzdC5pbmRleE9mKGVtaXR0ZXIpXHJcblxyXG4gICAgICAgIGlmIChpbmRleE9mID4gLTEpIHtcclxuICAgICAgICAgICAgdmFyIGVtaXR0ZXIgPSB0aGlzLmxpc3Quc3BsaWNlKGluZGV4T2YsIDEpO1xyXG4gICAgICAgICAgICBlbWl0dGVyLnN5c3RlbSA9IG51bGw7XHJcbiAgICAgICAgICAgIHJldHVybiBlbWl0dGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uICggZGVsdGEgKSB7XHJcblxyXG4gICAgXHR2YXIgaSA9IHRoaXMubGlzdC5sZW5ndGg7XHJcblxyXG5cdCAgICB3aGlsZSAoaS0tKVxyXG5cdCAgICB7XHJcblx0ICAgICAgICB0aGlzLmxpc3RbaV0udXBkYXRlKCBkZWx0YSApO1xyXG5cdCAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubGlzdC5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRpbnkuUGFydGljbGVzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUGFydGljbGVzO1xyXG5cclxucmVxdWlyZSgnLi9QYXJ0aWNsZScpO1xyXG5yZXF1aXJlKCcuL0VtaXR0ZXInKTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJwYXJ0aWNsZXNcIiwgVGlueS5QYXJ0aWNsZXMpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==