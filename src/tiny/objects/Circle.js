var DisplayObject = require('./DisplayObject');

/**
 * Circlw
 * @extends ThreeUI.DisplayObject
 * 
 * Used internally by ThreeUI, shouldn't be used directly
 * Use ThreeUI.createRoundRectangle instead to create RoundRectangles
 * 
 * @param {ThreeUI} ui
 * @param {string} color 
 * @param {int} x 
 * @param {int} y 
 * @param {int} radius
 */

var Circle = function(ui, color, x, y, radius) {
	this.color = color;

	var x = typeof x !== 'undefined' ? x : 0;
	var y = typeof y !== 'undefined' ? y : 0;
	this._radius = typeof radius !== 'undefined' ? radius : 1;

	// Run DisplayObject constructor on this object
	DisplayObject.bind(this)(ui, x, y, radius * 2, radius * 2);
};

Circle.prototype = Object.create(DisplayObject.prototype);

Object.defineProperty(Circle.prototype, 'radius', {
	get: function() {
		return this._radius
	},
	set: function(value) {
		this.width = value * 2, this.height = value * 2
		return this._radius = value;
	},
});

/**
 * Draw this RoundRectangle onto the provided context
 * Used internally by DisplayObject.render
 * 
 * @param {CanvasRenderingContext2D} context
 * @param {int} x
 * @param {int} y
 * @param {int} width
 * @param {int} height
 */

Circle.prototype.draw = function(context, x, y, width, height) {
    context.fillStyle = this.color
	context.beginPath();
	context.arc(x + width / 2, y + height / 2, this.radius, 0, 2 * Math.PI);
	context.fill();
};

// Export RoundRectangle as module
module.exports = Circle;
