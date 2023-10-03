# HTML5 Tiny

[![NPM Package][npm]][npm-url]
[![Build Size][build-size]][build-size-url]
[![Build Size][build-size-gziped]][build-size-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]
[![DeepScan][deepscan]][deepscan-url]

<p align="center">
    <img src="https://smoudjs.github.io/tiny/examples/res/image2.png" width="450" alt="Tiny intro">
</p>

<p align="center">
    <a href="https://smoudjs.github.io/tiny/examples/index.html">Examples</a> |
    <a href="https://smoudjs.github.io/tiny">Documentation</a>
</p>

It is a fast, comfortable, lightweight and flexible html5 game framework, you can use for building 2D/3D games and playable ads.
The first version of this project was based on PIXI library. Then it extended with 3D components thanks to Three.
This project was created thanks to [PixiJS](https://github.com/pixijs/pixijs) | [three.js](https://github.com/mrdoob/three.js) | [Phaser](https://github.com/photonstorm/phaser) | [OGL](https://github.com/oframe/ogl)

Use our plugins to extend Tiny abilities:

- [three 📦](https://github.com/smoudjs/tiny/tree/master/plugins/three)
- [particles 🔥](https://github.com/smoudjs/tiny/tree/master/plugins/particles)
- [sound 🎵](https://github.com/smoudjs/tiny/tree/master/plugins/sound)
- [create 🛠](https://github.com/smoudjs/tiny/tree/master/plugins/create)
- [anim 🎬](https://github.com/smoudjs/tiny/tree/master/plugins/anim)
- [extra ❤️](https://github.com/smoudjs/tiny/tree/master/plugins/extra)

### Installation

Install via npm:

```sh
$ npm install tiny
```

Use CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/tiny@2.0.10/build/tiny.js"></script>
```

### API Documentation

Work in progress ...

But

See the sources for details, it's easy !

### Usages

Basic Usage:

```javascript
var renderer = new Tiny.CanvasRenderer(640, 320);
document.body.appendChild(renderer.domElement);

var scene = new Tiny.Scene();
var text = new Tiny.Text("Hello World!");
scene.add(text);
renderer.render(scene);

```

Tiny application with basic systems and state manager:

```javascript
var renderer = new Tiny.CanvasRenderer(640, 320);
document.body.appendChild(renderer.domElement);

var scene = new Tiny.Scene();

var states = {
    preload: function() {
        // Tiny.Loader
        // this.load.image("key", source);
    },
    create: function() {

        // var sprite = new Tiny.Sprite("key");

        var text = new Tiny.Text("Hello World!");
        this.text = text;
        text.x = 200;
        text.y = 100;
        scene.add(text);
    },
    update: function(time, delta) {
        this.text.rotation += delta * 0.001;
    },
    render: function() {
        renderer.render(scene);
    }
}

new Tiny.App(states);

```

Tiny application with class (full example)

```javascript
import 'tiny';

class MyGame extends Tiny.App {

    constructor(width, height) {

        super();

        this.width = width;
        this.height = height;

        this.renderer = new Tiny.CanvasRenderer(this.width, this.height);

        /**
         * Specify DOM element for Tiny.Input 
         */
        this.inputView = this.renderer.domElement;

        document.body.appendChild(this.renderer.domElement);

        this.scene = new Tiny.Scene();
    }

    preload() {
        // Tiny.Loader
        // this.load.image("image1", source);
        // this.load.atlas("image2", source, sourceFrames);
        // this.load.spritesheet("image3", source, sourceFrames);
    }

    create() {

        // var sprite = new Tiny.Sprite(image1);
        // var sprite2 = new Tiny.Sprite("image2", "frameName");
        // var graphics = new Tiny.Graphics();
        // graphics.drawRect(20, 20, 100, 50);
        // var container = new Tiny.Object2D();
        // container.add(sprite2d);
        // container.add(new Tiny.Text("In container!"));

        var text = new Tiny.Text("Hello World!");
        this.text = text;
        text.x = 200;
        text.y = 100;
        this.scene.add(text);

        // Tiny.Timer
        this.timer.add(1000, function() {
            console.log("Timer example: one time");
        });

        this.timer.loop(1000, function() {
            console.log("Timer example: loop");
        })

        // Tiny.Input
        this.input.on("down", function(e) {
            console.log("Down on game");
        });

        this.input.on("move", function(e) {
            console.log("Mouse move: " + e.x + ":" + e.y);
        });

        this.input.add(text);
        text.input.on("click", function(e) {
            console.log("Click on text");
        });

        text.input.on("down", function(e) {
            console.log("Down on text");
        });

        text.input.on("up", function(e) {
            console.log("Up on text");
        });

        this.tweens.add(text.scale).to({
            x: 1.1,
            y: 1.1
        }, 500).yoyo(true).easing(Tiny.Easing.Sinusoidal.InOut).repeat(Infinity).start();
    }

    update(time, delta) {
        this.text.rotation += delta * 0.001;
    }

    render() {
        this.renderer.render(this.scene);
    }

    resize(width, height) {

        super.resize(width, height);

        this.renderer.setSize(width, height);
    }

    destroy(clearCache) {

        super.destroy(clearCache);

        this.scene.destroy();
        this.renderer.destroy(true);
    }

}

new MyGame(640, 320);

```

### Plugins

Three.js plugin (three):

```javascript
import 'tiny';
import 'tiny/plugins/three';

class MyGame extends Tiny.App {

    constructor(width, height) {

        super();

        this.width = width;
        this.height = height;

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.setSize(this.width, this.height);
        this.inputView = this.renderer.domElement;
        document.body.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(1, 1, 1, 1, 0.3, 500);

        this.camera.position.set(40, 50, 40);
        this.camera.lookAt(0, 0, 0);
        this.camera.distance = 4;

        this.screen2d = new Tiny.Screen2D(this.width, this.height);

        this.setupCamera();
    }

    preload() {
        // Tiny.Loader
        // this.load.image("image1", source);
        // this.load.atlas("image2", source, sourceFrames);
        // this.load.spritesheet("image3", source, sourceFrames);

        // this.load.gltf("model", gltfJson, splitObjects = false );
        // this.load.texture3d("texture", imageSrc);
    }

    create() {

        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(15, 59, 53);
        light.lookAt(0, 0, 0);
        this.scene.add(light);

        var text = new Tiny.Text("Hello World!", {
            fill: "#ffffff"
        });
        this.text = text;
        text.x = 200;
        text.y = 100;
        this.screen2d.add(text);

        this.tweens.add(text.scale).to({
            x: 1.1,
            y: 1.1
        }, 500).yoyo(true).easing(Tiny.Easing.Sinusoidal.InOut).repeat(Infinity).start();

        var mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshLambertMaterial({
            color: "#ff4534"
        }));
        mesh.material.color.convertSRGBToLinear();
        this.scene.add(mesh);

        // var importedScene = this.cache.gltf["model"].scene;
        // this.scene.add(importedScene);

        // var importedSceneMesh = this.cache.mesh3d["model.meshName"];
        // importedSceneMesh.material.map = this.cache.texture3d["texture"];
        // this.scene.add(importedSceneMesh);
    }

    update(time, delta) {
        this.text.rotation += delta * 0.001;
    }

    setupCamera() {

        var aspect = this.width / this.height;
        var distance = this.camera.distance;

        if (this.camera) {
            if (this.camera.isOrthographicCamera) {
                this.camera.left = -distance * aspect;
                this.camera.right = distance * aspect;
                this.camera.top = distance;
                this.camera.bottom = -distance;
            } else {
                this.camera.fov = distance * 1.2;
                this.camera.aspect = aspect;
            }

            this.camera.updateProjectionMatrix();
        }
    }

    setPixelRatio(dpr) {
        this.renderer.setPixelRatio(dpr);
        this.screen2d.renderer.setPixelRatio(dpr);
    }

    render() {
        this.renderer.autoClear = true;
        this.renderer.render(this.scene, this.camera);
        this.renderer.autoClear = false;
        this.renderer.render(this.screen2d.scene, this.screen2d.camera);
    }

    resize(width, height) {

        super.resize(width, height);

        this.screen2d.setSize(width, height)
        this.renderer.setSize(width, height);
        this.setupCamera();
    }

    destroy(clearCache) {

        super.destroy(clearCache);

        this.screen2d.scene.dispose();
        this.scene.dispose();
        if (this.renderer.domElement.parentNode) {
            this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }

        this.renderer.dispose();
        this.renderer = undefined;
    }
}

new MyGame(640, 320);

```

Particles plugin (particles)

```javascript
import 'tiny';
import 'tiny/plugins/particles';

class SmokeParticle extends Tiny.Particle {

    constructor(emitter) {
        super(emitter);
    }

    update(time, delta) {
        this.scale.set(Math.min(time / 1000, 0.7));
        this.alpha = Math.min(time / 1000, 1)

        this.y -= this.yspeed * delta
        this.x += this.xspeed * delta
        this.rotation += this.rotationsp
    }

    onEmit() {
        this.xspeed = Tiny.rnd(-4, 4) * 0.05
        this.yspeed = Tiny.rnd(2, 10) * 0.05
        this.rotationsp = Math.random() * 0.02 - 0.01
    }

    draw(context, resolution) {
        context.fillRect(0, 0, 100 * resolution, 100 * resolution)
    }
}

class MyGame extends Tiny.App {

    constructor(width, height) {

        super();

        this.width = width;
        this.height = height;

        this.renderer = new Tiny.CanvasRenderer(this.width, this.height);

        /**
         * Specify DOM element for Tiny.Input 
         */
        this.inputView = this.renderer.domElement;

        document.body.appendChild(this.renderer.domElement);

        this.scene = new Tiny.Scene();
    }

    preload() {
        // Tiny.Loader
        // this.load.image("image1", source);
    }

    create() {
        var emitter = new Tiny.Emitter(300);
        emitter.x = 200;
        emitter.y = 250;
        emitter.width = 40

        emitter.pattern = SmokeParticle;
        emitter.fillStyle = "#666666";

        emitter.makeParticles();
        // emitter.makeParticles("image1");

        emitter.scale.set(0.7);
        emitter.flow(1000, 100, 8);

        // Tiny.ParticleSystem
        this.particles.add(emitter);

        this.scene.add(emitter);
    }

    render() {
        this.renderer.render(this.scene);
    }

    resize(width, height) {

        super.resize(width, height);

        this.renderer.setSize(width, height);
    }

    destroy(clearCache) {

        super.destroy(clearCache);

        this.scene.destroy();
        this.renderer.destroy(true);
    }

}

new MyGame(640, 320);

```

### Demos

Check the [examples](https://smoudjs.github.io/tiny/examples/index.html) to see more

[<div align="center"><img alt="Tiny examples intro" width="550" src="https://smoudjs.github.io/tiny/examples/res/image.png" /></div>](https://smoudjs.github.io/tiny/examples/index.html)

[npm]: https://img.shields.io/npm/v/@smoud/tiny
[npm-url]: https://www.npmjs.com/package/@smoud/tiny
[build-size]: https://badgen.net/bundlephobia/min/@smoud/tiny
[build-size-gziped]: https://badgen.net/bundlephobia/minzip/@smoud/tiny
[build-size-url]: https://bundlephobia.com/result?p=@smoud/tiny
[npm-downloads]: https://img.shields.io/npm/dw/@smoud/tiny
[npmtrends-url]: https://www.npmtrends.com/@smoud/tiny
[deepscan]: https://deepscan.io/api/teams/19616/projects/25245/branches/787107/badge/grade.svg
[deepscan-url]: https://deepscan.io/dashboard/#view=project&tid=19616&pid=25245&bid=787107