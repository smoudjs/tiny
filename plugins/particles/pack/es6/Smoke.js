export default class SmokeParticle extends Tiny.Particle {
    constructor( emitter ) {

        super( emitter );

    }

    update ( time, delta ) {
        this.scale.set(Math.min(this.lifespan / 1000, 0.7));
        this.alpha = Math.min(this.lifespan / 1000, 1)

        this.y -= this.yspeed
        this.x += this.xspeed
        this.rotation += this.rotationsp
    }

    onEmit () {
        this.y = 300
        this.xspeed = Tiny.rnd(-4, 4)
        this.yspeed = Tiny.rnd(2, 10)
        this.rotationsp = Math.random() * 0.02 - 0.01
    }

    draw ( renderSession ) {

        renderSession.context.fillRect(0, 0, this.scale.x * 150, this.scale.y * 150)

        // renderSession.context.beginPath();
        // renderSession.context.arc(0,0, this.scale.y * 100, 0, 2 * Math.PI, false);
        // renderSession.context.fill();
    }
}