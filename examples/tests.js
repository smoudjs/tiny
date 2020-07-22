var BaseTest = {
	preload: function(  ) {
		this.game.load.image("base", baseImage)
		this.game.load.atlas("atlas", atlas, atlas_data)
	},
	create: function(  ) {
		var dds = this.game.add.group(220, 122)

		var t2 = this.bottomRightSprite = this.game.add.sprite(0, 0, "base")
		t2.inputEnabled = true
		t2.input.on("down", function() {
			console.log("Coin 1 clicked")
		})
		t2.anchor.set(0.5)
		t2.position.set(this.game.width - 100, this.game.height - 100)


		var t3 = this.testCoin = this.game.add.sprite(0 ,0, "base")	
		t3.inputEnabled = true
		t3.input.on("down", function() {
			console.log("Coin 2 clicked")
		})
		t3.scale.set(2)
		dds.addChild(t3)

		dds.pivot.x = dds.width; dds.pivot.y = dds.height
		dds.x = 1000
		dds.y = 400

		this.rectangle = this.game.add.sprite(0, 0, "atlas", "IH")

		var group = this.game.add.group(0, 0) 

		var ts = this.game.add.tileSprite(0, 0, 700, 800, "atlas", "MM")
		ts.scale.set(0.6)

		this.tileSprite = ts;

		group.addChild(ts)

		//group.cacheAsBitmap = true


	},
	update: function( time, delta ) {
		this.testCoin.rotation += delta * 0.0001
		this.testCoin.anchor.x = Math.sin( time * 0.001 )

		this.rectangle.x = 500 + Math.sin(time / 500) * 100;
		this.rectangle.y = 200 + Math.cos(time / 500) * 100;

		this.rectangle.scale.x = Math.sin(time / 500);
		this.rectangle.scale.y = Math.cos(time / 500);

		this.tileSprite.tilePosition.x += 0.5 * delta;
		this.tileSprite.tilePosition.y += Math.sin(time * 0.01) * 10;

		this.tileSprite.tileScale.x = this.tileSprite.tileScale.y = Math.sin(time * 0.0007) * 1;
	},
	resize: function( width, height ) {
		this.bottomRightSprite.x = width - 100
		this.bottomRightSprite.y = height - 100
	}
}

var DragAndDropTest = {
	preload: function(  ) {
		
	},
	create: function(  ) {
		this.graphics = this.game.add.graphics(100, 0)
		this.graphics.beginFill(0x0a6dc1)
		this.graphics.drawCircle(0, 0, 182)
		this.graphics.beginFill(0x04589e)
		this.graphics.drawCircle(0, 0, 170)

		for (var i = 0; i < 40; i++) {
			this.graphics.beginFill(0x5500c5, 0.06)
			this.graphics.drawCircle(0, 0, i * 4)
		}

		var newTexture = this.graphics.generateTexture()

		this.graphics.destroy()

		this.game.stage.removeChild(this.graphics)

		var sprite = this.sprite = this.game.add.sprite(200, 200, newTexture)

		sprite.anchor.set(0.5)

		var text = this.text = this.game.add.text(0, 0, "Drag me!", {fill: "#ffffff"})
		text.anchor.set(0.5)

		new TWEEN.Tween(text.scale).to({x: 1.1, y: 1.1}, 500).yoyo(true).easing(TWEEN.Easing.Sinusoidal.InOut).repeat(Infinity).start()

		var pulseTween = new TWEEN.Tween(sprite.scale).to({x: 1.1, y: 1.1}, 100).yoyo(true).easing(TWEEN.Easing.Sinusoidal.InOut).repeat(Infinity).start()
		pulseTween.pause()

		sprite.addChild(text)

		var dragging = false

		var startOffsetX = 0
		var startOffsetY = 0

		this.game.input.on("up", function(e) {
			dragging = false
			pulseTween.pause()
			sprite.scale.set(1)
		})

		this.game.input.on("move", function(e) {
			if (dragging)
				sprite.position.set(e.x + startOffsetX, e.y + startOffsetY)
		})

		sprite.inputEnabled = true
		sprite.input.on("down", function(e) {
			startOffsetX = sprite.x - e.x
			startOffsetY = sprite.y - e.y
			dragging = true
			pulseTween.resume()
		})

	}
}

