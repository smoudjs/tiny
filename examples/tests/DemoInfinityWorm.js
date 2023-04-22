/**
 * import "h5tiny";
 * import "h5tiny/examples/js/App2D";
 *
 * import "h5tiny/plugins/sound";
 * import "h5tiny/plugins/particles";
 *
 * import "h5tiny/examples/js/objects/MiniMap";
 * to use RecursiveSprite
 */

class World extends Tiny.Graphics {
    constructor(game) {
        super();
        this.game = game;
        this.BOTTOM = game.height - 15;
        this.LEFT = 0;
        this.RIGHT = game.width - 15;
        this.TOP = 0;

        this.walls = [];

        const wallColors = ["#344534", "#55514b", "#1e1e1e", "#666666", "#562d2d", "#2d2f56"];

        game.timer.loop(1000, function () {
            if (Math.random() > 0.1) {
                let wall = {
                    color: wallColors[Tiny.rnd(0, wallColors.length - 1)],
                    height: Tiny.rnd(game.height * 0.4, game.height * 0.8),
                    length: Tiny.rnd(500, 2000),
                    left: Math.random() > 0.5 ? true : false
                };

                this.walls.push(wall);
                this.draw();
            }
        }, this);

        this.draw();

        let graphics = (this.night = new Tiny.Graphics());
        graphics.beginFill("#121234", 0.2);
        graphics.blendMode = "difference";
        graphics.drawRect(0, 0, game.width, game.height);
        graphics.alpha = 0;

        game.timer.loop(30000, function () {
            if (Math.random() > 0.8) {
                game.tweens
                    .add(graphics)
                    .to({ alpha: 1 }, 2000)
                    .yoyo(true)
                    .repeatDelay(7000)
                    .repeat(1)
                    .start();
            }
        }, this);
    }

    draw() {
        this.clear();

        this.beginFill("#e4f1ff");
        this.drawRect(0, 0, this.game.width, 15);
        this.drawRect(0, 0, 15, this.game.height);
        this.drawRect(this.RIGHT, 0, 15, this.game.height);

        // this.beginFill("#898989");
        // this.drawRect(0, this.game.height * 0.1, 15, this.game.height);
        // this.drawRect(this.RIGHT, this.game.height * 0.1, 15, this.game.height);

        this.beginFill("#3f7c3b");
        this.drawRect(0, this.BOTTOM, this.game.width, 15);

        for (let wall of this.walls) {
            this.beginFill(wall.color);
            this.drawRect(wall.left ? this.LEFT : this.RIGHT, this.BOTTOM - wall.height, 15, wall.height);
        }
    }

    update(delta) {
        let shouldUpdate = false;
        for (let i = 0; i < this.walls.length; i++) {
            let wall = this.walls[i];

            wall.length -= delta;

            if (wall.length <= 0) {
                this.walls.splice(i, 1);
                i--;
                shouldUpdate = true;
            }
        }

        if (shouldUpdate) this.draw();
    }

    resize() {
        this.BOTTOM = this.game.height - 15;
        this.RIGHT = this.game.width - 15;

        this.draw();
    }

    setFogIntensity(value) {
        value = Math.min(1, Math.max(0, value));
        this.game.recusrive.clearAlpha = value;
        this.game.recusrive.updateFrames();
    }
}

class Worm extends Tiny.Object2D {
    constructor(game) {
        super();
        this.game = game;

        let graphics = new Tiny.Graphics();
        graphics.beginFill("#ec939e");
        graphics.drawCircle(0, 0, 182);

        let body = (this.body = new Tiny.Sprite(graphics.generateTexture()));
        body.anchor.set(0.5);

        graphics.clear();
        graphics.beginFill("#ffffff");
        graphics.drawCircle(0, 0, 60);

        let eyeR = (this.eyeR = new Tiny.Sprite(graphics.generateTexture()));
        eyeR.y = -32;
        eyeR.x = 32;
        eyeR.anchor.set(0.5);

        let eyeL = (this.eyeL = new Tiny.Sprite(graphics.generateTexture()));
        eyeL.y = -32;
        eyeL.x = -32;
        eyeL.anchor.set(0.5);

        graphics.clear();
        graphics.beginFill("#453434");
        graphics.drawCircle(0, 0, 30);

        let pupilR = (this.pupilR = new Tiny.Sprite(graphics.generateTexture()));
        pupilR.anchor.set(0.5);
        eyeR.add(pupilR);

        let pupilL = (this.pupilL = new Tiny.Sprite(graphics.generateTexture()));
        pupilL.anchor.set(0.5);
        eyeL.add(pupilL);

        graphics.clear();
        graphics.beginFill("#dc838e");
        graphics.drawCircle(0, 0, 56);

        let mouth = (this.mouth = new Tiny.Sprite(graphics.generateTexture()));
        mouth.anchor.set(0.5);
        mouth.y = 45;

        game.tweens
            .add(mouth.scale)
            .to({ x: 1.5, y: 1.1 }, 1000)
            .yoyo(true)
            .repeatDelay(4000)
            .repeat(Infinity)
            .start();

        game.timer.loop(4000, function () {
            pupilR.x = pupilL.x = Tiny.rnd(-12, 12);
            pupilL.y = pupilR.y = Tiny.rnd(-12, 12);
        },  this);

        body.add(eyeL);
        body.add(eyeR);
        body.add(mouth);

        this.add(body);

        this.ampl = 60;

        this.game.timer.loop(6000, function () {
            if (Math.random() > 0.1) {
                this.game.tweens
                    .add(this)
                    .to({ ampl: Tiny.rnd(0, 60) }, 2000)
                    .start();
            }
        }, this);
    }

