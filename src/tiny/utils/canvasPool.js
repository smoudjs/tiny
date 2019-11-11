
Tiny.CanvasPool = {

    create: function (parent, width, height)
    {

        var idx = Tiny.CanvasPool.getFirst();
        var canvas;

        if (idx === -1)
        {
            var container = {
                parent: parent,
                canvas: document.createElement('canvas')
            };

            Tiny.CanvasPool.pool.push(container);

            canvas = container.canvas;
        }
        else
        {
            Tiny.CanvasPool.pool[idx].parent = parent;

            canvas = Tiny.CanvasPool.pool[idx].canvas;
        }

        if (width !== undefined)
        {
            canvas.width = width;
            canvas.height = height;
        }

        return canvas;

    },

    getFirst: function ()
    {

        var pool = Tiny.CanvasPool.pool;

        for (var i = 0; i < pool.length; i++)
        {
            if (!pool[i].parent)
            {
                return i;
            }
        }

        return -1;

    },

    remove: function (parent)
    {

        var pool = Tiny.CanvasPool.pool;

        for (var i = 0; i < pool.length; i++)
        {
            if (pool[i].parent === parent)
            {
                pool[i].parent = null;
                pool[i].canvas.width = 1;
                pool[i].canvas.height = 1;
            }
        }

    },

    removeByCanvas: function (canvas)
    {

        var pool = Tiny.CanvasPool.pool;

        for (var i = 0; i < pool.length; i++)
        {
            if (pool[i].canvas === canvas)
            {
                pool[i].parent = null;
                pool[i].canvas.width = 1;
                pool[i].canvas.height = 1;
            }
        }

    },

    getTotal: function ()
    {

        var pool = Tiny.CanvasPool.pool;
        var c = 0;

        for (var i = 0; i < pool.length; i++)
        {
            if (pool[i].parent)
            {
                c++;
            }
        }

        return c;

    },

    getFree: function ()
    {

        var pool = Tiny.CanvasPool.pool;
        var c = 0;

        for (var i = 0; i < pool.length; i++)
        {
            if (!pool[i].parent)
            {
                c++;
            }
        }

        return c;

    },

    log: function ()
    {

        console.log('CanvasPool: %s used, %s free, %s total', this.getTotal(), this.getFree(), this.pool.length);

    }

};

Tiny.CanvasPool.pool = [];

Object.defineProperty(Tiny.CanvasPool, 'length', {
    get: function ()
    {
        return this.pool.length;
    }
});