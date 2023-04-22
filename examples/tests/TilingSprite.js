/**
 * import "h5tiny";
 * import "h5tiny/examples/js/App2D";
 * import "h5tiny/plugins/extra"
 *
 * or
 *
 * import "h5tiny/plugins/extra/objects/TilingSprite"
 *
 * To ignore unnecessary extra components
 *
 */

class MyGame extends Tiny.App2D {
    constructor(width, height) {
        super(width, height, 'game-container');
    }

    preload() {
        this.load.atlas('atlas', resources.atlas, resources.atlas_data);
    }

    create() {
        this.sprite = new Tiny.TilingSprite('atlas', 'MM', this.width - 10, this.height - 10);
        this.sprite.x = this.sprite.y = 5;
        // this.sprite.scale.set(0.6);

        this.scene.add(this.sprite);
    }

    update(time, delta) {
        this.sprite.tilePosition.x += 0.5 * delta;
        this.sprite.tilePosition.y += Math.sin(time * 0.01) * 10;

        this.sprite.tileScale.x = this.sprite.tileScale.y = Math.sin(time * 0.0007) * 1;
    }

    resize(width, height) {
        super.resize(width, height);
        this.sprite.width = width - 10;
        this.sprite.height = height - 10;
    }
}
