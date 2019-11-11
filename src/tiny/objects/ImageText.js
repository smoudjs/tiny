var DisplayObject = require('./DisplayObject');

/**
 * Rectangle
 * @extends ThreeUI.DisplayObject
 * 
 * Used internally by ThreeUI, shouldn't be used directly
 * Use ThreeUI.createRectangle instead to create rectangles
 * 
 * @param {ThreeUI} ui
 * @param {string} color 
 * @param {int} x 
 * @param {int} y 
 * @param {int} width
 * @param {int} height
 */

var ImageText = function(ui, x, y, text, size, color) {
	var x = typeof x !== 'undefined' ? x : 0;
	var y = typeof y !== 'undefined' ? y : 0;
	this.textAlign = 'center';
	this.textBaseline = 'middle';
	this._fontWeight = 'normal';
	this._text = (typeof text !== 'undefined' ? text : '');
	this._size = (typeof size !== 'undefined' ? size : 12);
	this.font = (typeof font !== 'undefined' ? font : 'Arial');
	this._color = (typeof color !== 'undefined' ? color : '#000000');
	this._lineHeight = 1; // Modifier on text size
	this.strokeThickness = 1;
    this.stroke = void 0;
    this._canvas  = document.createElement('canvas');
    this.__ui = ui
    this.setText();

	// Run DisplayObject constructor on this object
	DisplayObject.bind(this)(ui, x, y,  this.width,  this.height);
};

ImageText.prototype = Object.create(DisplayObject.prototype);

var obs = ["fontWeight", "text", "size", "color", "lineHeight"]
obs.forEach(function(o) {
    var observable = "_" + o
    Object.defineProperty(ImageText.prototype, o, {
        get: function() {
            return this[observable]
        },
        set: function(new_v) {
            if (this[observable] != new_v)
                this.__ui._should_redraw = true;
            this[observable] = new_v
            this.setText()
        },
    });
})

ImageText.prototype.setText = function () {
    var font_bldr = this.size + 'px '+ this.font
    
    if (this._fontWeight !== 'normal')
        font_bldr = this._fontWeight + " " + font_bldr

    var ctx = this._canvas.getContext('2d');
    ctx.clearRect(0,0, this._canvas.width, this._canvas.height);
    ctx.textAlign = this.textAlign ;
    ctx.textBaseline =this.textBaseline;
    ctx.font = font_bldr;
    var textMeasure = ctx.measureText(this._text);
    this.width = this._canvas.width = textMeasure.width + 20;
    this.height = this._canvas.height = this.size * 1.5 + 10;

    ctx.textAlign = this.textAlign ;
    ctx.textBaseline = this.textBaseline;
    ctx.font = font_bldr;
    ctx.fillStyle = this.color ;
    ctx.miterLimit = 2;
    ctx.fillText(this._text, this._canvas.width / 2, this._canvas.height / 2);
}
/**
 * Draw this Rectangle onto the provided context
 * Used internally by DisplayObject.render
 * 
 * @param {CanvasRenderingContext2D} context
 * @param {int} x
 * @param {int} y
 * @param {int} width
 * @param {int} height
 */

ImageText.prototype.draw = function(context, x, y, width, height) {
	context.drawImage(this._canvas, x, y, width, height);
};

// Export Rectangle as module
module.exports = ImageText;
