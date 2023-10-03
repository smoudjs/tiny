import {Vec3} from '../math/Vec3';
import {Quat} from '../math/Quat';
import {Mat4} from '../math/Mat4';
import {Euler} from '../math/Euler';

var _q1 = new Quat();
var _m1 = new Mat4();
var _target = new Vec3();

var _position = new Vec3();

function Object3D() {
    this.parent = null;
    this.children = [];
    this.visible = true;

    this.matrix = new Mat4();
    this.worldMatrix = new Mat4();
    this.matrixAutoUpdate = true;

    this.position = new Vec3();
    this.quaternion = new Quat();
    this.scale = new Vec3(1, 1, 1);
    this.rotation = new Euler();
    this.up = new Vec3(0, 1, 0);

    this.rotation._onChange(() => {
        this.quaternion.setFromEuler(this.rotation, false);
    });

    this.quaternion._onChange(() => {
        this.rotation.setFromQuaternion(this.quaternion, undefined, false);
    });
}

Object3D.prototype = {
    constructor: Object3D,

    isObject3D: true,

    clone: function (recursive) {
        return new this.constructor().copy(this, recursive);
    },

    copy: function (source, recursive) {
        if (recursive === undefined) recursive = true;

        this.up.copy(source.up);

        this.position.copy(source.position);
        this.quaternion.copy(source.quaternion);
        this.scale.copy(source.scale);

        this.matrix.copy(source.matrix);
        this.worldMatrix.copy(source.worldMatrix);

        this.matrixAutoUpdate = source.matrixAutoUpdate;

        this.name = source.name;

        if (recursive === true) {
            for (var i = 0; i < source.children.length; i++) {

                var child = source.children[i];

                this.add(child.clone());
            }
        }

        return this;
    },

    getWorldPosition(out) {
        out.x = this.worldMatrix.elements[12];
        out.y = this.worldMatrix.elements[13];
        out.z = this.worldMatrix.elements[14];

        return out;
    },

    getObjectByName: function (name = '') {
        var obj = null;

        this.traverse((child) => {
            if (child.name === name) {
                obj = child;
            }
        });

        return obj;
    },

    add: function (object) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }

            return this;
        }

        if (object.parent !== null) {
            object.parent.remove(object);
        }

        object.parent = this;

        this.children.push(object);
    },

    remove: function (object) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) {
                this.remove(arguments[i]);
            }

            return this;
        }

        const index = this.children.indexOf(object);

        if (index !== -1) {
            object.parent = null;

            this.children.splice(index, 1);
        }

        return this;
    },

    updateTransform: function (force) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        if (this.worldMatrixNeedsUpdate || force) {
            if (this.parent === null) this.worldMatrix.copy(this.matrix);
            else this.worldMatrix.multiplyMatrices(this.parent.worldMatrix, this.matrix);
            this.worldMatrixNeedsUpdate = false;
            force = true;
        }

        for (var i = 0, l = this.children.length; i < l; i++) {
            this.children[i].updateTransform(force);
        }
    },

    updateMatrix: function () {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.worldMatrixNeedsUpdate = true;
    },

    traverse: function (callback) {
        // Return true in callback to stop traversing children
        if (callback(this)) return;
        for (var i = 0, l = this.children.length; i < l; i++) {
            this.children[i].traverse(callback);
        }
    },

    decompose: function () {
        this.matrix.getTranslation(this.position);
        this.matrix.getRotation(this.quaternion);
        this.matrix.getScaling(this.scale);
        this.rotation.fromQuaternion(this.quaternion);
    },

    lookAt: function (x, y, z) {

        // This method does not support objects having non-uniformly-scaled parent(s)

        if (x.isVector3) {
            _target.copy(x);
        } else {
            _target.set(x, y, z);
        }

        var parent = this.parent;

        this.updateTransform(true, false);

        _position.setFromMatrixPosition(this.worldMatrix);

        if (this.isCamera || this.isLight) {

            _m1.lookAt(_position, _target, this.up);

        } else {

            _m1.lookAt(_target, _position, this.up);

        }

        this.quaternion.setFromRotationMatrix(_m1);

        if (parent) {

            _m1.extractRotation(parent.worldMatrix);
            _q1.setFromRotationMatrix(_m1);
            this.quaternion.premultiply(_q1.inverse());

        }
    }
}

export {Object3D};