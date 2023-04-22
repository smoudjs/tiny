/**
 * import "h5tiny";
 * import "h5tiny/examples/js/App2D";
 * import "h5tiny/plugins/particles";
 *
 * import "h5tiny/examples/js/particles/Smoke";
 * to use SmokeParticle pattern
 *
 * import "h5tiny/examples/js/particles/Explode";
 * to use ExplodeParticle pattern
 *
 * import "h5tiny/examples/js/objects/MiniMap";
 * to use RecursiveSprite
 */

class MyGame extends Tiny.App2D {
    constructor(width, height) {
        super(width, height, 'game-container');
    }

    preload() {
        this.load.image('base', resources.baseImage);
    }

    create() {
        var emitter = (this.emitter = new Tiny.Emitter(300));
        emitter.x = 200;
        emitter.y = 300;
        emitter.width = 40;

        emitter.pattern = Tiny.SmokeParticle;
        emitter.fillStyle = '#666666';

        emitter.makeParticles('base'); //Tiny.TextureCache["atlas_BR"])
        emitter.scale.set(0.7);

        emitter.start(false, 500, 0);

        // emitter.flow(1000, 10, 3);

        this.timer.loop(5000, function () {
            if (Math.random() > 0.5) {
                emitter.width = 300;
                emitter.flow(500, 10, 5);
            } else {
                emitter.width = 40;
                emitter.flow(1000, 100, 8);
            }
        });

        this.particles.add(emitter);
        this.scene.add(emitter);

        var bombEmitter = (this.bombEmitter = new Tiny.Emitter(300));
        bombEmitter.pattern = Tiny.ExplodeParticle;
        bombEmitter.makeParticles();

        var clickMe = new Tiny.Text('Click me !');
        clickMe.anchor.set(0.5);
        clickMe.position.set(this.width / 2, this.height / 2);
        this.scene.add(clickMe);

        this.input.once('down', function (e) {
            clickMe.destroy();
        });

        this.input.on('down', function (e) {
            bombEmitter.fillStyle = '#' + Math.floor(Math.random() * 0xffffff).toString(16);
            bombEmitter.x = e.x;
            bombEmitter.y = e.y;
            console.log('Explode');
            bombEmitter.explode(300, 80);
        });

        this.particles.add(bombEmitter);
        this.scene.add(bombEmitter);

        this.recusrive = new Tiny.RecursiveSprite(this);
        this.recusrive.delay = 1;
        this.recusrive.setCenter(0.5, 0.7);
        this.scene.add(this.recusrive);
    }

    update(time, delta) {
        this.recusrive.update(delta);
    }

    resize(width, height) {
        super.resize(width, height);
        this.recusrive.resize(width, height);
    }
}
