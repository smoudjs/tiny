class MyGame extends Tiny.App2D {
    constructor(width, height) {
        super(width, height, 'game');
    }

    preload() {
        this.load.atlas(
            'atlas',
            require('examples/textures/basics/grid_atlas.png'),
            require('examples/textures/basics/grid_atlas_data.json')
        );
    }

    create() {
        this.sprite = new Tiny.TilingSprite('atlas', 'IH', this.width - 10, this.height - 10);
        this.sprite.x = this.sprite.y = 5;
        this.sprite.tint.set(0xff3434);
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
        this.sprite.width = width - 100;
        this.sprite.height = height - 100;
    }
}

export default MyGame;
