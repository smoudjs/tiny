// Tiny.Point = function (x, y, game) {
//     this._x = x || 0;
//     this._y = y || 0;

// 	Object.defineProperty(this, "x", {
// 	    get: function() {
// 	        return this._x
// 	    },
// 	    set: function(value) {
// 	       if (this._x != value && game)
// 	           game._should_redraw = true;
// 	        this._x = value
// 	    }
// 	});

// 	Object.defineProperty(this, "y", {
// 	    get: function() {
// 	        return this._y
// 	    },
// 	    set: function(value) {
// 	       if (this._y != value && game)
// 	           game._should_redraw = true
// 	        this._y = value
// 	       // this.setText()
// 	    }
// 	});

// };

// Tiny.Point.prototype = {
// 	 set: function (x, y) {
//         this.x = x || 0;
//         this.y = y || ( (y !== 0) ? this.x : 0 );

//         return this;
//     },

//     setTo: function (x, y) {
//     	this.set(x, y)
//     }
// };


Tiny.Point = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
};

Tiny.Point.prototype = {
	 set: function (x, y) {
        this.x = x || 0;
        this.y = y || ( (y !== 0) ? this.x : 0 );

        return this;
    },

    setTo: function (x, y) {
    	this.set(x, y)
    }
};