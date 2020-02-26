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

