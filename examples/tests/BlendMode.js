/**
 * import "h5tiny";
 */

window["test.BlendMode"] = {
    preload: function () {
        this.load.image("base", baseImage);

        resizeCanvas(640, 600);

        this.addLabel = (_x, _y, text, color) => {
            var text = new Tiny.Text(text, {
                fill: color || "#ffffff",
                font: "300 9pt Courier",
                align: "center"
            });
            text.position.set(_x, _y);
            text.anchor.set(0.5, 3.2);
            this.scene.add(text);
        };

        this.addSprite = (x, y, mode, anchorX, anchorY) => {
            var sprite = new Tiny.Sprite("base");
            sprite.position.set(x, y);
            sprite.anchor.set(anchorX, anchorY);
            sprite.scale.set(0.4);
            sprite.blendMode = mode;
            this.scene.add(sprite);
        };
    },

    create: function () {
        const blendModes = [
            "source-over",
            "screen",
            "lighter",
            "xor",
            "multiply",
            "overlay",
            "darken",
            "lighten",
            "color-dodge",
            "color-burn",
            "hard-light",
            "soft-light",
            "difference",
            "exclusion",
            "luminosity"
        ];

        let x = 0;
        let y = 0;
        const offset = 110;
        const start = this.width / 12;

        const background = new Tiny.Graphics();

        background.beginFill("#232323");
        background.blendMode = "source-over";
        background.drawRect(0, 0, this.width / 2, this.height);
        this.scene.add(background);

        this.input.on("down", function() {
            background.clear();
            background.beginFill(Tiny.hex2style(Math.floor(Math.random()*16777215)));
            background.drawRect(0, 0, game.width / 2, game.height);
        })

        for (let mode of blendModes) {
            const _x = x * (this.width / 6) + start;
            const _y = y * offset + 70;

            this.addLabel(_x, _y, mode, "#ffffff");
            this.addSprite(_x, _y, mode, 0.2, 0.2);
            this.addSprite(_x, _y, mode, 0.7, 0.2);
            this.addSprite(_x, _y, mode, 0.5, 0.7);

            x++;
            if (x > 2) {
                x = 0;
                y++;
            }
        }

        x = 0;
        y = 0;

        for (let mode of blendModes) {
            const _x = this.width / 2 + x * (this.width / 6) + start;
            const _y = y * offset + 70;

            this.addLabel(_x, _y, mode, "#232323");
            this.addSprite(_x, _y, mode, 0.2, 0.2);
            this.addSprite(_x, _y, mode, 0.7, 0.2);
            this.addSprite(_x, _y, mode, 0.5, 0.7);

            x++;
            if (x > 2) {
                x = 0;
                y++;
            }
        }
    }
};
