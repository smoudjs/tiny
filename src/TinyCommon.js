
var _tween_enabled = false;

var noop = function() {};

var COMMON = {

    _preboot: function(width, height, enableRAF, states)
    {
        this.height = height || 720;
        this.width = width || 430;

        this.callbackContext = this;
        states = states || {};
        this.state = 0;
        this.preload = this.preload || states.preload || noop;
        this.create = this.create || states.create || noop;
        this.update = this.update || states.update || noop;
        this._resize_cb = this._resize_cb || states.resize || noop;
        this._destroy_cb = this._destroy_cb || states.destroy || noop;

        this.stage = new Tiny.Stage(this);


        if (typeof window.TWEEN == "object") 
        {
            _tween_enabled = true;
        }

        this._raf = enableRAF && Tiny.RAF;


        this.time = {
            timeToCall: 15
        }

        this.paused = false;
        this.pauseDuration = 0;
        this.tweens = [];
    },

    _boot: function()
    {
        if (Tiny.Loader) 
        {
            this.load = new Tiny.Loader(this)
        }

        if (Tiny.ObjectCreator) 
        {
            this.add = new Tiny.ObjectCreator(this)
        }

        if (Tiny.Input) 
        {
            this.input = new Tiny.Input(this)
        }

        if (Tiny.TimerCreator) 
        {
            this.timer = new Tiny.TimerCreator(this)
        }

        if (Tiny.Particles) 
        {
            this.particles = new Tiny.Particles(this)
        }

        if (this._raf) 
        {
            this.raf = new Tiny.RAF(this);
        }

        Tiny.defaultRenderer = this.renderer
        var self = this
        setTimeout(function()
        {
            self._preload()
        }, 0)
    },

    _resize: function(width, height, scale)
    {
        this.width = width || this.width;
        this.height = height || this.height;

        this.renderer.resize(this.width, this.height);

        if (this.state > 0) 
        {
            this._resize_cb.call(this.callbackContext, this.width, this.height, scale);
        }
    },

    _create: function()
    {
        this.create.call(this.callbackContext);

        if (this._raf) 
        {
            this.raf.start();
        }

        this.state = 2;
    },

    pause: function()
    {
        if (this._raf) 
        {
            this.raf.reset();
        }

        if (!this.paused)
        {
            if (_tween_enabled)
            {
                this.tweens.length = 0;

                for (var k in TWEEN._tweens)
                {
                    this.tweens.push(TWEEN._tweens[k]);
                    TWEEN._tweens[k].pause();
                }
            }

            this.paused = true;
        }
    },


    resume: function()
    {
        if (this._raf) 
        {
            this.raf.reset();
        }
        
        if (this.paused)
        {
            if (_tween_enabled)
            {
                this.tweens.forEach(function(tween)
                {
                    tween.resume();
                })

                this.tweens.length = 0;
            }

            this.paused = false;
        }
    },

    _update: function(time, delta)
    {
        if (!this.paused)
        {
            this.update.call(this.callbackContext, time, delta);

            if (_tween_enabled) 
            {
                TWEEN.update();
            }

            if (this.timers) 
            {
                this.timers.forEach(function(e)
                {
                    e.update(delta);
                })
            }

            this.stage.updateTransform();

            if (this.particles)
            {
                this.particles.update(delta);
            }
        }
        else
        {
            this.pauseDuration += delta
            this.stage.updateTransform();
        }

        this._render();
    },

    _destroy: function()
    {
        if (Tiny.Input) 
        {
            this.input.destroy();
        }

        if (_tween_enabled) 
        {
            TWEEN.removeAll();
        }

        if (this.timers) 
        {
            this.timer.removeAll();
        }

        this.paused = true;
        this.stage.destroy();

        for (var y in Tiny.TextureCache) Tiny.TextureCache[y].destroy(true);

        for (var y in Tiny.BaseTextureCache) Tiny.BaseTextureCache[y].destroy();

        Tiny.BaseTextureCache = [];
        Tiny.TextureCache = [];
        this.stage.children = [];
        this.update();
        this.renderer.destroy(true);

        if (this._raf) 
        {
            this.raf.stop();
        }

        this._destroy_cb.call(this.callbackContext);
    }

}

COMMON.stop = COMMON.pause;
COMMON.play = COMMON.resume;
COMMON.setSize = COMMON.resize;

for (var key in COMMON) 
{
    Tiny.prototype[key] = COMMON[key];
}