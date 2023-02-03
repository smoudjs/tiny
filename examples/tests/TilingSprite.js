window["test.TilingSprite"] = {
    preload: function () {
        this.load.atlas("atlas", atlas, atlas_data);
    },

    create: function () {
        this.sprite = new Tiny.TilingSprite("atlas", "MM", this.width - 10, this.height - 10);
        this.sprite.x = this.sprite.y = 5;
        // this.sprite.scale.set(0.6);

        this.scene.add(this.sprite);
    },

    update: function (time, delta) {
        this.sprite.tilePosition.x += 0.5 * delta;
        this.sprite.tilePosition.y += Math.sin(time * 0.01) * 10;

        this.sprite.tileScale.x = this.sprite.tileScale.y = Math.sin(time * 0.0007) * 1;
    },

    resize: function (width, height) {
        this.sprite.width = width - 10;
        this.sprite.height = height - 10;
    }
};
