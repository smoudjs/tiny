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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pack.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../plugins/particles/pack/Confetti.js":
/*!*********************************************!*\
  !*** ../plugins/particles/pack/Confetti.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var PI = Math.PI,
random = Math.random,
cos = Math.cos,
sin = Math.sin;

var DEG_TO_RAD = PI / 180,
    colors = [
        ["#df0049", "#660671"],
        ["#00e857", "#005291"],
        ["#2bebbc", "#05798a"],
        ["#ffd200", "#b06c00"]
    ];


Tiny.ConfettiParticle = function( emitter )
{
    Tiny.Particle.call(this, emitter );

    this.rotationSpeed = (random() * 600 + 800);
    var angle = DEG_TO_RAD * random() * 360;
    this.rotationpart = DEG_TO_RAD * random() * 360;
    this.cosA = 1.0;
    this.size = 10.0;
    this.oscillationSpeed = (random() * 1.5 + 0.5);
    this.xSpeed = 80.0;
    this.ySpeed = (random() * 60 + 50.0);
    this.corners = new Array();
    this.time = random();
    var ci = Math.round(random() * (colors.length - 1));
    this.frontColor = colors[ci][0];
    this.backColor = colors[ci][1];
    for (var i = 0; i < 4; i++) {
        var dx = cos(angle + DEG_TO_RAD * (i * 90 + 45));
        var dy = sin(angle + DEG_TO_RAD * (i * 90 + 45));
        this.corners[i] = {x: dx, y: dy}
    }

};

Tiny.ConfettiParticle.prototype = Object.create( Tiny.Particle.prototype );
Tiny.ConfettiParticle.prototype.constructor = Tiny.ConfettiParticle;


Tiny.ConfettiParticle.prototype._update = function( delta ) {
    if (this.visible === false) return false

    this.lifespan -= delta;

    if (this.lifespan <= 0)
    {
        this.visible = false
        return false;
    }

    delta = delta * 0.001

    this.time += delta;
    this.rotationpart += this.rotationSpeed * delta;
    this.cosA = cos(DEG_TO_RAD * this.rotationpart);
    this.x += cos(this.time * this.oscillationSpeed) * this.xSpeed * delta
    this.y += this.ySpeed * delta;
}

var _g, _res;

Tiny.ConfettiParticle.prototype._renderCanvas = function(renderSession)
{
    if (this.visible === false || this.alpha === 0) return;

    _g = renderSession.context
    _res = renderSession.resolution


    if (this.cosA > 0) {
        _g.fillStyle = this.frontColor;
    } else {
        _g.fillStyle = this.backColor;
    }
    _g.beginPath();
    _g.moveTo((this.x + this.corners[0].x * this.size) * _res, (this.y + this.corners[0].y * this.size * this.cosA) * _res);
    for (var i = 1; i < 4; i++) {
        _g.lineTo((this.x + this.corners[i].x * this.size) * _res, (this.y + this.corners[i].y * this.size * this.cosA) * _res);
    }
    _g.closePath();
    _g.fill();

};


/***/ }),

/***/ "../plugins/particles/pack/Explode.js":
/*!********************************************!*\
  !*** ../plugins/particles/pack/Explode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Tiny.ExplodeParticle = function( emitter )
{
    Tiny.Particle.call(this, emitter );
};

Tiny.ExplodeParticle.prototype = Object.create( Tiny.Particle.prototype );
Tiny.ExplodeParticle.prototype.constructor = Tiny.ExplodeParticle;


Tiny.ExplodeParticle.prototype.update = function( time, delta ) {

    var scale = Math.min(time / 200, 1)
    this.scale.set(scale * scale * scale * scale);
    this.alpha = Math.min(time / 250, 1)

    var speed = (scale * scale * scale * scale) * 5

    this.x += this.xspeed * speed
    this.y += this.yspeed * speed
}

Tiny.ExplodeParticle.prototype.onEmit = function(  ) {
    var randAgle = Math.random() * Math.PI * 2

    var rand_speed = Math.random() * 3


    this.xspeed = Math.sin(randAgle) * rand_speed
    this.yspeed = Math.cos(randAgle) * rand_speed

    this.x = this.xspeed * Math.random() * 3
    this.y = this.yspeed * Math.random() * 3
}

Tiny.ExplodeParticle.prototype.draw = function( context, resolution )
{
    context.beginPath();
    context.arc(0, 0, 20 * resolution, 0, 2 * Math.PI, false);
    context.fill();
};

/***/ }),

/***/ "../plugins/particles/pack/Firework.js":
/*!*********************************************!*\
  !*** ../plugins/particles/pack/Firework.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Tiny.FireworkParticle = function( emitter )
{
    Tiny.Particle.call(this, emitter );
};

Tiny.FireworkParticle.prototype = Object.create( Tiny.Particle.prototype );
Tiny.FireworkParticle.prototype.constructor = Tiny.FireworkParticle;

var normTime, speed

Tiny.FireworkParticle.prototype.update = function( time, delta ) {

    normTime = time / this.maxlifespan

    this.scale.set(Math.tan(normTime * normTime));

    this.alpha = Math.min(Math.tan(normTime), 1)

    speed = (normTime * normTime * normTime) * 10

    this.x += this.xspeed * speed * delta * normTime
    this.y += this.yspeed * speed * delta + (normTime * 0.8) * delta
}

Tiny.FireworkParticle.prototype.onEmit = function(  ) {
    var randAgle = Math.random() * Math.PI * 2

    var rand_speed = Math.random() * 3

    this.maxlifespan = this.lifespan

    this.xspeed = Math.sin(randAgle) * rand_speed * 0.05
    this.yspeed = Math.cos(randAgle) * rand_speed * 0.05
}

Tiny.FireworkParticle.prototype.draw = function( context, resolution )
{
    context.beginPath();
    context.arc(0, 0, 20 * resolution, 0, 2 * Math.PI, false);
    context.fill();
};

/***/ }),

