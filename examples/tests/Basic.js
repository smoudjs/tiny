/**
 * import "h5tiny";
 */

class MyGame extends Tiny.App {
    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;

        this.renderer = new Tiny.CanvasRenderer(this.width, this.height, {
            resolution: 1.25,
            autoResize: true
        });

        this.renderer.setClearColor('#f4f4f4');

        var view = (this.inputView = this.renderer.domElement);

        document.getElementById('game-container').appendChild(view);

        this.scene = new Tiny.Scene();
    }

    preload() {
        this.load.image('coin', resources.baseImage);
    }

    create() {
        var text = new Tiny.Text('Hello Tiny!');
        text.anchor.set(0.5);
        text.x = 320;
        text.y = 200;
        this.text = text;

        var sprite = new Tiny.Sprite('coin');

        this.scene.add(sprite);
        this.scene.add(text);
    }

    update(time, delta) {
        this.text.rotation += delta * 0.001;
    }

    setPixelRatio(dpr) {
        this.renderer.setPixelRatio(dpr);
    }

    render() {
        this.renderer.render(this.scene);
    }

    resize(width, height) {
        super.resize(width, height);

        this.renderer.resize(width, height);
    }
}
