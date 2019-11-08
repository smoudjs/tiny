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
 * @param {int} radius
 */

var Ellipse = function(ui, color, x, y, a, b) {
	this.color = color;

	var x = typeof x !== 'undefined' ? x : 0;
    var y = typeof y !== 'undefined' ? y : 0;
    var a = typeof a !== 'undefined' ? a : 0;
	var b = typeof b !== 'undefined' ? b : 0;

	// Run DisplayObject constructor on this object
	DisplayObject.bind(this)(ui, x, y,a,b);
};

Ellipse.prototype = Object.create(DisplayObject.prototype);

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

Ellipse.prototype.draw = function(context, x, y, a, b) {
    context.strokeStyle = this.color; context.fillStyle = this.color; context.lineJoin = "round"; context.lineWidth = this.radius;
    context.beginPath();
    context.ellipse(x, y, a, b, 0, 0, Math.PI, true);
    context.fill();

};

// Export RoundRectangle as module
module.exports = Ellipse;