/***/ "../plugins/particles/pack/Ribbon.js":
/*!*******************************************!*\
  !*** ../plugins/particles/pack/Ribbon.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var sqrt = Math.sqrt,
random = Math.random,
cos = Math.cos,
sin = Math.sin,
DEG_TO_RAD = Math.PI / 180;

var ribbonPaperCount = 30,
    ribbonPaperDist = 8.0,
    ribbonPaperThick = 8.0,
    colors = [
        ["#df0049", "#660671"],
        ["#00e857", "#005291"],
        ["#2bebbc", "#05798a"],
        ["#ffd200", "#b06c00"]
    ];

function Vector2(_x, _y) {
    this.x = _x, this.y = _y;
    this.Length = function() {
        return sqrt(this.SqrLength());
    }
    this.SqrLength = function() {
        return this.x * this.x + this.y * this.y;
    }
    this.Add = function(_vec) {
        this.x += _vec.x;
        this.y += _vec.y;
    }
    this.Sub = function(_vec) {
        this.x -= _vec.x;
        this.y -= _vec.y;
    }
    this.Div = function(_f) {
        this.x /= _f;
        this.y /= _f;
    }
    this.Mul = function(_f) {
        this.x *= _f;
        this.y *= _f;
    }
    this.Normalize = function() {
        var sqrLen = this.SqrLength();
        if (sqrLen != 0) {
            var factor = 1.0 / sqrt(sqrLen);
            this.x *= factor;
            this.y *= factor;
        }
    }
    this.Normalized = function() {
        var sqrLen = this.SqrLength();
        if (sqrLen != 0) {
            var factor = 1.0 / sqrt(sqrLen);
            return new Vector2(this.x * factor, this.y * factor);
        }
        return new Vector2(0, 0);
    }
}
Vector2.Lerp = function(_vec0, _vec1, _t) {
    return new Vector2((_vec1.x - _vec0.x) * _t + _vec0.x, (_vec1.y - _vec0.y) * _t + _vec0.y);
}
Vector2.Distance = function(_vec0, _vec1) {
    return sqrt(Vector2.SqrDistance(_vec0, _vec1));
}
Vector2.SqrDistance = function(_vec0, _vec1) {
    var x = _vec0.x - _vec1.x;
    var y = _vec0.y - _vec1.y;
    return (x * x + y * y + z * z);
}
Vector2.Scale = function(_vec0, _vec1) {
    return new Vector2(_vec0.x * _vec1.x, _vec0.y * _vec1.y);
}
Vector2.Min = function(_vec0, _vec1) {
    return new Vector2(Math.min(_vec0.x, _vec1.x), Math.min(_vec0.y, _vec1.y));
}
Vector2.Max = function(_vec0, _vec1) {
    return new Vector2(Math.max(_vec0.x, _vec1.x), Math.max(_vec0.y, _vec1.y));
}
Vector2.ClampMagnitude = function(_vec0, _len) {
    var vecNorm = _vec0.Normalized;
    return new Vector2(vecNorm.x * _len, vecNorm.y * _len);
}
Vector2.Sub = function(_vec0, _vec1) {
    return new Vector2(_vec0.x - _vec1.x, _vec0.y - _vec1.y, _vec0.z - _vec1.z);
}

function EulerMass(_x, _y, _mass, _drag) {
    this.position = new Vector2(_x, _y);
    this.mass = _mass;
    this.drag = _drag;
    this.force = new Vector2(0, 0);
    this.velocity = new Vector2(0, 0);
    this.AddForce = function(_f) {
        this.force.Add(_f);
    }
    this.Integrate = function(_dt) {
        var acc = this.CurrentForce(this.position);
        acc.Div(this.mass);
        var posDelta = new Vector2(this.velocity.x, this.velocity.y);
        posDelta.Mul(_dt);
        this.position.Add(posDelta);
        acc.Mul(_dt);
        this.velocity.Add(acc);
        this.force = new Vector2(0, 0);
    }
    this.CurrentForce = function(_pos, _vel) {
        var totalForce = new Vector2(this.force.x, this.force.y);
        var speed = this.velocity.Length();
        var dragVel = new Vector2(this.velocity.x, this.velocity.y);
        dragVel.Mul(this.drag * this.mass * speed);
        totalForce.Sub(dragVel);
        return totalForce;
    }
}

function Side(x1, y1, x2, y2, x3, y3) {
    return ((x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2));
}

Tiny.RibbonParticle = function( emitter )
{

    Tiny.Particle.call(this, emitter );

    this.particleDist = ribbonPaperDist;
    this.length = ribbonPaperCount;
    this.particleMass = 1;
    this.particleDrag = 0.05;
    this.particles = new Array();

    this.xOff = (cos(DEG_TO_RAD * 45) * ribbonPaperThick);
    this.yOff = (sin(DEG_TO_RAD * 45) * ribbonPaperThick);

    this.prevPosition = new Vector2(0, 0);

};

Tiny.RibbonParticle.prototype = Object.create( Tiny.Particle.prototype );
Tiny.RibbonParticle.prototype.constructor = Tiny.RibbonParticle;

Tiny.RibbonParticle.prototype.onEmit = function(  ) {
    this.prevPosition.x = this.position.x;
    this.prevPosition.y = this.position.y;

    this.velocityInherit = random() * 2 + 4;
    this.time = random() * 100;
    this.oscillationSpeed = random() * 2.0 + 1.5;
    this.oscillationDistance = (random() * 40 + 40);
    this.ySpeed = random() * 40 + 80;
    var ci = Math.round(random() * (colors.length - 1));
    this.frontColor = colors[ci][0];
    this.backColor = colors[ci][1];
    for (var i = 0; i < this.length; i++) {
        this.particles[i] = new EulerMass(this.position.x, this.position.y - i * this.particleDist, this.particleMass, this.particleDrag);
    }
}

var dX, dY, dt, dirP, rp2

Tiny.RibbonParticle.prototype._update = function( delta ) {
    if (this.visible === false) return false

    this.lifespan -= delta;

    if (this.lifespan <= 0)
    {
        this.visible = false
        return false;
    }

    delta = delta * 0.003

    var i = 0;
    this.time += delta * this.oscillationSpeed;
    this.position.y += this.ySpeed * delta;
    this.position.x += cos(this.time) * this.oscillationDistance * delta;
    this.particles[0].position = this.position;
    dX = this.prevPosition.x - this.position.x;
    dY = this.prevPosition.y - this.position.y;
    dt = sqrt(dX * dX + dY * dY);
    
    this.prevPosition.x = this.position.x;
    this.prevPosition.y = this.position.y;

    for (i = 1; i < this.length; i++) {
        dirP = Vector2.Sub(this.particles[i - 1].position, this.particles[i].position);
        dirP.Normalize();
        dirP.Mul((dt / delta) * this.velocityInherit);
        this.particles[i].AddForce(dirP);
    }
    for (i = 1; i < this.length; i++) {
        this.particles[i].Integrate(delta);
    }
    for (i = 1; i < this.length; i++) {
        rp2 = new Vector2(this.particles[i].position.x, this.particles[i].position.y);
        rp2.Sub(this.particles[i - 1].position);
        rp2.Normalize();
        rp2.Mul(this.particleDist);
        rp2.Add(this.particles[i - 1].position);
        this.particles[i].position = rp2;
    }
}

var p0, p1, _g, _res;

Tiny.RibbonParticle.prototype._renderCanvas = function( renderSession )
{
    if (this.visible === false || this.alpha === 0) return;

    _g = renderSession.context
    _res = renderSession.resolution

    for (var i = 0; i < this.length - 1; i++) {
        p0 = {x: this.particles[i].position.x + this.xOff, y: this.particles[i].position.y + this.yOff};
        p1 = {x: this.particles[i + 1].position.x + this.xOff, y: this.particles[i + 1].position.y + this.yOff};

        if (Side(this.particles[i].position.x, this.particles[i].position.y, this.particles[i + 1].position.x, this.particles[i + 1].position.y, p1.x, p1.y) < 0) {
            _g.fillStyle = this.frontColor;
            _g.strokeStyle = this.frontColor;
        } else {
            _g.fillStyle = this.backColor;
            _g.strokeStyle = this.backColor;
        }
        if (i == 0) {
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x * _res, this.particles[i].position.y * _res);
            _g.lineTo(this.particles[i + 1].position.x * _res, this.particles[i + 1].position.y * _res);
            _g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * _res, ((this.particles[i + 1].position.y + p1.y) * 0.5) * _res);
            _g.closePath();
            _g.stroke();
            _g.fill();
            _g.beginPath();
            _g.moveTo(p1.x * _res, p1.y * _res);
            _g.lineTo(p0.x * _res, p0.y * _res);
            _g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * _res, ((this.particles[i + 1].position.y + p1.y) * 0.5) * _res);
            _g.closePath();
            _g.stroke();
            _g.fill();
        } else if (i == this.particleCount - 2) {
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x * _res, this.particles[i].position.y * _res);
            _g.lineTo(this.particles[i + 1].position.x * _res, this.particles[i + 1].position.y * _res);
            _g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * _res, ((this.particles[i].position.y + p0.y) * 0.5) * _res);
            _g.closePath();
            _g.stroke();
            _g.fill();
            _g.beginPath();
            _g.moveTo(p1.x * _res, p1.y * _res);
            _g.lineTo(p0.x * _res, p0.y * _res);
            _g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * _res, ((this.particles[i].position.y + p0.y) * 0.5) * _res);
            _g.closePath();
            _g.stroke();
            _g.fill();
        } else {
            _g.beginPath();
            _g.moveTo(this.particles[i].position.x * _res, this.particles[i].position.y * _res);
            _g.lineTo(this.particles[i + 1].position.x * _res, this.particles[i + 1].position.y * _res);
            _g.lineTo(p1.x * _res, p1.y * _res);
            _g.lineTo(p0.x * _res, p0.y * _res);
            _g.closePath();
            _g.stroke();
            _g.fill();
        }
    }
};



/***/ }),

