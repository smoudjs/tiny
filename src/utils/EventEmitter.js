function EventListeners() {
    this.a = [];
    this.n = 0;
}

Tiny.EventEmitter = {
    call: function (obj) {
        if (obj) {
            obj = obj.prototype || obj;
            Tiny.EventEmitter.mixin(obj);
        }
    },

    mixin: function (obj) {
        const listeners_events = {};

        function pushListener(event, fn, context, once) {
            var listeners = listeners_events[event];

            if (!listeners) {
                listeners = listeners_events[event] = new EventListeners();
            }

            listeners.a.push(fn, context || null, once || false);
            listeners.n += 3;
        }

        obj.once = function (event, fn, context) {
            pushListener(event, fn, context, true);
        };

        obj.on = pushListener;

        obj.off = function (event, fn, context) {
            var listeners = listeners_events[event];

            if (!listeners) return;

            var fnArray = listeners_events[event].a;

            if (!fn) {
                fnArray.length = 0;
            } else if (!context) {
                for (var i = 0; i < fnArray.length; i += 3) {
                    if (fnArray[i] == fn) {
                        fnArray.splice(i, 3);
                        i -= 3;
                    }
                }
            } else {
                for (var i = 0; i < fnArray.length; i += 3) {
                    if (fnArray[i] == fn && fnArray[i + 1] == context) {
                        fnArray.splice(i, 3);
                        i -= 3;
                    }
                }
            }

            if (fnArray.length == 0) {
                delete listeners_events[event];
            }
        };

        obj.emit = function (event, a1, a2, a3) {
            var listeners = listeners_events[event];

            if (!listeners) return;

            var fnArray = listeners.a;
            listeners.n = 0;

            var len = arguments.length;
            var fn, ctx;

            for (var i = 0; i < fnArray.length - listeners.n; i += 3) {
                fn = fnArray[i];
                ctx = fnArray[i + 1];

                if (fnArray[i + 2]) {
                    fnArray.splice(i, 3);
                    i -= 3;
                }

                if (len <= 1) fn.call(ctx);
                else if (len == 2) fn.call(ctx, a1);
                else if (len == 3) fn.call(ctx, a1, a2);
                else fn.call(ctx, a1, a2, a3);

                // if (fnArray[i + 2])
                // {
                //     fnArray.splice(i, 3);
                //     i -= 3;
                // }
            }

            if (fnArray.length == 0) {
                delete listeners_events[event];
            }
        };
    }
};
