import {Geometry} from "./Geometry";
import {Object3D} from "./Object3D";

export class Camera extends Object3D {
    constructor() {
        super();

        this.isCamera = true;
    }

    updateProjectionMatrix() {

    }
}

Tiny.Camera = Camera;