/***/ "../plugins/particles/pack/Smoke.js":
/*!******************************************!*\
  !*** ../plugins/particles/pack/Smoke.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

Tiny.SmokeParticle = function( emitter )
{
    Tiny.Particle.call(this, emitter );
};

Tiny.SmokeParticle.prototype = Object.create( Tiny.Particle.prototype );
Tiny.SmokeParticle.prototype.constructor = Tiny.SmokeParticle;


Tiny.SmokeParticle.prototype.update = function( time, delta ) {

    this.scale.set(Math.min(time / 1000, 0.7));
    this.alpha = Math.min(time / 1000, 1)

    this.y -= this.yspeed * delta
    this.x += this.xspeed * delta
    this.rotation += this.rotationsp
}

Tiny.SmokeParticle.prototype.onEmit = function(  ) {
    this.xspeed = Tiny.rnd(-4, 4) * 0.05
    this.yspeed = Tiny.rnd(2, 10) * 0.05
    this.rotationsp = Math.random() * 0.02 - 0.01
}

Tiny.SmokeParticle.prototype.draw = function( context, resolution )
{

   //context.fillRect(0, 0, 100, 100)

    context.beginPath();
    context.arc(0, 0, 100 * resolution, 0, 2 * Math.PI, false);
    context.fill();
};

/***/ }),

/***/ "../plugins/particles/pack/index.js":
/*!******************************************!*\
  !*** ../plugins/particles/pack/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./Smoke */ "../plugins/particles/pack/Smoke.js");
__webpack_require__(/*! ./Explode */ "../plugins/particles/pack/Explode.js");
__webpack_require__(/*! ./Firework */ "../plugins/particles/pack/Firework.js");
__webpack_require__(/*! ./Confetti */ "../plugins/particles/pack/Confetti.js");
__webpack_require__(/*! ./Ribbon */ "../plugins/particles/pack/Ribbon.js");

/***/ }),

