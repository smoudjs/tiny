import {Object3D} from "./Object3D";

function Camera() {
    Object3D.call(this);

    this.isCamera = true;
    this.projectMatrixDirty = false;
}

Camera.prototype = Object.assign(Object.create(Object3D.prototype), {
    constructor: Camera,

    updateProjectionMatrix: function () {
        this.projectMatrixDirty = true;
    }
});

Tiny.Camera = Camera;

export {Camera};