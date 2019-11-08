var DisplayObject = require('./DisplayObject');

/**
 * RoundRectangle
 * @extends ThreeUI.DisplayObject
 * 
 * Used internally by ThreeUI, shouldn't be used directly
 * Use ThreeUI.createRoundRectangle instead to create RoundRectangles
 * 
 * @param {ThreeUI} ui
 * @param {string} color 
 * @param {int} x 
 * @param {int} y 
 * @param {int} width
 * @param {int} height
 */

var RoundRectangle = function(ui, color, x, y, width, height, radius) {
	this.color = color;

	var x = typeof x !== 'undefined' ? x : 0;
	var y = typeof y !== 'undefined' ? y : 0;
	var width = typeof width !== 'undefined' ? width : 1;
	var height = typeof height !== 'undefined' ? height : 1;
	this.radius = typeof radius !== 'undefined' ? radius : 1;

	// Run DisplayObject constructor on this object
	DisplayObject.bind(this)(ui, x, y, width, height);
};

RoundRectangle.prototype = Object.create(DisplayObject.prototype);

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

RoundRectangle.prototype.draw = function(context, x, y, width, height) {
	context.strokeStyle = this.color; context.fillStyle = this.color; context.lineJoin = "round"; context.lineWidth = this.radius;
    context.strokeRect(x+(this.radius/2), y+(this.radius/2), width-this.radius, height-this.radius); context.fillRect(x+(this.radius/2), y+(this.radius/2), width-this.radius, height-this.radius);
};

// Export RoundRectangle as module
module.exports = RoundRectangle;
