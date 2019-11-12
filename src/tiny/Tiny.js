var ObjectFactory = require('./ObjectFactory.js');

var Tiny = function(width, height, parentNode, enableRAF, states) {

	this.parentNode = parentNode || document.body;
	this.canvas = document.createElement('canvas');
	this._scale = Tiny.ScaleManager.NORMAL
	this.height = height || 720;
	this.width = width || 430;

	this.stage = new Tiny.Stage()
	this.textures = {}
	this.renderer = new Tiny.CanvasRenderer(width, height, {view: this.canvas, autoResize: true})
	Tiny.defaultRenderer = this.renderer

	states = states || {}
	this._preload_cb = states.preload || function() {}
	this._create_cb = states.create || function() {}
	this._update_cb = states.update || function() {}
	this._resize_cb = states.resize || function() {}

	if (Tiny.Loader)
		this.load = new Tiny.Loader(this)

	this.add = new ObjectFactory(this)

	if (Tiny.Input)
		this.input = new Tiny.Input(this)

	this.addCanvasToDom();
	

	this.resize(this.width, this.height);

	this._self_raf = enableRAF && Tiny.RAF
	if (this._self_raf)
		this._raf = new Tiny.RAF(this);

	this.preload()
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
	this._resize_cb(this.renderer.width, this.renderer.height)
};

Tiny.prototype.setSize = Tiny.prototype.resize

Tiny.prototype._defineResizeEvent = function() {
	if (!this._definedResizeListener) {
		this._definedResizeListener = true
		window.addEventListener( 'resize', function() {
			if (this._scale == Tiny.ScaleManager.SHOW_ALL) {
	        	this.resize(window.innerWidth, window.innerHeight)
	        }
		}.bind(this), false );
	}
}

Object.defineProperty(Tiny.prototype, 'scale', {

    get: function() {
        return  this._scale;
    },

    set: function(value) {
        this._scale = value;
        if (this._scale == Tiny.ScaleManager.SHOW_ALL) {
        	this._defineResizeEvent()
        	this.resize(window.innerWidth, window.innerHeight)
        }
    }

});

Tiny.prototype.render = function() {
	this.renderer.render(this.stage)
};


Tiny.prototype.preload = function() {
	this._preload_cb()
	if (Tiny.Loader)
		this.load.start(this.create)
	else
		this.create()
};

Tiny.prototype.create = function() {
	this._create_cb()

	if (this._self_raf)
		this._raf.start()
};

var time, prevTime = 0, deltaTime = 0;

Tiny.prototype.update = function(time) {
    deltaTime = time - prevTime

	this._update_cb(time, deltaTime)
	if (Tiny._tween_enabled)
		TWEEN.update()

	this.stage.updateTransform()
	this.render()

	prevTime = time
};

Tiny.prototype.pause = function() {
	if (this._self_raf)
		this._raf.isRunning = false
}

Tiny.prototype.resume = function() {
	if (this._self_raf)
		this._raf.isRunning = true
}


Tiny.prototype.destroy = function() {
	if (Tiny._tween_enabled)
		TWEEN.removeAll()

	if (this._self_raf)
		this._raf.stop()

}

module.exports = Tiny;
window.Tiny = Tiny;