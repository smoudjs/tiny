class MiniMap extends Tiny.Sprite {
    constructor(game, resolution) {
        var texture = new Tiny.RenderTexture(game.width, game.height, null, resolution || 1);

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

Tiny.MiniMap = MiniMap;

class RecursiveSprite extends Tiny.Sprite {
    constructor(game, resolution) {
        var texture = new Tiny.RenderTexture(game.width, game.height, null, resolution || 1);

        super(texture);
        this.game = game;
        this.scene = game.scene;
        this.texture = texture;
        this.delay = 1;
        this._timer = this.delay;
        this.clearAlpha = 0.1;

        this.frames = new Tiny.Graphics();
        this.updateFrames();

        this.scale.set(0.98);
        this.alpha = 0.9;

        this.setCenter(0, 0);

        this._update();
    }

    setCenter(x, y) {
        this.anchor.set(x, y);
        this.x = this.game.width * x;
        this.y = this.game.height * y;
    }

    updateFrames() {
        this.frames.clear();
        this.frames.beginFill(this.game.renderer.clearColor, this.clearAlpha);
        this.frames.drawRect(0, 0, this.game.width, this.game.height);
        this.frames.endFill();
        // this.frames.lineStyle(15, "#000000", 0.2);
        // this.frames.drawRect(0, 0, this.game.width, this.game.height);
    }

    resize(width, height) {
        this.texture.resize(width, height);
        this.x = width * this.anchor.x;
        this.y = height * this.anchor.y;

        this.updateFrames();

        this._update();
    }

    _update() {
        // this.visible = false;
        this.texture.render(this.scene);
        this.texture.render(this.frames);
        // this.visible = true;
    }

    update(delta) {
        this._timer -= delta;
        if (this._timer < 0) {
            this._timer = this.delay;
            this._update();
        }
    }
}

Tiny.RecursiveSprite = RecursiveSprite;