    update(time, delta) {
        this.body.y = -(Math.sin(time * 0.01) + 1) * this.ampl + this.ampl;
        this.body.x = Math.cos(time * 0.005) * (60 - this.ampl + 10);
    }
}

class MyGame extends Tiny.App2D {
    
    constructor(width, height) {
        super(width, height, "game-container");
    }

    preload () {
        this.load.sound("theme2", resources.theme2);
        this.load.sound("click", resources.sound);
    }

    create () {
        this.sound.loop("theme2", 0.2);

        let world = (this.world = new World(this));
        let worm = (this.worm = new Worm(this));
        worm.x = this.width / 2;
        worm.y = this.height / 2;

        this.scene.add(this.world);
        this.scene.add(worm);

         var bombEmitter = (this.bombEmitter = new Tiny.Emitter(300));
        bombEmitter.pattern = Tiny.ExplodeParticle;
        bombEmitter.makeParticles();

        // this.timer.loop(6000, function() {
        //     if (Math.random() > 0.5) {
        //         bombEmitter.fillStyle = "#439d42";
        //         if (Math.random() > 0.5) bombEmitter.x = this.width - 70;
        //         else bombEmitter.x = 70;
        //         bombEmitter.y = this.height - 70;
        //         bombEmitter.explode(300, 80);
        //     }
        // }, this)

        this.particles.add(bombEmitter);
        this.scene.add(bombEmitter);

        let recusrive = (this.recusrive = new Tiny.RecursiveSprite(this));
        this.recusrive.setCenter(0.2, 0.2);
        this.recusrive.alpha = 1;
        this.recusrive.updateFrames();
        this.scene.add(this.recusrive);
        this.scene.add(this.world.night);

        let frames = (this.frames = new Tiny.Graphics());
        frames.lineStyle(30, "#ffffff", 1);
        frames.drawRect(0, 0, this.width, this.height);
        this.scene.add(frames);

        this.world.setFogIntensity(0);
        this.timer.loop(20000, function () {
            if (Math.random() > 0.8) {
                let fog = { intensity: 0 };
                this.tweens
                    .add(fog)
                    .to({ intensity: Math.random() * 0.06 + 0.04 }, 5000)
                    .yoyo(true)
                    .repeatDelay(10000)
                    .repeat(1)
                    .onUpdate(function () {
                        world.setFogIntensity(fog.intensity);
                    })
                    .start();
            }
        }, this);

        let prevPos = {x: 0, y: 0}

        this.input.on("down", function (e) {
            prevPos.x = e.x;
            prevPos.y = e.y;
        }, this);

        this.input.on("move", function (e) {
            if (game.input.isDown)
            this.recusrive.setCenter(e.x / this.width, e.y / this.height);
        }, this);

        this.timer.loop(15000, function () {
            let center = { x: this.recusrive.anchor.x, y: this.recusrive.anchor.y };

            this.tweens
                .add(center)
                .to({ x: Math.random(), y: Math.random() }, 12000)
                .easing(Tiny.Easing.Sinusoidal.InOut)
                .onUpdate(function () {
                    recusrive.setCenter(center.x, center.y);
                })
                .start();
        }, this);

        this.input.on("up", function (e) {
            if (Tiny.Math.distance(e.x, e.y, prevPos.x, prevPos.y) < 20) {
                bombEmitter.fillStyle = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
                bombEmitter.x = e.x;
                bombEmitter.y = e.y;
                console.log("Explode");
                bombEmitter.explode(300, 80);
                this.sound.play("click");
            }
        }, this);
    }

    update (time, delta) {
        this.world.update(delta);
        this.worm.update(time, delta);
        this.recusrive.update(delta);
    }

    resize (width, height) {
        super.resize(width, height);
        this.world.resize();
        this.recusrive.resize(width, height);
        this.frames.clear();
        this.frames.lineStyle(30, "#ffffff", 1);
        this.frames.drawRect(0, 0, this.width, this.height);
    }
}
