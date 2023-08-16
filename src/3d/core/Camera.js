import {Object3D} from "./Object3D";

export class Camera extends Object3D {
    constructor() {
        super();

        this.isCamera = true;
        this.projectMatrixDirty = false;
    }

    updateProjectionMatrix() {
        this.projectMatrixDirty = true;
    }
}

Tiny.Camera = Camera;