import '../../examples/res/resources';

Tiny.rnd = function (min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
};


Tiny.CanvasTinter.cacheTint = true;

class MyGame extends Tiny.App2D {
    constructor(width, height) {
        super(width, height, 'game');
    }

    preload() {
        this.load.image('base', resources.baseImage);
        this.load.atlas('atlas', resources.atlas, resources.atlas_data);

        this.world = new Tiny.Object2D();
        this.scene.add(this.world);
    }

    create() {
        const head = new Tiny.Sprite('base');
        head.y = -40;
        head.scale.set(1.3, 0.5);
        head.anchor.set(0, 1);

        const body = new Tiny.Sprite('base');
        body.anchor.set(0.5);

        const lleg = new Tiny.Sprite('atlas', 'IH');
        lleg.scale.x = 0.3;

        const rleg = new Tiny.Sprite('atlas', 'IH');
        rleg.scale.x = 0.3;

        lleg.anchor.set(0.5, 0);
        rleg.anchor.set(0.5, 0);

        var group = new Tiny.Object2D();
        group.add(lleg);
        group.add(body);
        group.add(rleg);
        body.add(head);

        Tiny.Create.spritesheet({
            width: 400,
            height: 400,
            frames: 30,
            resolution: 0.2,
            key: 'spritesheetAnimation',
            draw(progress, ctx, frame) {
                // ctx.resetTransform();
                // ctx.rect(frame.x, frame.y, frame.width, frame.height);
                // ctx.stroke();

                body.y = Math.sin(progress * Math.PI * 4) * 30;
                lleg.rotation = Math.sin(progress * Math.PI * 2);
                rleg.rotation = -Math.sin(progress * Math.PI * 2);
                head.x = Math.sin(progress * Math.PI * 2) * 20;
                head.rotation = Math.sin(progress * Math.PI * 4) * 0.3;
                body.rotation = Math.sin(progress * Math.PI * 4) * 0.2;
                return group;
            }
        });

        this.anim.create({
            key: "run",
            data: "spritesheetAnimation",
            fps: 30,
            repeat: -1
        });

        const debugSprite = new Tiny.Sprite('spritesheetAnimation');
        debugSprite.anchor.set(0.5);
        debugSprite.y = 280;
        debugSprite.x = 400;
        debugSprite.scale.set(0.7);
        debugSprite.alpha = 1;
        this.tweens.add(debugSprite).to({ x: -400 }, 6000).yoyo(true).repeat(Infinity).start();
        this.world.add(debugSprite);

        var text = new Tiny.Text('Click to add more', { font: '20px Arial' });
        text.position.set(10, 20);
        this.scene.add(text);

        text = new Tiny.Text('PERFORMANCE TEST', { font: '20px Arial' });
        text.position.set(10, 60);
        this.scene.add(text);

        text = new Tiny.Text('', { font: '20px Arial' });
        text.position.set(10, 85);
        this.scene.add(text);

        this.sprites = [];

        this.addSprites = function (amount, fps) {
            for (let i = 0; i < amount; i++) {
                const sprite = new Tiny.Sprite('spritesheetAnimation', 0);
                sprite.game = game;
                // sprite.animate(delta || Tiny.rnd(10, 40));
                sprite.anchor.set(0.5);
                sprite.x = Tiny.rnd(-520, -500);
                sprite.y = Tiny.rnd(-280, 280);
                // game.tweens.add(sprite).to({x: 520}, 3000).repeat(Infinity).start();
                // sprite.tint = ["#ff0000", "#ffff00", "#00ff00", "#0000ff", "#00ffff"][Math.floor(Math.random() * 5)];
                // if (Math.random() > 0.8) {
                //     sprite.alpha = 0.1 + Math.random() * 0.4;
                //     sprite.scale.set(1 / sprite.alpha);
                // }
                this.anim.add(sprite);
                sprite.play({
                    key: "run",
                    fps: fps || Tiny.rnd(25, 100)
                });
                game.world.add(sprite);
                sprite.scale.set(0.3)
                this.sprites.push(sprite);
            }

            debugSprite.alpha = Math.min(1, 1 / (game.world.children.length / 100));
            text.setText(game.world.children.length + ' sprites');
        };

        const sprite = new Tiny.Sprite('spritesheetAnimation', 0);
        sprite.game = game;
        this.anim.add(sprite);
        sprite.play("run");
        sprite.anchor.set(0.5);
        sprite.scale.set(5);
        sprite.alpha = 0.2;
        game.world.add(sprite);

        this.addSprites(1, 60);
        this.resize(this.width, this.height)
    }

    update(time, delta) {
        if (this.input.isDown) {
            this.addSprites(100);
        }

        let speed = delta * 0.5;

        for (let sprite of this.sprites) {
            sprite.x += speed;
            if (sprite.x > 520) sprite.x = -520;
        }
    }

    resize(width, height) {
        super.resize(width, height);
        var mw = 0;
        var mh = 0;

        if (width > height) {
            mw = (width * 640) / height;
            mh = (height * 960) / width;
        } else {
            mw = (width * 960) / height;
            mh = (height * 640) / width;
        }

        this.world.x = width / 2;
        this.world.y = height / 2;

        this.world.scale.set(1 / Math.max(mw / width, mh / height));
    }
}


export default MyGame;