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

Tiny.Particle.prototype.setTexture = function(texture, key)
{
    if (typeof texture == "string") 
    {
        var imagePath = texture;

        if (key != undefined) 
        {
            imagePath = imagePath + "_" + key;
        }

        texture = Tiny.TextureCache[imagePath]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3BsdWdpbnMvcGFydGljbGVzL0VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3BsdWdpbnMvcGFydGljbGVzL1BhcnRpY2xlLmpzIiwid2VicGFjazovLy8uLi9wbHVnaW5zL3BhcnRpY2xlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wbHVnaW5zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7OztBQUdBOztBQUVBLGlDQUFpQyw4QkFBOEI7O0FBRS9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsbURBQW1ELGNBQWM7QUFDakUsOEJBQThCLFlBQVk7QUFDMUMsa0NBQWtDLGtCQUFrQjs7QUFFcEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLGlDQUFpQzs7QUFFakM7O0FBRUE7O0FBRUE7OztBQUdBOztBQUVBLGdDQUFnQyxnQkFBZ0I7QUFDaEQsaUNBQWlDLGNBQWM7QUFDL0Msd0RBQXdELGlCQUFpQjtBQUN6RSxpQ0FBaUMsY0FBYzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLGNBQWM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7O0FBRUEsMEJBQTBCLFVBQVU7QUFDcEMsMEJBQTBCLFVBQVU7O0FBRXBDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7OztBQUlBOztBQUVBOztBQUVBOztBQUVBOzs7O0FBSUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLHdCQUF3QjtBQUMzRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGVBQWUsMkJBQTJCO0FBQzFDO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLDBCQUEwQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDOzs7Ozs7Ozs7Ozs7QUNqWUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLG9CQUFvQjs7QUFFcEI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9GOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDL0lBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7O0FBR0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxtQkFBTyxDQUFDLG9EQUFZO0FBQ3BCLG1CQUFPLENBQUMsa0RBQVcsRTs7Ozs7Ozs7Ozs7QUMzQ25CLG1CQUFPLENBQUMsMkRBQXNCLEUiLCJmaWxlIjoicGx1Z2lucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vcGx1Z2lucy5qc1wiKTtcbiIsIlRpbnkuRW1pdHRlciA9IGZ1bmN0aW9uKCBtYXhQYXJ0aWNsZXMgKVxyXG57XHJcbiAgICBUaW55LkRpc3BsYXlPYmplY3RDb250YWluZXIuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmFuY2hvciA9IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdGhpcy5tYXhQYXJ0aWNsZXMgPSBtYXhQYXJ0aWNsZXNcclxuXHJcbiAgICB0aGlzLnBhcnRpY2xlcyA9IFtdXHJcblxyXG4gICAgdGhpcy5wYXR0ZXJuID0gVGlueS5QYXJ0aWNsZVxyXG5cclxuICAgIHRoaXMuZmlsbFN0eWxlID0gXCIjZjU0NTQ1XCJcclxuXHJcbiAgICB0aGlzLnBhcnRpY2xlQW5jaG9yID0gbmV3IFRpbnkuUG9pbnQoMC41LCAwLjUpO1xyXG5cclxuICAgIHRoaXMub24gPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLl90aW1lciA9IDBcclxuXHJcbiAgICB0aGlzLl9xdWFudGl0eSA9IDA7XHJcblxyXG4gICAgdGhpcy5fY291bnRlciA9IDA7XHJcblxyXG4gICAgdGhpcy5fZmxvd1F1YW50aXR5ID0gMDtcclxuXHJcbiAgICB0aGlzLl9mbG93VG90YWwgPSAwO1xyXG5cclxuICAgIHRoaXMuYmxlbmRNb2RlID0gXCJzb3VyY2Utb3ZlclwiO1xyXG59O1xyXG5cclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuRGlzcGxheU9iamVjdENvbnRhaW5lci5wcm90b3R5cGUpO1xyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5FbWl0dGVyO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuRW1pdHRlci5wcm90b3R5cGUsICd3aWR0aCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aFxyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5FbWl0dGVyLnByb3RvdHlwZSwgJ2hlaWdodCcsIHtcclxuXHJcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHRcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLm1ha2VQYXJ0aWNsZXMgPSBmdW5jdGlvbih0ZXh0dXJlLCBxdWFudGl0eSlcclxue1xyXG5cclxuXHJcbiAgICB2YXIgcGFydGljbGU7XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID09PSB1bmRlZmluZWQpIHsgcXVhbnRpdHkgPSB0aGlzLm1heFBhcnRpY2xlczsgfVxyXG5cclxuICAgIHZhciBpID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xyXG5cclxuICAgIGlmIChxdWFudGl0eSA+IHRoaXMubWF4UGFydGljbGVzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubWF4UGFydGljbGVzID0gcXVhbnRpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgd2hpbGUgKGkgPCBxdWFudGl0eSlcclxuICAgIHtcclxuICAgICAgICAvLyBpZiAoQXJyYXkuaXNBcnJheShrZXlzKSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHJuZEtleSA9IHRoaXMuZ2FtZS5ybmQucGljayhrZXlzKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIGlmIChBcnJheS5pc0FycmF5KGZyYW1lcykpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBybmRGcmFtZSA9IHRoaXMuZ2FtZS5ybmQucGljayhmcmFtZXMpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgcGFydGljbGUgPSBuZXcgdGhpcy5wYXR0ZXJuKCB0aGlzICk7XHJcblxyXG4gICAgICAgIGlmICh0ZXh0dXJlKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHBhcnRpY2xlLnNldFRleHR1cmUodGV4dHVyZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYXJ0aWNsZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgcGFydGljbGUuYW5jaG9yLnNldCh0aGlzLnBhcnRpY2xlQW5jaG9yLngsIHRoaXMucGFydGljbGVBbmNob3IueSlcclxuXHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XHJcblxyXG4gICAgICAgIGkrKztcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLmZsb3cgPSBmdW5jdGlvbiAobGlmZXNwYW4sIGZyZXF1ZW5jeSwgcXVhbnRpdHksIHRvdGFsLCBpbW1lZGlhdGUpIHtcclxuXHJcbiAgICBpZiAocXVhbnRpdHkgPT09IHVuZGVmaW5lZCB8fCBxdWFudGl0eSA9PT0gMCkgeyBxdWFudGl0eSA9IDE7IH1cclxuICAgIGlmICh0b3RhbCA9PT0gdW5kZWZpbmVkKSB7IHRvdGFsID0gLTE7IH1cclxuICAgIGlmIChpbW1lZGlhdGUgPT09IHVuZGVmaW5lZCkgeyBpbW1lZGlhdGUgPSB0cnVlOyB9XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID4gdGhpcy5tYXhQYXJ0aWNsZXMpXHJcbiAgICB7XHJcbiAgICAgICAgcXVhbnRpdHkgPSB0aGlzLm1heFBhcnRpY2xlcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jb3VudGVyID0gMDtcclxuICAgIHRoaXMuX2Zsb3dRdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgdGhpcy5fZmxvd1RvdGFsID0gdG90YWw7XHJcblxyXG4gICAgaWYgKGltbWVkaWF0ZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXJ0KHRydWUsIGxpZmVzcGFuLCBmcmVxdWVuY3ksIHF1YW50aXR5KTtcclxuXHJcbiAgICAgICAgdGhpcy5fY291bnRlciArPSBxdWFudGl0eTtcclxuICAgICAgICB0aGlzLm9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl90aW1lciA9IGZyZXF1ZW5jeVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuc3RhcnQoZmFsc2UsIGxpZmVzcGFuLCBmcmVxdWVuY3ksIHF1YW50aXR5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbn07XHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLmV4cGxvZGUgPSBmdW5jdGlvbiAobGlmZXNwYW4sIHF1YW50aXR5KSB7XHJcblxyXG4gICAgdGhpcy5fZmxvd1RvdGFsID0gMDtcclxuXHJcbiAgICBpZiAocXVhbnRpdHkgPT09IHVuZGVmaW5lZCkgeyBxdWFudGl0eSA9IHRoaXMucGFydGljbGVzLmxlbmd0aCB9XHJcblxyXG4gICAgdGhpcy5zdGFydCh0cnVlLCBsaWZlc3BhbiwgMCwgcXVhbnRpdHksIGZhbHNlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbn07XHJcblxyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uIChleHBsb2RlLCBsaWZlc3BhbiwgZnJlcXVlbmN5LCBxdWFudGl0eSkge1xyXG5cclxuICAgIGlmIChleHBsb2RlID09PSB1bmRlZmluZWQpIHsgZXhwbG9kZSA9IHRydWU7IH1cclxuICAgIGlmIChsaWZlc3BhbiA9PT0gdW5kZWZpbmVkKSB7IGxpZmVzcGFuID0gMDsgfVxyXG4gICAgaWYgKGZyZXF1ZW5jeSA9PT0gdW5kZWZpbmVkIHx8IGZyZXF1ZW5jeSA9PT0gbnVsbCkgeyBmcmVxdWVuY3kgPSAyNTA7IH1cclxuICAgIGlmIChxdWFudGl0eSA9PT0gdW5kZWZpbmVkKSB7IHF1YW50aXR5ID0gMDsgfVxyXG5cclxuICAgIGlmIChxdWFudGl0eSA+IHRoaXMubWF4UGFydGljbGVzKVxyXG4gICAge1xyXG4gICAgICAgIHF1YW50aXR5ID0gdGhpcy5tYXhQYXJ0aWNsZXM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmxpZmVzcGFuID0gbGlmZXNwYW47XHJcbiAgICB0aGlzLmZyZXF1ZW5jeSA9IGZyZXF1ZW5jeTtcclxuXHJcbiAgICAvL3RoaXMudXBkYXRlVHJhbnNmb3JtKClcclxuXHJcbiAgICBpZiAoZXhwbG9kZSlcclxuICAgIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXRQYXJ0aWNsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICB0aGlzLm9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMuX2NvdW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gZnJlcXVlbmN5XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG59O1xyXG5cclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuZW1pdFBhcnRpY2xlID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuXHJcbiAgICBpZiAoeCA9PT0gdW5kZWZpbmVkKSB7IHggPSBudWxsOyB9XHJcbiAgICBpZiAoeSA9PT0gdW5kZWZpbmVkKSB7IHkgPSBudWxsOyB9XHJcblxyXG4gICAgdmFyIHBhcnRpY2xlID0gbnVsbFxyXG5cclxuICAgIHZhciBpID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlIChpLS0pXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBhcnRpY2xlc1tpXS52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNbaV1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAocGFydGljbGUgPT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgdmFyIGhhbGZTaXplO1xyXG5cclxuICAgIHZhciBlbWl0WCA9IDA7XHJcbiAgICB2YXIgZW1pdFkgPSAwO1xyXG5cclxuICAgIGlmICh4ICE9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIGVtaXRYID0geDtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRoaXMuX3dpZHRoID4gMSlcclxuICAgIHtcclxuICAgICAgICBoYWxmU2l6ZSA9IHRoaXMuX3dpZHRoIC8gMlxyXG4gICAgICAgIGVtaXRYID0gVGlueS5ybmQoLWhhbGZTaXplLCBoYWxmU2l6ZSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoeSAhPT0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBlbWl0WSA9IHk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0aGlzLl9oZWlnaHQgPiAxKVxyXG4gICAge1xyXG4gICAgICAgIGhhbGZTaXplID0gdGhpcy5faGVpZ2h0IC8gMlxyXG4gICAgICAgIGVtaXRZID0gVGlueS5ybmQoLWhhbGZTaXplLCBoYWxmU2l6ZSlcclxuICAgIH1cclxuXHJcbiAgICBwYXJ0aWNsZS5yZXNldChlbWl0WCwgZW1pdFkpO1xyXG5cclxuICAgIHBhcnRpY2xlLnJvdGF0aW9uID0gMDtcclxuICAgIHBhcnRpY2xlLmxpZmVzcGFuID0gdGhpcy5saWZlc3BhbjtcclxuXHJcblxyXG4gICAgLy9wYXJ0aWNsZS5ibGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcclxuXHJcbiAgICBwYXJ0aWNsZS5vbkVtaXQoKTtcclxuXHJcbiAgICBwYXJ0aWNsZS52aXNpYmxlID0gdHJ1ZVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG5cclxufTtcclxuXHJcblxyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy5nYW1lLnBhcnRpY2xlcy5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgVGlueS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyLnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIGRlbHRhICkge1xyXG5cclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlKSByZXR1cm47XHJcblxyXG4gICAgaWYgKHRoaXMub24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fdGltZXIgLT0gZGVsdGFcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX3RpbWVyIDw9IDApIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gdGhpcy5mcmVxdWVuY3k7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZmxvd1RvdGFsICE9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmxvd1F1YW50aXR5ID4gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2Zsb3dRdWFudGl0eTsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdFBhcnRpY2xlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmxvd1RvdGFsICE9PSAtMSAmJiB0aGlzLl9jb3VudGVyID49IHRoaXMuX2Zsb3dUb3RhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdFBhcnRpY2xlKCkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmxvd1RvdGFsICE9PSAtMSAmJiB0aGlzLl9jb3VudGVyID49IHRoaXMuX2Zsb3dUb3RhbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdFBhcnRpY2xlKCkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291bnRlcisrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcXVhbnRpdHkgPiAwICYmIHRoaXMuX2NvdW50ZXIgPj0gdGhpcy5fcXVhbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBpID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlIChpLS0pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0uX3VwZGF0ZSggZGVsdGEgKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKHRpbWUpXHJcbn1cclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuX3JlbmRlckNhbnZhcyA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5fY2FjaGVBc0JpdG1hcClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJDYWNoZWRTcHJpdGUocmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKVxyXG4gICAge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZmlsbFN0eWxlXHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5zZXRUcmFuc2Zvcm0oXHJcbiAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5iLFxyXG4gICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmMsXHJcbiAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbixcclxuICAgICAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS50eSAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbik7XHJcblxyXG4gICAgdmFyIGkgPSAwO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnBhcnRpY2xlc1tpXS5fcmVuZGVyQ2FudmFzKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0uX3JlbmRlckNhbnZhcyhyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaylcclxuICAgIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuVGlueS5PYmplY3RDcmVhdG9yLnByb3RvdHlwZS5lbWl0dGVyID0gZnVuY3Rpb24oeCwgeSwgbWF4UGFydGljbGVzKSB7XHJcbiAgICB2YXIgZW1pdHRlciA9IG5ldyBUaW55LkVtaXR0ZXIoIG1heFBhcnRpY2xlcyApXHJcbiAgICBlbWl0dGVyLnggPSB4IHx8IDBcclxuICAgIGVtaXR0ZXIueSA9IHkgfHwgMFxyXG5cclxuICAgIHRoaXMuZ2FtZS5zdGFnZS5hZGRDaGlsZChlbWl0dGVyKVxyXG5cclxuICAgIHJldHVybiB0aGlzLmdhbWUucGFydGljbGVzLmFkZChlbWl0dGVyKVxyXG59IiwiXHJcblRpbnkuUGFydGljbGUgPSBmdW5jdGlvbiggZW1pdHRlciApXHJcbntcclxuICAgIFRpbnkuRGlzcGxheU9iamVjdC5jYWxsKCB0aGlzICk7XHJcblxyXG4gICAgdGhpcy5wYXJlbnQgPSBlbWl0dGVyXHJcblxyXG4gICAgdGhpcy5hbmNob3IgPSBuZXcgVGlueS5Qb2ludCgpXHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0geyB2YWxpZDogZmFsc2UgfVxyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLmxpZmVzcGFuID0gMFxyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUaW55LkRpc3BsYXlPYmplY3QucHJvdG90eXBlICk7XHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5QYXJ0aWNsZTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLnNldFRleHR1cmUgPSBmdW5jdGlvbih0ZXh0dXJlLCBrZXkpXHJcbntcclxuICAgIGlmICh0eXBlb2YgdGV4dHVyZSA9PSBcInN0cmluZ1wiKSBcclxuICAgIHtcclxuICAgICAgICB2YXIgaW1hZ2VQYXRoID0gdGV4dHVyZTtcclxuXHJcbiAgICAgICAgaWYgKGtleSAhPSB1bmRlZmluZWQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gaW1hZ2VQYXRoICsgXCJfXCIgKyBrZXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0dXJlID0gVGlueS5UZXh0dXJlQ2FjaGVbaW1hZ2VQYXRoXVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUsICdmcmFtZU5hbWUnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlLmZyYW1lLm5hbWVcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUuZnJhbWUubmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5UZXh0dXJlQ2FjaGVbdGhpcy50ZXh0dXJlLmtleSArIFwiX1wiICsgdmFsdWVdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUGFydGljbGUucHJvdG90eXBlLCAnZnJhbWUnLCB7XHJcblxyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZnJhbWVcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUubWF4X25vX2ZyYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gdmFsdWVcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lID4gdGhpcy50ZXh0dXJlLm1heF9ub19mcmFtZSlcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gMFxyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5UZXh0dXJlQ2FjaGVbdGhpcy50ZXh0dXJlLmtleSArIFwiX1wiICsgdGhpcy5fZnJhbWVdKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLmRyYXdUZXh0dXJlID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbilcclxue1xyXG4gICAgdmFyIGR4ID0gdGhpcy5hbmNob3IueCAqIC10aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICB2YXIgZHkgPSB0aGlzLmFuY2hvci55ICogLXRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgdmFyIHJlc29sdXRpb24gPSB0aGlzLnRleHR1cmUuYmFzZVRleHR1cmUucmVzb2x1dGlvbiAvIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjsgXHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5iYXNlVGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC54LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AueSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHkgLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3Aud2lkdGggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IC8gcmVzb2x1dGlvbik7XHJcbn07XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCB4LCB5ICkge1xyXG5cclxuICAgIHRoaXMueCA9IHggfHwgMFxyXG4gICAgdGhpcy55ID0geSB8fCAwXHJcblxyXG4gICAgdGhpcy5hbHBoYSA9IDE7XHJcbiAgICB0aGlzLnNjYWxlLnNldCgxKTtcclxufVxyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oIHRpbWUsIGRlbHRhICkgIHtcclxuXHJcbn07XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5vbkVtaXQgPSBmdW5jdGlvbiggICkgIHtcclxuXHJcbn07XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24ocmVuZGVyU2Vzc2lvbikge1xyXG5cclxufTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiggZGVsdGEgKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgdGhpcy5saWZlc3BhbiAtPSBkZWx0YTtcclxuXHJcbiAgICBpZiAodGhpcy5saWZlc3BhbiA8PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlKCB0aGlzLmxpZmVzcGFuLCBkZWx0YSApXHJcblxyXG4gICAgdGhpcy51cGRhdGVUcmFuc2Zvcm0oKVxyXG5cclxufVxyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUuX3JlbmRlckNhbnZhcyA9IGZ1bmN0aW9uKHJlbmRlclNlc3Npb24pXHJcbntcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApIHJldHVybjtcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICAgICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHggKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24sXHJcbiAgICAgICAgICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKTtcclxuXHJcbiAgICBpZiAoIHRoaXMudGV4dHVyZS52YWxpZCApXHJcbiAgICAgICAgdGhpcy5kcmF3VGV4dHVyZSggcmVuZGVyU2Vzc2lvbiApXHJcbiAgICBlbHNlXHJcbiAgICAgICAgdGhpcy5kcmF3KCByZW5kZXJTZXNzaW9uLmNvbnRleHQsIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbiApXHJcbn07IiwiVGlueS5QYXJ0aWNsZXMgPSBmdW5jdGlvbiAoZ2FtZSkge1xyXG5cclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gICAgdGhpcy5lbWl0dGVycyA9IFtdO1xyXG5cclxufTtcclxuXHJcblRpbnkuUGFydGljbGVzLnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICBhZGQ6IGZ1bmN0aW9uIChlbWl0dGVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMuZW1pdHRlcnMucHVzaChlbWl0dGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uIChlbWl0dGVyKSB7XHJcbiAgICBcdHZhciBpbmRleE9mID0gdGhpcy5lbWl0dGVycy5pbmRleE9mKGVtaXR0ZXIpXHJcblxyXG4gICAgICAgIGlmIChpbmRleE9mID4gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdHRlcnMuc3BsaWNlKGluZGV4T2YsIDEpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKCB0aW1lLCBkZWx0YSApIHtcclxuXHJcbiAgICBcdHZhciBpID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XHJcblxyXG5cdCAgICB3aGlsZSAoaS0tKVxyXG5cdCAgICB7XHJcblx0ICAgICAgICB0aGlzLmVtaXR0ZXJzW2ldLnVwZGF0ZSggdGltZSwgZGVsdGEgKTtcclxuXHQgICAgfVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRpbnkuUGFydGljbGVzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUGFydGljbGVzO1xyXG5cclxucmVxdWlyZSgnLi9QYXJ0aWNsZScpO1xyXG5yZXF1aXJlKCcuL0VtaXR0ZXInKTsiLCJyZXF1aXJlKCcuLi9wbHVnaW5zL3BhcnRpY2xlcycpOyJdLCJzb3VyY2VSb290IjoiIn0=