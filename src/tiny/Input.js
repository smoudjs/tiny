Tiny.Input = function (game)
{
    this.game = game;
    this._active_objects = []

    this.clickHandler_bind = this.clickHandler.bind(this)
    this.upHandler_bind = this.upHandler.bind(this)
    this.downHandler_bind = this.downHandler.bind(this)
    this.moveHandler_bind = this.moveHandler.bind(this)

    this.lastMove = null

    var t = this.game.canvas.addEventListener
    t('touchstart', this.downHandler_bind);
    t('touchmove', this.moveHandler_bind);
    t('touchend', this.upHandler_bind);
    t('touchcancel', this.upHandler_bind);

    t('click', this.clickHandler_bind);

    t('mousedown', this.downHandler_bind);
    t('mousemove', this.moveHandler_bind);
    t('mouseup', this.upHandler_bind);

    Tiny.EventTarget.mixin(this)
};

Tiny.Input.prototype = {
    destroy: function() {
        var t = this.game.canvas.removeEventListener
        t('touchstart', this.downHandler_bind);
        t('touchmove', this.moveHandler_bind);
        t('touchend', this.upHandler_bind);
        t('touchcancel', this.upHandler_bind);

        t('click', this.clickHandler_bind);

        t('mousedown', this.downHandler_bind);
        t('mousemove', this.moveHandler_bind);
        t('mouseup', this.upHandler_bind);
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

    _getCoords: function(event, history) {
        var coords = null;
        if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent) {
            this.listeningToTouchEvents = true;

            if (event.touches.length > 0) {
                coords = { x: event.touches[0].pageX, y: event.touches[0].pageY };
            } else if (event.pageX && event.pageY) {
                coords = { x: event.pageX, y: event.pageY };
            } else {
                // this.listeningToTouchEvents = false;
            }
        } else {
            // Mouse event
            coords = { x: event.pageX, y: event.pageY };
        }

        if (this.listeningToTouchEvents && event instanceof MouseEvent || coords === null) return null;

        coords = this.windowToUISpace(coords.x, coords.y, history);

        return coords
    },

    inputHandler: function(name, event, history) {
       // console.log(name)
        var coords = this._getCoords(event, history)
        if (coords !== null) {

            this._active_objects = []

            this._checkOnActiveObjects(this.game.stage, coords.x, coords.y)

            var i = this._active_objects.length

            if (i > 0) {
                this._active_objects[i - 1].input.emit(name, {x: coords.x, y: coords.y})
            }
            this.emit(name, {x: coords.x, y: coords.y})
        }
    },

    moveHandler: function(event) {
        this.lastMove = event
        this.inputHandler("move", event, true)
    },

    upHandler: function(event) {
        this.inputHandler("up", this.lastMove, true)
    },

    downHandler: function(event) {
        this.lastMove = event
        this.inputHandler("down", event, false)
    },

    clickHandler: function(event) {
        var coords = this._getCoords(event)

        if (coords !== null) {

            this._active_objects = []

            // for (var t = 0; t < this.game.stage.children.length; t++)
            //     this._checkOnActiveObjects(this.game.stage.children[t], coords.x, coords.y)
            this._checkOnActiveObjects(this.game.stage, coords.x, coords.y)

            var i = this._active_objects.length
            this.onClick()
            //while (i--) {
                if (i > 0) {
                    if (typeof this._active_objects[i - 1].onClick == "function")
                        this._active_objects[i - 1].onClick()
                    this._active_objects[i - 1].input.emit("click")
                //    break;
                }
           // }
        }
    },

    windowToUISpace: function(x, y, history) {
        var bounds = ((history && this._last_bounds) ? this._last_bounds : (this._last_bounds = this.game.canvas.getBoundingClientRect(), this._last_bounds));
        return {
            x: (x - bounds.left),
            y: (y - bounds.top),
        };
    }
};