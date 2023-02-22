/**
 * import "h5tiny";
 */

window["test.Tweens"] = {
    preload: function () {
        this.load.image("base", baseImage);
    },

    create: function () {
        var sprite1 = new Tiny.Sprite("base");
        var sprite2 = new Tiny.Sprite("base");
        var sprite3 = new Tiny.Sprite("base");
        var sprite4 = new Tiny.Sprite("base");

        sprite1.scale.set(0.5);
        sprite2.scale.set(0.5);
        sprite3.scale.set(0.5);
        sprite4.scale.set(0.5);
        sprite1.position.set(50, 40);
        sprite2.position.set(50, 40 + 70);
        sprite3.position.set(50, 40 + 70 + 70);
        sprite4.position.set(50, 40 + 70 + 70 + 70);

        this.scene.add(sprite1);
        this.scene.add(sprite2);
        this.scene.add(sprite3);
        this.scene.add(sprite4);

        this.tweens.add(sprite1).to({ x: 200 }, 1400).start();
        this.tweens.add(sprite2).to({ x: 200 }, 1000).delay(1400).repeatDelay(100).repeat(5).start();
        this.tweens
            .add(sprite3)
            .to({ x: 200 }, 500)
            .yoyo(true)
            .easing(Tiny.Easing.Sinusoidal.InOut)
            .repeat(Infinity)
            .start();
        var tween = this.tweens
            .add(sprite4)
            .to({ x: 200 }, 500)
            .yoyo(true)
            .easing(Tiny.Easing.Sinusoidal.InOut)
            .repeat(Infinity)
            .start();

        this.timer.loop(2000, function () {
            if (tween.isPaused()) tween.resume();
            else tween.pause();
        });

        /**
         * Easing tests
         */
        let y = 15;

        for (let easeName in Tiny.Easing) {
            for (let fun in Tiny.Easing[easeName]) {
                let name = easeName + "." + fun;
                let ease = Tiny.Easing[easeName][fun];

                let sprite = new Tiny.Sprite("base");
                sprite.scale.set(0.1);
                sprite.x = 400;
                sprite.y = y;
                y += 12;
                this.scene.add(sprite);

                var nameText = new Tiny.Text(name, { font: "300 7pt Courier" });
                nameText.x = sprite.x - 10;
                nameText.y = sprite.y;
                nameText.anchor.x = 1;

                this.scene.add(nameText);

                this.tweens
                    .add(sprite)
                    .to({ x: 570 }, 2000)
                    .yoyo(true)
                    .repeatDelay(500)
                    .repeat(Infinity)
                    .easing(ease)
                    .start();
            }
        }
    }
};
