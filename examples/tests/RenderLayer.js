/**
 * import "h5tiny";
 * import "h5tiny/examples/js/App2D";
 * import "h5tiny/plugins/extra"
 *
 * or
 *
 * import "h5tiny/plugins/extra/objects/RenderLayer"
 * import "h5tiny/plugins/extra/objects/Opaque"
 *
 * To ignore unnecessary extra components
 *
 */

class MyGame extends Tiny.App2D {
    constructor(width, height) {
        super(width, height, 'game-container');
    }

    preload() {
        this.load.image("base", resources.baseImage);
        this.load.atlas("atlas", resources.atlas, resources.atlas_data);
    }

    create() {
        const bottomLayer = new Tiny.Object2D();
        bottomLayer.position.set(this.width / 2, this.height / 2);
        const topLayer = new Tiny.RenderLayer();
        topLayer.position.set(this.width / 2, this.height / 2);
        const opaque = new Tiny.Opaque({game: this, alpha: 0.7});

        this.scene.add(bottomLayer);
        this.scene.add(opaque);
        this.scene.add(topLayer);

        /**
         * Running tweens - to transform main bottom group
         * To see child behaviour after layer changes
         */
        this.tweens
            .add(bottomLayer.pivot)
            .to({ x: [-50, 0, 50, 0] }, 6000)
            .repeat(Infinity)
            .start();
        this.tweens
            .add(bottomLayer)
            .to({ rotation: [-0.5, 0, 0.5, 0] }, 5000)
            .repeat(Infinity)
            .start();
        this.tweens.add(bottomLayer.scale).to({ x: 1.2, y: 1.2 }, 3000).yoyo(true).repeat(Infinity).start();

        var _self = this;

        function addSprite(key, frame) {
            var sprite = new Tiny.Sprite(key, frame);
            sprite.x = Tiny.rnd(-_self.width / 2, _self.width / 2);
            sprite.y = Tiny.rnd(-_self.height / 2, _self.height / 2);
            sprite.scale.set(0.5);
            sprite.anchor.set(0.5);
            sprite.addedToTop = false;
            bottomLayer.add(sprite);

            _self.input.add(sprite);

            sprite.input.on( "down", function () {
                if (this.addedToTop) topLayer.remove(this);
                else topLayer.add(this);

                this.addedToTop = !this.addedToTop;
            }, sprite);
        }

        let spritesAmount = 10;
        while (spritesAmount--) {
            if (Math.random() > 0.3) addSprite("base");
            else addSprite("atlas", "BR");
        }

        const tip = new Tiny.Text("Click any object", {
            fill: "#ffffff"
        });
        tip.anchor.set(0.5);
        tip.x = this.width / 2;
        tip.y = 30;
        this.scene.add(tip);
    }
}
