var anchors = require('./anchors.js');

var BitmapText = require('./objects/BitmapText.js');
var Rectangle = require('./objects/Rectangle.js');
var Sprite = require('./objects/Sprite.js');
var Text = require('./objects/Text.js');
var RoundRectangle = require('./objects/RoundRectangle.js');
var Circle = require('./objects/Circle.js');
var CircularProgress = require('./objects/CircularProgress.js');
var ImageText = require('./objects/ImageText.js');


var isFirefox = require('./utils/browserDetection.js').isFirefox;
var Loader = require('./Loader.js');
var Renderer = require('./utils/renderer.js');
var objectsFactory = require('./objectFactory.js');

var dirtyProperties = ['x','y','width','height','rotation','alpha','visible','pivot','anchor','smoothing','stretch','offset','scale','parent','textAlign','assetPath','color','left','right','up','down','ActiveInvoke','value'];

var observeDirtyProperties = function(object, ui) {
	dirtyProperties.forEach(function(prop) {
		var proxyKey = '_proxied_' + prop;

		// Make sure initial values are set first
		object[proxyKey] = object[prop];

		Object.defineProperty(object, prop, {
			set: function(value) {
				if (object[prop] !== value) {
					ui._should_redraw = true;
				}

				object[proxyKey] = value;
			},

			get: function() {
				return object[proxyKey];
			},
		});
	});
};


var Tiny = function(width, height, parentNode, enableRAF, states) {
	this.displayObjects = [];
	this.eventListeners = {
		click: [],
	};

	this.clearRect = null;
	this.parentNode = parentNode || document.body;
	this.canvas = document.createElement('canvas');
	this.height = height || 720;
	this.width = width || 430;
	this.context = this.canvas.getContext('2d');

	this.stage = new Tiny.Stage()
	this.textures = {}
	this.renderer = new Tiny.CanvasRenderer(width, height, {view: this.canvas, autoResize: true})

	this._should_redraw = true;

	states = states || {}
	this._preload_cb = states.preload || function() {}
	this._create_cb = states.create || function() {}
	this._update_cb = states.update || function() {}

	this.load = new Loader(this)

	objectsFactory(this)


	this.addCanvasToDom();
	

	this.resize(window.innerWidth, window.innerHeight);

	// Event listening

	window.addEventListener('touchend', this.clickHandler.bind(this));

	if (isFirefox) {
		// Firefox blocks window.open from mousedown events, so bind click instead
		window.addEventListener('click', this.clickHandler.bind(this));
	} else {
		window.addEventListener('mousedown', this.clickHandler.bind(this));
	}

	this._self_raf = enableRAF
	if (this._self_raf)
		this._raf = new Renderer(this);

	this.preload()
};

Tiny.anchors = anchors;

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
	// //var gameCanvasAspect = width / height
	// this.width = width//this.height * gameCanvasAspect;
	// this.height = height

	// this.canvas.width = this.width
	// this.canvas.height = this.height;

	// this.canvas.style.width = width + "px"
	// this.canvas.style.height = height + "px"

	// //this.canvas.style.transform = 'scale(' + (this.gameCanvas.width / this.width) + ')';

	// this._should_redraw = true;
};

