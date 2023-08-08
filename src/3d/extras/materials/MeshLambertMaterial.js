import {Material, Texture} from "../../core";
import {Color} from "../../math";

const vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec3 position;
    attribute vec3 normal;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;
    uniform mat4 modelMatrix;

    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
        vUv = uv;
        vNormal = mat3(modelMatrix) * normal;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragment = /* glsl */ `
    precision highp float;
    
    uniform vec4 ambientLightColor;
    
    uniform vec4 directionalLightColor;
    uniform vec3 directionalLightDirection;

    uniform sampler2D uMap;
    uniform vec3 uColor;

    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
        vec3 normal = normalize(vNormal);
        vec3 tex = texture2D(uMap, vUv).rgb;
        
        float directional = max(dot(normal, normalize(directionalLightDirection)), 0.0);
        
        vec3 directLightColor = directionalLightColor.rgb * directionalLightColor.a * directional;
        
        vec3 ambLightColor = ambientLightColor.rgb * ambientLightColor.a;
        
        gl_FragColor.rgb = tex * uColor * (ambLightColor + directLightColor);
        gl_FragColor.a = 1.0;
    }
`;

export class MeshLambertMaterial extends Material {
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
        } = {}
    ) {
        super(gl, {
            vertex,
            fragment,
            uniforms: {
                uColor: {value: color.toArray()},
                uMap: {value: map},
                uOpacity: {value: opacity}
            },
            transparent,
            cullFace,
            frontFace,
            depthTest,
            depthWrite,
            depthFunc
        });

        this.isMeshLambertMaterial = true;
    }
}