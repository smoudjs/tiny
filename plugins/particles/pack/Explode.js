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