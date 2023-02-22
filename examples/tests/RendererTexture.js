/**
 * import "h5tiny";
 * 
 * import "h5tiny/plugins/particles";
 * to use particles
 * 
 * import "h5tiny/examples/js/objects/MiniMap";
 * to use RecursiveSprite and MiniMap
 */

window["test.RendererTexture"] = {
    preload: function () {
        this.load.image("base", baseImage);
        this.load.atlas("atlas", atlas, atlas_data);
    },

    create: function () {
        var emitter = (this.emitter = new Tiny.Emitter(300));
        emitter.x = this.width / 2;
        emitter.y = 300;
        emitter.width = 400;

        emitter.pattern = Tiny.SmokeParticle;
        emitter.fillStyle = "#666666";

        emitter.makeParticles(this.cache.texture["atlas.IH"]);
        emitter.scale.set(0.7);

        emitter.flow(500, 10, 5);

        // emitter.flow(1000, 10, 3);

        this.particles.add(emitter);
        this.scene.add(emitter);

        var bombEmitter = (this.bombEmitter = new Tiny.Emitter(300));
        bombEmitter.pattern = Tiny.ExplodeParticle;
        bombEmitter.makeParticles();

        this.input.on("down", function (e) {
            bombEmitter.fillStyle = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
            bombEmitter.x = e.x;
            bombEmitter.y = e.y;
            console.log("Explode");
            bombEmitter.explode(300, 80);
        });

        this.particles.add(bombEmitter);
        this.scene.add(bombEmitter);

        var text = (this.text = new Tiny.Text("Tiny", {
            font: "bold 40pt Courier",
            fill: "#4e73df",
            wordWrap: true,
            wordWrapWidth: 150,
            align: "center"
        }));

        this.timer.loop(100, function (argument) {
            text.rotation = Math.random() * Math.PI;
            game.text.pivot.x = Tiny.rnd(-100, 100);
            game.text.pivot.y = Tiny.rnd(-100, 100);
        });

        text.anchor.set(0.5);

        text.x = this.width / 2;
        text.y = this.height * 0.3;

        this.scene.add(text);

        this.recusrive = new Tiny.RecursiveSprite(this);
        this.recusrive.setCenter(0.5, 0.7);
        this.recusrive.scale.set(0.5);
        this.recusrive.clearAlpha = 0.01;
        this.recusrive.alpha = 0.8;
        this.recusrive.updateFrames();
        this.scene.add(this.recusrive);

        this.miniMap = new Tiny.MiniMap(this, 0.5);
        this.miniMap.delay = 1;
        this.scene.add(this.miniMap);
    },

    update: function (time, delta) {
        this.recusrive.update(delta);
        this.miniMap.update(delta);
    },

    resize: function (width, height) {
        this.recusrive.resize(width, height);
        this.miniMap.resize(width, height);
    }
};
