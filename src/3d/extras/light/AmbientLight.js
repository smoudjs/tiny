import {Light} from "./Light";

export class AmbientLight extends Light {
    constructor(color, intensity) {
        super(color, intensity);

        this.isAmbientLight = true;
    }
}