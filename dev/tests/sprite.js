import App from '../basic/App.js';

class SpriteTest {
    static name = 'sprite';

    constructor(app) {
        this.app = app;
    }

    preload() {
        this.app.load.image('sprites/sprite0', require('examples/textures/sprites/sprite0.png'));

        this.app.load.spritesheet(
            'basics/gif',
            require('examples/textures/basics/gif.jpg'),
            require('examples/textures/basics/gif_data.json')
        );

        this.app.load.spritesheet(
            'sprites/explosion',
            require('examples/textures/sprites/explosion.png'),
            64,
            64
        );
    }

    create() {
        var sprite = (this.sprite = new Tiny.Sprite('sprites/sprite0'));
        sprite.position.set(300, 200);
        sprite.skew.set(0.5, 0);
        sprite.anchor.set(0.5);
        // sprite.opacity = 0.2;
        this.app.scene2d.add(sprite);

        var spriteSheet = new Tiny.Sprite('sprites/explosion.0');
        spriteSheet.position.set(100, 200);
        spriteSheet.anchor.set(0.5);
        spriteSheet.scale.set(2);
        this.app.scene2d.add(spriteSheet);

        let frame = 0;
        this.timer = this.app.timer.loop(30, () => {
            frame++;
            if (frame > spriteSheet.texture.lastFrame) {
                frame = 0;
            }
            spriteSheet.setTexture('sprites/explosion', frame);
        });

        var gif = new Tiny.Sprite('basics/gif.0');
        gif.position.set(100, 70);
        gif.anchor.set(0.5);
        gif.scale.set(2);
        this.app.scene2d.add(gif);

        let frameGif = 0;
        this.timer = this.app.timer.loop(30, () => {
            frameGif++;
            if (frameGif > gif.texture.lastFrame) {
                frameGif = 0;
            }
            gif.setTexture('basics/gif', frameGif);
        });
    }

    update(time, delta) {
        this.sprite.skew.x += 0.001 * delta;
        this.sprite.skew.y += 0.005 * delta;
        this.sprite.rotation += 0.0003 * delta;
        this.sprite.position.y = 200 + Math.sin(time * 0.001) * 100;
    }

    destroy() {
        this.app.timer.remove(this.timer);
    }
}

App.registerTest(SpriteTest);
