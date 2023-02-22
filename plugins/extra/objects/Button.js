Tiny.Button = function(input, params) {

    var options;

    if (typeof params === "string") {
        options = {
            label: params,
            width: 160,
            height: 40
        }
    }
    else {
        options = params;
        options.width = options.width || 160;
        options.height = options.height || 40;
    }

    var bg = new Tiny.Graphics();
    bg.beginFill("#4e63df");
    bg.drawRoundedRect(0, 0, options.width, options.height, 10);
    bg.endFill();
    bg.lineStyle(5, "#3e4fb2", 1);
    bg.drawRoundedRect(0, 0, options.width, options.height, 10);

    Tiny.Sprite.call(this, bg.generateTexture());

    var label = this.label = new Tiny.Text(options.label, {
        fill: "#ffffff",
        font: "300 13pt Arial",
        align: "center"
    });
    label.y = 2;
    label.anchor.set(0.5);
    this.add(label);

    this.anchor.set(0.5);

    input.add(this);

    input.on("move", function(e) {
        var bounds = this.getBounds();
        if (bounds.contains(e.x, e.y)) this.tint = "#a1a1a1"
        else this.tint = "#ffffff"
    } , this)

    this.input.on("down", function(e) {
        this.scale.set(0.95);
    }, this)

    this.input.on("up", function(e) {
        this.scale.set(1.05);
    }, this)
};

Tiny.Button.prototype = Object.create(Tiny.Sprite.prototype);
Tiny.Button.prototype.constructor = Tiny.Button;