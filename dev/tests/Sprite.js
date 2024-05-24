import App from '../basic/App.js';

class SpriteTest {

    static name = 'sprite';

    constructor(app) {
        this.app = app;
    }

    preload() {
        this.app.load.image('sprites/sprite0', require('examples/textures/sprites/sprite0.png'))
    }

    create() {
        var sprite = this.sprite = new Tiny.Sprite('sprites/sprite0');
        sprite.position.set(300, 200);
        sprite.skew.set(0.5, 0)
        sprite.anchor.set(0.5);
        // sprite.opacity = 0.2;
        this.app.scene2d.add(sprite);
    }

    update(time, delta) {
        this.sprite.skew.x += 0.001 * delta
        this.sprite.skew.y += 0.005 * delta
        this.sprite.rotation += 0.0003 * delta;
        this.sprite.position.y = 200 + Math.sin(time * 0.001) * 100;
    }
}

App.registerTest(SpriteTest);