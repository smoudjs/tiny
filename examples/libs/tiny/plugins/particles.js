/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./plugins/particles/Emitter.js":
/*!**************************************!*\
  !*** ./plugins/particles/Emitter.js ***!
  \**************************************/
/***/ (() => {

Tiny.Emitter = function (maxParticles) {
    Tiny.Object2D.call(this);

    this.anchor = new Tiny.Point();

    this.maxParticles = maxParticles;

    this.particles = [];

    this.pattern = Tiny.Particle;

    this.fillStyle = "#f54545";

    this.particleAnchor = new Tiny.Point(0.5, 0.5);

    this.on = false;

    this._timer = 0;

    this._quantity = 0;

    this._counter = 0;

    this._flowQuantity = 0;

    this._flowTotal = 0;

    this.blendMode = "source-over";
};

Tiny.Emitter.prototype = Object.create(Tiny.Object2D.prototype);
Tiny.Emitter.prototype.constructor = Tiny.Emitter;

Object.defineProperty(Tiny.Emitter.prototype, "width", {
    get: function () {
        return this._width;
    },

    set: function (value) {
        this._width = value;
    }
});

Object.defineProperty(Tiny.Emitter.prototype, "height", {
    get: function () {
        return this._height;
    },

    set: function (value) {
        this._height = value;
    }
});

Tiny.Emitter.prototype.makeParticles = function (texture, quantity) {
    var particle;

    if (quantity === undefined) {
        quantity = this.maxParticles;
    }

    var i = this.particles.length;

    if (quantity > this.maxParticles) {
        this.maxParticles = quantity;
    }

    while (i < quantity) {
        // if (Array.isArray(keys))
        // {
        //     rndKey = this.game.rnd.pick(keys);
        // }

        // if (Array.isArray(frames))
        // {
        //     rndFrame = this.game.rnd.pick(frames);
        // }

        particle = new this.pattern(this);

        if (texture) {
            particle.setTexture(texture);
        }

        particle.visible = false;
        particle.anchor.set(this.particleAnchor.x, this.particleAnchor.y);

        this.particles.push(particle);

        i++;
    }
};

Tiny.Emitter.prototype.flow = function (lifespan, frequency, quantity, total, immediate) {
    if (quantity === undefined || quantity === 0) {
        quantity = 1;
    }
    if (total === undefined) {
        total = -1;
    }
    if (immediate === undefined) {
        immediate = true;
    }

    if (quantity > this.maxParticles) {
        quantity = this.maxParticles;
    }

    this._counter = 0;
    this._flowQuantity = quantity;
    this._flowTotal = total;

    if (immediate) {
        this.start(true, lifespan, frequency, quantity);

        this._counter += quantity;
        this.on = true;
        this._timer = frequency;
    } else {
        this.start(false, lifespan, frequency, quantity);
    }

    return this;
};

Tiny.Emitter.prototype.explode = function (lifespan, quantity) {
    this._flowTotal = 0;

    if (quantity === undefined) {
        quantity = this.particles.length;
    }

    this.start(true, lifespan, 0, quantity, false);

    return this;
};

Tiny.Emitter.prototype.start = function (explode, lifespan, frequency, quantity) {
    if (explode === undefined) {
        explode = true;
    }
    if (lifespan === undefined) {
        lifespan = 0;
    }
    if (frequency === undefined || frequency === null) {
        frequency = 250;
    }
    if (quantity === undefined) {
        quantity = 0;
    }

    if (quantity > this.maxParticles) {
        quantity = this.maxParticles;
    }

    this.visible = true;

    this.lifespan = lifespan;
    this.frequency = frequency;

    //this.updateTransform()

    if (explode) {
        for (var i = 0; i < quantity; i++) {
            this.emitParticle();
        }
    } else {
        this.on = true;
        this._quantity = quantity;
        this._counter = 0;
        this._timer = frequency;
    }

    return this;
};

Tiny.Emitter.prototype.emitParticle = function (x, y) {
    if (x === undefined) {
        x = null;
    }
    if (y === undefined) {
        y = null;
    }

    var particle = null;

    var i = this.particles.length;

    while (i--) {
        if (!this.particles[i].visible) {
            particle = this.particles[i];
            break;
        }
    }

    if (particle === null) {
        return false;
    }

    var halfSize;

    var emitX = 0;
    var emitY = 0;

    if (x !== null) {
        emitX = x;
    } else if (this._width > 1) {
        halfSize = this._width / 2;
        emitX = Tiny.rnd(-halfSize, halfSize);
    }

    if (y !== null) {
        emitY = y;
    } else if (this._height > 1) {
        halfSize = this._height / 2;
        emitY = Tiny.rnd(-halfSize, halfSize);
    }

    particle.reset(emitX, emitY);

    particle.rotation = 0;
    particle.lifespan = this.lifespan;

    //particle.blendMode = this.blendMode;

    particle.onEmit();

    particle.visible = true;

    return true;
};

Tiny.Emitter.prototype.destroy = function () {
    if (this.system) this.system.remove(this);

    Tiny.Object2D.prototype.destroy.call(this);
};

Tiny.Emitter.prototype.update = function (delta) {
    if (this.visible === false) return;

    if (this.on) {
        this._timer -= delta;

        if (this._timer <= 0) {
            this._timer = this.frequency;

            if (this._flowTotal !== 0) {
                if (this._flowQuantity > 0) {
                    for (var i = 0; i < this._flowQuantity; i++) {
                        if (this.emitParticle()) {
                            this._counter++;

                            if (this._flowTotal !== -1 && this._counter >= this._flowTotal) {
                                this.on = false;
                                break;
                            }
                        }
                    }
                } else {
                    if (this.emitParticle()) {
                        this._counter++;

                        if (this._flowTotal !== -1 && this._counter >= this._flowTotal) {
                            this.on = false;
                        }
                    }
                }
            } else {
                if (this.emitParticle()) {
                    this._counter++;

                    if (this._quantity > 0 && this._counter >= this._quantity) {
                        this.on = false;
                    }
                }
            }
        }
    }

    var i = this.particles.length;

    while (i--) {
        this.particles[i]._update(delta);
    }

    //console.log(time)
};

Tiny.Emitter.prototype.render = function (renderSession) {
    if (this.visible === false || this.alpha === 0) return;

    if (this.blendMode !== renderSession.currentBlendMode) {
        renderSession.currentBlendMode = this.blendMode;
        renderSession.context.globalCompositeOperation = renderSession.currentBlendMode;
    }

    if (this._cacheAsBitmap) {
        this._renderCachedSprite(renderSession);
        return;
    }

    if (this._mask) {
        renderSession.maskManager.pushMask(this._mask, renderSession);
    }

    renderSession.context.fillStyle = this.fillStyle;

    renderSession.context.globalAlpha = this.worldAlpha;

    renderSession.context.setTransform(
        this.worldTransform.a,
        this.worldTransform.b,
        this.worldTransform.c,
        this.worldTransform.d,
        this.worldTransform.tx * renderSession.resolution,
        this.worldTransform.ty * renderSession.resolution
    );

    var i = 0;

    for (i = 0; i < this.particles.length; i++) {
        this.particles[i].render(renderSession);
    }

    for (i = 0; i < this.children.length; i++) {
        this.children[i].render(renderSession);
    }

    if (this._mask) {
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

Tiny.Particle = function (emitter) {
    Tiny.BaseObject2D.call(this);

    this.parent = emitter;

    this.anchor = new Tiny.Point();

    this.texture = { valid: false };

    this._frame = 0;

    this.lifespan = 0;
};

Tiny.Particle.prototype = Object.create(Tiny.BaseObject2D.prototype);
Tiny.Particle.prototype.constructor = Tiny.Particle;

Tiny.Particle.prototype.setTexture = function (texture, key) {
    if (typeof texture == "string") {
        var imagePath = texture;

        if (key != undefined) {
            imagePath = imagePath + "_" + key;
        }

        texture = Tiny.Cache.texture[imagePath];

        if (!texture) texture = new Tiny.Texture(imagePath);
    }

    this.texture = texture;
};

Object.defineProperty(Tiny.Particle.prototype, "frameName", {
    get: function () {
        return this.texture.frame.name;
    },

    set: function (value) {
        if (this.texture.frame.name) {
            this.setTexture(Tiny.TextureCache[this.texture.key + "_" + value]);
        }
    }
});

Object.defineProperty(Tiny.Particle.prototype, "frame", {
    get: function () {
        return this._frame;
    },

    set: function (value) {
        if (this.texture.max_no_frame) {
            this._frame = value;
            if (this._frame > this.texture.max_no_frame) this._frame = 0;
            this.setTexture(Tiny.TextureCache[this.texture.key + "_" + this._frame]);
        }
    }
});

Tiny.Particle.prototype.drawTexture = function (renderSession) {
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
        this.texture.crop.height / resolution
    );
};

Tiny.Particle.prototype.reset = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;

    this.alpha = 1;
    this.scale.set(1);
};

Tiny.Particle.prototype.update = function (time, delta) {};

Tiny.Particle.prototype.onEmit = function () {};

Tiny.Particle.prototype.draw = function (renderSession) {};

Tiny.Particle.prototype._update = function (delta) {
    if (this.visible === false) return false;

    this.lifespan -= delta;

    if (this.lifespan <= 0) {
        this.visible = false;
        return false;
    }

    this.update(this.lifespan, delta);
};

Tiny.Particle.prototype.render = function (renderSession) {
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
        var indexOf = this.list.indexOf(emitter);

        if (indexOf > -1) {
            var emitter = this.list.splice(indexOf, 1);
            emitter.system = null;
            return emitter;
        }
    },

    update: function (delta) {
        var i = this.list.length;

        while (i--) {
            this.list[i].update(delta);
        }
    },

    destroy: function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9wYXJ0aWNsZXMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixjQUFjO0FBQ3RDO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHdCQUF3QjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwyQkFBMkI7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDBCQUEwQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3JWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUMzSEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQU8sQ0FBQyxtREFBWTtBQUNwQixtQkFBTyxDQUFDLGlEQUFXO0FBQ25CO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL3BhcnRpY2xlcy9FbWl0dGVyLmpzIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvcGFydGljbGVzL1BhcnRpY2xlLmpzIiwid2VicGFjazovL2g1dGlueS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9oNXRpbnkvLi9wbHVnaW5zL3BhcnRpY2xlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJUaW55LkVtaXR0ZXIgPSBmdW5jdGlvbiAobWF4UGFydGljbGVzKSB7XHJcbiAgICBUaW55Lk9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5hbmNob3IgPSBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHRoaXMubWF4UGFydGljbGVzID0gbWF4UGFydGljbGVzO1xyXG5cclxuICAgIHRoaXMucGFydGljbGVzID0gW107XHJcblxyXG4gICAgdGhpcy5wYXR0ZXJuID0gVGlueS5QYXJ0aWNsZTtcclxuXHJcbiAgICB0aGlzLmZpbGxTdHlsZSA9IFwiI2Y1NDU0NVwiO1xyXG5cclxuICAgIHRoaXMucGFydGljbGVBbmNob3IgPSBuZXcgVGlueS5Qb2ludCgwLjUsIDAuNSk7XHJcblxyXG4gICAgdGhpcy5vbiA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuX3RpbWVyID0gMDtcclxuXHJcbiAgICB0aGlzLl9xdWFudGl0eSA9IDA7XHJcblxyXG4gICAgdGhpcy5fY291bnRlciA9IDA7XHJcblxyXG4gICAgdGhpcy5fZmxvd1F1YW50aXR5ID0gMDtcclxuXHJcbiAgICB0aGlzLl9mbG93VG90YWwgPSAwO1xyXG5cclxuICAgIHRoaXMuYmxlbmRNb2RlID0gXCJzb3VyY2Utb3ZlclwiO1xyXG59O1xyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVGlueS5PYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5FbWl0dGVyO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuRW1pdHRlci5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3dpZHRoID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuRW1pdHRlci5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS5tYWtlUGFydGljbGVzID0gZnVuY3Rpb24gKHRleHR1cmUsIHF1YW50aXR5KSB7XHJcbiAgICB2YXIgcGFydGljbGU7XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBxdWFudGl0eSA9IHRoaXMubWF4UGFydGljbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xyXG5cclxuICAgIGlmIChxdWFudGl0eSA+IHRoaXMubWF4UGFydGljbGVzKSB7XHJcbiAgICAgICAgdGhpcy5tYXhQYXJ0aWNsZXMgPSBxdWFudGl0eTtcclxuICAgIH1cclxuXHJcbiAgICB3aGlsZSAoaSA8IHF1YW50aXR5KSB7XHJcbiAgICAgICAgLy8gaWYgKEFycmF5LmlzQXJyYXkoa2V5cykpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBybmRLZXkgPSB0aGlzLmdhbWUucm5kLnBpY2soa2V5cyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBpZiAoQXJyYXkuaXNBcnJheShmcmFtZXMpKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgcm5kRnJhbWUgPSB0aGlzLmdhbWUucm5kLnBpY2soZnJhbWVzKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHBhcnRpY2xlID0gbmV3IHRoaXMucGF0dGVybih0aGlzKTtcclxuXHJcbiAgICAgICAgaWYgKHRleHR1cmUpIHtcclxuICAgICAgICAgICAgcGFydGljbGUuc2V0VGV4dHVyZSh0ZXh0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhcnRpY2xlLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBwYXJ0aWNsZS5hbmNob3Iuc2V0KHRoaXMucGFydGljbGVBbmNob3IueCwgdGhpcy5wYXJ0aWNsZUFuY2hvci55KTtcclxuXHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMucHVzaChwYXJ0aWNsZSk7XHJcblxyXG4gICAgICAgIGkrKztcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuZmxvdyA9IGZ1bmN0aW9uIChsaWZlc3BhbiwgZnJlcXVlbmN5LCBxdWFudGl0eSwgdG90YWwsIGltbWVkaWF0ZSkge1xyXG4gICAgaWYgKHF1YW50aXR5ID09PSB1bmRlZmluZWQgfHwgcXVhbnRpdHkgPT09IDApIHtcclxuICAgICAgICBxdWFudGl0eSA9IDE7XHJcbiAgICB9XHJcbiAgICBpZiAodG90YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRvdGFsID0gLTE7XHJcbiAgICB9XHJcbiAgICBpZiAoaW1tZWRpYXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBpbW1lZGlhdGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChxdWFudGl0eSA+IHRoaXMubWF4UGFydGljbGVzKSB7XHJcbiAgICAgICAgcXVhbnRpdHkgPSB0aGlzLm1heFBhcnRpY2xlcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9jb3VudGVyID0gMDtcclxuICAgIHRoaXMuX2Zsb3dRdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgdGhpcy5fZmxvd1RvdGFsID0gdG90YWw7XHJcblxyXG4gICAgaWYgKGltbWVkaWF0ZSkge1xyXG4gICAgICAgIHRoaXMuc3RhcnQodHJ1ZSwgbGlmZXNwYW4sIGZyZXF1ZW5jeSwgcXVhbnRpdHkpO1xyXG5cclxuICAgICAgICB0aGlzLl9jb3VudGVyICs9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMub24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gZnJlcXVlbmN5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0YXJ0KGZhbHNlLCBsaWZlc3BhbiwgZnJlcXVlbmN5LCBxdWFudGl0eSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLmV4cGxvZGUgPSBmdW5jdGlvbiAobGlmZXNwYW4sIHF1YW50aXR5KSB7XHJcbiAgICB0aGlzLl9mbG93VG90YWwgPSAwO1xyXG5cclxuICAgIGlmIChxdWFudGl0eSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcXVhbnRpdHkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdGFydCh0cnVlLCBsaWZlc3BhbiwgMCwgcXVhbnRpdHksIGZhbHNlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoZXhwbG9kZSwgbGlmZXNwYW4sIGZyZXF1ZW5jeSwgcXVhbnRpdHkpIHtcclxuICAgIGlmIChleHBsb2RlID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBleHBsb2RlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChsaWZlc3BhbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgbGlmZXNwYW4gPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKGZyZXF1ZW5jeSA9PT0gdW5kZWZpbmVkIHx8IGZyZXF1ZW5jeSA9PT0gbnVsbCkge1xyXG4gICAgICAgIGZyZXF1ZW5jeSA9IDI1MDtcclxuICAgIH1cclxuICAgIGlmIChxdWFudGl0eSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcXVhbnRpdHkgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChxdWFudGl0eSA+IHRoaXMubWF4UGFydGljbGVzKSB7XHJcbiAgICAgICAgcXVhbnRpdHkgPSB0aGlzLm1heFBhcnRpY2xlcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMubGlmZXNwYW4gPSBsaWZlc3BhbjtcclxuICAgIHRoaXMuZnJlcXVlbmN5ID0gZnJlcXVlbmN5O1xyXG5cclxuICAgIC8vdGhpcy51cGRhdGVUcmFuc2Zvcm0oKVxyXG5cclxuICAgIGlmIChleHBsb2RlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWFudGl0eTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdFBhcnRpY2xlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm9uID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9xdWFudGl0eSA9IHF1YW50aXR5O1xyXG4gICAgICAgIHRoaXMuX2NvdW50ZXIgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RpbWVyID0gZnJlcXVlbmN5O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS5lbWl0UGFydGljbGUgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgaWYgKHggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHggPSBudWxsO1xyXG4gICAgfVxyXG4gICAgaWYgKHkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwYXJ0aWNsZSA9IG51bGw7XHJcblxyXG4gICAgdmFyIGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XHJcblxyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgIGlmICghdGhpcy5wYXJ0aWNsZXNbaV0udmlzaWJsZSkge1xyXG4gICAgICAgICAgICBwYXJ0aWNsZSA9IHRoaXMucGFydGljbGVzW2ldO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBhcnRpY2xlID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBoYWxmU2l6ZTtcclxuXHJcbiAgICB2YXIgZW1pdFggPSAwO1xyXG4gICAgdmFyIGVtaXRZID0gMDtcclxuXHJcbiAgICBpZiAoeCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGVtaXRYID0geDtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5fd2lkdGggPiAxKSB7XHJcbiAgICAgICAgaGFsZlNpemUgPSB0aGlzLl93aWR0aCAvIDI7XHJcbiAgICAgICAgZW1pdFggPSBUaW55LnJuZCgtaGFsZlNpemUsIGhhbGZTaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoeSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGVtaXRZID0geTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5faGVpZ2h0ID4gMSkge1xyXG4gICAgICAgIGhhbGZTaXplID0gdGhpcy5faGVpZ2h0IC8gMjtcclxuICAgICAgICBlbWl0WSA9IFRpbnkucm5kKC1oYWxmU2l6ZSwgaGFsZlNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhcnRpY2xlLnJlc2V0KGVtaXRYLCBlbWl0WSk7XHJcblxyXG4gICAgcGFydGljbGUucm90YXRpb24gPSAwO1xyXG4gICAgcGFydGljbGUubGlmZXNwYW4gPSB0aGlzLmxpZmVzcGFuO1xyXG5cclxuICAgIC8vcGFydGljbGUuYmxlbmRNb2RlID0gdGhpcy5ibGVuZE1vZGU7XHJcblxyXG4gICAgcGFydGljbGUub25FbWl0KCk7XHJcblxyXG4gICAgcGFydGljbGUudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5zeXN0ZW0pIHRoaXMuc3lzdGVtLnJlbW92ZSh0aGlzKTtcclxuXHJcbiAgICBUaW55Lk9iamVjdDJELnByb3RvdHlwZS5kZXN0cm95LmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UpIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5vbikge1xyXG4gICAgICAgIHRoaXMuX3RpbWVyIC09IGRlbHRhO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fdGltZXIgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IHRoaXMuZnJlcXVlbmN5O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2Zsb3dUb3RhbCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Zsb3dRdWFudGl0eSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2Zsb3dRdWFudGl0eTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVtaXRQYXJ0aWNsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Zsb3dUb3RhbCAhPT0gLTEgJiYgdGhpcy5fY291bnRlciA+PSB0aGlzLl9mbG93VG90YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmVtaXRQYXJ0aWNsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9mbG93VG90YWwgIT09IC0xICYmIHRoaXMuX2NvdW50ZXIgPj0gdGhpcy5fZmxvd1RvdGFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbWl0UGFydGljbGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3F1YW50aXR5ID4gMCAmJiB0aGlzLl9jb3VudGVyID49IHRoaXMuX3F1YW50aXR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XHJcblxyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzW2ldLl91cGRhdGUoZGVsdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY29uc29sZS5sb2codGltZSlcclxufTtcclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApIHJldHVybjtcclxuXHJcbiAgICBpZiAodGhpcy5ibGVuZE1vZGUgIT09IHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSkge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY3VycmVudEJsZW5kTW9kZSA9IHRoaXMuYmxlbmRNb2RlO1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSByZW5kZXJTZXNzaW9uLmN1cnJlbnRCbGVuZE1vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2NhY2hlQXNCaXRtYXApIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJDYWNoZWRTcHJpdGUocmVuZGVyU2Vzc2lvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wdXNoTWFzayh0aGlzLl9tYXNrLCByZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5maWxsU3R5bGU7XHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0Lmdsb2JhbEFscGhhID0gdGhpcy53b3JsZEFscGhhO1xyXG5cclxuICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5zZXRUcmFuc2Zvcm0oXHJcbiAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5hLFxyXG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYixcclxuICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmMsXHJcbiAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5kLFxyXG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHggKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb24sXHJcbiAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS50eSAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvblxyXG4gICAgKTtcclxuXHJcbiAgICB2YXIgaSA9IDA7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMucGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbltpXS5yZW5kZXIocmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX21hc2spIHtcclxuICAgICAgICByZW5kZXJTZXNzaW9uLm1hc2tNYW5hZ2VyLnBvcE1hc2socmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vLyBUaW55Lk9iamVjdENyZWF0b3IucHJvdG90eXBlLmVtaXR0ZXIgPSBmdW5jdGlvbih4LCB5LCBtYXhQYXJ0aWNsZXMpIHtcclxuLy8gICAgIHZhciBlbWl0dGVyID0gbmV3IFRpbnkuRW1pdHRlciggbWF4UGFydGljbGVzIClcclxuLy8gICAgIGVtaXR0ZXIueCA9IHggfHwgMFxyXG4vLyAgICAgZW1pdHRlci55ID0geSB8fCAwXHJcblxyXG4vLyAgICAgdGhpcy5nYW1lLnN0YWdlLmFkZChlbWl0dGVyKVxyXG5cclxuLy8gICAgIHJldHVybiB0aGlzLmdhbWUucGFydGljbGVzLmFkZChlbWl0dGVyKVxyXG4vLyB9XHJcbiIsIlRpbnkuUGFydGljbGUgPSBmdW5jdGlvbiAoZW1pdHRlcikge1xyXG4gICAgVGlueS5CYXNlT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLnBhcmVudCA9IGVtaXR0ZXI7XHJcblxyXG4gICAgdGhpcy5hbmNob3IgPSBuZXcgVGlueS5Qb2ludCgpO1xyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IHsgdmFsaWQ6IGZhbHNlIH07XHJcblxyXG4gICAgdGhpcy5fZnJhbWUgPSAwO1xyXG5cclxuICAgIHRoaXMubGlmZXNwYW4gPSAwO1xyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFRpbnkuQmFzZU9iamVjdDJELnByb3RvdHlwZSk7XHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5QYXJ0aWNsZTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLnNldFRleHR1cmUgPSBmdW5jdGlvbiAodGV4dHVyZSwga2V5KSB7XHJcbiAgICBpZiAodHlwZW9mIHRleHR1cmUgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIHZhciBpbWFnZVBhdGggPSB0ZXh0dXJlO1xyXG5cclxuICAgICAgICBpZiAoa2V5ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbWFnZVBhdGggPSBpbWFnZVBhdGggKyBcIl9cIiArIGtleTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRleHR1cmUgPSBUaW55LkNhY2hlLnRleHR1cmVbaW1hZ2VQYXRoXTtcclxuXHJcbiAgICAgICAgaWYgKCF0ZXh0dXJlKSB0ZXh0dXJlID0gbmV3IFRpbnkuVGV4dHVyZShpbWFnZVBhdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmU7XHJcbn07XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUsIFwiZnJhbWVOYW1lXCIsIHtcclxuICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHR1cmUuZnJhbWUubmFtZTtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICBpZiAodGhpcy50ZXh0dXJlLmZyYW1lLm5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKFRpbnkuVGV4dHVyZUNhY2hlW3RoaXMudGV4dHVyZS5rZXkgKyBcIl9cIiArIHZhbHVlXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW55LlBhcnRpY2xlLnByb3RvdHlwZSwgXCJmcmFtZVwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZnJhbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZS5tYXhfbm9fZnJhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZyYW1lID4gdGhpcy50ZXh0dXJlLm1heF9ub19mcmFtZSkgdGhpcy5fZnJhbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnNldFRleHR1cmUoVGlueS5UZXh0dXJlQ2FjaGVbdGhpcy50ZXh0dXJlLmtleSArIFwiX1wiICsgdGhpcy5fZnJhbWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUuZHJhd1RleHR1cmUgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgdmFyIGR4ID0gdGhpcy5hbmNob3IueCAqIC10aGlzLnRleHR1cmUuZnJhbWUud2lkdGg7XHJcbiAgICB2YXIgZHkgPSB0aGlzLmFuY2hvci55ICogLXRoaXMudGV4dHVyZS5mcmFtZS5oZWlnaHQ7XHJcblxyXG4gICAgdmFyIHJlc29sdXRpb24gPSB0aGlzLnRleHR1cmUucmVzb2x1dGlvbiAvIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbjtcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZHJhd0ltYWdlKFxyXG4gICAgICAgIHRoaXMudGV4dHVyZS5zb3VyY2UsXHJcbiAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AueCxcclxuICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC55LFxyXG4gICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoLFxyXG4gICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLmhlaWdodCxcclxuICAgICAgICBkeCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgZHkgLyByZXNvbHV0aW9uLFxyXG4gICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLndpZHRoIC8gcmVzb2x1dGlvbixcclxuICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQgLyByZXNvbHV0aW9uXHJcbiAgICApO1xyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoeCwgeSkge1xyXG4gICAgdGhpcy54ID0geCB8fCAwO1xyXG4gICAgdGhpcy55ID0geSB8fCAwO1xyXG5cclxuICAgIHRoaXMuYWxwaGEgPSAxO1xyXG4gICAgdGhpcy5zY2FsZS5zZXQoMSk7XHJcbn07XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAodGltZSwgZGVsdGEpIHt9O1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUub25FbWl0ID0gZnVuY3Rpb24gKCkge307XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHt9O1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmxpZmVzcGFuIC09IGRlbHRhO1xyXG5cclxuICAgIGlmICh0aGlzLmxpZmVzcGFuIDw9IDApIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51cGRhdGUodGhpcy5saWZlc3BhbiwgZGVsdGEpO1xyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApIHJldHVybjtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVRyYW5zZm9ybSgpO1xyXG5cclxuICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5nbG9iYWxBbHBoYSA9IHRoaXMud29ybGRBbHBoYTtcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmIsXHJcbiAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5jLFxyXG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR4ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uLFxyXG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb25cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHRoaXMudGV4dHVyZS52YWxpZCkgdGhpcy5kcmF3VGV4dHVyZShyZW5kZXJTZXNzaW9uKTtcclxuICAgIGVsc2UgdGhpcy5kcmF3KHJlbmRlclNlc3Npb24uY29udGV4dCwgcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uKTtcclxufTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlRpbnkuUGFydGljbGVzID0gZnVuY3Rpb24gKGdhbWUpIHtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcblxyXG4gICAgdGhpcy5saXN0ID0gW107XHJcbn07XHJcblxyXG5UaW55LlBhcnRpY2xlcy5wcm90b3R5cGUgPSB7XHJcbiAgICBhZGQ6IGZ1bmN0aW9uIChlbWl0dGVyKSB7XHJcbiAgICAgICAgZW1pdHRlci5zeXN0ZW0gPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3QucHVzaChlbWl0dGVyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKGVtaXR0ZXIpIHtcclxuICAgICAgICB2YXIgaW5kZXhPZiA9IHRoaXMubGlzdC5pbmRleE9mKGVtaXR0ZXIpO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXhPZiA+IC0xKSB7XHJcbiAgICAgICAgICAgIHZhciBlbWl0dGVyID0gdGhpcy5saXN0LnNwbGljZShpbmRleE9mLCAxKTtcclxuICAgICAgICAgICAgZW1pdHRlci5zeXN0ZW0gPSBudWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gZW1pdHRlcjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRlbHRhKSB7XHJcbiAgICAgICAgdmFyIGkgPSB0aGlzLmxpc3QubGVuZ3RoO1xyXG5cclxuICAgICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFtpXS51cGRhdGUoZGVsdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMubGlzdC5sZW5ndGggPSAwO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZXMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5QYXJ0aWNsZXM7XHJcblxyXG5yZXF1aXJlKFwiLi9QYXJ0aWNsZVwiKTtcclxucmVxdWlyZShcIi4vRW1pdHRlclwiKTtcclxuXHJcblRpbnkucmVnaXN0ZXJTeXN0ZW0oXCJwYXJ0aWNsZXNcIiwgVGlueS5QYXJ0aWNsZXMpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=