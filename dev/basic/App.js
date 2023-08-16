export default class BasicApp extends Tiny.App {
    constructor(width, height, parentNode, states) {
        super(states);

        this.width = width;
        this.height = height;

        this.renderer = new Tiny.CanvasRenderer(this.width, this.height, {
            resolution: 1.25,
            autoResize: true
        });

        this.renderer.setClearColor('#f4f4f4');

        var view = (this.inputView = this.renderer.domElement);

        parentNode = parentNode ? document.getElementById(parentNode) : document.body;
        parentNode.appendChild(view);
        // view.style.position = 'absolute';

        // view.style.top = "0px";
        // view.style.left = "0px";

        // view.style.transformOrigin = '0% 0%';
        view.style.perspective = '1000px';

        this.scene = new Tiny.Scene();
    }

    preload() {
        console.log('preload');
        this.load.spritesheet(
            'spritesheet',
            require('textures/basics/gif.jpg'),
            require('textures/basics/gif_data.json')
        );
        // this.load.all(resources);
    }

    create() {
        console.log('create');

        this.text = new Tiny.Text('Hello World !', { fill: '#ffff00' });

        // this.text.cacheAsBitmap = true;
        this.text.tint.set(0xa1a100);
        this.text.position.set(400, 200);
        this.scene.add(this.text);

        var sprite = new Tiny.Sprite('spritesheet', 2);

        sprite.x = 500;
        sprite.scale.set(2);

        this.anim.create({
            key: 'idle',
            type: 'spritesheet',
            data: {
                key: 'spritesheet'
                // from: 0,
                // to: 3
            },
            repeat: -1,
            // yoyo: true,
            fps: 34
        });

        this.anim.add(sprite);

        sprite.play('idle');

        this.scene.add(sprite);

        // var graphics = new Tiny.Graphics();
        // // graphics.tint.set(0x45f223);

        // graphics.beginFill('#f23', 1);
        // graphics.drawRect(100, 100, 100, 100);
        // graphics.endFill();

        // graphics.lineStyle(23, 0x45ff45);
        // graphics.drawCircle(400, 200, 100);

        // graphics.moveTo(10, 10);
        // graphics.lineStyle(23, 0x4545ff, 0.1);
        // graphics.lineTo(400, 200);
        // graphics.lineTo(400, 500);
        // graphics.lineTo(100, 500);
        // graphics.bezierCurveTo(400, 500, 23, 32, 45, 12);

        //   // graphics.cacheAsBitmap = true

        // setInterval(() => {
        //     this.text.tint.set(Math.floor(Math.random() * 0xffffff));
        //     graphics.tint.set(Math.floor(Math.random() * 0xffffff));
        //     // graphics.dirty = true;
        // }, 1000)

        // this.scene.add(graphics);
    }

    setPixelRatio(dpr) {
        this.renderer.setPixelRatio(dpr);
    }

    update(time, delta) {
        this.text.rotation += delta * 0.01;
    }

    render() {
        this.renderer.render(this.scene);
    }

    resize(width, height) {
        super.resize(width, height);

        this.renderer.resize(width, height);
    }

    destroy(clearCache) {
        super.destroy(clearCache);

        this.scene.destroy();
        this.renderer.destroy(true);
    }
}
