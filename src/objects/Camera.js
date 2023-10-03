import {Mat4} from "../math/Mat4";
import {Object3D} from "./Object3D";

function Camera() {
    Object3D.call(this);

    this.isCamera = true;
    this.projectMatrixDirty = false;
    this.matrixWorldInverse = new Mat4();
}

Camera.prototype = Object.assign(Object.create(Object3D.prototype), {
    constructor: Camera,

    updateProjectionMatrix: function () {
        this.projectMatrixDirty = true;
    },

    updateTransform: function (force) {
        Object3D.prototype.updateTransform.call(this, force);

        this.matrixWorldInverse.getInverse(this.worldMatrix);
    }
});

export {Camera};