var InputTest = {
	create: function() {
		var game = this.game

		this.game.input.on("down", function(e) {
			console.log("Mouse down: " + e.x + ":" + e.y)
		})

		this.game.input.on("up", function(e) {
			console.log("Mouse up: " + e.x + ":" + e.y)
		})

		this.game.input.on("move", function() {
			console.log("Mouse move: ", game.input.isDown)
		})
	}
}

var AnimatedSpriteSheetTest = {
	preload: function(  ) {
		this.game.load.spritesheet("gifsprite", testSpriteSheet, test_framesSpriteSheet)
	},
	create: function(  ) {
		var t4 = this.game.add.sprite(this.game.width - 300, 100, "gifsprite")
		t4.inputEnabled = true
		t4.scale.set(2)
		t4.animate()
	}
}

var GraphicsTest = {
	create: function(  ) {
		this.graphics = this.game.add.graphics(100, 0)
		this.graphics.beginFill(0x45a187)
		this.graphics.drawCircle(500, 100, 125)
		this.graphics.beginFill(0xff4545)
		this.graphics.drawRect(120, 45, 50, 50)
		this.graphics.scale.set(2, 1)
		this.graphics.rotation = 0.3

		this.newTexture = this.graphics.generateTexture()
	}
}

var EmitterTest = {
	create: function(  ) {

		var emmiter = this.emmiter = this.game.add.emitter(700, 500, 1200)
		this.emmiter.width = 40

		this.emmiter.pattern = Tiny.SmokeParticle
		this.emmiter.fillStyle = "#666666"

		this.emmiter.makeParticles("base")//Tiny.TextureCache["atlas_BR"])
		this.emmiter.scale.set(0.7)

		//this.emmiter.start(false, 1200, 0)
		this.emmiter.flow(1000, 100, 5)

		var bombEmitter = this.bombEmitter = this.game.add.emitter(400, this.game.height - 400, 300)

		bombEmitter.pattern = Tiny.ExplodeParticle

		bombEmitter.makeParticles()

		var game = this.game

		this.game.input.on("move", function(e) {
			if (game.input.isDown) {
				emmiter.x = e.x
				emmiter.y = e.y
			}
		})

		this.game.input.on("down", function(e) {
			bombEmitter.fillStyle = "#" + Math.floor(Math.random() * 0xffffff).toString(16)
			bombEmitter.x = e.x
			bombEmitter.y = e.y
			bombEmitter.explode(300, 80)
		})

		var fireworkEmitter = this.fireworkEmitter = this.game.add.emitter(400, this.game.height - 400, 300)

		fireworkEmitter.pattern = Tiny.FireworkParticle

		fireworkEmitter.width = 40

		fireworkEmitter.fillStyle = "#9416d4"

		fireworkEmitter.makeParticles()

		game.timer.loop(1000, function() {

			fireworkEmitter.x = Tiny.rnd(100, game.width - 100)
			fireworkEmitter.y = Tiny.rnd(100, 200)

			fireworkEmitter.explode(800, 80)

		})
	}
}

var ConfettiTest = {
	create: function(  ) {

		var confetti = this.confetti = this.game.add.emitter(500, 0, 150)
		confetti.width = 800

		confetti.pattern = Tiny.ConfettiParticle

		confetti.makeParticles()
		confetti.scale.set(0.7)

		//confetti.start(false, 1200, 0)
		confetti.flow(10000, 300, 5)

		var ribbon = this.ribbon = this.game.add.emitter(500, 0, 18)
		ribbon.width = 800

		ribbon.pattern = Tiny.RibbonParticle
		ribbon.makeParticles()
		ribbon.scale.set(0.7)

		//ribbon.start(false, 1200, 0)
		ribbon.start(false, 5000, 300)
	}
}
