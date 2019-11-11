var anchors = require('../anchors.js');

var DisplayObject = function(game, x, y, width, height) {
	this.game = game;

	this.x = typeof x !== 'undefined' ? x : 0;
	this.y = typeof y !== 'undefined' ? y : 0;
	this.position = new Tiny.Point(1, 1, this.game);

	this.width = typeof width !== 'undefined' ? width : 0;
	this.height = typeof height !== 'undefined' ? height : 0;
	this.rotation = 0;
	this.alpha = 1;
	this.visible = true;
	this.pivot = {
		x: 0.5,
		y: 0.5
	};
	this.anchor = {
		x: anchors.left,
		y: anchors.top
	};
	this.smoothing = true;
	this.stretch = {
		x: false,
		y: false
	};


	this.scale = new Tiny.Point(1, 1, this.game);


	this.offset = {
		left: 0,
		top: 0,
		right: 0,
		bottom: 0
	};
	this.parent = undefined;
};

// var _observables = [scale]
// _observables.forEach(function(o) {
//     var observable = "_" + o
//     Object.defineProperty(ImageText.prototype, o, {
//         get: function() {
//             return this[observable]
//         },
//         set: function(new_v) {
//             if (this[observable] != new_v)
//                 this.__game._should_redraw = true;
//             this[observable] = new_v
//             this.setText()
//         },
//     });
// })


/**
 * Get the bounds for the DisplayObject's position in the canvas
 *
 * @return {Object} position {x, y, width, height}
 */

DisplayObject.prototype.getBounds = function() {
	var position = this.determinePositionInCanvas();
	var dimensions = this.determineDimensionsInCanvas();

	return {
		x: position.x,
		y: position.y,
		width: dimensions.width,
		height: dimensions.height
	};
};

/**
 * Get the bounds for this DisplayObject's parent
 *
 * @return {Object} position {x, y, width, height}
 */

DisplayObject.prototype.getParentBounds = function () {
	if (typeof this.parent === 'undefined') {
		return {
			x: 0,
			y: 0,
			width: this.game.width,
			height: this.game.height
		};
	} else if (this.parent instanceof DisplayObject) {
		return this.parent.getBounds();
	} else {
		throw new Error('DisplayObject.parent should always be an instance of DisplayObject');
	}
};

/**
 * Determine the DisplayObject's actual position in the canvas based on anchor and pivot
 *
 * @return {Object} position {x, y}
 */

DisplayObject.prototype.determinePositionInCanvas = function() {
	var position = {
		x: typeof this.x === 'number' ? this.x : 0,
		y: typeof this.y === 'number' ? this.y : 0
	};

	if (this.stretch.x || this.stretch.y) {
		var parentBounds = this.getParentBounds();
		var offset = this.getOffsetInCanvas();
		if (this.stretch.x) {
			position.x = parentBounds.x + offset.left;
		}
		if (this.stretch.y) {
			position.y = parentBounds.y + offset.top;
		}
	}

	position = this.adjustPositionForAnchor(position.x, position.y);
	position = this.adjustPositionForPivot(position.x, position.y);

	return position;
};

/**
 * Determine the DisplayObject's actual dimensions in the canvas based on stretching
 *
 * @return {Object} dimensions {width, height}
 */

DisplayObject.prototype.determineDimensionsInCanvas = function() {
	var dimensions = {
		width: typeof this.width === 'number' ? this.width : 0,
		height: typeof this.height === 'number' ? this.height : 0
	};

	if (this.stretch.x || this.stretch.y) {
		var parentBounds = this.getParentBounds();
		var offset = this.getOffsetInCanvas();

		if (this.stretch.x) {
			dimensions.width = parentBounds.width - offset.left - offset.right;
		}
		if (this.stretch.y) {
			dimensions.height = parentBounds.height - offset.top - offset.bottom;
		}
	}

	return dimensions;
};


/**
 * Adjust given position for anchor
 *
 * @param {int} x
 * @param {int} y
 * @return {Object} position {x, y}
 */

DisplayObject.prototype.adjustPositionForAnchor = function(x , y) {
	var parentBounds = this.getParentBounds();

	// Adjust position for X anchor
	if (!this.stretch.x) {
		if (this.anchor.x === anchors.left) {
			x = parentBounds.x + x;
		} else if (this.anchor.x === anchors.right) {
			x = parentBounds.x + parentBounds.width - x;
		} else if (this.anchor.x === anchors.center) {
			x = parentBounds.x + parentBounds.width * .5 + x;
		}
	}

	// Adjust position for Y anchor
	if (!this.stretch.y) {
		if (this.anchor.y === anchors.top) {
			y = parentBounds.y + y;
		} else if (this.anchor.y === anchors.bottom) {
			y = parentBounds.y + parentBounds.height - y;
		} else if (this.anchor.y === anchors.center) {
			y = parentBounds.y + parentBounds.height * .5 + y;
		}
	}

	return {
		x: x,
		y: y
	};
};

