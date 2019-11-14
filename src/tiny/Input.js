Tiny.Input = function (game)
{
    this.game = game;
    this._active_objects = []

    this.clickHandler_bind = this.clickHandler.bind(this)
    window.addEventListener('touchstart', this.clickHandler_bind);

    // if (/firefox/i.test(navigator.userAgent)) {
    //     // Firefox blocks window.open from mousedown events, so bind click instead
    //     window.addEventListener('click', this.clickHandler.bind(this));
    // } else {
        window.addEventListener('click', this.clickHandler_bind);
    // }
};

Tiny.Input.prototype = {
    destroy: function() {
        window.removeEventListener('touchstart', this.clickHandler_bind);
        window.removeEventListener('click', this.clickHandler_bind);
    },

    _checkOnActiveObjects: function(obj, x, y) {
        if (obj.inputEnabled && obj.worldVisible) {
            if (obj.getBounds().contains(x, y))
                this._active_objects.push(obj)
        }

        if (obj.children && obj.children.length > 0) {
            for (var t = 0; t < obj.children.length; t++)
                this._checkOnActiveObjects(obj.children[t], x, y)
        }
    },
    onClick: function() {},
    clickHandler: function(event) {
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

        this._active_objects = []

        for (var t = 0; t < this.game.stage.children.length; t++)
            this._checkOnActiveObjects(this.game.stage.children[t], coords.x, coords.y)
        
        var i = this._active_objects.length
        this.onClick()
        //while (i--) {
            if (i > 0 && typeof this._active_objects[i - 1].onClick == "function") {
                this._active_objects[i - 1].onClick()
            //    break;
            }
       // }

    },

    windowToUISpace: function(x, y) {
        var bounds = this.game.canvas.getBoundingClientRect();
        return {
            x: (x - bounds.left),
            y: (y - bounds.top),
        };
    }
};