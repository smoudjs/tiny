window["test.Sound"] = {
    preload: function () {
        this.load.image("base", baseImage);
        this.load.sound("theme", theme);
        this.load.sound("click", sound);
    },

    create: function () {
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
};
