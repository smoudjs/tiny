
Tiny.RAF = function (game, forceSetTimeOut)
{

    if (forceSetTimeOut === undefined) { forceSetTimeOut = false; }
    this.game = game;

    this.isRunning = false;
    this.forceSetTimeOut = forceSetTimeOut;

    var vendors = [
        'ms',
        'moz',
        'webkit',
        'o'
    ];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; x++)
    {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    this._isSetTimeOut = false;
    this._onLoop = null;
    this._timeOutID = null;

};

Tiny.RAF.prototype = {

    start: function ()
    {

        this.isRunning = true;

        var _this = this;

        if (!window.requestAnimationFrame || this.forceSetTimeOut)
        {
            this._isSetTimeOut = true;

            this._onLoop = function ()
            {
                return _this.updateSetTimeout();
            };

            this._timeOutID = window.setTimeout(this._onLoop, 0);
        }
        else
        {
            this._isSetTimeOut = false;

            this._onLoop = function (time)
            {
                return _this.updateRAF(time);
            };

            this._timeOutID = window.requestAnimationFrame(this._onLoop);
        }

    },

    updateRAF: function (rafTime)
    {

        if (this.isRunning)
        {

            this.game.update(Math.floor(rafTime));

            this._timeOutID = window.requestAnimationFrame(this._onLoop);
        }

    },

    updateSetTimeout: function ()
    {

        if (this.isRunning)
        {
            this.game.update(Date.now());

            this._timeOutID = window.setTimeout(this._onLoop, this.game.time.timeToCall);
        }

    },

    stop: function ()
    {

        if (this._isSetTimeOut)
        {
            clearTimeout(this._timeOutID);
        }
        else
        {
            window.cancelAnimationFrame(this._timeOutID);
        }

        this.isRunning = false;

    },

    isSetTimeOut: function ()
    {
        return this._isSetTimeOut;
    },

    isRAF: function ()
    {
        return (this._isSetTimeOut === false);
    }

};