/***/ "./pack.js":
/*!*****************!*\
  !*** ./pack.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../plugins/particles/pack */ "../plugins/particles/pack/index.js");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL3BsdWdpbnMvcGFydGljbGVzL3BhY2svQ29uZmV0dGkuanMiLCJ3ZWJwYWNrOi8vLy4uL3BsdWdpbnMvcGFydGljbGVzL3BhY2svRXhwbG9kZS5qcyIsIndlYnBhY2s6Ly8vLi4vcGx1Z2lucy9wYXJ0aWNsZXMvcGFjay9GaXJld29yay5qcyIsIndlYnBhY2s6Ly8vLi4vcGx1Z2lucy9wYXJ0aWNsZXMvcGFjay9SaWJib24uanMiLCJ3ZWJwYWNrOi8vLy4uL3BsdWdpbnMvcGFydGljbGVzL3BhY2svU21va2UuanMiLCJ3ZWJwYWNrOi8vLy4uL3BsdWdpbnMvcGFydGljbGVzL3BhY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcGFjay5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7O0FBRUE7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQkFBbUIscUJBQXFCO0FBQ3hDLGNBQWM7QUFDZCxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdlFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDakNBLG1CQUFPLENBQUMsbURBQVM7QUFDakIsbUJBQU8sQ0FBQyx1REFBVztBQUNuQixtQkFBTyxDQUFDLHlEQUFZO0FBQ3BCLG1CQUFPLENBQUMseURBQVk7QUFDcEIsbUJBQU8sQ0FBQyxxREFBVSxFOzs7Ozs7Ozs7OztBQ0psQixtQkFBTyxDQUFDLHFFQUEyQixFIiwiZmlsZSI6InBhY2suanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhY2suanNcIik7XG4iLCJ2YXIgUEkgPSBNYXRoLlBJLFxyXG5yYW5kb20gPSBNYXRoLnJhbmRvbSxcclxuY29zID0gTWF0aC5jb3MsXHJcbnNpbiA9IE1hdGguc2luO1xyXG5cclxudmFyIERFR19UT19SQUQgPSBQSSAvIDE4MCxcclxuICAgIGNvbG9ycyA9IFtcclxuICAgICAgICBbXCIjZGYwMDQ5XCIsIFwiIzY2MDY3MVwiXSxcclxuICAgICAgICBbXCIjMDBlODU3XCIsIFwiIzAwNTI5MVwiXSxcclxuICAgICAgICBbXCIjMmJlYmJjXCIsIFwiIzA1Nzk4YVwiXSxcclxuICAgICAgICBbXCIjZmZkMjAwXCIsIFwiI2IwNmMwMFwiXVxyXG4gICAgXTtcclxuXHJcblxyXG5UaW55LkNvbmZldHRpUGFydGljbGUgPSBmdW5jdGlvbiggZW1pdHRlciApXHJcbntcclxuICAgIFRpbnkuUGFydGljbGUuY2FsbCh0aGlzLCBlbWl0dGVyICk7XHJcblxyXG4gICAgdGhpcy5yb3RhdGlvblNwZWVkID0gKHJhbmRvbSgpICogNjAwICsgODAwKTtcclxuICAgIHZhciBhbmdsZSA9IERFR19UT19SQUQgKiByYW5kb20oKSAqIDM2MDtcclxuICAgIHRoaXMucm90YXRpb25wYXJ0ID0gREVHX1RPX1JBRCAqIHJhbmRvbSgpICogMzYwO1xyXG4gICAgdGhpcy5jb3NBID0gMS4wO1xyXG4gICAgdGhpcy5zaXplID0gMTAuMDtcclxuICAgIHRoaXMub3NjaWxsYXRpb25TcGVlZCA9IChyYW5kb20oKSAqIDEuNSArIDAuNSk7XHJcbiAgICB0aGlzLnhTcGVlZCA9IDgwLjA7XHJcbiAgICB0aGlzLnlTcGVlZCA9IChyYW5kb20oKSAqIDYwICsgNTAuMCk7XHJcbiAgICB0aGlzLmNvcm5lcnMgPSBuZXcgQXJyYXkoKTtcclxuICAgIHRoaXMudGltZSA9IHJhbmRvbSgpO1xyXG4gICAgdmFyIGNpID0gTWF0aC5yb3VuZChyYW5kb20oKSAqIChjb2xvcnMubGVuZ3RoIC0gMSkpO1xyXG4gICAgdGhpcy5mcm9udENvbG9yID0gY29sb3JzW2NpXVswXTtcclxuICAgIHRoaXMuYmFja0NvbG9yID0gY29sb3JzW2NpXVsxXTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGR4ID0gY29zKGFuZ2xlICsgREVHX1RPX1JBRCAqIChpICogOTAgKyA0NSkpO1xyXG4gICAgICAgIHZhciBkeSA9IHNpbihhbmdsZSArIERFR19UT19SQUQgKiAoaSAqIDkwICsgNDUpKTtcclxuICAgICAgICB0aGlzLmNvcm5lcnNbaV0gPSB7eDogZHgsIHk6IGR5fVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRpbnkuQ29uZmV0dGlQYXJ0aWNsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUaW55LlBhcnRpY2xlLnByb3RvdHlwZSApO1xyXG5UaW55LkNvbmZldHRpUGFydGljbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5Db25mZXR0aVBhcnRpY2xlO1xyXG5cclxuXHJcblRpbnkuQ29uZmV0dGlQYXJ0aWNsZS5wcm90b3R5cGUuX3VwZGF0ZSA9IGZ1bmN0aW9uKCBkZWx0YSApIHtcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2VcclxuXHJcbiAgICB0aGlzLmxpZmVzcGFuIC09IGRlbHRhO1xyXG5cclxuICAgIGlmICh0aGlzLmxpZmVzcGFuIDw9IDApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2VcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsdGEgPSBkZWx0YSAqIDAuMDAxXHJcblxyXG4gICAgdGhpcy50aW1lICs9IGRlbHRhO1xyXG4gICAgdGhpcy5yb3RhdGlvbnBhcnQgKz0gdGhpcy5yb3RhdGlvblNwZWVkICogZGVsdGE7XHJcbiAgICB0aGlzLmNvc0EgPSBjb3MoREVHX1RPX1JBRCAqIHRoaXMucm90YXRpb25wYXJ0KTtcclxuICAgIHRoaXMueCArPSBjb3ModGhpcy50aW1lICogdGhpcy5vc2NpbGxhdGlvblNwZWVkKSAqIHRoaXMueFNwZWVkICogZGVsdGFcclxuICAgIHRoaXMueSArPSB0aGlzLnlTcGVlZCAqIGRlbHRhO1xyXG59XHJcblxyXG52YXIgX2csIF9yZXM7XHJcblxyXG5UaW55LkNvbmZldHRpUGFydGljbGUucHJvdG90eXBlLl9yZW5kZXJDYW52YXMgPSBmdW5jdGlvbihyZW5kZXJTZXNzaW9uKVxyXG57XHJcbiAgICBpZiAodGhpcy52aXNpYmxlID09PSBmYWxzZSB8fCB0aGlzLmFscGhhID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgX2cgPSByZW5kZXJTZXNzaW9uLmNvbnRleHRcclxuICAgIF9yZXMgPSByZW5kZXJTZXNzaW9uLnJlc29sdXRpb25cclxuXHJcblxyXG4gICAgaWYgKHRoaXMuY29zQSA+IDApIHtcclxuICAgICAgICBfZy5maWxsU3R5bGUgPSB0aGlzLmZyb250Q29sb3I7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9nLmZpbGxTdHlsZSA9IHRoaXMuYmFja0NvbG9yO1xyXG4gICAgfVxyXG4gICAgX2cuYmVnaW5QYXRoKCk7XHJcbiAgICBfZy5tb3ZlVG8oKHRoaXMueCArIHRoaXMuY29ybmVyc1swXS54ICogdGhpcy5zaXplKSAqIF9yZXMsICh0aGlzLnkgKyB0aGlzLmNvcm5lcnNbMF0ueSAqIHRoaXMuc2l6ZSAqIHRoaXMuY29zQSkgKiBfcmVzKTtcclxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgX2cubGluZVRvKCh0aGlzLnggKyB0aGlzLmNvcm5lcnNbaV0ueCAqIHRoaXMuc2l6ZSkgKiBfcmVzLCAodGhpcy55ICsgdGhpcy5jb3JuZXJzW2ldLnkgKiB0aGlzLnNpemUgKiB0aGlzLmNvc0EpICogX3Jlcyk7XHJcbiAgICB9XHJcbiAgICBfZy5jbG9zZVBhdGgoKTtcclxuICAgIF9nLmZpbGwoKTtcclxuXHJcbn07XHJcbiIsIlRpbnkuRXhwbG9kZVBhcnRpY2xlID0gZnVuY3Rpb24oIGVtaXR0ZXIgKVxyXG57XHJcbiAgICBUaW55LlBhcnRpY2xlLmNhbGwodGhpcywgZW1pdHRlciApO1xyXG59O1xyXG5cclxuVGlueS5FeHBsb2RlUGFydGljbGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUgKTtcclxuVGlueS5FeHBsb2RlUGFydGljbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5FeHBsb2RlUGFydGljbGU7XHJcblxyXG5cclxuVGlueS5FeHBsb2RlUGFydGljbGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCB0aW1lLCBkZWx0YSApIHtcclxuXHJcbiAgICB2YXIgc2NhbGUgPSBNYXRoLm1pbih0aW1lIC8gMjAwLCAxKVxyXG4gICAgdGhpcy5zY2FsZS5zZXQoc2NhbGUgKiBzY2FsZSAqIHNjYWxlICogc2NhbGUpO1xyXG4gICAgdGhpcy5hbHBoYSA9IE1hdGgubWluKHRpbWUgLyAyNTAsIDEpXHJcblxyXG4gICAgdmFyIHNwZWVkID0gKHNjYWxlICogc2NhbGUgKiBzY2FsZSAqIHNjYWxlKSAqIDVcclxuXHJcbiAgICB0aGlzLnggKz0gdGhpcy54c3BlZWQgKiBzcGVlZFxyXG4gICAgdGhpcy55ICs9IHRoaXMueXNwZWVkICogc3BlZWRcclxufVxyXG5cclxuVGlueS5FeHBsb2RlUGFydGljbGUucHJvdG90eXBlLm9uRW1pdCA9IGZ1bmN0aW9uKCAgKSB7XHJcbiAgICB2YXIgcmFuZEFnbGUgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDJcclxuXHJcbiAgICB2YXIgcmFuZF9zcGVlZCA9IE1hdGgucmFuZG9tKCkgKiAzXHJcblxyXG5cclxuICAgIHRoaXMueHNwZWVkID0gTWF0aC5zaW4ocmFuZEFnbGUpICogcmFuZF9zcGVlZFxyXG4gICAgdGhpcy55c3BlZWQgPSBNYXRoLmNvcyhyYW5kQWdsZSkgKiByYW5kX3NwZWVkXHJcblxyXG4gICAgdGhpcy54ID0gdGhpcy54c3BlZWQgKiBNYXRoLnJhbmRvbSgpICogM1xyXG4gICAgdGhpcy55ID0gdGhpcy55c3BlZWQgKiBNYXRoLnJhbmRvbSgpICogM1xyXG59XHJcblxyXG5UaW55LkV4cGxvZGVQYXJ0aWNsZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCBjb250ZXh0LCByZXNvbHV0aW9uIClcclxue1xyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQuYXJjKDAsIDAsIDIwICogcmVzb2x1dGlvbiwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgIGNvbnRleHQuZmlsbCgpO1xyXG59OyIsIlRpbnkuRmlyZXdvcmtQYXJ0aWNsZSA9IGZ1bmN0aW9uKCBlbWl0dGVyIClcclxue1xyXG4gICAgVGlueS5QYXJ0aWNsZS5jYWxsKHRoaXMsIGVtaXR0ZXIgKTtcclxufTtcclxuXHJcblRpbnkuRmlyZXdvcmtQYXJ0aWNsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUaW55LlBhcnRpY2xlLnByb3RvdHlwZSApO1xyXG5UaW55LkZpcmV3b3JrUGFydGljbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gVGlueS5GaXJld29ya1BhcnRpY2xlO1xyXG5cclxudmFyIG5vcm1UaW1lLCBzcGVlZFxyXG5cclxuVGlueS5GaXJld29ya1BhcnRpY2xlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggdGltZSwgZGVsdGEgKSB7XHJcblxyXG4gICAgbm9ybVRpbWUgPSB0aW1lIC8gdGhpcy5tYXhsaWZlc3BhblxyXG5cclxuICAgIHRoaXMuc2NhbGUuc2V0KE1hdGgudGFuKG5vcm1UaW1lICogbm9ybVRpbWUpKTtcclxuXHJcbiAgICB0aGlzLmFscGhhID0gTWF0aC5taW4oTWF0aC50YW4obm9ybVRpbWUpLCAxKVxyXG5cclxuICAgIHNwZWVkID0gKG5vcm1UaW1lICogbm9ybVRpbWUgKiBub3JtVGltZSkgKiAxMFxyXG5cclxuICAgIHRoaXMueCArPSB0aGlzLnhzcGVlZCAqIHNwZWVkICogZGVsdGEgKiBub3JtVGltZVxyXG4gICAgdGhpcy55ICs9IHRoaXMueXNwZWVkICogc3BlZWQgKiBkZWx0YSArIChub3JtVGltZSAqIDAuOCkgKiBkZWx0YVxyXG59XHJcblxyXG5UaW55LkZpcmV3b3JrUGFydGljbGUucHJvdG90eXBlLm9uRW1pdCA9IGZ1bmN0aW9uKCAgKSB7XHJcbiAgICB2YXIgcmFuZEFnbGUgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDJcclxuXHJcbiAgICB2YXIgcmFuZF9zcGVlZCA9IE1hdGgucmFuZG9tKCkgKiAzXHJcblxyXG4gICAgdGhpcy5tYXhsaWZlc3BhbiA9IHRoaXMubGlmZXNwYW5cclxuXHJcbiAgICB0aGlzLnhzcGVlZCA9IE1hdGguc2luKHJhbmRBZ2xlKSAqIHJhbmRfc3BlZWQgKiAwLjA1XHJcbiAgICB0aGlzLnlzcGVlZCA9IE1hdGguY29zKHJhbmRBZ2xlKSAqIHJhbmRfc3BlZWQgKiAwLjA1XHJcbn1cclxuXHJcblRpbnkuRmlyZXdvcmtQYXJ0aWNsZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCBjb250ZXh0LCByZXNvbHV0aW9uIClcclxue1xyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQuYXJjKDAsIDAsIDIwICogcmVzb2x1dGlvbiwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcclxuICAgIGNvbnRleHQuZmlsbCgpO1xyXG59OyIsInZhciBzcXJ0ID0gTWF0aC5zcXJ0LFxyXG5yYW5kb20gPSBNYXRoLnJhbmRvbSxcclxuY29zID0gTWF0aC5jb3MsXHJcbnNpbiA9IE1hdGguc2luLFxyXG5ERUdfVE9fUkFEID0gTWF0aC5QSSAvIDE4MDtcclxuXHJcbnZhciByaWJib25QYXBlckNvdW50ID0gMzAsXHJcbiAgICByaWJib25QYXBlckRpc3QgPSA4LjAsXHJcbiAgICByaWJib25QYXBlclRoaWNrID0gOC4wLFxyXG4gICAgY29sb3JzID0gW1xyXG4gICAgICAgIFtcIiNkZjAwNDlcIiwgXCIjNjYwNjcxXCJdLFxyXG4gICAgICAgIFtcIiMwMGU4NTdcIiwgXCIjMDA1MjkxXCJdLFxyXG4gICAgICAgIFtcIiMyYmViYmNcIiwgXCIjMDU3OThhXCJdLFxyXG4gICAgICAgIFtcIiNmZmQyMDBcIiwgXCIjYjA2YzAwXCJdXHJcbiAgICBdO1xyXG5cclxuZnVuY3Rpb24gVmVjdG9yMihfeCwgX3kpIHtcclxuICAgIHRoaXMueCA9IF94LCB0aGlzLnkgPSBfeTtcclxuICAgIHRoaXMuTGVuZ3RoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHNxcnQodGhpcy5TcXJMZW5ndGgoKSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLlNxckxlbmd0aCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XHJcbiAgICB9XHJcbiAgICB0aGlzLkFkZCA9IGZ1bmN0aW9uKF92ZWMpIHtcclxuICAgICAgICB0aGlzLnggKz0gX3ZlYy54O1xyXG4gICAgICAgIHRoaXMueSArPSBfdmVjLnk7XHJcbiAgICB9XHJcbiAgICB0aGlzLlN1YiA9IGZ1bmN0aW9uKF92ZWMpIHtcclxuICAgICAgICB0aGlzLnggLT0gX3ZlYy54O1xyXG4gICAgICAgIHRoaXMueSAtPSBfdmVjLnk7XHJcbiAgICB9XHJcbiAgICB0aGlzLkRpdiA9IGZ1bmN0aW9uKF9mKSB7XHJcbiAgICAgICAgdGhpcy54IC89IF9mO1xyXG4gICAgICAgIHRoaXMueSAvPSBfZjtcclxuICAgIH1cclxuICAgIHRoaXMuTXVsID0gZnVuY3Rpb24oX2YpIHtcclxuICAgICAgICB0aGlzLnggKj0gX2Y7XHJcbiAgICAgICAgdGhpcy55ICo9IF9mO1xyXG4gICAgfVxyXG4gICAgdGhpcy5Ob3JtYWxpemUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc3FyTGVuID0gdGhpcy5TcXJMZW5ndGgoKTtcclxuICAgICAgICBpZiAoc3FyTGVuICE9IDApIHtcclxuICAgICAgICAgICAgdmFyIGZhY3RvciA9IDEuMCAvIHNxcnQoc3FyTGVuKTtcclxuICAgICAgICAgICAgdGhpcy54ICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgdGhpcy55ICo9IGZhY3RvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLk5vcm1hbGl6ZWQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc3FyTGVuID0gdGhpcy5TcXJMZW5ndGgoKTtcclxuICAgICAgICBpZiAoc3FyTGVuICE9IDApIHtcclxuICAgICAgICAgICAgdmFyIGZhY3RvciA9IDEuMCAvIHNxcnQoc3FyTGVuKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKHRoaXMueCAqIGZhY3RvciwgdGhpcy55ICogZmFjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKDAsIDApO1xyXG4gICAgfVxyXG59XHJcblZlY3RvcjIuTGVycCA9IGZ1bmN0aW9uKF92ZWMwLCBfdmVjMSwgX3QpIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMigoX3ZlYzEueCAtIF92ZWMwLngpICogX3QgKyBfdmVjMC54LCAoX3ZlYzEueSAtIF92ZWMwLnkpICogX3QgKyBfdmVjMC55KTtcclxufVxyXG5WZWN0b3IyLkRpc3RhbmNlID0gZnVuY3Rpb24oX3ZlYzAsIF92ZWMxKSB7XHJcbiAgICByZXR1cm4gc3FydChWZWN0b3IyLlNxckRpc3RhbmNlKF92ZWMwLCBfdmVjMSkpO1xyXG59XHJcblZlY3RvcjIuU3FyRGlzdGFuY2UgPSBmdW5jdGlvbihfdmVjMCwgX3ZlYzEpIHtcclxuICAgIHZhciB4ID0gX3ZlYzAueCAtIF92ZWMxLng7XHJcbiAgICB2YXIgeSA9IF92ZWMwLnkgLSBfdmVjMS55O1xyXG4gICAgcmV0dXJuICh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xyXG59XHJcblZlY3RvcjIuU2NhbGUgPSBmdW5jdGlvbihfdmVjMCwgX3ZlYzEpIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMihfdmVjMC54ICogX3ZlYzEueCwgX3ZlYzAueSAqIF92ZWMxLnkpO1xyXG59XHJcblZlY3RvcjIuTWluID0gZnVuY3Rpb24oX3ZlYzAsIF92ZWMxKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIoTWF0aC5taW4oX3ZlYzAueCwgX3ZlYzEueCksIE1hdGgubWluKF92ZWMwLnksIF92ZWMxLnkpKTtcclxufVxyXG5WZWN0b3IyLk1heCA9IGZ1bmN0aW9uKF92ZWMwLCBfdmVjMSkge1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyKE1hdGgubWF4KF92ZWMwLngsIF92ZWMxLngpLCBNYXRoLm1heChfdmVjMC55LCBfdmVjMS55KSk7XHJcbn1cclxuVmVjdG9yMi5DbGFtcE1hZ25pdHVkZSA9IGZ1bmN0aW9uKF92ZWMwLCBfbGVuKSB7XHJcbiAgICB2YXIgdmVjTm9ybSA9IF92ZWMwLk5vcm1hbGl6ZWQ7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjIodmVjTm9ybS54ICogX2xlbiwgdmVjTm9ybS55ICogX2xlbik7XHJcbn1cclxuVmVjdG9yMi5TdWIgPSBmdW5jdGlvbihfdmVjMCwgX3ZlYzEpIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMihfdmVjMC54IC0gX3ZlYzEueCwgX3ZlYzAueSAtIF92ZWMxLnksIF92ZWMwLnogLSBfdmVjMS56KTtcclxufVxyXG5cclxuZnVuY3Rpb24gRXVsZXJNYXNzKF94LCBfeSwgX21hc3MsIF9kcmFnKSB7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IFZlY3RvcjIoX3gsIF95KTtcclxuICAgIHRoaXMubWFzcyA9IF9tYXNzO1xyXG4gICAgdGhpcy5kcmFnID0gX2RyYWc7XHJcbiAgICB0aGlzLmZvcmNlID0gbmV3IFZlY3RvcjIoMCwgMCk7XHJcbiAgICB0aGlzLnZlbG9jaXR5ID0gbmV3IFZlY3RvcjIoMCwgMCk7XHJcbiAgICB0aGlzLkFkZEZvcmNlID0gZnVuY3Rpb24oX2YpIHtcclxuICAgICAgICB0aGlzLmZvcmNlLkFkZChfZik7XHJcbiAgICB9XHJcbiAgICB0aGlzLkludGVncmF0ZSA9IGZ1bmN0aW9uKF9kdCkge1xyXG4gICAgICAgIHZhciBhY2MgPSB0aGlzLkN1cnJlbnRGb3JjZSh0aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICBhY2MuRGl2KHRoaXMubWFzcyk7XHJcbiAgICAgICAgdmFyIHBvc0RlbHRhID0gbmV3IFZlY3RvcjIodGhpcy52ZWxvY2l0eS54LCB0aGlzLnZlbG9jaXR5LnkpO1xyXG4gICAgICAgIHBvc0RlbHRhLk11bChfZHQpO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24uQWRkKHBvc0RlbHRhKTtcclxuICAgICAgICBhY2MuTXVsKF9kdCk7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eS5BZGQoYWNjKTtcclxuICAgICAgICB0aGlzLmZvcmNlID0gbmV3IFZlY3RvcjIoMCwgMCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLkN1cnJlbnRGb3JjZSA9IGZ1bmN0aW9uKF9wb3MsIF92ZWwpIHtcclxuICAgICAgICB2YXIgdG90YWxGb3JjZSA9IG5ldyBWZWN0b3IyKHRoaXMuZm9yY2UueCwgdGhpcy5mb3JjZS55KTtcclxuICAgICAgICB2YXIgc3BlZWQgPSB0aGlzLnZlbG9jaXR5Lkxlbmd0aCgpO1xyXG4gICAgICAgIHZhciBkcmFnVmVsID0gbmV3IFZlY3RvcjIodGhpcy52ZWxvY2l0eS54LCB0aGlzLnZlbG9jaXR5LnkpO1xyXG4gICAgICAgIGRyYWdWZWwuTXVsKHRoaXMuZHJhZyAqIHRoaXMubWFzcyAqIHNwZWVkKTtcclxuICAgICAgICB0b3RhbEZvcmNlLlN1YihkcmFnVmVsKTtcclxuICAgICAgICByZXR1cm4gdG90YWxGb3JjZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gU2lkZSh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzKSB7XHJcbiAgICByZXR1cm4gKCh4MSAtIHgyKSAqICh5MyAtIHkyKSAtICh5MSAtIHkyKSAqICh4MyAtIHgyKSk7XHJcbn1cclxuXHJcblRpbnkuUmliYm9uUGFydGljbGUgPSBmdW5jdGlvbiggZW1pdHRlciApXHJcbntcclxuXHJcbiAgICBUaW55LlBhcnRpY2xlLmNhbGwodGhpcywgZW1pdHRlciApO1xyXG5cclxuICAgIHRoaXMucGFydGljbGVEaXN0ID0gcmliYm9uUGFwZXJEaXN0O1xyXG4gICAgdGhpcy5sZW5ndGggPSByaWJib25QYXBlckNvdW50O1xyXG4gICAgdGhpcy5wYXJ0aWNsZU1hc3MgPSAxO1xyXG4gICAgdGhpcy5wYXJ0aWNsZURyYWcgPSAwLjA1O1xyXG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICB0aGlzLnhPZmYgPSAoY29zKERFR19UT19SQUQgKiA0NSkgKiByaWJib25QYXBlclRoaWNrKTtcclxuICAgIHRoaXMueU9mZiA9IChzaW4oREVHX1RPX1JBRCAqIDQ1KSAqIHJpYmJvblBhcGVyVGhpY2spO1xyXG5cclxuICAgIHRoaXMucHJldlBvc2l0aW9uID0gbmV3IFZlY3RvcjIoMCwgMCk7XHJcblxyXG59O1xyXG5cclxuVGlueS5SaWJib25QYXJ0aWNsZS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBUaW55LlBhcnRpY2xlLnByb3RvdHlwZSApO1xyXG5UaW55LlJpYmJvblBhcnRpY2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuUmliYm9uUGFydGljbGU7XHJcblxyXG5UaW55LlJpYmJvblBhcnRpY2xlLnByb3RvdHlwZS5vbkVtaXQgPSBmdW5jdGlvbiggICkge1xyXG4gICAgdGhpcy5wcmV2UG9zaXRpb24ueCA9IHRoaXMucG9zaXRpb24ueDtcclxuICAgIHRoaXMucHJldlBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uLnk7XHJcblxyXG4gICAgdGhpcy52ZWxvY2l0eUluaGVyaXQgPSByYW5kb20oKSAqIDIgKyA0O1xyXG4gICAgdGhpcy50aW1lID0gcmFuZG9tKCkgKiAxMDA7XHJcbiAgICB0aGlzLm9zY2lsbGF0aW9uU3BlZWQgPSByYW5kb20oKSAqIDIuMCArIDEuNTtcclxuICAgIHRoaXMub3NjaWxsYXRpb25EaXN0YW5jZSA9IChyYW5kb20oKSAqIDQwICsgNDApO1xyXG4gICAgdGhpcy55U3BlZWQgPSByYW5kb20oKSAqIDQwICsgODA7XHJcbiAgICB2YXIgY2kgPSBNYXRoLnJvdW5kKHJhbmRvbSgpICogKGNvbG9ycy5sZW5ndGggLSAxKSk7XHJcbiAgICB0aGlzLmZyb250Q29sb3IgPSBjb2xvcnNbY2ldWzBdO1xyXG4gICAgdGhpcy5iYWNrQ29sb3IgPSBjb2xvcnNbY2ldWzFdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0gPSBuZXcgRXVsZXJNYXNzKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55IC0gaSAqIHRoaXMucGFydGljbGVEaXN0LCB0aGlzLnBhcnRpY2xlTWFzcywgdGhpcy5wYXJ0aWNsZURyYWcpO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgZFgsIGRZLCBkdCwgZGlyUCwgcnAyXHJcblxyXG5UaW55LlJpYmJvblBhcnRpY2xlLnByb3RvdHlwZS5fdXBkYXRlID0gZnVuY3Rpb24oIGRlbHRhICkge1xyXG4gICAgaWYgKHRoaXMudmlzaWJsZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIHRoaXMubGlmZXNwYW4gLT0gZGVsdGE7XHJcblxyXG4gICAgaWYgKHRoaXMubGlmZXNwYW4gPD0gMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBkZWx0YSA9IGRlbHRhICogMC4wMDNcclxuXHJcbiAgICB2YXIgaSA9IDA7XHJcbiAgICB0aGlzLnRpbWUgKz0gZGVsdGEgKiB0aGlzLm9zY2lsbGF0aW9uU3BlZWQ7XHJcbiAgICB0aGlzLnBvc2l0aW9uLnkgKz0gdGhpcy55U3BlZWQgKiBkZWx0YTtcclxuICAgIHRoaXMucG9zaXRpb24ueCArPSBjb3ModGhpcy50aW1lKSAqIHRoaXMub3NjaWxsYXRpb25EaXN0YW5jZSAqIGRlbHRhO1xyXG4gICAgdGhpcy5wYXJ0aWNsZXNbMF0ucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xyXG4gICAgZFggPSB0aGlzLnByZXZQb3NpdGlvbi54IC0gdGhpcy5wb3NpdGlvbi54O1xyXG4gICAgZFkgPSB0aGlzLnByZXZQb3NpdGlvbi55IC0gdGhpcy5wb3NpdGlvbi55O1xyXG4gICAgZHQgPSBzcXJ0KGRYICogZFggKyBkWSAqIGRZKTtcclxuICAgIFxyXG4gICAgdGhpcy5wcmV2UG9zaXRpb24ueCA9IHRoaXMucG9zaXRpb24ueDtcclxuICAgIHRoaXMucHJldlBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uLnk7XHJcblxyXG4gICAgZm9yIChpID0gMTsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBkaXJQID0gVmVjdG9yMi5TdWIodGhpcy5wYXJ0aWNsZXNbaSAtIDFdLnBvc2l0aW9uLCB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbik7XHJcbiAgICAgICAgZGlyUC5Ob3JtYWxpemUoKTtcclxuICAgICAgICBkaXJQLk11bCgoZHQgLyBkZWx0YSkgKiB0aGlzLnZlbG9jaXR5SW5oZXJpdCk7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXNbaV0uQWRkRm9yY2UoZGlyUCk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSAxOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzW2ldLkludGVncmF0ZShkZWx0YSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGkgPSAxOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHJwMiA9IG5ldyBWZWN0b3IyKHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLngsIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnkpO1xyXG4gICAgICAgIHJwMi5TdWIodGhpcy5wYXJ0aWNsZXNbaSAtIDFdLnBvc2l0aW9uKTtcclxuICAgICAgICBycDIuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgcnAyLk11bCh0aGlzLnBhcnRpY2xlRGlzdCk7XHJcbiAgICAgICAgcnAyLkFkZCh0aGlzLnBhcnRpY2xlc1tpIC0gMV0ucG9zaXRpb24pO1xyXG4gICAgICAgIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uID0gcnAyO1xyXG4gICAgfVxyXG59XHJcblxyXG52YXIgcDAsIHAxLCBfZywgX3JlcztcclxuXHJcblRpbnkuUmliYm9uUGFydGljbGUucHJvdG90eXBlLl9yZW5kZXJDYW52YXMgPSBmdW5jdGlvbiggcmVuZGVyU2Vzc2lvbiApXHJcbntcclxuICAgIGlmICh0aGlzLnZpc2libGUgPT09IGZhbHNlIHx8IHRoaXMuYWxwaGEgPT09IDApIHJldHVybjtcclxuXHJcbiAgICBfZyA9IHJlbmRlclNlc3Npb24uY29udGV4dFxyXG4gICAgX3JlcyA9IHJlbmRlclNlc3Npb24ucmVzb2x1dGlvblxyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgICAgICBwMCA9IHt4OiB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi54ICsgdGhpcy54T2ZmLCB5OiB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi55ICsgdGhpcy55T2ZmfTtcclxuICAgICAgICBwMSA9IHt4OiB0aGlzLnBhcnRpY2xlc1tpICsgMV0ucG9zaXRpb24ueCArIHRoaXMueE9mZiwgeTogdGhpcy5wYXJ0aWNsZXNbaSArIDFdLnBvc2l0aW9uLnkgKyB0aGlzLnlPZmZ9O1xyXG5cclxuICAgICAgICBpZiAoU2lkZSh0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi54LCB0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi55LCB0aGlzLnBhcnRpY2xlc1tpICsgMV0ucG9zaXRpb24ueCwgdGhpcy5wYXJ0aWNsZXNbaSArIDFdLnBvc2l0aW9uLnksIHAxLngsIHAxLnkpIDwgMCkge1xyXG4gICAgICAgICAgICBfZy5maWxsU3R5bGUgPSB0aGlzLmZyb250Q29sb3I7XHJcbiAgICAgICAgICAgIF9nLnN0cm9rZVN0eWxlID0gdGhpcy5mcm9udENvbG9yO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9nLmZpbGxTdHlsZSA9IHRoaXMuYmFja0NvbG9yO1xyXG4gICAgICAgICAgICBfZy5zdHJva2VTdHlsZSA9IHRoaXMuYmFja0NvbG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgIF9nLmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBfZy5tb3ZlVG8odGhpcy5wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueCAqIF9yZXMsIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnkgKiBfcmVzKTtcclxuICAgICAgICAgICAgX2cubGluZVRvKHRoaXMucGFydGljbGVzW2kgKyAxXS5wb3NpdGlvbi54ICogX3JlcywgdGhpcy5wYXJ0aWNsZXNbaSArIDFdLnBvc2l0aW9uLnkgKiBfcmVzKTtcclxuICAgICAgICAgICAgX2cubGluZVRvKCgodGhpcy5wYXJ0aWNsZXNbaSArIDFdLnBvc2l0aW9uLnggKyBwMS54KSAqIDAuNSkgKiBfcmVzLCAoKHRoaXMucGFydGljbGVzW2kgKyAxXS5wb3NpdGlvbi55ICsgcDEueSkgKiAwLjUpICogX3Jlcyk7XHJcbiAgICAgICAgICAgIF9nLmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICBfZy5zdHJva2UoKTtcclxuICAgICAgICAgICAgX2cuZmlsbCgpO1xyXG4gICAgICAgICAgICBfZy5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgX2cubW92ZVRvKHAxLnggKiBfcmVzLCBwMS55ICogX3Jlcyk7XHJcbiAgICAgICAgICAgIF9nLmxpbmVUbyhwMC54ICogX3JlcywgcDAueSAqIF9yZXMpO1xyXG4gICAgICAgICAgICBfZy5saW5lVG8oKCh0aGlzLnBhcnRpY2xlc1tpICsgMV0ucG9zaXRpb24ueCArIHAxLngpICogMC41KSAqIF9yZXMsICgodGhpcy5wYXJ0aWNsZXNbaSArIDFdLnBvc2l0aW9uLnkgKyBwMS55KSAqIDAuNSkgKiBfcmVzKTtcclxuICAgICAgICAgICAgX2cuY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgICAgIF9nLnN0cm9rZSgpO1xyXG4gICAgICAgICAgICBfZy5maWxsKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpID09IHRoaXMucGFydGljbGVDb3VudCAtIDIpIHtcclxuICAgICAgICAgICAgX2cuYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIF9nLm1vdmVUbyh0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi54ICogX3JlcywgdGhpcy5wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueSAqIF9yZXMpO1xyXG4gICAgICAgICAgICBfZy5saW5lVG8odGhpcy5wYXJ0aWNsZXNbaSArIDFdLnBvc2l0aW9uLnggKiBfcmVzLCB0aGlzLnBhcnRpY2xlc1tpICsgMV0ucG9zaXRpb24ueSAqIF9yZXMpO1xyXG4gICAgICAgICAgICBfZy5saW5lVG8oKCh0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi54ICsgcDAueCkgKiAwLjUpICogX3JlcywgKCh0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi55ICsgcDAueSkgKiAwLjUpICogX3Jlcyk7XHJcbiAgICAgICAgICAgIF9nLmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICBfZy5zdHJva2UoKTtcclxuICAgICAgICAgICAgX2cuZmlsbCgpO1xyXG4gICAgICAgICAgICBfZy5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgX2cubW92ZVRvKHAxLnggKiBfcmVzLCBwMS55ICogX3Jlcyk7XHJcbiAgICAgICAgICAgIF9nLmxpbmVUbyhwMC54ICogX3JlcywgcDAueSAqIF9yZXMpO1xyXG4gICAgICAgICAgICBfZy5saW5lVG8oKCh0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi54ICsgcDAueCkgKiAwLjUpICogX3JlcywgKCh0aGlzLnBhcnRpY2xlc1tpXS5wb3NpdGlvbi55ICsgcDAueSkgKiAwLjUpICogX3Jlcyk7XHJcbiAgICAgICAgICAgIF9nLmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICBfZy5zdHJva2UoKTtcclxuICAgICAgICAgICAgX2cuZmlsbCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIF9nLmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBfZy5tb3ZlVG8odGhpcy5wYXJ0aWNsZXNbaV0ucG9zaXRpb24ueCAqIF9yZXMsIHRoaXMucGFydGljbGVzW2ldLnBvc2l0aW9uLnkgKiBfcmVzKTtcclxuICAgICAgICAgICAgX2cubGluZVRvKHRoaXMucGFydGljbGVzW2kgKyAxXS5wb3NpdGlvbi54ICogX3JlcywgdGhpcy5wYXJ0aWNsZXNbaSArIDFdLnBvc2l0aW9uLnkgKiBfcmVzKTtcclxuICAgICAgICAgICAgX2cubGluZVRvKHAxLnggKiBfcmVzLCBwMS55ICogX3Jlcyk7XHJcbiAgICAgICAgICAgIF9nLmxpbmVUbyhwMC54ICogX3JlcywgcDAueSAqIF9yZXMpO1xyXG4gICAgICAgICAgICBfZy5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgX2cuc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIF9nLmZpbGwoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4iLCJUaW55LlNtb2tlUGFydGljbGUgPSBmdW5jdGlvbiggZW1pdHRlciApXHJcbntcclxuICAgIFRpbnkuUGFydGljbGUuY2FsbCh0aGlzLCBlbWl0dGVyICk7XHJcbn07XHJcblxyXG5UaW55LlNtb2tlUGFydGljbGUucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVGlueS5QYXJ0aWNsZS5wcm90b3R5cGUgKTtcclxuVGlueS5TbW9rZVBhcnRpY2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRpbnkuU21va2VQYXJ0aWNsZTtcclxuXHJcblxyXG5UaW55LlNtb2tlUGFydGljbGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCB0aW1lLCBkZWx0YSApIHtcclxuXHJcbiAgICB0aGlzLnNjYWxlLnNldChNYXRoLm1pbih0aW1lIC8gMTAwMCwgMC43KSk7XHJcbiAgICB0aGlzLmFscGhhID0gTWF0aC5taW4odGltZSAvIDEwMDAsIDEpXHJcblxyXG4gICAgdGhpcy55IC09IHRoaXMueXNwZWVkICogZGVsdGFcclxuICAgIHRoaXMueCArPSB0aGlzLnhzcGVlZCAqIGRlbHRhXHJcbiAgICB0aGlzLnJvdGF0aW9uICs9IHRoaXMucm90YXRpb25zcFxyXG59XHJcblxyXG5UaW55LlNtb2tlUGFydGljbGUucHJvdG90eXBlLm9uRW1pdCA9IGZ1bmN0aW9uKCAgKSB7XHJcbiAgICB0aGlzLnhzcGVlZCA9IFRpbnkucm5kKC00LCA0KSAqIDAuMDVcclxuICAgIHRoaXMueXNwZWVkID0gVGlueS5ybmQoMiwgMTApICogMC4wNVxyXG4gICAgdGhpcy5yb3RhdGlvbnNwID0gTWF0aC5yYW5kb20oKSAqIDAuMDIgLSAwLjAxXHJcbn1cclxuXHJcblRpbnkuU21va2VQYXJ0aWNsZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKCBjb250ZXh0LCByZXNvbHV0aW9uIClcclxue1xyXG5cclxuICAgLy9jb250ZXh0LmZpbGxSZWN0KDAsIDAsIDEwMCwgMTAwKVxyXG5cclxuICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcbiAgICBjb250ZXh0LmFyYygwLCAwLCAxMDAgKiByZXNvbHV0aW9uLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG4gICAgY29udGV4dC5maWxsKCk7XHJcbn07IiwicmVxdWlyZSgnLi9TbW9rZScpO1xyXG5yZXF1aXJlKCcuL0V4cGxvZGUnKTtcclxucmVxdWlyZSgnLi9GaXJld29yaycpO1xyXG5yZXF1aXJlKCcuL0NvbmZldHRpJyk7XHJcbnJlcXVpcmUoJy4vUmliYm9uJyk7IiwicmVxdWlyZSgnLi4vcGx1Z2lucy9wYXJ0aWNsZXMvcGFjaycpOyJdLCJzb3VyY2VSb290IjoiIn0=