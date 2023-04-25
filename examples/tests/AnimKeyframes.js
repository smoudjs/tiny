/**
 * import "h5tiny";
 * import "h5tiny/examples/js/App2D";
 * import "h5tiny/plugins/anim"
 */

class MyGame extends Tiny.App2D {
    constructor(width, height) {
        super(width, height, 'game-container');
    }

    preload() {
        this.load.image('base', resources.baseImage);
        this.load.atlas('atlas', resources.atlas, resources.atlas_data);
    }

    create() {
        this.anim.create({
            key: 'idle',
            type: 'keyframes',
            repeat: -1,
            duration: 1400,
            data: {
                times: [1,2,3,4],
                values: [
                    [
                        { name: 'body', position: {y: 30} },
                        { name: 'head', position: {x: 20, y: -35}, rotation: 0.1 },
                    ],
                    [
                        { name: 'body', position: {y: 0} },
                        { name: 'head', position: {x: 0, y: -45}, rotation: 0 },
                    ],
                    [
                        { name: 'body', position: {y: -30} },
                        { name: 'head', position: {x: -20, y: -35}, rotation: -0.1},
                    ],
                    [
                        { name: 'body', position: {y: 0} },
                        { name: 'head', position: {x: 0, y: -40}, rotation: 0 },
                    ]
                ]
            }
        });

        this.anim.create({
            key: 'run',
            type: 'keyframes',
            repeat: -1,
            data: {
                times: [0.075, 0.150, 0.225, 0.300, 0.375, 0.450, 0.525, 0.6],
                values: [
                    [
                        { name: 'left_leg', rotation: -0.5 },
                        { name: 'right_leg', rotation: 0.5 },
                        { name: 'body', rotation: 0.2, position: {y: 30} },
                        { name: 'head', rotation: 0.3, position: {x: 10} },
                    ],
                    [
                        { name: 'left_leg', rotation: -1 },
                        { name: 'right_leg', rotation: 1 },
                        { name: 'body', rotation: 0, position: {y: 0} },
                        { name: 'head', rotation: 0, position: {x: 20} },
                    ],
                    [
                        { name: 'left_leg', rotation: -0.5 },
                        { name: 'right_leg', rotation: 0.5 },
                        { name: 'body', rotation: -0.2, position: {y: -30} },
                        { name: 'head', rotation: -0.3, position: {x: 10} },
                    ],
                    [
                        { name: 'left_leg', rotation: 0 },
                        { name: 'right_leg', rotation: 0 },
                        { name: 'body', rotation: 0, position: {y: 0} },
                        { name: 'head', rotation: 0, position: {x: 0} },
                    ],
                    [
                        { name: 'left_leg', rotation: 0.5 },
                        { name: 'right_leg', rotation: -0.5 },
                        { name: 'body', rotation: 0.2, position: {y: 30} },
                        { name: 'head', rotation: 0.3, position: {x: -10} },
                    ],
                    [
                        { name: 'left_leg', rotation: 1 },
                        { name: 'right_leg', rotation: -1 },
                        { name: 'body', rotation: 0, position: {y: 0} },
                        { name: 'head', rotation: 0, position: {x: -20} },
                    ],
                    [
                        { name: 'left_leg', rotation: 0.5 },
                        { name: 'right_leg', rotation: -0.5 },
                        { name: 'body', rotation: -0.2, position: {y: -30} },
                        { name: 'head', rotation: -0.3, position: {x: -10} },
                    ],
                    [
                        { name: 'left_leg', rotation: 0 },
                        { name: 'right_leg', rotation: 0 },
                        { name: 'body', rotation: 0, position: {y: 0} },
                        { name: 'head', rotation: 0, position: {x: 0} },
                    ]
                ]
            }
        });

        /**
         * OPTION 1
         * 
         * d - duration
         * t - time
         * p - position
         * s - scale
         * r - rotation
         * a - anchor
         */
        // [
        //     {
        //         duration: 400,
        //         // time: 0.4,
        //         values: [{ name: 'head', position: { x: 0, y: 100 } }]
        //     },
        //     {
        //         duration: 400,
        //         // time: 0.8,
        //         values: [{ name: 'head', position: { x: 100, y: 100 } }]
        //     },
        //     {
        //         // duration: 400,
        //         time: 1.2,
        //         values: [{ name: 'head', position: { x: 100, y: 0 } }]
        //     },
        //     {
        //         duration: 400,
        //         // time: 1.6,
        //         values: [{ name: 'head', position: { x: 0, y: 0 } }]
        //     }
        // ]

        /**
         * OPTION 2
         */
        // {
        //     times: [0.5, 0.7, 1.3, 1.4],
        //     values: {
        //         "head.rotation": [0.5,,,0],
        //         "head.position": [,3,,,,,,5],
        //         "head.anchor": [0.5,0.5],
        //         "right_leg.rotation": [,,,]
        //     }
        // }

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
        group.scale.set(0.2)
        group.add(lleg);
        group.add(body);
        group.add(rleg);
        body.add(head);

        group.position.set(Tiny.rnd(40, 600), Tiny.rnd(40, 360));
        this.scene.add(group);

        this.anim.add(group, {
            "head": head,
            "body": body,
            "left_leg": lleg,
            "right_leg": rleg
        });

        group.play({
            key: 'idle',
            onRepeat: function() {
                console.log('Repeat!');
            }
        });

        var runTween = null;
        this.input.on( 'down', function (e) {
            if (runTween) {
                this.tweens.remove(runTween);
                runTween = null;
            }
            group.play('run');

            if (e.x > group.x) group.scale.x = 0.2;
            else group.scale.x = -0.2;

            var distance = Tiny.Math.distance(e.x, e.y, group.x, group.y);

            runTween = this.tweens
                .add(group)
                .to({ x: e.x, y: e.y }, distance * 4)
                .onComplete(function (argument) {
                    group.play('idle');
                })
                .start();
        }, this);
    }
}
