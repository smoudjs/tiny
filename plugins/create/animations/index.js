
Tiny.Create = {};

 const legStartY = leg_right.y;

        const t1 = new TWEEN.Tween(bodyGroup).to(
            {
                y: [bodyGroup.y + 5, bodyGroup.y]
            },
            1500 / speed
        ).repeat(Infinity).start();

        const t2 = new TWEEN.Tween(head).to(
            {
                y: [head.y + 2.5, head.y]
            },
            1500 / speed
        ).repeat(Infinity).start();

        new TWEEN.Tween(leg_right).to(
            {
                y: legStartY - 5,
                rotation: 0.65
            },
            500 / speed
        ).start().onComplete(() => {
            new TWEEN.Tween(leg_right).to(
                {
                    y: legStartY,
                    rotation: 0
                },
                500 / speed
            ).start().onComplete(() => {

                new TWEEN.Tween(arm_left).to(
                    {
                        rotation: 0.05
                    },
                    1000 / speed
                ).start();

                new TWEEN.Tween(leg_right).to(
                    {
                        y: legStartY - 5,
                        rotation: -0.65
                    },
                    1000 / speed
                ).start();

                new TWEEN.Tween(foot_right).to(
                    {
                        rotation: [0.32, 0]
                    },
                    1000 / speed
                ).start();

                new TWEEN.Tween(leg_left).to(
                    {
                        y: legStartY - 5,
                        rotation: 0.65
                    },
                    1000 / speed
                ).start();

                new TWEEN.Tween(foot_left).to(
                    {
                        rotation: [-0.25, 0]
                    },
                    1000 / speed
                ).start().onComplete(() => {
                    new TWEEN.Tween(leg_left).to(
                        {
                            y: legStartY,
                            rotation: 0
                        },
                        500 / speed
                    ).start();

                    new TWEEN.Tween(arm_left).to(
                        {
                            rotation: 0
                        },
                        500 / speed
                    ).start();

                    new TWEEN.Tween(arm_right).to(
                        {
                            rotation: 0
                        },
                        500 / speed
                    ).start();

                    new TWEEN.Tween(leg_right).to(
                        {
                            y: legStartY,
                            rotation: 0
                        },
                        500 / speed
                    ).start();

                    new TWEEN.Tween(foot_right).to(
                        {
                            rotation: 0
                        },
                        500 / speed
                    ).start().onComplete(() => {
                        this.instantStop();
                        this.playMovingAnimation(speed);
                    });
                });
            });

            const t7 = new TWEEN.Tween(leg_left).to(
                {
                    rotation: -0.65
                },
                500 / speed
            ).start();

            const t5 = new TWEEN.Tween(foot_left).to(
                {
                    rotation: [0.25, 0]
                },
                500 / speed
            ).start();
        });

        const t8 = new TWEEN.Tween(leg_left).to(
            {
                y: legStartY - 5,
                rotation: -0.32
            },
            500 / speed
        ).start();

        const t9 = new TWEEN.Tween(foot_left).to(
            {
                rotation: 0.12
            },
            500 / speed
        ).start();

        const t10 = new TWEEN.Tween(arm_left).to(
            {
                rotation: -0.25
            },
            1000 / speed
        ).start();

3000 x 300

function drawFrame(progress, ctx, frame) {

    tweenObjects.forEach((data) => {
        for (const key in data.to) {
            data.obj[key] = data.start[key] - (data.start[key] - data.to[key]) * easing(p);
        }
    });

    t1.update(1);
    t2.update(1);
    t3.update(1);
    t4.update(1);
    t1.update(1);
    t1.update(1);
    t1.update(1);
    t1.update(1);
    t1.update(1);
    t1.update(1);


    return body;

    // ctx.drawImage()

    // return tweenGroup;

    // ctx.fillRect(0, 0, 100, 100);
    // obj.hand.rotation = lerp(0.5, 2, progress);
    // obj.head.y = Math.sin(progress * 10);

    // return obj;
}

const texture = Tiny.Create.spritesheet({
    width: 300,
    height: 300,
    frames: 100,
    position: 'center'
    draw: drawFrame
})















const sprite = new Tiny.Sprite(texture.key, 0);

sprite.tint = "#ff0000";
sprite.blendMode = "lighter";

const texture = sprite.generateTexture();
texture.addToCache('bees_lighter')

sprite.tint = "#565656";
sprite.blendMode = "source-over";

const texture = sprite.generateTexture();
texture.addToCache('bees_darker')

sprite.tint = "#ffffff";
sprite.blendMode = "source-over";


sprite.animate();










// sprite.game = game;


this.game.animation.spritesheet(sprite, 60, false).start();

this.game.animation.frames([
    {
        duration: 200,
        obj: sprite,
        rotation: 0.4,
        position: { x: 3, 3 },
        scale: { x: 2}
    },

    {
        duration: 400,
        obj: [
            { obj: sprite.hand, rotation: [-2,2] },
            { obj: sprite.lhand, rotation: 2 }
        ]
    },

    {
        duration: 400,
        objs: [
            { obj: sprite.hand, rotation: [-2,2] },
            { obj: sprite.lhand, rotation: 2 }
        ]
    },

    {
        duration: 400,
        objs: [
            { obj: sprite.hand, rotation: [-2,2] },
            { obj: sprite.lhand, rotation: 2 }
        ]
    },

]).rescale(1000).start();

// sprite.anim.start();
// sprite.anim.pause();
// sprite.anim.stop();

// sprite.play('test');


sprite.animate(60);






const app = new Tiny.App();

app.update = function() {
    // body...
}



app.create = function(argument) {
    app.stage = new Tiny.Scene(this);

    app.stage.add(sprite);
}