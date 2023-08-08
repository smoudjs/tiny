import {Material, Texture} from "../../core";
import {Color} from "../../math";

const vertex = /* glsl */ `
    attribute vec3 position;
    attribute float size;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;

    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size;
    }
`;

const fragment = /* glsl */ `
    precision highp float;

    uniform sampler2D uMap;
    uniform vec3 uColor;
    uniform float uOpacity;
    
    void main() {
      vec4 tex = texture2D(uMap, gl_PointCoord);
        
      gl_FragColor = tex * vec4(uColor, uOpacity);
    }
`;

export class PointsMaterial extends Material {
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