Tiny.prototype.render = function() {
	
	// //if (this._should_redraw) {

	// 	if (this.clearRect) {
	// 		this.context.clearRect(this.clearRect.x, this.clearRect.y, this.clearRect.width, this.clearRect.height);
	// 	} else {
	// 		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	// 	}

	// 	var self = this;
	// 	var length = this.displayObjects.length;
	// 	for (var i = 0;i < length;i++) {
	// 		this.displayObjects[i].render(self.context);
	// 	}

	// 	this._should_redraw = false;
	// //}

	this.renderer.render(this.stage)


	// if (this.colorReplace) {
	// 	this.context.save();

	// 	this.context.fillStyle = this.colorReplace
	// 	this.context.globalCompositeOperation = 'hue';
	// 	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

	// 	this.context.restore();
	// }
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

Tiny.prototype.createSpriteFromSheet = function(imagePath, sheetImagePath, sheetDataPath, x, y, width, height) {
	var displayObject = new Sprite(this, imagePath, x, y, width, height, sheetImagePath, sheetDataPath);
	this.displayObjects.push(displayObject);
	observeDirtyProperties(displayObject, this);
	return displayObject;
};

Tiny.prototype.createImageText = function(x, y, text, size, color) {
	var displayObject = new ImageText(this, x, y, text, size, color);
	this.displayObjects.push(displayObject);
	observeDirtyProperties(displayObject, this);
	return displayObject;
};

Tiny.prototype.createRectangle = function(color, x, y, width, height) {
	var displayObject = new Rectangle(this, color, x, y, width, height);
	this.displayObjects.push(displayObject);
	observeDirtyProperties(displayObject, this);
	return displayObject;
};

Tiny.prototype.createCircularProgress = function(color, bg_color, x, y, radius, line_width) {
	var displayObject = new CircularProgress(this, color, bg_color, x, y, radius, line_width);
	this.displayObjects.push(displayObject);
	observeDirtyProperties(displayObject, this);
	return displayObject;
};

Tiny.prototype.createRoundRectangle = function(color, x, y, width, height, radius) {
	var displayObject = new RoundRectangle(this, color, x, y, width, height, radius);
	this.displayObjects.push(displayObject);
	observeDirtyProperties(displayObject, this);
	return displayObject;
};

Tiny.prototype.createCircle = function(color, x, y, radius) {
	var displayObject = new Circle(this, color, x, y, radius);
	this.displayObjects.push(displayObject);
	observeDirtyProperties(displayObject, this);
	return displayObject;
};

Tiny.prototype.createText = function(text, font, color, x, y) {
	var displayObject = new Text(this, text, font, color, x, y);
	this.displayObjects.push(displayObject);
	observeDirtyProperties(displayObject, this);
	return displayObject;
};

Tiny.prototype.createBitmapText = function(text, size, x, y, sheetImagePath, sheetDataPath) {
	var displayObject = new BitmapText(this, text, size, x, y, sheetImagePath, sheetDataPath);
	this.displayObjects.push(displayObject);
	observeDirtyProperties(displayObject, this);
	return displayObject;
};

Tiny.prototype.addEventListener = function(type, callback, displayObject) {
	this.eventListeners[type].push({
		callback: callback,
		displayObject: displayObject
	});
};

Tiny.prototype.clickHandler = function(event) {
	// Hack to make sure we're not doing double events
	var coords = null;
	if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
		this.listeningToTouchEvents = true;

		if (event.touches.length > 0) {
			coords = { x: event.touches[0].pageX, y: event.touches[0].pageY };
		} else if (event.pageX && event.pageY) {
			coords = { x: event.pageX, y: event.pageY };
		} else {
			this.listeningToTouchEvents = false;
		}
	} else {
		// Mouse event
		coords = { x: event.pageX, y: event.pageY };
	}

	if (this.listeningToTouchEvents && event instanceof MouseEvent || coords === null) return;

	coords = this.windowToUISpace(coords.x, coords.y);

	var callbackQueue = [];
	this.eventListeners.click.forEach(function(listener) {
		var displayObject = listener.displayObject;
		if (!displayObject.shouldReceiveEvents()) return;

		var bounds = displayObject.getBounds();
		if (Tiny.isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
			// Put listeners in a queue first, so state changes do not impact checking other click handlers
			callbackQueue.push(listener.callback);
		}
	});

	callbackQueue.forEach(function(callback){
		callback();
	});
};

Tiny.prototype.windowToUISpace = function(x, y) {
	var bounds = this.canvas.getBoundingClientRect();
	var scale = this.height / bounds.height;

	return {
		x: (x - bounds.left) * scale,
		y: (y - bounds.top) * scale,
	};
}

Tiny.prototype.moveToFront = function(displayObject) {
	var elIdx = this.displayObjects.indexOf(displayObject);

	if (elIdx > -1) {
		this.displayObjects.splice(elIdx, 1);
	}

	this.displayObjects.push(displayObject);
};

Tiny.isInBoundingBox = function(x, y, boundX, boundY, boundWidth, boundHeight) {
	return (
		x >= boundX &&
		x <= boundX + boundWidth &&
		y >= boundY &&
		y <= boundY + boundHeight
	);
};

module.exports = Tiny;
window.Tiny = Tiny;