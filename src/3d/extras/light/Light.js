import {Object3D} from "../../core";
import {Color} from "../../math";

export class Light extends Object3D {
    constructor(color = new Color('#fff'), intensity = 1) {
        super();

        this.color = color;
        this.intensity = intensity;
    }
}