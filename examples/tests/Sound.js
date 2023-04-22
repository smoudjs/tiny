/**
 * import "h5tiny";
 * import "h5tiny/examples/js/App2D";
 * import "h5tiny/plugins/sound";
 */

class MyGame extends Tiny.App2D {
    constructor(width, height) {
        super(width, height, 'game-container');
    }

    preload() {
        this.load.image("base", resources.baseImage);
        this.load.sound("theme", resources.theme);
        this.load.sound("click", resources.sound);
    }

    create() {
        this.sound.loop("theme");

        var sprite = new Tiny.Sprite("base");
        sprite.position.set(this.width / 2, this.height / 2);
        sprite.anchor.set(0.5);
        this.scene.add(sprite);

        this.input.add(sprite);
        sprite.input.on("click", function() {
            this.sound.play("click");
        }, this);
    }
}
