import resources from './resources';
import Bunny from './Bunny';

console.log(resources);

export default class BunnyApp extends Tiny.App {
    constructor(width, height, parentNode, states) {
        super(states);

        // width = 800;
        // height = 600;

        this.width = width;
        this.height = height;

        this.renderer = new Tiny.Renderer(this.width, this.height, {
            resolution: 1,
            autoResize: true
        });

        this.renderer.setClearColor('#ffffff');

        var view = (this.inputView = this.renderer.domElement);

        parentNode = parentNode ? document.getElementById(parentNode) : document.body;
        parentNode.appendChild(view);
        // view.style.position = 'absolute';

        // view.style.top = "0px";
        // view.style.left = "0px";

        // view.style.transformOrigin = '0% 0%';
        // view.style.perspective = '1000px';

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
        counter.className = 'disable';
        document.body.appendChild(counter);

        counter.id = 'counter';

        counter.innerText = `${this.count} BUNNIES`;

        this.stats = new Stats();
        this.stats.domElement.id = 'stats';
        document.body.append(this.stats.domElement);

        this.counter = counter;

        setTimeout(() => {
            // this.addBunnies(100000);
        }, 1000);
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
        this.load.all(resources);
    }

    create() {
        this.textures = Object.keys(Tiny.Cache.texture);
        if (this.textures.length == 0) {
            for (let key in Tiny.Cache.image) {
                this.textures.push(new Tiny.Texture(key));
            }
        }
    }

    setPixelRatio(dpr) {
        this.renderer.setPixelRatio(dpr);
    }

    update(time, delta) {
        this.stats.begin();
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
        this.stats.end();
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
