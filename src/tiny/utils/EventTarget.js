Tiny.EventTarget = {

    call: function callCompat(obj) {
        if(obj) {
            obj = obj.prototype || obj;
            Tiny.EventTarget.mixin(obj);
        }
    },

    mixin: function mixin(obj) {

        obj.listeners = function listeners(eventName) {
            this._listeners = this._listeners || {};

            return this._listeners[eventName] ? this._listeners[eventName].slice() : [];
        };

        obj.emit = obj.dispatchEvent = function emit(eventName, data) {
            this._listeners = this._listeners || {};

            //backwards compat with old method ".emit({ type: 'something' })"
            if(typeof eventName === 'object') {
                data = eventName;
                eventName = eventName.type;
            }

            //ensure we are using a real Tiny event
            if(!data || data.__isEventObject !== true) {
                data = new Tiny.Event(this, eventName, data);
            }

            //iterate the listeners
            if(this._listeners && this._listeners[eventName]) {
                var listeners = this._listeners[eventName].slice(0),
                    length = listeners.length,
                    fn = listeners[0],
                    i;

                for(i = 0; i < length; fn = listeners[++i]) {
                    //call the event listener
                    fn.call(this, data);

                    //if "stopImmediatePropagation" is called, stop calling sibling events
                    if(data.stoppedImmediate) {
                        return this;
                    }
                }

                //if "stopPropagation" is called then don't bubble the event
                if(data.stopped) {
                    return this;
                }
            }

            //bubble this event up the scene graph
            if(this.parent && this.parent.emit) {
                this.parent.emit.call(this.parent, eventName, data);
            }

            return this;
        };

        obj.on = obj.addEventListener = function on(eventName, fn) {
            this._listeners = this._listeners || {};

            (this._listeners[eventName] = this._listeners[eventName] || [])
                .push(fn);

            return this;
        };

        obj.once = function once(eventName, fn) {
            this._listeners = this._listeners || {};

            var self = this;
            function onceHandlerWrapper() {
                fn.apply(self.off(eventName, onceHandlerWrapper), arguments);
            }
            onceHandlerWrapper._originalHandler = fn;

            return this.on(eventName, onceHandlerWrapper);
        };

        obj.off = obj.removeEventListener = function off(eventName, fn) {
            this._listeners = this._listeners || {};

            if(!this._listeners[eventName])
                return this;

            var list = this._listeners[eventName],
                i = fn ? list.length : 0;

            while(i-- > 0) {
                if(list[i] === fn || list[i]._originalHandler === fn) {
                    list.splice(i, 1);
                }
            }

            if(list.length === 0) {
                delete this._listeners[eventName];
            }

            return this;
        };

        obj.removeAllListeners = function removeAllListeners(eventName) {
            this._listeners = this._listeners || {};

            if(!this._listeners[eventName])
                return this;

            delete this._listeners[eventName];

            return this;
        };
    }
};

Tiny.Event = function(target, name, data) {
    //for duck typing in the ".on()" function
    this.__isEventObject = true;

    this.stopped = false;

    this.stoppedImmediate = false;

    this.target = target;

    this.type = name;

    this.data = data;

    this.content = data;

    this.timeStamp = Date.now();
};

Tiny.Event.prototype.stopPropagation = function stopPropagation() {
    this.stopped = true;
};

Tiny.Event.prototype.stopImmediatePropagation = function stopImmediatePropagation() {
    this.stoppedImmediate = true;
};