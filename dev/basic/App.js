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

    /** Add an arbitrary amount of bunnies */
    addBunnies(num) {
        for (let i = 0; i < num; i++) {
            const texture = this.textures[this.count % this.textures.length];
            const bunny = new Bunny(texture, this.bounds);

            bunny.position.x = (this.count % 2) * this.width;
            this.bunnies.push(bunny);
            this.scene.add(bunny);
            this.count++;
        }
        this.counter.innerText = `${this.count} BUNNIES`;
    }

    preload() {
        console.log('preload');
        // this.load.all(resources);
    }

    create() {
        console.log('create');

        this.text = new Tiny.Text('Hello World !');
        this.text.position.set(400, 200);
        this.scene.add(this.text);
    }

    setPixelRatio(dpr) {
        this.renderer.setPixelRatio(dpr);
    }

    update(time, delta) {
        this.text.rotation += delta * 0.01;
        // if (this.input.isDown) {
        //     if (this.count < this.maxCount) {
        //         this.addBunnies(this.amount);
        //     }
        // }

        // for (let i = 0; i < this.bunnies.length; i++) {
        //     this.bunnies[i].update();
        // }
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
