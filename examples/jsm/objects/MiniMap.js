class MiniMap extends Tiny.Sprite {
    constructor(game, resolution) {
        var texture = new Tiny.RenderTexture(game.width, game.height, null, resolution);

        super(texture);
        this.game = game;
        this.scene = game.scene;
        this.texture = texture;
        this.delay = 100;
        this._timer = this.delay;

        this.frames = new Tiny.Graphics();
        this.updateFrames();

        this.anchor.y = 1;
        this.scale.set(0.3);
        this.alpha = 0.7;
        // this.width = 150;
        // this.height = 100;
        this.y = game.height;
        this.x = 0;

        this._update();
    }

    updateFrames() {
        this.frames.clear();
        this.frames.beginFill("#000000", 0.2);
        this.frames.drawRect(0, 0, this.game.width, this.game.height);
        this.frames.endFill();
        this.frames.lineStyle(15, "#000000", 0.7);
        this.frames.drawRect(0, 0, this.game.width, this.game.height);
    }

    resize(width, height) {
        this.texture.resize(width, height);
        this.y = height;

        this.updateFrames();

        this._update();
    }

    _update() {
        this.visible = false;
        this.texture.render(this.scene, null, true);
        this.texture.render(this.frames);
        this.visible = true;
    }

    update(delta) {
        this._timer -= delta;
        if (this._timer < 0) {
            this._timer = this.delay;
            this._update();
        }
    }
}

export { MiniMap }