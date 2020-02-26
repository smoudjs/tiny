export default class SmokeParticle extends Tiny.Particle {
    constructor( emitter ) {

        super( emitter );

    }

    update ( time, delta ) {
        this.scale.set(Math.min(time / 1000, 0.7));
        this.alpha = Math.min(time / 1000, 1)

        this.y -= this.yspeed * delta
        this.x += this.xspeed * delta
        this.rotation += this.rotationsp
    }

    onEmit () {
        this.xspeed = Tiny.rnd(-4, 4) * 0.05
        this.yspeed = Tiny.rnd(2, 10) * 0.05
        this.rotationsp = Math.random() * 0.02 - 0.01
    }

    draw ( context, resolution ) {

        context.fillRect(0, 0, 100 * resolution, 100 * resolution)

        // context.beginPath();
        // context.arc(0, 0, 100, 0, 2 * Math.PI, false);
        // context.fill();
    }
}