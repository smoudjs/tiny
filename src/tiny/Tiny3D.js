var Tiny = function(width, height, enableRAF, states) {

	this.canvas = document.createElement('canvas');
	this.scale = Tiny.ScaleManager.NORMAL
	this.height = height || 720;
	this.width = width || 430;

	this.stage = new Tiny.Stage()
	this.stage.game = this
	this.renderer = new Tiny.CanvasRenderer(this.width, this.height, {view: this.canvas, transparent: true})
	Tiny.defaultRenderer = this.renderer

	this.callbackContext = null
	states = states || {}
	this.state = 0
	this._preload_cb = this._preload_cb || states.preload || function() {}
	this._create_cb = this._create_cb || states.create || function() {}
	this._update_cb = this._update_cb || states.update || function() {}
	this._resize_cb = this._resize_cb || states.resize || function() {}
	this._destroy_cb = this._destroy_cb || states.destroy || function() {}

	if (Tiny.Loader)
		this.load = new Tiny.Loader(this)

	if (Tiny.ObjectCreator)
		this.add = new Tiny.ObjectCreator(this)

	if (Tiny.Input)
		this.input = new Tiny.Input(this)

	if (Tiny.TimerCreator)
		this.timer = new Tiny.TimerCreator(this)


	this._self_raf = enableRAF && Tiny.RAF
	if (this._self_raf)
		this._raf = new Tiny.RAF(this);

	this.time = {
		timeToCall: 15
	}

	this.paused = false
	this.pauseDuration = 0

	this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera( - this.width / 2, this.width / 2, this.height / 2, - this.height / 2, 1, 10 );
	
	this.camera.position.z = 1;

    this.texture = new THREE.CanvasTexture(this.canvas);
	this.texture.encoding = THREE.sRGBEncoding
    this.canvasMaterial = new THREE.SpriteMaterial({ map: this.texture })
    this.canvasSprite = new THREE.Sprite( this.canvasMaterial )

    this.scene.add( this.canvasSprite );

 //    this.texture.generateMipmaps = false;
	// this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
	this.texture.minFilter = THREE.LinearFilter;

	var self = this
	setTimeout(function() {
		self._preload()
	}, 0)
};

Tiny.prototype.setPixelRatio = function(dpr) {
	this.renderer.resolution = dpr
	this.resize()
};

Tiny.prototype.resize = function(width, height) {
	this.width = width || this.width
	this.height = height || this.height


	this.renderer.resize(this.width, this.height)
	
	this.camera.left = - width / 2;
	this.camera.right = width / 2;
	this.camera.top = height / 2;
	this.camera.bottom = - height / 2;
	this.camera.updateProjectionMatrix();

	this.canvasSprite.scale.set(this.width, this.height, 1);

	if (this.state > 0)
		this._resize_cb.call(this.callbackContext, this.width, this.height)
};

Tiny.prototype.setSize = Tiny.prototype.resize


Tiny.prototype.render = function() {
	this.renderer.render(this.stage)
};


Tiny.prototype._preload = function() {
	var _self = this
	this._preload_cb.call(this.callbackContext, function() {
		_self.state = 1
		if (Tiny.Loader)
			_self.load.start(_self._create)
		else
			_self._create()
	})
};

Tiny.prototype._create = function() {
	this._create_cb.call(this.callbackContext)

	if (this._self_raf)
		this._raf.start()

	this.state = 2
};


Tiny.prototype.update = function(time, delta) {
	if (!this.paused) {
		this._update_cb.call(this.callbackContext, time, delta)
		if (Tiny._tween_enabled)
			TWEEN.update()

		if (this.timers)
			this.timers.forEach(function(e) {
				e.update(delta)
			})
		this.texture.needsUpdate = true
		this.render()
	} else
		this.pauseDuration += delta
};

Tiny.prototype.pause = function() {
	this.paused = true
}

Tiny.prototype.resume = function() {
	this.paused = false
}

Tiny.prototype.stop = Tiny.prototype.pause
Tiny.prototype.play = Tiny.prototype.resume

Tiny.prototype.destroy = function() {
	if (Tiny.Input)
		this.input.destroy()
	if (Tiny._tween_enabled)
		TWEEN.removeAll()

	if (this.timers)
		this.timer.removeAll()

	this.paused = true
	this.stage.destroy()
	for (var y in Tiny.TextureCache) Tiny.TextureCache[y].destroy(true)
	for (var y in Tiny.BaseTextureCache) Tiny.BaseTextureCache[y].destroy()
	Tiny.BaseTextureCache = []
	Tiny.TextureCache = []
	this.stage.children = []
	this.update()
	this.renderer.destroy(true)

	if (this._self_raf)
		this._raf.stop()

	this.canvas = void 0

	this._destroy_cb.call(this.callbackContext)
}

window.Tiny = Tiny;


require('./utils/polyfill.js');

require('./global.js');

require('./math/Math.js'); // 1 Kb

require('./ObjectCreator.js'); // 1 Kb
require('./Loader.js'); // 3 Kb
require('./Input.js'); // 1 Kb
require('./utils/renderer.js'); // 2 Kb

require('./math/Point.js');	  //
require('./math/Matrix.js');	  //
require('./math/Rectangle.js');  //  8 Kb

require('./math/RoundedRectangle.js');	//
Tiny.Polygon = function() {}
require('./math/Polygon.js');			//
require('./math/Circle.js');			// 6 Kb

require('./textures/BaseTexture.js');	//
require('./textures/Texture.js');		// 4 Kb

require('./display/CanvasGraphics.js'); // 4Kb
// require('./utils/CanvasMaskManager.js'); // 1Kb

require('./display/DisplayObject.js');				//
require('./display/DisplayObjectContainer.js');	//
require('./display/Stage.js');						// 10 Kb

require('./objects/Sprite.js'); // 3 Kb
require('./objects/Graphics.js'); // 10 Kb
require('./objects/Text.js'); // 5 Kb
require('./objects/TilingSprite.js'); // 4 Kb

require('./CanvasRenderer.js'); // 3 Kb

require('./utils/CanvasBuffer.js'); // 1 Kb
// require('./utils/CanvasTinter.js'); // 3 Kb
// require('./textures/RenderTexture.js'); // 2 Kb
require('./time/Timer.js'); // 1 Kb
require('./utils/Tween.js');
require('./utils/EventTarget.js');
// require('./utils/canvasPool.js');
// require('./utils/device.js');
// require('./utils/color.js');
// require('./utils/EventTarget.js');	2 Kb
