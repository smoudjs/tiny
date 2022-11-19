window["test.Input"]  = {

	preload: function() {

		this.load.image("base", baseImage);
		this.load.atlas("atlas", atlas, atlas_data);
	},

	create: function() {

		const debugText = this.debugText = new Tiny.Text("0:0", {fill: "#3434f3"});
		this.scene.add(debugText);

		this.input.on("down", function(e) {
			console.log("Mouse down: " + e.x + ":" + e.y);
		}, this)

		this.input.on("up", function(e) {
			console.log("Mouse up: " + e.x + ":" + e.y);
		}, this)

		this.input.on("move", function(e) {
			console.log("Mouse move: ", this.input.isDown);
			debugText.setText(Math.floor(e.x) + " : " + Math.floor(e.y))
		}, this)

		var coin = this.coin = new Tiny.Sprite("base");
		coin.x = 300;
		coin.y = 200;
		coin.anchor.set(0.5);
		coin.scale.set(0.9);
		this.scene.add(coin);

		this.input.add(coin);
		coin.input.on("click", function() {
			console.log("Coin 2 clicked");
			coin.tint = Tiny.hex2style(Math.floor(Math.random() * 162000));
		}, this)

		coin.input.on("down", function() {

			this.dragging = true;

		}, coin)

		var coin2 = this.coin2= new Tiny.Sprite("base");
		coin2.x = 100;
		coin2.y = 300;
		coin2.anchor.set(0.5);
		coin2.scale.set(0.9);
		this.scene.add(coin2);
		this.input.add(coin2);



		this.graphics = new Tiny.Graphics();
		this.graphics.x = 100;
		this.graphics.beginFill("#0a6dc1");
		this.graphics.drawCircle(0, 0, 182);
		this.graphics.beginFill("#04589e");
		this.graphics.drawCircle(0, 0, 170);
		for (var i = 0; i < 40; i++) {
			this.graphics.beginFill("#5500c5", 0.06);
			this.graphics.drawCircle(0, 0, i * 4);
		}
		var newTexture = this.graphics.generateTexture();
		this.graphics.destroy();

		var sprite = this.sprite = new Tiny.Sprite(newTexture);
		sprite.position.set(560, 120);
		sprite.anchor.set(0.5);

		var text = this.text = new Tiny.Text("Drag me!", {fill: "#ffffff"});
		text.anchor.set(0.5);

		this.tweens.add(text.scale).to({x: 1.1, y: 1.1}, 500).yoyo(true).easing(TWEEN.Easing.Sinusoidal.InOut).repeat(Infinity).start();

		var pulseTween = this.tweens.add(sprite.scale).to({x: 1.1, y: 1.1}, 100).yoyo(true).easing(TWEEN.Easing.Sinusoidal.InOut).repeat(Infinity).start();
		pulseTween.pause();

		sprite.add(text);

		var dragging = false;

		var startOffsetX = 0;
		var startOffsetY = 0;

		this.input.on("up", function(e) {
			dragging = false;
			this.coin2.dragging = false;
			this.coin.dragging = false;
			pulseTween.pause();
			sprite.scale.set(1);
		}, this)

		this.input.on("move", function(e) {
			if (dragging) {
				sprite.position.set(e.x + startOffsetX, e.y + startOffsetY);
			}

			if (this.coin2.dragging) {
				this.coin2.position.set(e.x, e.y);
				this.recusrive.setCenter(this.coin2.x / game.width, this.coin2.y / game.height);
			}

			if (this.coin.dragging) {
				this.coin.position.set(e.x, e.y);
				this.recusrive.alpha = this.coin.x / game.width;
				this.recusrive.clearAlpha = this.coin.y / game.height;
				this.recusrive.clearAlpha *= this.recusrive.clearAlpha * this.recusrive.clearAlpha;
				this.recusrive.updateFrames();
			}
		}, this)

		this.input.add(sprite);

		sprite.input.on("down", function(e) {
			startOffsetX = sprite.x - e.x;
			startOffsetY = sprite.y - e.y;
			dragging = true;
			pulseTween.resume();
		});

		this.scene.add(sprite);


		/**
		 * Creating scene mini-map
		 */
		var recusrive = this.recusrive = new Tiny.RecursiveSprite(this);
		this.scene.add(this.recusrive);

		coin2.input.on("down", function() {

			this.dragging = true;

		}, coin2)

		coin2.input.on("click", function() {

			// recusrive.setCenter(Math.random(), Math.random());

		}, coin2)
	},

	resize: function(width, height) {

		this.recusrive.resize(width, height);
	},

	update: function(time, delta) {

		this.recusrive.update(delta);
	}
}
