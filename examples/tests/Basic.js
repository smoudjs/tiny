window["test.Basic"]  = {

	preload: function() {

		this.load.image("base", baseImage);
		this.load.atlas("atlas", atlas, atlas_data);
		// this.load.spritesheet("gifsprite", spritesheet, 222, 222);
		// this.load.spritesheet("gifsprite", spritesheet, spritesheet_data);

		this.load.all([
			// { key: "base", src: baseImage, type: "image" },
			// { key: "atlas", src: atlas, data: atlas_data, type: "atlas" },
			// { key: "gifsprite", src: spritesheet, cols: 12, rows: 1, total: 15, duration: 40, type: "spritesheet" },
			// { key: "gifsprite", src: spritesheet, width: 222, height: 222, duration: 40, type: "spritesheet" },
			{ key: "gifsprite", src: spritesheet, cols: 6, rows: 1, duration: 90, type: "spritesheet" },
			// { key: "gifsprite", src: spritesheet, data: spritesheet_data, type: "spritesheet" }
		]);
	},

	create: function() {

		this.group = new Tiny.Object2D();
		this.group.x = 200;
		this.group.y = 200;
		this.scene.add(this.group);

		this.group.add(new Tiny.Text("Hello World"));
		this.group.add(new Tiny.Sprite("base"));
		this.group.add(new Tiny.Text("Hello World", {fill: "#ff0000"}));
		this.group.cacheAsBitmap = true;
		this.group.children[2].y = 70;
		this.group.updateCache();

		this.bottomRightSprite = new Tiny.Sprite("base");
		this.bottomRightSprite.anchor.set(0.5);
		this.scene.add(this.bottomRightSprite);
		this.bottomRightSprite.position.set(this.width - 100, this.height - 100)


		this.testCoin = new Tiny.Sprite("base");
		this.testCoin.x = 350;
		this.testCoin.y = 200;
		this.testCoin.scale.set(0.5)
		this.scene.add(this.testCoin);

		this.icon = new Tiny.Sprite("atlas", "IH");
		this.icon.tint = "#23f423";
		this.icon.scale.set(0.5);
		this.scene.add(this.icon);

		const animatedSprite = new Tiny.Sprite("gifsprite", 0);
		animatedSprite.anchor.set(0.5);
		animatedSprite.position.set(350, 70);
		// animatedSprite.scale.set(3);
		animatedSprite.animate(this.timer);

		this.interval = setInterval(function() {

			console.log("Rotate sprite!");
			// animatedSprite.rotation = Math.random() * 3.14;

		}, 1000)

		this.scene.add(animatedSprite);
	},

	update: function(time, delta) {

		this.testCoin.rotation += delta * 0.0001
		this.testCoin.anchor.x = Math.sin( time * 0.001 )

		this.group.scale.x = Math.sin(time / 500);
		this.group.scale.y = Math.cos(time / 500);

		this.group.x = (Math.sin(time / 100)) * 10 + 200;
		this.group.y = (Math.cos(time / 100)) * 10 + 200;
	},

	resize: function(width, height) {
		
		this.bottomRightSprite.x = width - 100;
		this.bottomRightSprite.y = height - 100;
	},

	destroy: function() {
		clearInterval(this.interval);
	}

}
