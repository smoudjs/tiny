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
/******/ 	return __webpack_require__(__webpack_require__.s = "./plugins.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../plugins/particles/Emitter.js":
/*!***************************************!*\
  !*** ../plugins/particles/Emitter.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
            particle.setTexture(texture)

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

/***/ }),

/***/ "../plugins/particles/Particle.js":
/*!****************************************!*\
  !*** ../plugins/particles/Particle.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {


Tiny.Particle = function( emitter )
{
    Tiny.DisplayObject.call( this );

    this.parent = emitter

    this.anchor = new Tiny.Point()

    this.texture = { valid: false }

    this._frame = 0;

    this.lifespan = 0
};

Tiny.Particle.prototype = Object.create( Tiny.DisplayObject.prototype );
Tiny.Particle.prototype.constructor = Tiny.Particle;

Tiny.Particle.prototype.setTexture = function(texture)
{
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

    var resolution = this.texture.baseTexture.resolution / renderSession.resolution; 

    renderSession.context.drawImage(
                            this.texture.baseTexture.source,
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

    this.update( this.lifespan, delta )

    this.updateTransform()

}

Tiny.Particle.prototype._renderCanvas = function(renderSession)
{
    if (this.visible === false || this.alpha === 0) return;

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

/***/ "../plugins/particles/index.js":
/*!*************************************!*\
  !*** ../plugins/particles/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Tiny.Particles = function (game) {

    this.game = game;

    this.emitters = [];

};

Tiny.Particles.prototype = {

    add: function (emitter) {

        this.emitters.push(emitter);

        return emitter;

    },

    remove: function (emitter) {
    	var indexOf = this.emitters.indexOf(emitter)

        if (indexOf > -1) {
            return this.emitters.splice(indexOf, 1)
        }

    },


    update: function ( time, delta ) {

    	var i = this.emitters.length;

	    while (i--)
	    {
	        this.emitters[i].update( time, delta );
	    }
    }

};

Tiny.Particles.prototype.constructor = Tiny.Particles;

__webpack_require__(/*! ./Particle */ "../plugins/particles/Particle.js");
__webpack_require__(/*! ./Emitter */ "../plugins/particles/Emitter.js");

/***/ }),

