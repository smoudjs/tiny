# HTML5 Tiny


This is GPG product, based on the PIXI library.
Syntax of Application component is similar to the Phaser framework.

It is a fast, comfortable, lightweight and flexible framework, you can use for building 2D games and playable ads.

Use our plugins to extend Tiny abilities.

[Examples](https://peter-hutsul.github.io/h5tiny/examples/index.html)

### Installation

Install via npm:

```sh
$ npm install h5tiny
```

Use CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/h5tiny@2.0.0/build/tiny.js"></script>
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
import 'h5tiny';

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

		this.tweens.add(text.scale).to({x: 1.1, y: 1.1}, 500).yoyo(true).easing(TWEEN.Easing.Sinusoidal.InOut).repeat(Infinity).start();
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
import 'h5tiny';
import 'h5tiny/plugins/three';

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

		var text = new Tiny.Text("Hello World!", {fill: "#ffffff"});
		this.text = text;
		text.x = 200;
		text.y = 100;
		this.screen2d.add(text);

		this.tweens.add(text.scale).to({x: 1.1, y: 1.1}, 500).yoyo(true).easing(TWEEN.Easing.Sinusoidal.InOut).repeat(Infinity).start();

		var mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshLambertMaterial({color: "#ff4534"}));
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

        if (this.camera)
        {
            if (this.camera.isOrthographicCamera)
            {
                this.camera.left = -distance * aspect;
                this.camera.right = distance * aspect;
                this.camera.top = distance;
                this.camera.bottom = -distance;
            }
            else
            {
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
	    if (this.renderer.domElement.parentNode)
	    {
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
import 'h5tiny';
import 'h5tiny/plugins/particles';

class SmokeParticle extends Tiny.Particle {

    constructor( emitter ) {
        super( emitter );
    }

    update ( time, delta ) {
        this.scale.set(Math.min(time / 1000, 0.7));
        this.alpha = Math.min(time / 1000, 1)

        this.y -= this.yspeed * delta
        this.x += this.xspeed * delta
        this.rotation += this.rotationsp
    }

    onEmit () {
        this.xspeed = Tiny.rnd(-4, 4) * 0.05
        this.yspeed = Tiny.rnd(2, 10) * 0.05
        this.rotationsp = Math.random() * 0.02 - 0.01
    }

    draw ( context, resolution ) {
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

Check the [examples](https://peter-hutsul.github.io/h5tiny/examples/index.html) to see more
