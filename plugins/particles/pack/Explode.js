Tiny.ExplodeParticle = function( emitter )
{
    Tiny.Particle.call(this, emitter );
};

Tiny.ExplodeParticle.prototype = Object.create( Tiny.Particle.prototype );
Tiny.ExplodeParticle.prototype.constructor = Tiny.ExplodeParticle;


Tiny.ExplodeParticle.prototype.update = function( time, delta ) {

    this.scale.set(Math.min(time / 400, 0.7));
    this.alpha = Math.min(time / 300, 1)

    this.x += this.xspeed
    this.y += this.yspeed
}

Tiny.ExplodeParticle.prototype.onEmit = function(  ) {
    var randAgle = Math.random() * Math.PI * 2

    var rand_speed = Math.random() * 22

    this.xspeed = Math.sin(randAgle) * rand_speed
    this.yspeed = Math.cos(randAgle) * rand_speed

    this.x = this.xspeed * 2
    this.y = this.yspeed * 2
}

Tiny.ExplodeParticle.prototype.draw = function( context )
{
    context.beginPath();
    context.arc(0,0, this.scale.y * 120, 0, 2 * Math.PI, false);
    context.fill();
};