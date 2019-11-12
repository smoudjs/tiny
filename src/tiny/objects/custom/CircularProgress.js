var DisplayObject = require('./DisplayObject');

/**
 * CircularProgress
 * @extends ThreeUI.DisplayObject
 * 
 * Used internally by ThreeUI, shouldn't be used directly
 * Use ThreeUI.createCircularProgress instead to create CircularProgresss
 * 
 * @param {ThreeUI} ui
 * @param {string} color 
 * @param {int} x 
 * @param {int} y 
 * @param {int} width
 * @param {int} height
 */

var CircularProgress = function(ui, color, bg_color, x, y, radius, line_width) {
	this.color = color;
	this.bg_color = bg_color;
	this.value = 0;
	this.circleStart = 0

	var x = typeof x !== 'undefined' ? x : 0;
	var y = typeof y !== 'undefined' ? y : 0;
	this._radius = typeof radius !== 'undefined' ? radius : 1;
	this.line_width = typeof line_width !== 'undefined' ? line_width : 1;

	// Run DisplayObject constructor on this object
	DisplayObject.bind(this)(ui, x, y, radius * 2, radius * 2);
};

CircularProgress.prototype = Object.create(DisplayObject.prototype);

Object.defineProperty(CircularProgress.prototype, 'radius', {
	get: function() {
		return this._radius
	},
	set: function(value) {
		this.width = this.height = value * 2 + this.line_width
		return this._radius = value;
	},
});
/**
 * Draw this CircularProgress onto the provided context
 * Used internally by DisplayObject.render
 * 
 * @param {CanvasRenderingContext2D} context
 * @param {int} x
 * @param {int} y
 * @param {int} width
 * @param {int} height
 */

CircularProgress.prototype.draw = function(context, x, y, width, height) {
	var circleStart = -1.57 + this.circleStart;
	context.beginPath();
	context.arc( x + width / 2, y + height / 2, this.radius, circleStart, 4 * Math.PI, false );
	context.strokeStyle = this.bg_color;
	context.lineWidth = this.line_width;
	context.stroke();

	context.beginPath();
	context.strokeStyle = this.color;
	context.lineWidth = this.line_width;
	context.arc( x + width / 2, y + height / 2, this.radius, circleStart, circleStart + (this.value / 50) * Math.PI, false );
	context.stroke();
};

// Export CircularProgress as module
module.exports = CircularProgress;