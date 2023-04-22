/**
 * import "h5tiny";
 * import "h5tiny/examples/js/App2D";
 * import "h5tiny/plugins/particles";
 *
 * import "h5tiny/examples/js/particles/Confetti";
 * to use ConfettiParticle pattern
 *
 * import "h5tiny/examples/js/particles/Ribbon";
 * to use RibbonParticle pattern
 *
 */

class MyGame extends Tiny.App2D {
    constructor(width, height) {
        super(width, height, 'game-container');
    }

    create() {
        var confetti = (this.confetti = new Tiny.Emitter(150));
        confetti.x = 350;
        confetti.width = 800;

        confetti.pattern = Tiny.ConfettiParticle;

        confetti.makeParticles();
        confetti.scale.set(0.7);

        confetti.flow(10000, 300, 5);

        this.particles.add(confetti);
        this.scene.add(confetti);

        var ribbon = (this.ribbon = new Tiny.Emitter(18));
        ribbon.x = 350;
        ribbon.width = 800;

        ribbon.pattern = Tiny.RibbonParticle;
        ribbon.makeParticles();
        ribbon.scale.set(0.7);

        ribbon.start(false, 5000, 300);

        this.particles.add(ribbon);
        this.scene.add(ribbon);
    }
}
