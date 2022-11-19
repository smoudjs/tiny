/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./plugins/particles/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./plugins/particles/Emitter.js":
/*!**************************************!*\
  !*** ./plugins/particles/Emitter.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
/*! no static exports found */
/***/ (function(module, exports) {


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

/***/ }),

/***/ "./plugins/particles/index.js":
/*!************************************!*\
  !*** ./plugins/particles/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGx1Z2lucy9wYXJ0aWNsZXMvRW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vLi9wbHVnaW5zL3BhcnRpY2xlcy9QYXJ0aWNsZS5qcyIsIndlYnBhY2s6Ly8vLi9wbHVnaW5zL3BhcnRpY2xlcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBOzs7QUFHQTs7QUFFQSxpQ0FBaUMsOEJBQThCOztBQUUvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG1EQUFtRCxjQUFjO0FBQ2pFLDhCQUE4QixZQUFZO0FBQzFDLGtDQUFrQyxrQkFBa0I7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxpQ0FBaUM7O0FBRWpDOztBQUVBOztBQUVBOzs7QUFHQTs7QUFFQSxnQ0FBZ0MsZ0JBQWdCO0FBQ2hELGlDQUFpQyxjQUFjO0FBQy9DLHdEQUF3RCxpQkFBaUI7QUFDekUsaUNBQWlDLGNBQWM7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBOztBQUVBLDBCQUEwQixVQUFVO0FBQ3BDLDBCQUEwQixVQUFVOztBQUVwQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7QUFJQTs7QUFFQTs7QUFFQTtBQUNBOzs7O0FBSUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGVBQWUsMkJBQTJCO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLDBCQUEwQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxJOzs7Ozs7Ozs7Ozs7QUNoWUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG9CQUFvQjs7QUFFcEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNoSkE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7O0FBR0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBTyxDQUFDLG1EQUFZO0FBQ3BCLG1CQUFPLENBQUMsaURBQVc7O0FBRW5CLGlEIiwiZmlsZSI6InBsdWdpbnMvcGFydGljbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wbHVnaW5zL3BhcnRpY2xlcy9pbmRleC5qc1wiKTtcbiIsIlRpbnkuRW1pdHRlciA9IGZ1bmN0aW9uKCBtYXhQYXJ0aWNsZXMgKVxyXG57XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5hbmNob3IgPSBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHRoaXMubWF4UGFydGljbGVzID0gbWF4UGFydGljbGVzXHJcblxyXG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBbXVxyXG5cclxuICAgIHRoaXMucGF0dGVybiA9IFRpbnkuUGFydGljbGVcclxuXHJcbiAgICB0aGlzLmZpbGxTdHlsZSA9IFwiI2Y1NDU0NVwiXHJcblxyXG4gICAgdGhpcy5wYXJ0aWNsZUFuY2hvciA9IG5ldyBUaW55LlBvaW50KDAuNSwgMC41KTtcclxuXHJcbiAgICB0aGlzLm9uID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fdGltZXIgPSAwXHJcblxyXG4gICAgdGhpcy5fcXVhbnRpdHkgPSAwO1xyXG5cclxuICAgIHRoaXMuX2NvdW50ZXIgPSAwO1xyXG5cclxuICAgIHRoaXMuX2Zsb3dRdWFudGl0eSA9IDA7XHJcblxyXG4gICAgdGhpcy5fZmxvd1RvdGFsID0gMDtcclxuXHJcbiAgICB0aGlzLmJsZW5kTW9kZSA9IFwic291cmNlLW92ZXJcIjtcclxufTtcclxuXHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55Lk9iamVjdDJELnByb3RvdHlwZSk7XHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkVtaXR0ZXI7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5FbWl0dGVyLnByb3RvdHlwZSwgJ3dpZHRoJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoXHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkVtaXR0ZXIucHJvdG90eXBlLCAnaGVpZ2h0Jywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUubWFrZVBhcnRpY2xlcyA9IGZ1bmN0aW9uKHRleHR1cmUsIHF1YW50aXR5KVxyXG57XHJcblxyXG5cclxuICAgIHZhciBwYXJ0aWNsZTtcclxuXHJcbiAgICBpZiAocXVhbnRpdHkgPT09IHVuZGVmaW5lZCkgeyBxdWFudGl0eSA9IHRoaXMubWF4UGFydGljbGVzOyB9XHJcblxyXG4gICAgdmFyIGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID4gdGhpcy5tYXhQYXJ0aWNsZXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tYXhQYXJ0aWNsZXMgPSBxdWFudGl0eTtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAoaSA8IHF1YW50aXR5KVxyXG4gICAge1xyXG4gICAgICAgIC8vIGlmIChBcnJheS5pc0FycmF5KGtleXMpKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgcm5kS2V5ID0gdGhpcy5nYW1lLnJuZC5waWNrKGtleXMpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gaWYgKEFycmF5LmlzQXJyYXkoZnJhbWVzKSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHJuZEZyYW1lID0gdGhpcy5nYW1lLnJuZC5waWNrKGZyYW1lcyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBwYXJ0aWNsZSA9IG5ldyB0aGlzLnBhdHRlcm4oIHRoaXMgKTtcclxuXHJcbiAgICAgICAgaWYgKHRleHR1cmUpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcGFydGljbGUuc2V0VGV4dHVyZSh0ZXh0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhcnRpY2xlLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBwYXJ0aWNsZS5hbmNob3Iuc2V0KHRoaXMucGFydGljbGVBbmNob3IueCwgdGhpcy5wYXJ0aWNsZUFuY2hvci55KVxyXG5cclxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKHBhcnRpY2xlKTtcclxuXHJcbiAgICAgICAgaSsrO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuZmxvdyA9IGZ1bmN0aW9uIChsaWZlc3BhbiwgZnJlcXVlbmN5LCBxdWFudGl0eSwgdG90YWwsIGltbWVkaWF0ZSkge1xyXG5cclxuICAgIGlmIChxdWFudGl0eSA9PT0gdW5kZWZpbmVkIHx8IHF1YW50aXR5ID09PSAwKSB7IHF1YW50aXR5ID0gMTsgfVxyXG4gICAgaWYgKHRvdGFsID09PSB1bmRlZmluZWQpIHsgdG90YWwgPSAtMTsgfVxyXG4gICAgaWYgKGltbWVkaWF0ZSA9PT0gdW5kZWZpbmVkKSB7IGltbWVkaWF0ZSA9IHRydWU7IH1cclxuXHJcbiAgICBpZiAocXVhbnRpdHkgPiB0aGlzLm1heFBhcnRpY2xlcylcclxuICAgIHtcclxuICAgICAgICBxdWFudGl0eSA9IHRoaXMubWF4UGFydGljbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5fZmxvd1F1YW50aXR5ID0gcXVhbnRpdHk7XHJcbiAgICB0aGlzLl9mbG93VG90YWwgPSB0b3RhbDtcclxuXHJcbiAgICBpZiAoaW1tZWRpYXRlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhcnQodHJ1ZSwgbGlmZXNwYW4sIGZyZXF1ZW5jeSwgcXVhbnRpdHkpO1xyXG5cclxuICAgICAgICB0aGlzLl9jb3VudGVyICs9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMub24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gZnJlcXVlbmN5XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdGFydChmYWxzZSwgbGlmZXNwYW4sIGZyZXF1ZW5jeSwgcXVhbnRpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxufTtcclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuZXhwbG9kZSA9IGZ1bmN0aW9uIChsaWZlc3BhbiwgcXVhbnRpdHkpIHtcclxuXHJcbiAgICB0aGlzLl9mbG93VG90YWwgPSAwO1xyXG5cclxuICAgIGlmIChxdWFudGl0eSA9PT0gdW5kZWZpbmVkKSB7IHF1YW50aXR5ID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoIH1cclxuXHJcbiAgICB0aGlzLnN0YXJ0KHRydWUsIGxpZmVzcGFuLCAwLCBxdWFudGl0eSwgZmFsc2UpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxufTtcclxuXHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKGV4cGxvZGUsIGxpZmVzcGFuLCBmcmVxdWVuY3ksIHF1YW50aXR5KSB7XHJcblxyXG4gICAgaWYgKGV4cGxvZGUgPT09IHVuZGVmaW5lZCkgeyBleHBsb2RlID0gdHJ1ZTsgfVxyXG4gICAgaWYgKGxpZmVzcGFuID09PSB1bmRlZmluZWQpIHsgbGlmZXNwYW4gPSAwOyB9XHJcbiAgICBpZiAoZnJlcXVlbmN5ID09PSB1bmRlZmluZWQgfHwgZnJlcXVlbmN5ID09PSBudWxsKSB7IGZyZXF1ZW5jeSA9IDI1MDsgfVxyXG4gICAgaWYgKHF1YW50aXR5ID09PSB1bmRlZmluZWQpIHsgcXVhbnRpdHkgPSAwOyB9XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID4gdGhpcy5tYXhQYXJ0aWNsZXMpXHJcbiAgICB7XHJcbiAgICAgICAgcXVhbnRpdHkgPSB0aGlzLm1heFBhcnRpY2xlcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMubGlmZXNwYW4gPSBsaWZlc3BhbjtcclxuICAgIHRoaXMuZnJlcXVlbmN5ID0gZnJlcXVlbmN5O1xyXG5cclxuICAgIC8vdGhpcy51cGRhdGVUcmFuc2Zvcm0oKVxyXG5cclxuICAgIGlmIChleHBsb2RlKVxyXG4gICAge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVhbnRpdHk7IGkrKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdFBhcnRpY2xlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMub24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3F1YW50aXR5ID0gcXVhbnRpdHk7XHJcbiAgICAgICAgdGhpcy5fY291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZXIgPSBmcmVxdWVuY3lcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbn07XHJcblxyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS5lbWl0UGFydGljbGUgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG5cclxuICAgIGlmICh4ID09PSB1bmRlZmluZWQpIHsgeCA9IG51bGw7IH1cclxuICAgIGlmICh5ID09PSB1bmRlZmluZWQpIHsgeSA9IG51bGw7IH1cclxuXHJcbiAgICB2YXIgcGFydGljbGUgPSBudWxsXHJcblxyXG4gICAgdmFyIGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XHJcblxyXG4gICAgd2hpbGUgKGktLSlcclxuICAgIHtcclxuICAgICAgICBpZiAoIXRoaXMucGFydGljbGVzW2ldLnZpc2libGUpIHtcclxuICAgICAgICAgICAgcGFydGljbGUgPSB0aGlzLnBhcnRpY2xlc1tpXVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChwYXJ0aWNsZSA9PT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICB2YXIgaGFsZlNpemU7XHJcblxyXG4gICAgdmFyIGVtaXRYID0gMDtcclxuICAgIHZhciBlbWl0WSA9IDA7XHJcblxyXG4gICAgaWYgKHggIT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgZW1pdFggPSB4O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5fd2lkdGggPiAxKVxyXG4gICAge1xyXG4gICAgICAgIGhhbGZTaXplID0gdGhpcy5fd2lkdGggLyAyXHJcbiAgICAgICAgZW1pdFggPSBUaW55LnJuZCgtaGFsZlNpemUsIGhhbGZTaXplKVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh5ICE9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIGVtaXRZID0geTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuX2hlaWdodCA+IDEpXHJcbiAgICB7XHJcbiAgICAgICAgaGFsZlNpemUgPSB0aGlzLl9oZWlnaHQgLyAyXHJcbiAgICAgICAgZW1pdFkgPSBUaW55LnJuZCgtaGFsZlNpemUsIGhhbGZTaXplKVxyXG4gICAgfVxyXG5cclxuICAgIHBhcnRpY2xlLnJlc2V0KGVtaXRYLCBlbWl0WSk7XHJcblxyXG4gICAgcGFydGljbGUucm90YXRpb24gPSAwO1xyXG4gICAgcGFydGljbGUubGlmZXNwYW4gPSB0aGlzLmxpZmVzcGFuO1xyXG5cclxuXHJcbiAgICAvL3BhcnRpY2xlLmJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG5cclxuICAgIHBhcnRpY2xlLm9uRW1pdCgpO1xyXG5cclxuICAgIHBhcnRpY2xlLnZpc2libGUgPSB0cnVlXHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcblxyXG59O1xyXG5cclxuXHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBpZiAodGhpcy5zeXN0ZW0pIHRoaXMuc3lzdGVtLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICBUaW55Lk9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcbn1cclxuXHJcblxyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggZGVsdGEgKSB7XHJcbiAgICBcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMub24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fdGltZXIgLT0gZGVsdGFcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3RpbWVyIDw9IDApIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gdGhpcy5mcmVxdWVuY3k7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZmxvd1RvdGFsICE9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmxvd1F1YW50aXR5ID4gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2Zsb3dRdWFudGl0eTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdFBhcnRpY2xlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmxvd1RvdGFsICE9PSAtMSAmJiB0aGlzLl9jb3VudGVyID49IHRoaXMuX2Zsb3dUb3RhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdFBhcnRpY2xlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmxvd1RvdGFsICE9PSAtMSAmJiB0aGlzLl9jb3VudGVyID49IHRoaXMuX2Zsb3dUb3RhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdFBhcnRpY2xlKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291bnRlcisrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcXVhbnRpdHkgPiAwICYmIHRoaXMuX2NvdW50ZXIgPj0gdGhpcy5fcXVhbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBpID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlIChpLS0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0uX3VwZGF0ZSggZGVsdGEgKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKHRpbWUpXHJcbn1cclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5hbHBoYSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3JlbmRlckNhY2hlZFNwcml0ZShyZW5kZXJTZXNzaW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5maWxsU3R5bGVcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5hLFxyXG4gICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmIsXHJcbiAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5kLFxyXG4gICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR4ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMucGFydGljbGVzLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLy8gVGlueS5PYmplY3RDcmVhdG9yLnByb3RvdHlwZS5lbWl0dGVyID0gZnVuY3Rpb24oeCwgeSwgbWF4UGFydGljbGVzKSB7XHJcbi8vICAgICB2YXIgZW1pdHRlciA9IG5ldyBUaW55LkVtaXR0ZXIoIG1heFBhcnRpY2xlcyApXHJcbi8vICAgICBlbWl0dGVyLnggPSB4IHx8IDBcclxuLy8gICAgIGVtaXR0ZXIueSA9IHkgfHwgMFxyXG5cclxuLy8gICAgIHRoaXMuZ2FtZS5zdGFnZS5hZGQoZW1pdHRlcilcclxuXHJcbi8vICAgICByZXR1cm4gdGhpcy5nYW1lLnBhcnRpY2xlcy5hZGQoZW1pdHRlcilcclxuLy8gfSIsIlxyXG5UaW55LlBhcnRpY2xlID0gZnVuY3Rpb24oIGVtaXR0ZXIgKVxyXG57XHJcbiAgICBUaW55LkJhc2VPYmplY3QyRC5jYWxsKCB0aGlzICk7XHJcblxyXG4gICAgdGhpcy5wYXJlbnQgPSBlbWl0dGVyXHJcblxyXG4gICAgdGhpcy5hbmNob3IgPSBuZXcgVGlueS5Qb2ludCgpXHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0geyB2YWxpZDogZmFsc2UgfVxyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLmxpZmVzcGFuID0gMFxyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUgKTtcclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LlBhcnRpY2xlO1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUuc2V0VGV4dHVyZSA9IGZ1bmN0aW9uKHRleHR1cmUsIGtleSlcclxue1xyXG4gICAgaWYgKHR5cGVvZiB0ZXh0dXJlID09IFwic3RyaW5nXCIpIFxyXG4gICAge1xyXG4gICAgICAgIHZhciBpbWFnZVBhdGggPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICBpZiAoa2V5ICE9IHVuZGVmaW5lZCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSBpbWFnZVBhdGggKyBcIl9cIiArIGtleTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbaW1hZ2VQYXRoXTtcclxuXHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZVBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUsICdmcmFtZU5hbWUnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlLmZyYW1lLm5hbWVcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUuZnJhbWUubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5UZXh0dXJlQ2FjaGVbdGhpcy50ZXh0dXJlLmtleSArIFwiX1wiICsgdmFsdWVdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUGFydGljbGUucHJvdG90eXBlLCAnZnJhbWUnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZnJhbWVcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUubWF4X25vX2ZyYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gdmFsdWVcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lID4gdGhpcy50ZXh0dXJlLm1heF9ub19mcmFtZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gMFxyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5UZXh0dXJlQ2FjaGVbdGhpcy50ZXh0dXJlLmtleSArIFwiX1wiICsgdGhpcy5fZnJhbWVdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLmRyYXdUZXh0dXJlID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgdmFyIGR4ID0gdGhpcy5hbmNob3IueCAqIC10aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICB2YXIgZHkgPSB0aGlzLmFuY2hvci55ICogLXRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgdmFyIHJlc29sdXRpb24gPSB0aGlzLnRleHR1cmUucmVzb2x1dGlvbiAvIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjsgXHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHkgLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IC8gcmVzb2x1dGlvbik7XHJcbn07XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCB4LCB5ICkge1xyXG5cclxuICAgIHRoaXMueCA9IHggfHwgMFxyXG4gICAgdGhpcy55ID0geSB8fCAwXHJcblxyXG4gICAgdGhpcy5hbHBoYSA9IDE7XHJcbiAgICB0aGlzLnNjYWxlLnNldCgxKTtcclxufVxyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHRpbWUsIGRlbHRhICkgIHtcclxuXHJcbn07XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5vbkVtaXQgPSBmdW5jdGlvbiggICkgIHtcclxuXHJcbn07XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbikge1xyXG5cclxufTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiggZGVsdGEgKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgdGhpcy5saWZlc3BhbiAtPSBkZWx0YTtcclxuXHJcbiAgICBpZiAodGhpcy5saWZlc3BhbiA8PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlKCB0aGlzLmxpZmVzcGFuLCBkZWx0YSApO1xyXG59XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy51cGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHggKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICBpZiAoIHRoaXMudGV4dHVyZS52YWxpZCApXHJcbiAgICAgICAgdGhpcy5kcmF3VGV4dHVyZSggcmVuZGVyU2Vzc2lvbiApXHJcbiAgICBlbHNlXHJcbiAgICAgICAgdGhpcy5kcmF3KCByZW5kZXJTZXNzaW9uLmNvbnRleHQsIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbiApXHJcbn07IiwiVGlueS5QYXJ0aWNsZXMgPSBmdW5jdGlvbiAoZ2FtZSkge1xyXG5cclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gICAgdGhpcy5saXN0ID0gW107XHJcblxyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZXMucHJvdG90eXBlID0ge1xyXG5cclxuICAgIGFkZDogZnVuY3Rpb24gKGVtaXR0ZXIpIHtcclxuXHJcbiAgICAgICAgZW1pdHRlci5zeXN0ZW0gPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3QucHVzaChlbWl0dGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uIChlbWl0dGVyKSB7XHJcbiAgICBcdHZhciBpbmRleE9mID0gdGhpcy5saXN0LmluZGV4T2YoZW1pdHRlcilcclxuXHJcbiAgICAgICAgaWYgKGluZGV4T2YgPiAtMSkge1xyXG4gICAgICAgICAgICB2YXIgZW1pdHRlciA9IHRoaXMubGlzdC5zcGxpY2UoaW5kZXhPZiwgMSk7XHJcbiAgICAgICAgICAgIGVtaXR0ZXIuc3lzdGVtID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCBkZWx0YSApIHtcclxuXHJcbiAgICBcdHZhciBpID0gdGhpcy5saXN0Lmxlbmd0aDtcclxuXHJcblx0ICAgIHdoaWxlIChpLS0pXHJcblx0ICAgIHtcclxuXHQgICAgICAgIHRoaXMubGlzdFtpXS51cGRhdGUoIGRlbHRhICk7XHJcblx0ICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5saXN0Lmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZXMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5QYXJ0aWNsZXM7XHJcblxyXG5yZXF1aXJlKCcuL1BhcnRpY2xlJyk7XHJcbnJlcXVpcmUoJy4vRW1pdHRlcicpO1xyXG5cclxuVGlueS5yZWdpc3RlclN5c3RlbShcInBhcnRpY2xlc1wiLCBUaW55LlBhcnRpY2xlcyk7Il0sInNvdXJjZVJvb3QiOiIifQ==