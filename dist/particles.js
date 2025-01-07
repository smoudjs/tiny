/******/ (function() { // webpackBootstrap
/******/ 	"use strict";

;// ./packages/particles/ParticlesManager.js
var ParticlesManager = function ParticlesManager(game) {
  this.game = game;
  this.list = [];
};
ParticlesManager.prototype = {
  add: function add(emitter) {
    emitter.system = this;
    this.list.push(emitter);
    return emitter;
  },
  remove: function remove(emitter) {
    var indexOf = this.list.indexOf(emitter);
    if (indexOf > -1) {
      var emitter = this.list.splice(indexOf, 1);
      emitter.system = null;
      return emitter;
    }
  },
  update: function update(delta) {
    var i = this.list.length;
    while (i--) {
      this.list[i].update(delta);
    }
  },
  destroy: function destroy() {
    this.list.length = 0;
  }
};
ParticlesManager.prototype.constructor = ParticlesManager;
Tiny.registerSystem('particles', ParticlesManager);

;// ./packages/particles/Particle.js
var Particle = function Particle(emitter) {
  Tiny.BaseObject2D.call(this);
  this.parent = emitter;
  this.anchor = new Tiny.Vec2();
  this.texture = {
    valid: false
  };
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
  get: function get() {
    return this.texture.frame.name;
  },
  set: function set(value) {
    if (this.texture.frame.name) {
      this.setTexture(Tiny.Cache.texture[this.texture.key + '.' + value]);
    }
  }
});
Particle.prototype.drawTexture = function (renderSession) {
  var dx = this.anchor.x * -this.texture.frame.width;
  var dy = this.anchor.y * -this.texture.frame.height;
  var resolution = this.texture.base.resolution / renderSession.resolution;
  renderSession.context.drawImage(this.texture.base.source, this.texture.crop.x, this.texture.crop.y, this.texture.crop.width, this.texture.crop.height, dx / resolution, dy / resolution, this.texture.crop.width / resolution, this.texture.crop.height / resolution);
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
  renderSession.context.setTransform(this.worldTransform.a, this.worldTransform.b, this.worldTransform.c, this.worldTransform.d, this.worldTransform.tx * renderSession.resolution, this.worldTransform.ty * renderSession.resolution);
  if (this.texture.valid) this.drawTexture(renderSession);else this.draw(renderSession.context, renderSession.resolution);
};

;// ./packages/particles/Emitter.js

var Emitter = function Emitter(maxParticles) {
  Tiny.Object2D.call(this);
  this.anchor = new Tiny.Vec2();
  this.maxParticles = maxParticles;
  this.particles = [];
  this.pattern = Particle;
  this.fillStyle = '#f54545';
  this.particleAnchor = new Tiny.Vec2(0.5, 0.5);
  this.on = false;
  this._timer = 0;
  this._quantity = 0;
  this._counter = 0;
  this._flowQuantity = 0;
  this._flowTotal = 0;
  this.blendMode = 'source-over';
};
Emitter.prototype = Object.create(Tiny.Object2D.prototype);
Emitter.prototype.constructor = Emitter;
Object.defineProperty(Emitter.prototype, 'width', {
  get: function get() {
    return this._width;
  },
  set: function set(value) {
    this._width = value;
  }
});
Object.defineProperty(Emitter.prototype, 'height', {
  get: function get() {
    return this._height;
  },
  set: function set(value) {
    this._height = value;
  }
});
Emitter.prototype.makeParticles = function (texture, quantity) {
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
Emitter.prototype.flow = function (lifespan, frequency, quantity, total, immediate) {
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
Emitter.prototype.explode = function (lifespan, quantity) {
  this._flowTotal = 0;
  if (quantity === undefined) {
    quantity = this.particles.length;
  }
  this.start(true, lifespan, 0, quantity, false);
  return this;
};
Emitter.prototype.start = function (explode, lifespan, frequency, quantity) {
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
Emitter.prototype.emitParticle = function (x, y) {
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
Emitter.prototype.destroy = function () {
  if (this.system) this.system.remove(this);
  Tiny.Object2D.prototype.destroy.call(this);
};
Emitter.prototype.update = function (delta) {
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
Emitter.prototype.renderCanvas = function (renderSession) {
  if (this.visible === false || this.alpha === 0) return;
  if (this.blendMode !== renderSession.currentBlendMode) {
    renderSession.currentBlendMode = this.blendMode;
    renderSession.context.globalCompositeOperation = renderSession.blendModes[renderSession.currentBlendMode];
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
  renderSession.context.setTransform(this.worldTransform.a, this.worldTransform.b, this.worldTransform.c, this.worldTransform.d, this.worldTransform.tx * renderSession.resolution, this.worldTransform.ty * renderSession.resolution);
  var i = 0;
  for (i = 0; i < this.particles.length; i++) {
    this.particles[i].renderCanvas(renderSession);
  }
  for (i = 0; i < this.children.length; i++) {
    this.children[i].renderCanvas(renderSession);
  }
  if (this._mask) {
    renderSession.maskManager.popMask(renderSession);
  }
};

// Tiny.ObjectCreator.prototype.emitter = function(x, y, maxParticles) {
//     var emitter = new Emitter( maxParticles )
//     emitter.x = x || 0
//     emitter.y = y || 0

//     this.game.stage.add(emitter)

//     return this.game.particles.add(emitter)
// }


;// ./packages/particles/index.js



Tiny.Particle = Particle;
Tiny.Emitter = Emitter;
/******/ })()
;