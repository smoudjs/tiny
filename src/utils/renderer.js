var _isSetTimeOut, _onLoop, _timeOutID, _prevTime

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

    _isSetTimeOut = false;
    _onLoop = null;
    _timeOutID = null;

    _prevTime = 0
};

Tiny.RAF.prototype = {

    start: function ()
    {

        this.isRunning = true;

        var _this = this;

        if (!window.requestAnimationFrame || this.forceSetTimeOut)
        {
            _isSetTimeOut = true;

            _onLoop = function ()
            {
                return _this.updateSetTimeout();
            };

            _timeOutID = window.setTimeout(_onLoop, 0);
        }
        else
        {
            _isSetTimeOut = false;

            _onLoop = function (time)
            {
                
                return _this.updateRAF(time);
            };

            _timeOutID = window.requestAnimationFrame(_onLoop);
        }
    },

    updateRAF: function (rafTime)
    {
        if (this.isRunning)
        {
            this.game._update(Math.floor(rafTime), rafTime - _prevTime);

            _timeOutID = window.requestAnimationFrame(_onLoop);
        }
        _prevTime = rafTime

    },

    updateSetTimeout: function ()
    {
        var time = Date.now()
        if (this.isRunning)
        {
            this.game._update(time - this.paused, time - _prevTime);

            _timeOutID = window.setTimeout(_onLoop, this.game.time.timeToCall);
        }
        _prevTime = time
    },

    stop: function ()
    {
        if (_isSetTimeOut)
        {
            clearTimeout(_timeOutID);
        }
        else
        {
            window.cancelAnimationFrame(_timeOutID);
        }

        this.isRunning = false;
    },

    isSetTimeOut: function ()
    {
        return _isSetTimeOut;
    },

    isRAF: function ()
    {
        return (_isSetTimeOut === false);
    }

};