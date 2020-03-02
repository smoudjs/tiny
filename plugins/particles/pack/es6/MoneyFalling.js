var random = Math.random,
cos = Math.cos,
sin = Math.sin;


export default class MoneyFallingParticle extends Tiny.Particle {
    constructor( emitter ) {

        super( emitter );

    }

    onEmit () {

        this.tilt = Math.floor(random() * 10) - 10;
        this.tiltAngleIncremental = (random() * 0.25 + 0.15) - 0.20;
        this.tiltAngle = 0;
        this.scale.set((random() * 0.4 + 0.6) / 2) 
        this.angle = random() * 6.28;

        this.speed = random() * 1 + 0.5
    }

    
    update ( time, delta ) {
      
        delta = delta * 0.001
        this.angle += delta;
        this.tiltAngle += this.tiltAngleIncremental;
        this.y += (cos(this.angle + 3) + 3 + 2 / 2) / 2 * delta * 100 *  this.speed;
        this.x += sin(this.angle) * delta * 100 *  this.speed;
        this.rotation = (sin(this.tiltAngle )) * 0.5 *  this.speed;
    }

    _renderCanvas (renderSession) {
        if (this.visible === false || this.alpha === 0) return;
        
        renderSession.context.setTransform(
            this.worldTransform.a * cos(this.tiltAngle) ,
            this.worldTransform.b  ,
            this.worldTransform.c ,
            this.worldTransform.d,
            this.worldTransform.tx * renderSession.resolution,
            this.worldTransform.ty * renderSession.resolution);

            this.drawTexture(renderSession)
 

    }
}