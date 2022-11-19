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