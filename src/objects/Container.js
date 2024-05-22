import { EventTarget } from '../utils/EventTarget.js';

// var _addedEvent = { type: 'added' };
// var _removedEvent = { type: 'removed' };

function Container() {
    EventTarget.mixin(this);
    this.parent = null;
    this.children = [];
}

Object.assign(Container.prototype, {
    constructor: Container,

    isContainer: true,

    add: function (object) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }

            return this;
        }

        if (object === this) {
            // console.error("Tiny.Container.add: object can't be added as a child of itself.", object);
            return this;
        }

        if (object && object.isObject) {
            if (object.parent !== null) {
                object.parent.remove(object);
            }

            object.parent = this;
            this.children.push(object);

            // console.log(object);
            object.emit('added', this);
        } else {
            // console.error('Tiny.Container.add: object not an instance of Tiny.Object.', object);
        }

        return this;
    },

    remove: function (object) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.remove(arguments[i]);
            }

            return this;
        }

        var index = this.children.indexOf(object);

        if (index !== -1) {
            object.parent = null;
            this.children.splice(index, 1);

            object.emit('removed');
        }

        return this;
    },

    // attach: function (object) {
    //     // adds object as a child of this, while maintaining the object's world transform

    //     this.updateWorldMatrix(true, false);

    //     _m1.getInverse(this.matrixWorld);

    //     if (object.parent !== null) {
    //         object.parent.updateWorldMatrix(true, false);

    //         _m1.multiply(object.parent.matrixWorld);
    //     }

    //     object.applyMatrix(_m1);

    //     object.updateWorldMatrix(false, false);

    //     this.add(object);

    //     return this;
    // },

    getObjectById: function (id) {
        return this.getObjectByProperty('id', id);
    },

    getObjectByName: function (name) {
        return this.getObjectByProperty('name', name);
    },

    getObjectByProperty: function (name, value) {
        if (this[name] === value) return this;

        for (var i = 0, l = this.children.length; i < l; i++) {
            var child = this.children[i];
            var object = child.getObjectByProperty(name, value);

            if (object !== undefined) {
                return object;
            }
        }

        return undefined;
    },

    traverse: function (callback) {
        callback(this);

        var children = this.children;

        for (var i = 0, l = children.length; i < l; i++) {
            children[i].traverse(callback);
        }
    },

    traverseVisible: function (callback) {
        if (this.visible === false) return;

        callback(this);

        var children = this.children;

        for (var i = 0, l = children.length; i < l; i++) {
            children[i].traverseVisible(callback);
        }
    },

    // traverseAncestors: function (callback) {
    //     var parent = this.parent;

    //     if (parent !== null) {
    //         callback(parent);

    //         parent.traverseAncestors(callback);
    //     }
    // },

    clone: function () {
        return new this.constructor().copy(this);
    },

    copy: function (source) {
        for (var i = 0; i < source.children.length; i++) {
            var child = source.children[i];
            this.add(child.clone());
        }

        return this;
    },

    dispose: function (options) {
        var i = this.children.length;

        while (i--) {
            this.children[i].parent = null;
            this.children[i].emit('removed', this);
            this.children[i].dispose(options);
        }

        this.children.length = 0;

        if (this.parent) {
            this.parent.remove(this);
            this.parent = null;
        }
    }
});

export { Container };
