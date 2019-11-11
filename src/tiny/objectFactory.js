var BitmapText = require('./objects/BitmapText.js');
var Rectangle = require('./objects/Rectangle.js');
var Sprite = require('./objects/Sprite.js');
var Text = require('./objects/Text.js');
var RoundRectangle = require('./objects/RoundRectangle.js');
var Circle = require('./objects/Circle.js');
var CircularProgress = require('./objects/CircularProgress.js');
var ImageText = require('./objects/ImageText.js');

var dirtyProperties = ['x','y','width','height','rotation','alpha','visible','pivot','anchor','smoothing','stretch','offset','scale','parent','textAlign','assetPath','color','left','right','up','down','ActiveInvoke','value'];

var observeDirtyProperties = function(object, ui) {
	dirtyProperties.forEach(function(prop) {
		var proxyKey = '_proxied_' + prop;

		// Make sure initial values are set first
		object[proxyKey] = object[prop];

		Object.defineProperty(object, prop, {
			set: function(value) {
				if (object[prop] !== value) {
					ui.shouldReDraw = true;
				}

				object[proxyKey] = value;
			},

			get: function() {
				return object[proxyKey];
			},
		});
	});
};

function createObjectFacory(game) {
	Tiny.prototype.add = {
		_sprite: function(imagePath, x, y, width, height) {
			var sprite = new Tiny.Sprite(game.textures[imagePath])
			game.stage.addChild(sprite)
			// var displayObject = new Sprite(game, imagePath, x, y, width, height);
			// game.displayObjects.push(displayObject);
			// observeDirtyProperties(displayObject, game);
			return sprite;
		},
		sprite: function(imagePath, x, y, width, height) {
			var displayObject = new Sprite(game, imagePath, x, y, width, height);
			game.displayObjects.push(displayObject);
			observeDirtyProperties(displayObject, game);
			return displayObject;
		},
		spritesheet: function(imagePath, sheetImagePath, sheetDataPath, x, y, width, height) {
			var displayObject = new Sprite(game, imagePath, x, y, width, height, sheetImagePath, sheetDataPath);
			game.displayObjects.push(displayObject);
			observeDirtyProperties(displayObject, game);
			return displayObject;
		},
		bitmaptext: function(text, size, x, y, sheetImagePath, sheetDataPath) {
			var displayObject = new BitmapText(game, text, size, x, y, sheetImagePath, sheetDataPath);
			game.displayObjects.push(displayObject);
			observeDirtyProperties(displayObject, game);
			return displayObject;
		},
		text: function(x, y, text, size, color) {
			var displayObject = new ImageText(game, x, y, text, size, color);
			game.displayObjects.push(displayObject);
			observeDirtyProperties(displayObject, game);
			return displayObject;
		}, 
		_text: function(text, font, color, x, y) {
			var displayObject = new Text(game, text, font, color, x, y);
			game.displayObjects.push(displayObject);
			observeDirtyProperties(displayObject, game);
			return displayObject;
		},
		shape: {
			rect: function(color, x, y, width, height) {
				var displayObject = new Rectangle(game, color, x, y, width, height);
				game.displayObjects.push(displayObject);
				observeDirtyProperties(displayObject, game);
				return displayObject;
			},
			roundRect: function(color, x, y, width, height, radius) {
				var displayObject = new RoundRectangle(game, color, x, y, width, height, radius);
				game.displayObjects.push(displayObject);
				observeDirtyProperties(displayObject, game);
				return displayObject;
			},
			circle: function(color, x, y, radius) {
				var displayObject = new Circle(game, color, x, y, radius);
				game.displayObjects.push(displayObject);
				observeDirtyProperties(displayObject, game);
				return displayObject;
			}
		},
		progress: {
			circular: function(color, bg_color, x, y, radius, line_width) {
				var displayObject = new CircularProgress(game, color, bg_color, x, y, radius, line_width);
				game.displayObjects.push(displayObject);
				observeDirtyProperties(displayObject, game);
				return displayObject;
			}
		},
		chart: {
			
		}
	}
}

module.exports = createObjectFacory