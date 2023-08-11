import {Light} from "./Light";

export class DirectionalLight extends Light {
    constructor(color, intensity) {
        super(color, intensity);

        this.isDirectionalLight = true;
    }
}

Tiny.DirectionalLight = DirectionalLight;