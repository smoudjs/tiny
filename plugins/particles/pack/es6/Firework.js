var normTime, speed

export default class FireworkParticle extends Tiny.Particle {
    constructor( emitter ) {

        super( emitter );

    }

    update ( time, delta ) {
        normTime = time / this.maxlifespan

        this.scale.set(Math.tan(normTime * normTime));

        this.alpha = Math.min(Math.tan(normTime), 1)

        speed = (normTime * normTime * normTime) * 10

        this.x += this.xspeed * speed * normTime
        this.y += this.yspeed * speed + (normTime * 10)
    }

    onEmit () {
        var randAgle = Math.random() * Math.PI * 2

        var rand_speed = Math.random() * 3

        this.maxlifespan = this.lifespan

        this.xspeed = Math.sin(randAgle) * rand_speed
        this.yspeed = Math.cos(randAgle) * rand_speed
    }

    draw ( context ) {
        context.beginPath();
        context.arc(0, 0, 20, 0, 2 * Math.PI, false);
        context.fill();
    }
}