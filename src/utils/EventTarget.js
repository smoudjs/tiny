function EventListeners() {
    this.a = [];
    this.n = 0;
}

var EventTarget = {
    call: function (obj) {
        if (obj) {
            obj = obj.prototype || obj;
            EventTarget.mixin(obj);
        }
    },

    mixin: function (obj) {
        obj = obj.prototype || obj;
        
        obj.on = function (event, fn, context, once) {
            const listeners_events = (this._listeners = this._listeners || {});
            var listeners = listeners_events[event];

            if (!listeners) {
                listeners = listeners_events[event] = new EventListeners();
            }

            listeners.a.push(fn, context || null, once || false);
            listeners.n += 3;
        };

        obj.once = function (event, fn, context) {
            this.on(event, fn, context, true);
        };

        obj.hasEventListener = function (event, fn, context) {
            const listeners_events = this._listeners;

            if (!listeners_events) return false;

            var listeners = listeners_events[event];

            if (listeners) {
                const indexOf = listeners.a.indexOf(fn);
                return indexOf > -1 && listeners.a[indexOf + 1] === (context || null);
            }

            return false;
        };

        obj.clearEventListeners = function (event) {
            if (!this._listeners) return;

            if (event) {
                delete this._listeners[event];
            } else {
                delete this._listeners;
            }
        };

        obj.off = function (event, fn, context) {
            const listeners_events = this._listeners;

            if (!listeners_events) return;

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
            const listeners_events = this._listeners;

            if (!listeners_events) return;

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

export { EventTarget };
