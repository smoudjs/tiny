/**
 * import "h5tiny";
 * import "h5tiny/examples/js/App2D";
 * import "h5tiny/plugins/anim"
 * import "h5tiny/plugins/create"
 *
 * or
 *
 * import "h5tiny/plugins/create/spritesheet"
 *
 * To ignore unnecessary extra components
 *
 */

class MyGame extends Tiny.App2D {
    constructor(width, height) {
        super(width, height, 'game-container');
    }

    preload() {
        this.load.image('base', resources.baseImage);
        this.load.spritesheet('gifspritesheet', resources.spritesheet, 222, 222);
        this.load.atlas('atlas', resources.atlas, resources.atlas_data);
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
            key: 'spritesheetRunAnimation',
            draw(progress, ctx, frame) {
                body.y = Math.sin(progress * Math.PI * 4) * 30;
                lleg.rotation = Math.sin(progress * Math.PI * 2);
                rleg.rotation = -Math.sin(progress * Math.PI * 2);
                head.x = Math.sin(progress * Math.PI * 2) * 20;
                head.rotation = Math.sin(progress * Math.PI * 4) * 0.3;
                body.rotation = Math.sin(progress * Math.PI * 4) * 0.2;
                return group;
            }
        });

        Tiny.Create.spritesheet({
            width: 400,
            height: 400,
            frames: 20,
            resolution: 0.2,
            key: 'spritesheetIdleAnimation',
            draw(progress, ctx, frame) {
                body.y = Math.sin(progress * Math.PI * 2) * 30;
                head.x = Math.sin(progress * Math.PI * 4) * 10;
                head.rotation = Math.sin(progress * Math.PI * 4) * 0.1;
                return group;
            }
        });

        this.anim.create({
            key: "run",
            data: "spritesheetRunAnimation",
            fps: 50,
            repeat: -1
        });

        this.anim.create({
            key: "idle",
            data: {
                key: "spritesheetIdleAnimation"
            },
            fps: 15,
            repeat: -1
        });

        this.anim.create({
            key: "movie",
            data: "gifspritesheet",
            fps: 15
        });

        this.anim.create({
            key: "cutAnim",
            data: {
                key: "spritesheetRunAnimation",
                from: 10,
                to: 15
            },
            fps: 50,
            repeat: 5,
            yoyo: true,
            repeatDelay: 100
        });

        var movie = new Tiny.Sprite('gifspritesheet', 0);
        movie.position.set(320, 50);
        this.anim.add(movie);
        this.input.add(movie);
        this.scene.add(movie);

        movie.input.on('down', function() {
            movie.play({
                key: "movie",
                onComplete: function() {
                    console.log("To be continued...")
                }
            });
        })

        var sprite1 = new Tiny.Sprite('spritesheetIdleAnimation', 0);
        sprite1.position.set(Tiny.rnd(40, 600), Tiny.rnd(40, 360));
        sprite1.anchor.set(0.5);
        this.anim.add(sprite1);
        this.scene.add(sprite1);

        sprite1.play('idle');

        var runTween = null;
        this.input.on('down', function(e) {
            if (runTween) {
                this.tweens.remove(runTween);
                runTween = null;
            }
            sprite1.play('run');

            if (e.x > sprite1.x) sprite1.scale.x = 1;
            else sprite1.scale.x = -1;

            var a = e.x - sprite1.x;
            var b = e.y - sprite1.y;

            var distance = Math.sqrt( a*a + b*b );

            runTween = this.tweens.add(sprite1).to({x: e.x, y: e.y}, distance * 4).onComplete(function(argument) {
                sprite1.play('idle');
            }).start();
        }, this);

        var sprite2 = new Tiny.Sprite('spritesheetIdleAnimation', 0);
        sprite2.position.set(100, 300);
        sprite2.anchor.set(0.5);
        this.anim.add(sprite2);
        this.input.add(sprite2);
        this.scene.add(sprite2);

        sprite2.play('cutAnim');

        sprite2.input.on('down', function() {
            sprite2.play({
                key: "run",
                repeat: 2,
                fps: 60,
                onComplete: function() {
                    sprite2.play('cutAnim');
                }
            })
        })
    }
}
