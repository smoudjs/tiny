/**
 * import "h5tiny";
 * import "h5tiny/plugins/extra"
 *
 * or
 *
 * import "h5tiny/plugins/extra/objects/ProgressBar"
 *
 * To ignore unnecessary extra components
 *
 */

window["test.ProgressBar"] = {
    create: function () {
        const _self = this;

        function addProgressBar(x, y, options) {
            options = options || {};
            options.game = _self;

            const progress = new Tiny.ProgressBar(options);

            progress.x = x;
            progress.y = y;

            _self.scene.add(progress);

            var timer = _self.timer.loop(1500, function () {
                progress.setValue(Math.random());
            });

            _self.input.on("down", function () {
                progress.setValue(1);
            })

            return progress;
        }

        addProgressBar(150, 40);
        addProgressBar(150, 100, { colors: ["#ff0000", "#0000ff"] });
        addProgressBar(150, 160, {
            radius: 0,
            height: 20,
            width: 250,
            duration: 1100,
            easing: Tiny.Easing.Elastic.Out,
            colors: ["#666666", "#69d6e1", "#5778e0", "#583fbe", "#e01b1b", "#ffd700"]
        });

        addProgressBar(150, 220, {
            strokeWidth: 10
            // strokeColor: "#e1e1e1",
            // strokeAlpha: 1
        });

        addProgressBar(150, 280, {
            strokeWidth: 3,
            bgColor: "#a1a1ff",
            bgAlpha: 0.5,
            strokeColor: "#0000a1",
            colors: ["#0000ff"]
        });

        addProgressBar(150, 340, {
            animated: false,
            value: 0.5
        });

        var circleProgress = addProgressBar(370, 300, {
            radius: 35,
            height: 70,
            width: 70
        });

        circleProgress.rotation = Math.PI

        var progress = addProgressBar(400, 130, {
            value: 0.2,
            strokeWidth: 10
            // strokeColor: "#e1e1e1",
            // strokeAlpha: 1
        });

        progress.scale.set(0.5)
        progress.rotation = -Math.PI / 2;

        var progress2 = addProgressBar(460, 150, {
            radius: 0,
            height: 20,
            width: 250,
            colors: ["#666666", "#69d6e1", "#5778e0", "#583fbe", "#e01b1b", "#ffd700"]
        });

        progress2.rotation = -Math.PI / 2;

        var progress3 = addProgressBar(560, 150, {
            height: 80,
            width: 120,
            strokeWidth: 5,
            strokeColor: "#aaa0aa",
            colors: ["#0000ff", "#fff000"]
        });

        progress3.rotation = -Math.PI / 2;

        var graphics = new Tiny.Graphics();

        graphics.drawCircle(0, -90, 120);
        graphics.drawPolygon([0, -56, 23, -11, 67, 23, -12, -64, 1, 354]);
        graphics.drawRect(-50, 20, 100, 100);

        graphics.x = progress3.x;
        graphics.y = progress3.y;
        this.scene.add(graphics)

        progress3.mask = graphics;
    }
};
