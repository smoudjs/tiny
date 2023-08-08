import { Vector3 } from '../math/Vector3';
import { Quaternion } from '../math/Quaternion';
import { Matrix4 } from '../math/Matrix4';
import { Euler } from '../math/Euler';

var _object3DId = 0;

var _v1 = new Vector3();
var _q1 = new Quaternion();
var _m1 = new Matrix4();
var _target = new Vector3();

var _position = new Vector3();
var _scale = new Vector3();
var _quaternion = new Quaternion();

var _xAxis = new Vector3( 1, 0, 0 );
var _yAxis = new Vector3( 0, 1, 0 );
var _zAxis = new Vector3( 0, 0, 1 );

var _addedEvent = { type: 'added' };
var _removedEvent = { type: 'removed' };

export class Object3D {
    constructor() {
        this.parent = null;
        this.children = [];
        this.visible = true;

        this.matrix = new Matrix4();
        this.worldMatrix = new Matrix4();
        this.matrixAutoUpdate = true;

        this.position = new Vector3();
        this.quaternion = new Quaternion();
        this.scale = new Vector3(1, 1, 1);
        this.rotation = new Euler();
        this.up = new Vector3(0, 1, 0);

        this.rotation._onChange( () => {
            this.quaternion.setFromEuler( this.rotation, false );
        });

        this.quaternion._onChange( () => {
            this.rotation.setFromQuaternion( this.quaternion, undefined, false );
        });
    }

    clone(recursive) {
        return new this.constructor().copy(this, recursive);
    }

    copy() {

    }

    getObjectByName(name = '') {
        let obj = null;

        this.traverse((child) => {
            if (child.name === name) {
                obj = child;
            }
        });

        return obj;
    }

    setParent(parent, notifyParent = true) {
        if (this.parent && parent !== this.parent) this.parent.removeChild(this, false);
        this.parent = parent;
        if (notifyParent && parent) parent.add(this, false);
    }

    add(child, notifyChild = true) {
        if (!~this.children.indexOf(child)) this.children.push(child);
        if (notifyChild) child.setParent(this, false);
    }

    removeChild(child, notifyChild = true) {
        if (!!~this.children.indexOf(child)) this.children.splice(this.children.indexOf(child), 1);
        if (notifyChild) child.setParent(null, false);
    }

    updateMatrixWorld(force) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        if (this.worldMatrixNeedsUpdate || force) {
            if (this.parent === null) this.worldMatrix.copy(this.matrix);
            else this.worldMatrix.multiplyMatrices(this.parent.worldMatrix, this.matrix);
            this.worldMatrixNeedsUpdate = false;
            force = true;
        }

        for (let i = 0, l = this.children.length; i < l; i++) {
            this.children[i].updateMatrixWorld(force);
        }
    }

    updateMatrix() {
        this.matrix.compose(this.position, this.quaternion, this.scale);
        this.worldMatrixNeedsUpdate = true;
    }

    traverse(callback) {
        // Return true in callback to stop traversing children
        if (callback(this)) return;
        for (let i = 0, l = this.children.length; i < l; i++) {
            this.children[i].traverse(callback);
        }
    }

    decompose() {
        this.matrix.getTranslation(this.position);
        this.matrix.getRotation(this.quaternion);
        this.matrix.getScaling(this.scale);
        this.rotation.fromQuaternion(this.quaternion);
    }

    lookAt (x, y, z) {

        // This method does not support objects having non-uniformly-scaled parent(s)

        if ( x.isVector3 ) {
            _target.copy( x );
        } else {
            _target.set( x, y, z );
        }

        var parent = this.parent;

        this.updateMatrixWorld( true, false );

        _position.setFromMatrixPosition( this.worldMatrix );

        if ( this.isCamera || this.isLight ) {

            _m1.lookAt( _position, _target, this.up );

        } else {

            _m1.lookAt( _target, _position, this.up );

        }

        this.quaternion.setFromRotationMatrix( _m1 );

        if ( parent ) {

            _m1.extractRotation( parent.worldMatrix );
            _q1.setFromRotationMatrix( _m1 );
            this.quaternion.premultiply( _q1.inverse() );

        }
    }
}
