var Tiny = function(width, height, parentNode, enableRAF, states) {

	this.parentNode = parentNode || document.body;
	this.canvas = document.createElement('canvas');
	this.scale = Tiny.ScaleManager.NORMAL
	this.height = height || 720;
	this.width = width || 430;

	this.stage = new Tiny.Stage()
	this.renderer = new Tiny.CanvasRenderer(this.width, this.height, {view: this.canvas, autoResize: true})
	Tiny.defaultRenderer = this.renderer

	this.callbackContext = null
	states = states || {}
	this.state = 0
	this._preload_cb = states.preload || function() {}
	this._create_cb = states.create || function() {}
	this._update_cb = states.update || function() {}
	this._resize_cb = states.resize || function() {}
	this._destroy_cb = states.destroy || function() {}

	if (Tiny.Loader)
		this.load = new Tiny.Loader(this)

	if (Tiny.ObjectCreator)
		this.add = new Tiny.ObjectCreator(this)

	if (Tiny.Input)
		this.input = new Tiny.Input(this)

	if (Tiny.TimerCreator)
		this.timer = new Tiny.TimerCreator(this)

	this.addCanvasToDom();
	

	this._self_raf = enableRAF && Tiny.RAF
	if (this._self_raf)
		this._raf = new Tiny.RAF(this);

	this.time = {
		timeToCall: 15
	}

	this.paused = false
	this.pauseDuration = 0
	var self = this
	setTimeout(function() {
		self.preload()
	}, 0)
};

Tiny.prototype.addCanvasToDom = function() {
	this.parentNode.appendChild(this.canvas);

	this.canvas.style.position = 'absolute'; 

	this.canvas.style.top="0px";
	this.canvas.style.left="0px";

	this.canvas.style.transformOrigin = '0% 0%';
	this.canvas.style.perspective = '1000px'; // Hardware acceleration!

};

Tiny.prototype.setPixelRatio = function(dpr) {
	this.renderer.resolution = dpr
	this.resize()
};

Tiny.prototype.resize = function(width, height) {
	this.width = width || this.width
	this.height = height || this.height
	this.renderer.resize(this.width, this.height)
	if (this.state > 0)
		this._resize_cb.call(this.callbackContext, this.width, this.height)
};

Tiny.prototype.setSize = Tiny.prototype.resize


Tiny.prototype.render = function() {
	this.renderer.render(this.stage)
};


Tiny.prototype.preload = function() {
	this._preload_cb.call(this.callbackContext)
	if (Tiny.Loader)
		this.load.start(this.create)
	else
		this.create()

	this.state = 1
};

Tiny.prototype.create = function() {
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

module.exports = Tiny;
window.Tiny = Tiny;
