import {Material, Texture} from "../../core";
import {Color} from "../../math";

const vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec3 position;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragment = /* glsl */ `
    precision highp float;

    uniform sampler2D uMap;
    uniform vec3 uColor;
    uniform float uOpacity;

    varying vec2 vUv;

    void main() {
        vec4 tex = texture2D(uMap, vUv);
        
        gl_FragColor = tex * vec4(uColor, uOpacity);
    }
`;

export class MeshBasicMaterial extends Material {
    constructor(
        gl,
        {
            map = Texture.WHITE,
            color = Color.WHITE,
            opacity = 1,
            transparent = false,
            cullFace = gl.BACK,
            frontFace = gl.CCW,
            depthTest = true,
            depthWrite = true,
            depthFunc = gl.LESS,
        } = {},
    ) {
        super(gl, {
            vertex,
            fragment,
            uniforms: {
                uMap: {value: map},
                uColor: {value: color.toArray()},
                uOpacity: {value: opacity},
            },
            transparent,
            cullFace,
            frontFace,
            depthTest,
            depthWrite,
            depthFunc,
        });
    }
}