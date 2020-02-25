Tiny.SmokeParticle = function( emitter )
{
    Tiny.Particle.call(this, emitter );
};

Tiny.SmokeParticle.prototype = Object.create( Tiny.Particle.prototype );
Tiny.SmokeParticle.prototype.constructor = Tiny.SmokeParticle;


Tiny.SmokeParticle.prototype.update = function( time, delta ) {

    this.scale.set(Math.min(this.lifespan / 1000, 0.7));
    this.alpha = Math.min(this.lifespan / 1000, 1)

    this.y -= this.yspeed
    this.x += this.xspeed
    this.rotation += this.rotationsp
}

Tiny.SmokeParticle.prototype.onEmit = function(  ) {
    this.y = 300
    this.xspeed = Tiny.rnd(-4, 4)
    this.yspeed = Tiny.rnd(2, 10)
    this.rotationsp = Math.random() * 0.02 - 0.01
}

Tiny.SmokeParticle.prototype.draw = function(renderSession)
{

   renderSession.context.fillRect(0, 0, this.scale.x * 150, this.scale.y * 150)

    // renderSession.context.beginPath();
    // renderSession.context.arc(0,0, this.scale.y * 100, 0, 2 * Math.PI, false);
    // renderSession.context.fill();
};