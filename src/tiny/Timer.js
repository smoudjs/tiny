
Tiny.Timer = function(status, autoRemove, game, cb, delay, loop, n, oncomplete) {
    this.game = game;
    this._cb_ = cb || function() {}
    this.delay = delay || 1000
    this.loop = loop
    this._count = n || 0
    this._repeat = (this._count > 0)
    this.status = status
    this._lastFrame = 0
    this.autoRemove = autoRemove
    this._oncomplete = oncomplete || function() {}
    this._stop = function(){}
}

Tiny.Timer.prototype = {
    start: function() {
        this.status = 1
    },
    pause: function() {
        this.status = 0
    },
    stop: function() {
        this.status = 0
        this._lastFrame = 0
        this._stop()
    },
    update: function(deltaTime) {
        if (this.status) {
            this._lastFrame += deltaTime
            if (this._lastFrame >= this.delay) {
                this._cb_()
                this._lastFrame = 0
                if (this._repeat) {
                    this._count--;
                    if (this._count === 0) {
                        this.status = 0;
                        (this.autoRemove && this.game.timer.remove(this))
                        this._oncomplete()
                    }
                } else if (!this.loop) {
                    this.status = 0;
                    (this.autoRemove && this.game.timer.remove(this))
                }
            }
        }
    }
}

Tiny.TimerCreator = function (game)
{
    this.game = game;
    this.game.timers = []
    this.autoStart = true
    this.autoRemove = true
};

Tiny.TimerCreator.prototype = {
    removeAll: function() {
        this.game.timers.forEach(function(tm) {
            tm.stop()
        })
        this.game.timers = []
    },
    remove: function(tm) {
        if (this.game.timers.indexOf(tm) > -1) {
            tm.stop()
            this.game.timers.splice(this.game.timers.indexOf(tm), 1)
        }
    },
    add: function(delay, cb, autostart, autoremove) {
        if (autostart == undefined)
            autostart = this.autoStart
        var timer = new Tiny.Timer((autostart ? 1 : 0), (autoremove != undefined ? autoremove : this.autoRemove), this.game, cb, delay)
        this.game.timers.push(timer)
        return timer
    },
    loop: function(delay, cb, autostart, autoremove) {
        if (autostart == undefined)
            autostart = this.autoStart
        var timer = new Tiny.Timer((autostart ? 1 : 0), (autoremove != undefined ? autoremove : this.autoRemove), this.game, cb, delay, true)
        this.game.timers.push(timer)
        return timer
    },
    repeat: function(delay, n, cb, complete) {
        var timer = new Tiny.Timer((this.autoStart ? 1 : 0), this.autoRemove, this.game, cb, delay, false, n, complete)
        this.game.timers.push(timer)
        return timer
    }
};