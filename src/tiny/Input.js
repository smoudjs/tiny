var Input = function (game)
{
    this.game = game;
    this.listeners = []

    window.addEventListener('touchend', this.clickHandler.bind(this));

    if (/firefox/i.test(navigator.userAgent)) {
        // Firefox blocks window.open from mousedown events, so bind click instead
        window.addEventListener('click', this.clickHandler.bind(this));
    } else {
        window.addEventListener('mousedown', this.clickHandler.bind(this));
    }
};

var isInBoundingBox = function(x, y, boundX, boundY, boundWidth, boundHeight) {
    return (
        x >= boundX &&
        x <= boundX + boundWidth &&
        y >= boundY &&
        y <= boundY + boundHeight
    );
};
Input.prototype = {
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

      //  coords = this.windowToUISpace(coords.x, coords.y);

        var callbackQueue = [];

        this.listeners.forEach(function(listener) {
            if (listener.inputEnabled) {
                console.log(coords)

                var bounds = listener.getBounds();
                if (isInBoundingBox(coords.x, coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    // Put listeners in a queue first, so state changes do not impact checking other click handlers
                    callbackQueue.push(listener.onClick);
                }
            }
        });

        callbackQueue.forEach(function(callback){
            if (typeof callback == "function")
                callback();
        });
    },

    windowToUISpace: function(x, y) {
        var bounds = this.game.canvas.getBoundingClientRect();
        var scale = this.game.height / bounds.height;

        return {
            x: (x - bounds.left) * scale,
            y: (y - bounds.top) * scale,
        };
    },

    appendListener: function(obj) {
        if (this.listeners.indexOf(obj) == -1)
            this.listeners.push(obj)
    }

};

module.exports = Input