/***/ "./plugins.js":
/*!********************!*\
  !*** ./plugins.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../plugins/particles */ "../plugins/particles/index.js");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3BsdWdpbnMvcGFydGljbGVzL0VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3BsdWdpbnMvcGFydGljbGVzL1BhcnRpY2xlLmpzIiwid2VicGFjazovLy8uLi9wbHVnaW5zL3BhcnRpY2xlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wbHVnaW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7OztBQUdBOztBQUVBLGlDQUFpQyw4QkFBOEI7O0FBRS9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtREFBbUQsY0FBYztBQUNqRSw4QkFBOEIsWUFBWTtBQUMxQyxrQ0FBa0Msa0JBQWtCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsaUNBQWlDOztBQUVqQzs7QUFFQTs7QUFFQTs7O0FBR0E7O0FBRUEsZ0NBQWdDLGdCQUFnQjtBQUNoRCxpQ0FBaUMsY0FBYztBQUMvQyx3REFBd0QsaUJBQWlCO0FBQ3pFLGlDQUFpQyxjQUFjOztBQUUvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsY0FBYztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTs7QUFFQSwwQkFBMEIsVUFBVTtBQUNwQywwQkFBMEIsVUFBVTs7QUFFcEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOzs7O0FBSUE7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7QUFJQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsd0JBQXdCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsZUFBZSwyQkFBMkI7QUFDMUM7QUFDQTtBQUNBOztBQUVBLGVBQWUsMEJBQTBCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEM7Ozs7Ozs7Ozs7OztBQy9YQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsb0JBQW9COztBQUVwQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUNuSUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOzs7QUFHTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG1CQUFPLENBQUMsb0RBQVk7QUFDcEIsbUJBQU8sQ0FBQyxrREFBVyxFOzs7Ozs7Ozs7OztBQzNDbkIsbUJBQU8sQ0FBQywyREFBc0IsRSIsImZpbGUiOiJwbHVnaW5zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9wbHVnaW5zLmpzXCIpO1xuIiwiVGlueS5FbWl0dGVyID0gZnVuY3Rpb24oIG1heFBhcnRpY2xlcyApXHJcbntcclxuICAgIFRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5jYWxsKHRoaXMpO1xyXG5cclxuICAgIHRoaXMuYW5jaG9yID0gbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB0aGlzLm1heFBhcnRpY2xlcyA9IG1heFBhcnRpY2xlc1xyXG5cclxuICAgIHRoaXMucGFydGljbGVzID0gW11cclxuXHJcbiAgICB0aGlzLnBhdHRlcm4gPSBUaW55LlBhcnRpY2xlXHJcblxyXG4gICAgdGhpcy5maWxsU3R5bGUgPSBcIiNmNTQ1NDVcIlxyXG5cclxuICAgIHRoaXMucGFydGljbGVBbmNob3IgPSBuZXcgVGlueS5Qb2ludCgwLjUsIDAuNSk7XHJcblxyXG4gICAgdGhpcy5vbiA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3RpbWVyID0gMFxyXG5cclxuICAgIHRoaXMuX3F1YW50aXR5ID0gMDtcclxuXHJcbiAgICB0aGlzLl9jb3VudGVyID0gMDtcclxuXHJcbiAgICB0aGlzLl9mbG93UXVhbnRpdHkgPSAwO1xyXG5cclxuICAgIHRoaXMuX2Zsb3dUb3RhbCA9IDA7XHJcblxyXG4gICAgdGhpcy5ibGVuZE1vZGUgPSBcInNvdXJjZS1vdmVyXCI7XHJcbn07XHJcblxyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZSk7XHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkVtaXR0ZXI7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5FbWl0dGVyLnByb3RvdHlwZSwgJ3dpZHRoJywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoXHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICB0aGlzLl93aWR0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LkVtaXR0ZXIucHJvdG90eXBlLCAnaGVpZ2h0Jywge1xyXG5cclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUubWFrZVBhcnRpY2xlcyA9IGZ1bmN0aW9uKHRleHR1cmUsIHF1YW50aXR5KVxyXG57XHJcblxyXG5cclxuICAgIHZhciBwYXJ0aWNsZTtcclxuXHJcbiAgICBpZiAocXVhbnRpdHkgPT09IHVuZGVmaW5lZCkgeyBxdWFudGl0eSA9IHRoaXMubWF4UGFydGljbGVzOyB9XHJcblxyXG4gICAgdmFyIGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID4gdGhpcy5tYXhQYXJ0aWNsZXMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tYXhQYXJ0aWNsZXMgPSBxdWFudGl0eTtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAoaSA8IHF1YW50aXR5KVxyXG4gICAge1xyXG4gICAgICAgIC8vIGlmIChBcnJheS5pc0FycmF5KGtleXMpKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgcm5kS2V5ID0gdGhpcy5nYW1lLnJuZC5waWNrKGtleXMpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gaWYgKEFycmF5LmlzQXJyYXkoZnJhbWVzKSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHJuZEZyYW1lID0gdGhpcy5nYW1lLnJuZC5waWNrKGZyYW1lcyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBwYXJ0aWNsZSA9IG5ldyB0aGlzLnBhdHRlcm4oIHRoaXMgKTtcclxuXHJcbiAgICAgICAgaWYgKHRleHR1cmUpXHJcbiAgICAgICAgICAgIHBhcnRpY2xlLnNldFRleHR1cmUodGV4dHVyZSlcclxuXHJcbiAgICAgICAgcGFydGljbGUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHBhcnRpY2xlLmFuY2hvci5zZXQodGhpcy5wYXJ0aWNsZUFuY2hvci54LCB0aGlzLnBhcnRpY2xlQW5jaG9yLnkpXHJcblxyXG4gICAgICAgIHRoaXMucGFydGljbGVzLnB1c2gocGFydGljbGUpO1xyXG5cclxuICAgICAgICBpKys7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS5mbG93ID0gZnVuY3Rpb24gKGxpZmVzcGFuLCBmcmVxdWVuY3ksIHF1YW50aXR5LCB0b3RhbCwgaW1tZWRpYXRlKSB7XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID09PSB1bmRlZmluZWQgfHwgcXVhbnRpdHkgPT09IDApIHsgcXVhbnRpdHkgPSAxOyB9XHJcbiAgICBpZiAodG90YWwgPT09IHVuZGVmaW5lZCkgeyB0b3RhbCA9IC0xOyB9XHJcbiAgICBpZiAoaW1tZWRpYXRlID09PSB1bmRlZmluZWQpIHsgaW1tZWRpYXRlID0gdHJ1ZTsgfVxyXG5cclxuICAgIGlmIChxdWFudGl0eSA+IHRoaXMubWF4UGFydGljbGVzKVxyXG4gICAge1xyXG4gICAgICAgIHF1YW50aXR5ID0gdGhpcy5tYXhQYXJ0aWNsZXM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY291bnRlciA9IDA7XHJcbiAgICB0aGlzLl9mbG93UXVhbnRpdHkgPSBxdWFudGl0eTtcclxuICAgIHRoaXMuX2Zsb3dUb3RhbCA9IHRvdGFsO1xyXG5cclxuICAgIGlmIChpbW1lZGlhdGUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zdGFydCh0cnVlLCBsaWZlc3BhbiwgZnJlcXVlbmN5LCBxdWFudGl0eSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvdW50ZXIgKz0gcXVhbnRpdHk7XHJcbiAgICAgICAgdGhpcy5vbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdGltZXIgPSBmcmVxdWVuY3lcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXJ0KGZhbHNlLCBsaWZlc3BhbiwgZnJlcXVlbmN5LCBxdWFudGl0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG59O1xyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS5leHBsb2RlID0gZnVuY3Rpb24gKGxpZmVzcGFuLCBxdWFudGl0eSkge1xyXG5cclxuICAgIHRoaXMuX2Zsb3dUb3RhbCA9IDA7XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID09PSB1bmRlZmluZWQpIHsgcXVhbnRpdHkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGggfVxyXG5cclxuICAgIHRoaXMuc3RhcnQodHJ1ZSwgbGlmZXNwYW4sIDAsIHF1YW50aXR5LCBmYWxzZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG59O1xyXG5cclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoZXhwbG9kZSwgbGlmZXNwYW4sIGZyZXF1ZW5jeSwgcXVhbnRpdHkpIHtcclxuXHJcbiAgICBpZiAoZXhwbG9kZSA9PT0gdW5kZWZpbmVkKSB7IGV4cGxvZGUgPSB0cnVlOyB9XHJcbiAgICBpZiAobGlmZXNwYW4gPT09IHVuZGVmaW5lZCkgeyBsaWZlc3BhbiA9IDA7IH1cclxuICAgIGlmIChmcmVxdWVuY3kgPT09IHVuZGVmaW5lZCB8fCBmcmVxdWVuY3kgPT09IG51bGwpIHsgZnJlcXVlbmN5ID0gMjUwOyB9XHJcbiAgICBpZiAocXVhbnRpdHkgPT09IHVuZGVmaW5lZCkgeyBxdWFudGl0eSA9IDA7IH1cclxuXHJcbiAgICBpZiAocXVhbnRpdHkgPiB0aGlzLm1heFBhcnRpY2xlcylcclxuICAgIHtcclxuICAgICAgICBxdWFudGl0eSA9IHRoaXMubWF4UGFydGljbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5saWZlc3BhbiA9IGxpZmVzcGFuO1xyXG4gICAgdGhpcy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XHJcblxyXG4gICAgLy90aGlzLnVwZGF0ZVRyYW5zZm9ybSgpXHJcblxyXG4gICAgaWYgKGV4cGxvZGUpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWFudGl0eTsgaSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0UGFydGljbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5vbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fcXVhbnRpdHkgPSBxdWFudGl0eTtcclxuICAgICAgICB0aGlzLl9jb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lciA9IGZyZXF1ZW5jeVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxufTtcclxuXHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLmVtaXRQYXJ0aWNsZSA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcblxyXG4gICAgaWYgKHggPT09IHVuZGVmaW5lZCkgeyB4ID0gbnVsbDsgfVxyXG4gICAgaWYgKHkgPT09IHVuZGVmaW5lZCkgeyB5ID0gbnVsbDsgfVxyXG5cclxuICAgIHZhciBwYXJ0aWNsZSA9IG51bGxcclxuXHJcbiAgICB2YXIgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKVxyXG4gICAge1xyXG4gICAgICAgIGlmICghdGhpcy5wYXJ0aWNsZXNbaV0udmlzaWJsZSkge1xyXG4gICAgICAgICAgICBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKHBhcnRpY2xlID09PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHZhciBoYWxmU2l6ZTtcclxuXHJcbiAgICB2YXIgZW1pdFggPSAwO1xyXG4gICAgdmFyIGVtaXRZID0gMDtcclxuXHJcbiAgICBpZiAoeCAhPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBlbWl0WCA9IHg7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLl93aWR0aCA+IDEpXHJcbiAgICB7XHJcbiAgICAgICAgaGFsZlNpemUgPSB0aGlzLl93aWR0aCAvIDJcclxuICAgICAgICBlbWl0WCA9IFRpbnkucm5kKC1oYWxmU2l6ZSwgaGFsZlNpemUpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHkgIT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgZW1pdFkgPSB5O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodGhpcy5faGVpZ2h0ID4gMSlcclxuICAgIHtcclxuICAgICAgICBoYWxmU2l6ZSA9IHRoaXMuX2hlaWdodCAvIDJcclxuICAgICAgICBlbWl0WSA9IFRpbnkucm5kKC1oYWxmU2l6ZSwgaGFsZlNpemUpXHJcbiAgICB9XHJcblxyXG4gICAgcGFydGljbGUucmVzZXQoZW1pdFgsIGVtaXRZKTtcclxuXHJcbiAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IDA7XHJcbiAgICBwYXJ0aWNsZS5saWZlc3BhbiA9IHRoaXMubGlmZXNwYW47XHJcblxyXG5cclxuICAgIC8vcGFydGljbGUuYmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XHJcblxyXG4gICAgcGFydGljbGUub25FbWl0KCk7XHJcblxyXG4gICAgcGFydGljbGUudmlzaWJsZSA9IHRydWVcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuXHJcbn07XHJcblxyXG5cclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMuZ2FtZS5wYXJ0aWNsZXMucmVtb3ZlKHRoaXMpO1xyXG5cclxuICAgIFRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUuZGVzdHJveS5jYWxsKHRoaXMpO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCBkZWx0YSApIHtcclxuXHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLm9uKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX3RpbWVyIC09IGRlbHRhXHJcblxyXG4gICAgICAgIGlmICh0aGlzLl90aW1lciA8PSAwKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IHRoaXMuZnJlcXVlbmN5O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Zsb3dUb3RhbCAhPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Zsb3dRdWFudGl0eSA+IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9mbG93UXVhbnRpdHk7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVtaXRQYXJ0aWNsZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Zsb3dUb3RhbCAhPT0gLTEgJiYgdGhpcy5fY291bnRlciA+PSB0aGlzLl9mbG93VG90YWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVtaXRQYXJ0aWNsZSgpKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291bnRlcisrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Zsb3dUb3RhbCAhPT0gLTEgJiYgdGhpcy5fY291bnRlciA+PSB0aGlzLl9mbG93VG90YWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVtaXRQYXJ0aWNsZSgpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3F1YW50aXR5ID4gMCAmJiB0aGlzLl9jb3VudGVyID49IHRoaXMuX3F1YW50aXR5KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzW2ldLl91cGRhdGUoIGRlbHRhICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZyh0aW1lKVxyXG59XHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLl9yZW5kZXJDYW52YXMgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyQ2FjaGVkU3ByaXRlKHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnB1c2hNYXNrKHRoaXMuX21hc2ssIHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmZpbGxTdHlsZVxyXG5cclxuICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5nbG9iYWxBbHBoYSA9IHRoaXMud29ybGRBbHBoYTtcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmEsXHJcbiAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5jLFxyXG4gICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmQsXHJcbiAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHggKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24sXHJcbiAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24pO1xyXG5cclxuICAgIHZhciBpID0gMDtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5wYXJ0aWNsZXMubGVuZ3RoOyBpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0uX3JlbmRlckNhbnZhcyhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuW2ldLl9yZW5kZXJDYW52YXMocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spXHJcbiAgICB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblRpbnkuT2JqZWN0Q3JlYXRvci5wcm90b3R5cGUuZW1pdHRlciA9IGZ1bmN0aW9uKHgsIHksIG1heFBhcnRpY2xlcykge1xyXG4gICAgdmFyIGVtaXR0ZXIgPSBuZXcgVGlueS5FbWl0dGVyKCBtYXhQYXJ0aWNsZXMgKVxyXG4gICAgZW1pdHRlci54ID0geCB8fCAwXHJcbiAgICBlbWl0dGVyLnkgPSB5IHx8IDBcclxuXHJcbiAgICB0aGlzLmdhbWUuc3RhZ2UuYWRkQ2hpbGQoZW1pdHRlcilcclxuXHJcbiAgICByZXR1cm4gdGhpcy5nYW1lLnBhcnRpY2xlcy5hZGQoZW1pdHRlcilcclxufSIsIlxyXG5UaW55LlBhcnRpY2xlID0gZnVuY3Rpb24oIGVtaXR0ZXIgKVxyXG57XHJcbiAgICBUaW55LkRpc3BsYXlPYmplY3QuY2FsbCggdGhpcyApO1xyXG5cclxuICAgIHRoaXMucGFyZW50ID0gZW1pdHRlclxyXG5cclxuICAgIHRoaXMuYW5jaG9yID0gbmV3IFRpbnkuUG9pbnQoKVxyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IHsgdmFsaWQ6IGZhbHNlIH1cclxuXHJcbiAgICB0aGlzLl9mcmFtZSA9IDA7XHJcblxyXG4gICAgdGhpcy5saWZlc3BhbiA9IDBcclxufTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVGlueS5EaXNwbGF5T2JqZWN0LnByb3RvdHlwZSApO1xyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUGFydGljbGU7XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24odGV4dHVyZSlcclxue1xyXG4gICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZTtcclxufTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlBhcnRpY2xlLnByb3RvdHlwZSwgJ2ZyYW1lTmFtZScsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHR1cmUuZnJhbWUubmFtZVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZS5mcmFtZS5uYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dHVyZShUaW55LlRleHR1cmVDYWNoZVt0aGlzLnRleHR1cmUua2V5ICsgXCJfXCIgKyB2YWx1ZV0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUsICdmcmFtZScsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mcmFtZVxyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZS5tYXhfbm9fZnJhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSB2YWx1ZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZnJhbWUgPiB0aGlzLnRleHR1cmUubWF4X25vX2ZyYW1lKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSAwXHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dHVyZShUaW55LlRleHR1cmVDYWNoZVt0aGlzLnRleHR1cmUua2V5ICsgXCJfXCIgKyB0aGlzLl9mcmFtZV0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUuZHJhd1RleHR1cmUgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICB2YXIgZHggPSB0aGlzLmFuY2hvci54ICogLXRoaXMudGV4dHVyZS5mcmFtZS53aWR0aDtcclxuICAgIHZhciBkeSA9IHRoaXMuYW5jaG9yLnkgKiAtdGhpcy50ZXh0dXJlLmZyYW1lLmhlaWdodDtcclxuXHJcbiAgICB2YXIgcmVzb2x1dGlvbiA9IHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5yZXNvbHV0aW9uIC8gcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uOyBcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmJhc2VUZXh0dXJlLnNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLngsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC55LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeSAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgLyByZXNvbHV0aW9uKTtcclxufTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oIHgsIHkgKSB7XHJcblxyXG4gICAgdGhpcy54ID0geCB8fCAwXHJcbiAgICB0aGlzLnkgPSB5IHx8IDBcclxuXHJcbiAgICB0aGlzLmFscGhhID0gMTtcclxuICAgIHRoaXMuc2NhbGUuc2V0KDEpO1xyXG59XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggdGltZSwgZGVsdGEgKSAge1xyXG5cclxufTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLm9uRW1pdCA9IGZ1bmN0aW9uKCAgKSAge1xyXG5cclxufTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKSB7XHJcblxyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uKCBkZWx0YSApIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICB0aGlzLmxpZmVzcGFuIC09IGRlbHRhO1xyXG5cclxuICAgIGlmICh0aGlzLmxpZmVzcGFuIDw9IDApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2VcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGUoIHRoaXMubGlmZXNwYW4sIGRlbHRhIClcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVRyYW5zZm9ybSgpXHJcblxyXG59XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5fcmVuZGVyQ2FudmFzID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5hbHBoYSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5nbG9iYWxBbHBoYSA9IHRoaXMud29ybGRBbHBoYTtcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5hLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5iLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5jLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5kLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24pO1xyXG5cclxuICAgIGlmICggdGhpcy50ZXh0dXJlLnZhbGlkIClcclxuICAgICAgICB0aGlzLmRyYXdUZXh0dXJlKCByZW5kZXJTZXNzaW9uIClcclxuICAgIGVsc2VcclxuICAgICAgICB0aGlzLmRyYXcoIHJlbmRlclNlc3Npb24uY29udGV4dCwgcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uIClcclxufTsiLCJUaW55LlBhcnRpY2xlcyA9IGZ1bmN0aW9uIChnYW1lKSB7XHJcblxyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuXHJcbiAgICB0aGlzLmVtaXR0ZXJzID0gW107XHJcblxyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZXMucHJvdG90eXBlID0ge1xyXG5cclxuICAgIGFkZDogZnVuY3Rpb24gKGVtaXR0ZXIpIHtcclxuXHJcbiAgICAgICAgdGhpcy5lbWl0dGVycy5wdXNoKGVtaXR0ZXIpO1xyXG5cclxuICAgICAgICByZXR1cm4gZW1pdHRlcjtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKGVtaXR0ZXIpIHtcclxuICAgIFx0dmFyIGluZGV4T2YgPSB0aGlzLmVtaXR0ZXJzLmluZGV4T2YoZW1pdHRlcilcclxuXHJcbiAgICAgICAgaWYgKGluZGV4T2YgPiAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lbWl0dGVycy5zcGxpY2UoaW5kZXhPZiwgMSlcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoIHRpbWUsIGRlbHRhICkge1xyXG5cclxuICAgIFx0dmFyIGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcclxuXHJcblx0ICAgIHdoaWxlIChpLS0pXHJcblx0ICAgIHtcclxuXHQgICAgICAgIHRoaXMuZW1pdHRlcnNbaV0udXBkYXRlKCB0aW1lLCBkZWx0YSApO1xyXG5cdCAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZXMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5QYXJ0aWNsZXM7XHJcblxyXG5yZXF1aXJlKCcuL1BhcnRpY2xlJyk7XHJcbnJlcXVpcmUoJy4vRW1pdHRlcicpOyIsInJlcXVpcmUoJy4uL3BsdWdpbnMvcGFydGljbGVzJyk7Il0sInNvdXJjZVJvb3QiOiIifQ==