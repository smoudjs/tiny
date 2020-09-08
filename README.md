# HTML5 Tiny (Based on PIXI)


This is Green Panda production, based on the PIXI framework core.
Syntaxis is super similar to the Phaser framework. 
It is a fast, comfortable, lightweight and flexible framework, you can use for building 2D games and playable ads.


### Installation

Install via npm:

```sh
$ cd game
$ npm install h5tiny
```

Use CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/h5tiny@1.4.3/lib/tiny.js"></script>
```

### Usages

ES6:

```javascript
import 'h5tiny';

class Image extends Tiny.Sprite 
{
	constructor(game) 
	{
		super("icon");
		game.stage.addChild(this);
	}
	
	update(delta) 
	{
		this.rotation += delta * 0.02;
	}
}

class Game extends Tiny 
{
	constructor(width, height) 
	{
		var parent = null; // document.body
		var useBuildInRAF = true;

		super(width, height, parent, useBuildInRAF)
	}

	preload() 
	{
		this.load.image("icon", "base64...");
	}

	create() 
	{
		this.icon = new Image(this);
	}

	update(time, delta) 
	{
		this.icon.update(delta);
	}
}

```

JavaScript:

```javascript
var states = {
	preload: function() 
	{
		this.load.image("icon", "base64...");
	},

	create: function() 
	{
		this.icon = this.add.sprite(34, 34, "icon");
	},

	update: function(time, delta) 
	{
		this.icon.rotation += delta * 0.02;
	},
}

var game = new Tiny(300, 450, null, true, states);

```


Tiny + ThreeJS:

```javascript
import 'h5tiny/three';

class Image extends Tiny.Sprite 
{
	constructor(game) 
	{
		super("icon");
		game.stage.addChild(this);
	}

	update(delta) 
	{
		this.rotation += delta * 0.02;
	}
}

class Game extends Tiny
{
	constructor(width, height) 
	{
		var parent = null; // document.body
		var useBuildInRAF = true;

		super(width, height, parent, useBuildInRAF)

		this.scene = new THREE.Scene();
	}

	preload() 
	{
		this.load.image("icon", "base64...");
	}

	create() 
	{
		this.icon = new Image(this);
	}

	update(time, delta) 
	{
		this.icon.update(delta);
	}
}

```