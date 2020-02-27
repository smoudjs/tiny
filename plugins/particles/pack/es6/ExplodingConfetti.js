const HALF_PI = Math.PI * 0.5;
var timeStep = (1 / 60);
var _g, _res, f, p, dx, dy;

var Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Point.prototype.set = function(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}


var Ease = {
    inCubic: function (t, b, c, d) {
        t /= d;
        return c * t * t * t + b;
    },
    outCubic: function (t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    },
    inOutCubic: function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    },
    inBack: function (t, b, c, d, s) {
        s = s || 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }
};

function cubeBezier(p0, c0, c1, p1, t) {
    var p = new Point();
    var nt = (1 - t);

    p.x = nt * nt * nt * p0.x + 3 * nt * nt * t * c0.x + 3 * nt * t * t * c1.x + t * t * t * p1.x;
    p.y = nt * nt * nt * p0.y + 3 * nt * nt * t * c0.y + 3 * nt * t * t * c1.y + t * t * t * p1.y;

    return p;
}

export default class ExplodingConfettiParticle extends Tiny.Particle {
    constructor(emitter) {
        super(emitter);

        this.duration = 3 + Math.random() * 2;
        this.color = '#' + Math.floor((Math.random() * 0xffffff)).toString(16);

        this.p_w = 18;
        this.p_h = 16;

        this.p0 = new Point(0, 0) // Start point

        this.p1 = new Point()
        this.p2 = new Point()
        this.p3 = new Point()
    }

    onEmit() {
        this.position.set(0)

        this.time = 0

        this.p1.set((this.p0.x - this.parent.width) + this.parent.width * 2 * Math.random(), (this.p0.y - this.parent.height / 2) + this.parent.height * Math.random());
        this.p2.set((this.p0.x - this.parent.width) + this.parent.width * 2 * Math.random(), (this.p0.y - this.parent.height / 2) + this.parent.height * Math.random());
        this.p3.set((this.p0.x - this.parent.width) + this.parent.width * 2 * Math.random(), (this.p0.y - this.parent.height / 2) + this.parent.height * 2);
    }

    _update(delta) {
        if (this.visible === false) return false

        this.lifespan -= delta;

        if (this.lifespan <= 0)
        {
            this.visible = false
            return false;
        }
        
        this.time = Math.min(this.duration, this.time + timeStep);

        f = Ease.outCubic(this.time, 0, 1, this.duration);
        p = cubeBezier(this.p0, this.p1, this.p2, this.p3, f);

        dx = p.x - this.x;
        dy = p.y - this.y;

        this.rotation = Math.atan2(dy, dx) + HALF_PI;
        this.scale.y = Math.sin(Math.PI * f * 10);
        this.position.x = p.x
        this.position.y = p.y
    }

    _renderCanvas(renderSession) {
        if (this.visible === false || this.alpha === 0) return;

        _g = renderSession.context;
        _res = renderSession.resolution;

        _g.save();
        _g.translate(this.position.x, this.position.y);
        _g.rotate(this.rotation);
        _g.scale(_res, this.scale.y * _res);

        _g.fillStyle = this.color;
        _g.fillRect(-this.p_w * 0.5, -this.p_h * 0.5, this.p_w * _res, this.p_h * _res);

        _g.restore();

    }
}