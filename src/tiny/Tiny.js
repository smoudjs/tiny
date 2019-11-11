var Loader = require('./Loader.js');
var Input = require('./Input.js');
var Renderer = require('./utils/renderer.js');
var ObjectFactory = require('./ObjectFactory.js');

var Tiny = function(width, height, parentNode, enableRAF, states) {
	//this.objects = [];

	this.eventListeners = {
		click: [],
	};

	this.parentNode = parentNode || document.body;
	this.canvas = document.createElement('canvas');
	this.height = height || 720;
	this.width = width || 430;

	this.stage = new Tiny.Stage()
	this.textures = {}
	this.renderer = new Tiny.CanvasRenderer(width, height, {view: this.canvas, autoResize: true})

	states = states || {}
	this._preload_cb = states.preload || function() {}
	this._create_cb = states.create || function() {}
	this._update_cb = states.update || function() {}

	this.load = new Loader(this)

	this.add = new ObjectFactory(this)
	this.input = new Input(this)

	this.addCanvasToDom();
	

	this.resize(window.innerWidth, window.innerHeight);

	this._self_raf = enableRAF
	if (this._self_raf)
		this._raf = new Renderer(this);

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

Tiny.prototype.resize = function(width, height) {
	this.renderer.resize(width, height)
};

Tiny.prototype.render = function() {
	this.renderer.render(this.stage)
};


Tiny.prototype.preload = function() {
	this._preload_cb()
	this.load.start(this.create)
};

Tiny.prototype.create = function() {
	this._create_cb()

	if (this._self_raf)
		this._raf.start()
};

var time, prevTime = 0, deltaTime = 0;

Tiny.prototype.update = function(time) {
	//time = time || Date.now();
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

// Tiny.prototype.createText = function(text, font, color, x, y) {
// 	var displayObject = new Text(this, text, font, color, x, y);
// 	this.displayObjects.push(displayObject);
// 	observeDirtyProperties(displayObject, this);
// 	return displayObject;
// };

Tiny.prototype.addEventListener = function(type, callback, displayObject) {
	this.eventListeners[type].push({
		callback: callback,
		displayObject: displayObject
	});
};


module.exports = Tiny;
window.Tiny = Tiny;