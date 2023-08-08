import resources from './resources';

console.log(resources);

export default class BunnyApp extends Tiny.App {
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
        this.maxCount = 200000;
        this.amount = 100;
        this.count = 0;
        this.bunnies = [];

        this.bounds = {
            left: 0,
            top: 0,
            right: width,
            bottom: height
        };

        const counter = document.createElement('div');
        document.body.appendChild(counter);

        counter.style.cssText = 'position: absolute; bottom: 0; font-size: 30px;';
        counter.innerText = `${this.count} BUNNIES`;

        this.counter = counter;
    }

    /** Add an arbitrary amount of bunnies */
    addBunnies(num) {
        import('./Bunny').then(({ default: Bunny }) => {
            for (let i = 0; i < num; i++) {
                const texture = this.textures[this.count % this.textures.length];
                const bunny = new Bunny(texture, this.bounds);

                bunny.position.x = (this.count % 2) * this.width;
                this.bunnies.push(bunny);
                this.scene.add(bunny);
                this.count++;
            }
            this.counter.innerText = `${this.count} BUNNIES`;
        });
    }

    preload() {
        this.load.all(resources);
    }

    create() {
        this.textures = resources.map((e) => e.key);
    }

    setPixelRatio(dpr) {
        this.renderer.setPixelRatio(dpr);
    }

    update(time, delta) {
        if (this.input.isDown) {
            if (this.count < this.maxCount) {
                this.addBunnies(this.amount);
            }
        }

        for (let i = 0; i < this.bunnies.length; i++) {
            this.bunnies[i].update();
        }
    }

    render() {
        this.renderer.render(this.scene);
    }

    resize(width, height) {

        this.bounds.right = width;
        this.bounds.bottom = height;

        super.resize(width, height);

        this.renderer.resize(width, height);
    }

    destroy(clearCache) {
        super.destroy(clearCache);

        this.scene.destroy();
        this.renderer.destroy(true);
    }
}
