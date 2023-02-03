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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGx1Z2lucy9wYXJ0aWNsZXMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixjQUFjO0FBQ3RDO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLHdCQUF3QjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDJCQUEyQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsMEJBQTBCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaFZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQzNIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBTyxDQUFDLG1EQUFZO0FBQ3BCLG1CQUFPLENBQUMsaURBQVc7QUFDbkI7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvcGFydGljbGVzL0VtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vaDV0aW55Ly4vcGx1Z2lucy9wYXJ0aWNsZXMvUGFydGljbGUuanMiLCJ3ZWJwYWNrOi8vaDV0aW55L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2g1dGlueS8uL3BsdWdpbnMvcGFydGljbGVzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlRpbnkuRW1pdHRlciA9IGZ1bmN0aW9uIChtYXhQYXJ0aWNsZXMpIHtcclxuICAgIFRpbnkuT2JqZWN0MkQuY2FsbCh0aGlzKTtcclxuXHJcbiAgICB0aGlzLmFuY2hvciA9IG5ldyBUaW55LlBvaW50KCk7XHJcblxyXG4gICAgdGhpcy5tYXhQYXJ0aWNsZXMgPSBtYXhQYXJ0aWNsZXM7XHJcblxyXG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBbXTtcclxuXHJcbiAgICB0aGlzLnBhdHRlcm4gPSBUaW55LlBhcnRpY2xlO1xyXG5cclxuICAgIHRoaXMuZmlsbFN0eWxlID0gXCIjZjU0NTQ1XCI7XHJcblxyXG4gICAgdGhpcy5wYXJ0aWNsZUFuY2hvciA9IG5ldyBUaW55LlBvaW50KDAuNSwgMC41KTtcclxuXHJcbiAgICB0aGlzLm9uID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5fdGltZXIgPSAwO1xyXG5cclxuICAgIHRoaXMuX3F1YW50aXR5ID0gMDtcclxuXHJcbiAgICB0aGlzLl9jb3VudGVyID0gMDtcclxuXHJcbiAgICB0aGlzLl9mbG93UXVhbnRpdHkgPSAwO1xyXG5cclxuICAgIHRoaXMuX2Zsb3dUb3RhbCA9IDA7XHJcblxyXG4gICAgdGhpcy5ibGVuZE1vZGUgPSBcInNvdXJjZS1vdmVyXCI7XHJcbn07XHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55Lk9iamVjdDJELnByb3RvdHlwZSk7XHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUaW55LkVtaXR0ZXI7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5FbWl0dGVyLnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fd2lkdGggPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5FbWl0dGVyLnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcclxuICAgIH0sXHJcblxyXG4gICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcclxuICAgIH1cclxufSk7XHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLm1ha2VQYXJ0aWNsZXMgPSBmdW5jdGlvbiAodGV4dHVyZSwgcXVhbnRpdHkpIHtcclxuICAgIHZhciBwYXJ0aWNsZTtcclxuXHJcbiAgICBpZiAocXVhbnRpdHkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHF1YW50aXR5ID0gdGhpcy5tYXhQYXJ0aWNsZXM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID4gdGhpcy5tYXhQYXJ0aWNsZXMpIHtcclxuICAgICAgICB0aGlzLm1heFBhcnRpY2xlcyA9IHF1YW50aXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHdoaWxlIChpIDwgcXVhbnRpdHkpIHtcclxuICAgICAgICAvLyBpZiAoQXJyYXkuaXNBcnJheShrZXlzKSlcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHJuZEtleSA9IHRoaXMuZ2FtZS5ybmQucGljayhrZXlzKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIGlmIChBcnJheS5pc0FycmF5KGZyYW1lcykpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICBybmRGcmFtZSA9IHRoaXMuZ2FtZS5ybmQucGljayhmcmFtZXMpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgcGFydGljbGUgPSBuZXcgdGhpcy5wYXR0ZXJuKHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAodGV4dHVyZSkge1xyXG4gICAgICAgICAgICBwYXJ0aWNsZS5zZXRUZXh0dXJlKHRleHR1cmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFydGljbGUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHBhcnRpY2xlLmFuY2hvci5zZXQodGhpcy5wYXJ0aWNsZUFuY2hvci54LCB0aGlzLnBhcnRpY2xlQW5jaG9yLnkpO1xyXG5cclxuICAgICAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKHBhcnRpY2xlKTtcclxuXHJcbiAgICAgICAgaSsrO1xyXG4gICAgfVxyXG59O1xyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS5mbG93ID0gZnVuY3Rpb24gKGxpZmVzcGFuLCBmcmVxdWVuY3ksIHF1YW50aXR5LCB0b3RhbCwgaW1tZWRpYXRlKSB7XHJcbiAgICBpZiAocXVhbnRpdHkgPT09IHVuZGVmaW5lZCB8fCBxdWFudGl0eSA9PT0gMCkge1xyXG4gICAgICAgIHF1YW50aXR5ID0gMTtcclxuICAgIH1cclxuICAgIGlmICh0b3RhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdG90YWwgPSAtMTtcclxuICAgIH1cclxuICAgIGlmIChpbW1lZGlhdGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGltbWVkaWF0ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID4gdGhpcy5tYXhQYXJ0aWNsZXMpIHtcclxuICAgICAgICBxdWFudGl0eSA9IHRoaXMubWF4UGFydGljbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2NvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5fZmxvd1F1YW50aXR5ID0gcXVhbnRpdHk7XHJcbiAgICB0aGlzLl9mbG93VG90YWwgPSB0b3RhbDtcclxuXHJcbiAgICBpZiAoaW1tZWRpYXRlKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydCh0cnVlLCBsaWZlc3BhbiwgZnJlcXVlbmN5LCBxdWFudGl0eSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvdW50ZXIgKz0gcXVhbnRpdHk7XHJcbiAgICAgICAgdGhpcy5vbiA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fdGltZXIgPSBmcmVxdWVuY3k7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3RhcnQoZmFsc2UsIGxpZmVzcGFuLCBmcmVxdWVuY3ksIHF1YW50aXR5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuZXhwbG9kZSA9IGZ1bmN0aW9uIChsaWZlc3BhbiwgcXVhbnRpdHkpIHtcclxuICAgIHRoaXMuX2Zsb3dUb3RhbCA9IDA7XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBxdWFudGl0eSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN0YXJ0KHRydWUsIGxpZmVzcGFuLCAwLCBxdWFudGl0eSwgZmFsc2UpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS5zdGFydCA9IGZ1bmN0aW9uIChleHBsb2RlLCBsaWZlc3BhbiwgZnJlcXVlbmN5LCBxdWFudGl0eSkge1xyXG4gICAgaWYgKGV4cGxvZGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGV4cGxvZGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKGxpZmVzcGFuID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsaWZlc3BhbiA9IDA7XHJcbiAgICB9XHJcbiAgICBpZiAoZnJlcXVlbmN5ID09PSB1bmRlZmluZWQgfHwgZnJlcXVlbmN5ID09PSBudWxsKSB7XHJcbiAgICAgICAgZnJlcXVlbmN5ID0gMjUwO1xyXG4gICAgfVxyXG4gICAgaWYgKHF1YW50aXR5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBxdWFudGl0eSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHF1YW50aXR5ID4gdGhpcy5tYXhQYXJ0aWNsZXMpIHtcclxuICAgICAgICBxdWFudGl0eSA9IHRoaXMubWF4UGFydGljbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5saWZlc3BhbiA9IGxpZmVzcGFuO1xyXG4gICAgdGhpcy5mcmVxdWVuY3kgPSBmcmVxdWVuY3k7XHJcblxyXG4gICAgLy90aGlzLnVwZGF0ZVRyYW5zZm9ybSgpXHJcblxyXG4gICAgaWYgKGV4cGxvZGUpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1YW50aXR5OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0UGFydGljbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMub24gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3F1YW50aXR5ID0gcXVhbnRpdHk7XHJcbiAgICAgICAgdGhpcy5fY291bnRlciA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGltZXIgPSBmcmVxdWVuY3k7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5UaW55LkVtaXR0ZXIucHJvdG90eXBlLmVtaXRQYXJ0aWNsZSA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICBpZiAoeCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgeCA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBpZiAoeSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgeSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHBhcnRpY2xlID0gbnVsbDtcclxuXHJcbiAgICB2YXIgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBhcnRpY2xlc1tpXS52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNbaV07XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAocGFydGljbGUgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGhhbGZTaXplO1xyXG5cclxuICAgIHZhciBlbWl0WCA9IDA7XHJcbiAgICB2YXIgZW1pdFkgPSAwO1xyXG5cclxuICAgIGlmICh4ICE9PSBudWxsKSB7XHJcbiAgICAgICAgZW1pdFggPSB4O1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl93aWR0aCA+IDEpIHtcclxuICAgICAgICBoYWxmU2l6ZSA9IHRoaXMuX3dpZHRoIC8gMjtcclxuICAgICAgICBlbWl0WCA9IFRpbnkucm5kKC1oYWxmU2l6ZSwgaGFsZlNpemUpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh5ICE9PSBudWxsKSB7XHJcbiAgICAgICAgZW1pdFkgPSB5O1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLl9oZWlnaHQgPiAxKSB7XHJcbiAgICAgICAgaGFsZlNpemUgPSB0aGlzLl9oZWlnaHQgLyAyO1xyXG4gICAgICAgIGVtaXRZID0gVGlueS5ybmQoLWhhbGZTaXplLCBoYWxmU2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFydGljbGUucmVzZXQoZW1pdFgsIGVtaXRZKTtcclxuXHJcbiAgICBwYXJ0aWNsZS5yb3RhdGlvbiA9IDA7XHJcbiAgICBwYXJ0aWNsZS5saWZlc3BhbiA9IHRoaXMubGlmZXNwYW47XHJcblxyXG4gICAgLy9wYXJ0aWNsZS5ibGVuZE1vZGUgPSB0aGlzLmJsZW5kTW9kZTtcclxuXHJcbiAgICBwYXJ0aWNsZS5vbkVtaXQoKTtcclxuXHJcbiAgICBwYXJ0aWNsZS52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnN5c3RlbSkgdGhpcy5zeXN0ZW0ucmVtb3ZlKHRoaXMpO1xyXG5cclxuICAgIFRpbnkuT2JqZWN0MkQucHJvdG90eXBlLmRlc3Ryb3kuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcblRpbnkuRW1pdHRlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRlbHRhKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLm9uKSB7XHJcbiAgICAgICAgdGhpcy5fdGltZXIgLT0gZGVsdGE7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl90aW1lciA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gdGhpcy5mcmVxdWVuY3k7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZmxvd1RvdGFsICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmxvd1F1YW50aXR5ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fZmxvd1F1YW50aXR5OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdFBhcnRpY2xlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXIrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fZmxvd1RvdGFsICE9PSAtMSAmJiB0aGlzLl9jb3VudGVyID49IHRoaXMuX2Zsb3dUb3RhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZW1pdFBhcnRpY2xlKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291bnRlcisrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Zsb3dUb3RhbCAhPT0gLTEgJiYgdGhpcy5fY291bnRlciA+PSB0aGlzLl9mbG93VG90YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub24gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVtaXRQYXJ0aWNsZSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291bnRlcisrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcXVhbnRpdHkgPiAwICYmIHRoaXMuX2NvdW50ZXIgPj0gdGhpcy5fcXVhbnRpdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0uX3VwZGF0ZShkZWx0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZyh0aW1lKVxyXG59O1xyXG5cclxuVGlueS5FbWl0dGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAocmVuZGVyU2Vzc2lvbikge1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UgfHwgdGhpcy5hbHBoYSA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0aGlzLl9jYWNoZUFzQml0bWFwKSB7XHJcbiAgICAgICAgdGhpcy5fcmVuZGVyQ2FjaGVkU3ByaXRlKHJlbmRlclNlc3Npb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgIHJlbmRlclNlc3Npb24ubWFza01hbmFnZXIucHVzaE1hc2sodGhpcy5fbWFzaywgcmVuZGVyU2Vzc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZmlsbFN0eWxlO1xyXG5cclxuICAgIHJlbmRlclNlc3Npb24uY29udGV4dC5nbG9iYWxBbHBoYSA9IHRoaXMud29ybGRBbHBoYTtcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuc2V0VHJhbnNmb3JtKFxyXG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYSxcclxuICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmIsXHJcbiAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5jLFxyXG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uZCxcclxuICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR4ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uLFxyXG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0udHkgKiByZW5kZXJTZXNzaW9uLnJlc29sdXRpb25cclxuICAgICk7XHJcblxyXG4gICAgdmFyIGkgPSAwO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzW2ldLnJlbmRlcihyZW5kZXJTZXNzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5baV0ucmVuZGVyKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9tYXNrKSB7XHJcbiAgICAgICAgcmVuZGVyU2Vzc2lvbi5tYXNrTWFuYWdlci5wb3BNYXNrKHJlbmRlclNlc3Npb24pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLy8gVGlueS5PYmplY3RDcmVhdG9yLnByb3RvdHlwZS5lbWl0dGVyID0gZnVuY3Rpb24oeCwgeSwgbWF4UGFydGljbGVzKSB7XHJcbi8vICAgICB2YXIgZW1pdHRlciA9IG5ldyBUaW55LkVtaXR0ZXIoIG1heFBhcnRpY2xlcyApXHJcbi8vICAgICBlbWl0dGVyLnggPSB4IHx8IDBcclxuLy8gICAgIGVtaXR0ZXIueSA9IHkgfHwgMFxyXG5cclxuLy8gICAgIHRoaXMuZ2FtZS5zdGFnZS5hZGQoZW1pdHRlcilcclxuXHJcbi8vICAgICByZXR1cm4gdGhpcy5nYW1lLnBhcnRpY2xlcy5hZGQoZW1pdHRlcilcclxuLy8gfVxyXG4iLCJUaW55LlBhcnRpY2xlID0gZnVuY3Rpb24gKGVtaXR0ZXIpIHtcclxuICAgIFRpbnkuQmFzZU9iamVjdDJELmNhbGwodGhpcyk7XHJcblxyXG4gICAgdGhpcy5wYXJlbnQgPSBlbWl0dGVyO1xyXG5cclxuICAgIHRoaXMuYW5jaG9yID0gbmV3IFRpbnkuUG9pbnQoKTtcclxuXHJcbiAgICB0aGlzLnRleHR1cmUgPSB7IHZhbGlkOiBmYWxzZSB9O1xyXG5cclxuICAgIHRoaXMuX2ZyYW1lID0gMDtcclxuXHJcbiAgICB0aGlzLmxpZmVzcGFuID0gMDtcclxufTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShUaW55LkJhc2VPYmplY3QyRC5wcm90b3R5cGUpO1xyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUGFydGljbGU7XHJcblxyXG5UaW55LlBhcnRpY2xlLnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24gKHRleHR1cmUsIGtleSkge1xyXG4gICAgaWYgKHR5cGVvZiB0ZXh0dXJlID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICB2YXIgaW1hZ2VQYXRoID0gdGV4dHVyZTtcclxuXHJcbiAgICAgICAgaWYgKGtleSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaW1hZ2VQYXRoID0gaW1hZ2VQYXRoICsgXCJfXCIgKyBrZXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0ZXh0dXJlID0gVGlueS5DYWNoZS50ZXh0dXJlW2ltYWdlUGF0aF07XHJcblxyXG4gICAgICAgIGlmICghdGV4dHVyZSkgdGV4dHVyZSA9IG5ldyBUaW55LlRleHR1cmUoaW1hZ2VQYXRoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlO1xyXG59O1xyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbnkuUGFydGljbGUucHJvdG90eXBlLCBcImZyYW1lTmFtZVwiLCB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0dXJlLmZyYW1lLm5hbWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudGV4dHVyZS5mcmFtZS5uYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dHVyZShUaW55LlRleHR1cmVDYWNoZVt0aGlzLnRleHR1cmUua2V5ICsgXCJfXCIgKyB2YWx1ZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUsIFwiZnJhbWVcIiwge1xyXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyYW1lO1xyXG4gICAgfSxcclxuXHJcbiAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHR1cmUubWF4X25vX2ZyYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9mcmFtZSA+IHRoaXMudGV4dHVyZS5tYXhfbm9fZnJhbWUpIHRoaXMuX2ZyYW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zZXRUZXh0dXJlKFRpbnkuVGV4dHVyZUNhY2hlW3RoaXMudGV4dHVyZS5rZXkgKyBcIl9cIiArIHRoaXMuX2ZyYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLmRyYXdUZXh0dXJlID0gZnVuY3Rpb24gKHJlbmRlclNlc3Npb24pIHtcclxuICAgIHZhciBkeCA9IHRoaXMuYW5jaG9yLnggKiAtdGhpcy50ZXh0dXJlLmZyYW1lLndpZHRoO1xyXG4gICAgdmFyIGR5ID0gdGhpcy5hbmNob3IueSAqIC10aGlzLnRleHR1cmUuZnJhbWUuaGVpZ2h0O1xyXG5cclxuICAgIHZhciByZXNvbHV0aW9uID0gdGhpcy50ZXh0dXJlLnJlc29sdXRpb24gLyByZW5kZXJTZXNzaW9uLnJlc29sdXRpb247XHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICB0aGlzLnRleHR1cmUuc291cmNlLFxyXG4gICAgICAgIHRoaXMudGV4dHVyZS5jcm9wLngsXHJcbiAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AueSxcclxuICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCxcclxuICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC5oZWlnaHQsXHJcbiAgICAgICAgZHggLyByZXNvbHV0aW9uLFxyXG4gICAgICAgIGR5IC8gcmVzb2x1dGlvbixcclxuICAgICAgICB0aGlzLnRleHR1cmUuY3JvcC53aWR0aCAvIHJlc29sdXRpb24sXHJcbiAgICAgICAgdGhpcy50ZXh0dXJlLmNyb3AuaGVpZ2h0IC8gcmVzb2x1dGlvblxyXG4gICAgKTtcclxufTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgIHRoaXMueCA9IHggfHwgMDtcclxuICAgIHRoaXMueSA9IHkgfHwgMDtcclxuXHJcbiAgICB0aGlzLmFscGhhID0gMTtcclxuICAgIHRoaXMuc2NhbGUuc2V0KDEpO1xyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKHRpbWUsIGRlbHRhKSB7fTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLm9uRW1pdCA9IGZ1bmN0aW9uICgpIHt9O1xyXG5cclxuVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7fTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGEpIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5saWZlc3BhbiAtPSBkZWx0YTtcclxuXHJcbiAgICBpZiAodGhpcy5saWZlc3BhbiA8PSAwKSB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudXBkYXRlKHRoaXMubGlmZXNwYW4sIGRlbHRhKTtcclxufTtcclxuXHJcblRpbnkuUGFydGljbGUucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChyZW5kZXJTZXNzaW9uKSB7XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgdGhpcy51cGRhdGVUcmFuc2Zvcm0oKTtcclxuXHJcbiAgICByZW5kZXJTZXNzaW9uLmNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLndvcmxkQWxwaGE7XHJcblxyXG4gICAgcmVuZGVyU2Vzc2lvbi5jb250ZXh0LnNldFRyYW5zZm9ybShcclxuICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmEsXHJcbiAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS5iLFxyXG4gICAgICAgIHRoaXMud29ybGRUcmFuc2Zvcm0uYyxcclxuICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLmQsXHJcbiAgICAgICAgdGhpcy53b3JsZFRyYW5zZm9ybS50eCAqIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbixcclxuICAgICAgICB0aGlzLndvcmxkVHJhbnNmb3JtLnR5ICogcmVuZGVyU2Vzc2lvbi5yZXNvbHV0aW9uXHJcbiAgICApO1xyXG5cclxuICAgIGlmICh0aGlzLnRleHR1cmUudmFsaWQpIHRoaXMuZHJhd1RleHR1cmUocmVuZGVyU2Vzc2lvbik7XHJcbiAgICBlbHNlIHRoaXMuZHJhdyhyZW5kZXJTZXNzaW9uLmNvbnRleHQsIHJlbmRlclNlc3Npb24ucmVzb2x1dGlvbik7XHJcbn07XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJUaW55LlBhcnRpY2xlcyA9IGZ1bmN0aW9uIChnYW1lKSB7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG5cclxuICAgIHRoaXMubGlzdCA9IFtdO1xyXG59O1xyXG5cclxuVGlueS5QYXJ0aWNsZXMucHJvdG90eXBlID0ge1xyXG4gICAgYWRkOiBmdW5jdGlvbiAoZW1pdHRlcikge1xyXG4gICAgICAgIGVtaXR0ZXIuc3lzdGVtID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5saXN0LnB1c2goZW1pdHRlcik7XHJcblxyXG4gICAgICAgIHJldHVybiBlbWl0dGVyO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW1vdmU6IGZ1bmN0aW9uIChlbWl0dGVyKSB7XHJcbiAgICAgICAgdmFyIGluZGV4T2YgPSB0aGlzLmxpc3QuaW5kZXhPZihlbWl0dGVyKTtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4T2YgPiAtMSkge1xyXG4gICAgICAgICAgICB2YXIgZW1pdHRlciA9IHRoaXMubGlzdC5zcGxpY2UoaW5kZXhPZiwgMSk7XHJcbiAgICAgICAgICAgIGVtaXR0ZXIuc3lzdGVtID0gbnVsbDtcclxuICAgICAgICAgICAgcmV0dXJuIGVtaXR0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChkZWx0YSkge1xyXG4gICAgICAgIHZhciBpID0gdGhpcy5saXN0Lmxlbmd0aDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RbaV0udXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmxpc3QubGVuZ3RoID0gMDtcclxuICAgIH1cclxufTtcclxuXHJcblRpbnkuUGFydGljbGVzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUGFydGljbGVzO1xyXG5cclxucmVxdWlyZShcIi4vUGFydGljbGVcIik7XHJcbnJlcXVpcmUoXCIuL0VtaXR0ZXJcIik7XHJcblxyXG5UaW55LnJlZ2lzdGVyU3lzdGVtKFwicGFydGljbGVzXCIsIFRpbnkuUGFydGljbGVzKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9