/**
 * Gets calculated offset in canvas space
 *
 * @return {Object} offset {x, y}
 */

DisplayObject.prototype.getOffsetInCanvas = function() {
	var offset = {
		left: this.offset.left,
		top: this.offset.top,
		right: this.offset.right,
		bottom: this.offset.bottom,
	};

	// Transform percentage offsets to numbers
	var parentBounds;

	var keys = Object.keys(offset);
	var length = keys.length;
	for (var i = 0;i < length;i++) {
		var key = keys[i];
		var value = offset[key];
		if (typeof value !== 'number') {
			parentBounds = parentBounds || this.getParentBounds();

			var percValue = parseFloat(value.match(/^([0-9\.]+)%$/)[1]);
			offset[key] = percValue / 100 * parentBounds.width;
		}
	}

	return offset;
};

/**
 * Adjust given position for pivot
 *
 * @param {int} x
 * @param {int} y
 * @return {Object} position {x, y}
 */

DisplayObject.prototype.adjustPositionForPivot = function(x , y) {
	// Adjust position for pivot
	x = x - this.width * this.pivot.x;
	y = y - this.height * this.pivot.y;

	return {
		x: x,
		y: y
	};
};

/**
 * Should this DisplayObject receive events in its current state?
 */

DisplayObject.prototype.shouldReceiveEvents = function() {
	return this.visible;
};

/**
 * Attach a click event handler to this DisplayObject
 *
 * @param {Function} callback
 */

DisplayObject.prototype.onClick = function(callback) {
	this.game.addEventListener('click', callback, this);
};

/**
 * Render this DisplayObject onto the provided context
 *
 * @param {CanvasRenderingContext2D} context
 */

DisplayObject.prototype.render = function(context) {
	if (!this.visible) return;

	context.save();

	var bounds = this.getBounds();
	var pivotAdjustment;
	if (this.rotation || this.scale.x != 1 || this.scale.y != 1)
		pivotAdjustment = this.adjustPositionForPivot(0, 0);

	if (this.rotation) { // Rotation is in degrees
		var radians = (Math.PI / 180) * this.rotation;

		var moveX = bounds.x - pivotAdjustment.x;
 		var moveY = bounds.y - pivotAdjustment.y;

		context.translate(moveX, moveY);
		context.rotate(radians);
		context.translate(-moveX, -moveY);
	}

	if (this.scale.x != 1 || this.scale.y != 1) {
		var offsetScaleX = (-bounds.x + pivotAdjustment.x) * (this.scale.x - 1);
 		var offsetScaleY = (-bounds.y + pivotAdjustment.y) * (this.scale.y - 1);

 		context.translate(offsetScaleX, offsetScaleY);
		context.scale(this.scale.x, this.scale.y);
	}

	context.globalAlpha = this.alpha;

	if (typeof context['mozImageSmoothingEnabled'] !== 'undefined') context['mozImageSmoothingEnabled'] = this.smoothing;
	if (typeof context['webkitImageSmoothingEnabled'] !== 'undefined') context['webkitImageSmoothingEnabled'] = this.smoothing;
	if (typeof context['msImageSmoothingEnabled'] !== 'undefined') context['msImageSmoothingEnabled'] = this.smoothing;
	if (typeof context['imageSmoothingEnabled'] !== 'undefined') context['imageSmoothingEnabled'] = this.smoothing;

	this.draw(context, bounds.x, bounds.y, bounds.width, bounds.height);

	context.restore();
};

/**
 * Draw the current sprite on the provided context, varies per DisplayObject type
 *
 * @param {CanvasRenderingContext2D} context
 * @param {int} x
 * @param {int} y
 * @param {int} width
 * @param {int} height
 */

DisplayObject.draw = function(context, x, y, width, height) {
	// Override me
};

/**
 * Getter for visibility
 */
Object.defineProperty(DisplayObject.prototype, '_proxied_visible', { // Set on proxied, as we're already observing
	get: function() {
		if (this.parent && this.parent !== this && !this.parent.visible) {
			return false;
		} else {
			return this._visible;
		}
	},
	set: function(toggle) {
		return this._visible = toggle;
	},
});


// Object.defineProperty(DisplayObject.prototype, "x", {
//     get: function() {
//         return this.scale.x
//     },
//     set: function(value) {
//        // if (this[observable] != new_v)
//             this.game._should_redraw = true;
//         this.scale.x = value
//        // this.setText()
//     },
// });

// Object.defineProperty(DisplayObject.prototype, "y", {
//     get: function() {
//         return this.scale.y
//     },
//     set: function(value) {
//        // if (this[observable] != new_v)
//             this.game._should_redraw = true;
//         this.scale.y = value
//        // this.setText()
//     },
// });



// Export DisplayObject as module
module.exports = DisplayObject;