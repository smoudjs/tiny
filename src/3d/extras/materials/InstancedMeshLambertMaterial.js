import {
    ColorUniform,
    FloatUniform,
    Material,
    Matrix4Uniform,
    Texture, TextureUniform,
    Vector3Uniform,
    Vector4Uniform
} from "../../core";

import {Color} from "../../math";

const vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec3 position;
    attribute vec3 normal;
    
    attribute mat4 instancedMatrix;
    
    uniform mat4 projectViewMatrix;
    uniform mat4 modelMatrix;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
        vUv = uv;
    
        mat4 modelInstancedMatrix = instancedMatrix * modelMatrix;
    
        vNormal = mat3(modelInstancedMatrix) * normal;
    
        gl_Position = projectViewMatrix * modelInstancedMatrix * vec4(position, 1.0);
    }
`;

const fragment = /* glsl */ `
    precision highp float;
    
    uniform vec4 ambientLight;
    
    uniform vec4 directionalLight;
    uniform vec3 directionalLightDirection;

    uniform sampler2D uMap;
    uniform vec3 uColor;
    uniform float uOpacity;

    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
        vec3 normal = normalize(vNormal);
        vec3 tex = texture2D(uMap, vUv).rgb;
        
        float directional = max(dot(normal, normalize(directionalLightDirection)), 0.0);
        
        vec3 directLightColor = directionalLight.rgb * directionalLight.a * directional;
        
        vec3 ambLightColor = ambientLight.rgb * ambientLight.a;
        
        gl_FragColor.rgb = tex * uColor * (ambLightColor + directLightColor);
        gl_FragColor.a = uOpacity;
    }
`;

export class InstancedMeshLambertMaterial extends Material {
    constructor(
        {
            map = Texture.WHITE,
            color = Color.WHITE,
            opacity = 1,
            transparent = false,
            cullFace = WebGLRenderingContext.BACK,
            frontFace = WebGLRenderingContext.CCW,
            depthTest = true,
            depthWrite = true,
            depthFunc = WebGLRenderingContext.LESS,
        } = {}
    ) {
        super({
            vertex,
            fragment,
            uniforms: {
                uColor: new ColorUniform(color),
                uMap: new TextureUniform(map),
                uOpacity: new FloatUniform(opacity),

                modelMatrix: new Matrix4Uniform(),
                projectViewMatrix: new Matrix4Uniform(),

                directionalLight: new Vector4Uniform(),
                directionalLightDirection: new Vector3Uniform(),
                ambientLight: new Vector4Uniform(),
            },
            transparent,
            cullFace,
            frontFace,
            depthTest,
            depthWrite,
            depthFunc
        });

        // @TODO check if we need this flag?
        this.isInstancedMeshLambertMaterial = true;
    }
}

Tiny.InstancedMeshLambertMaterial = InstancedMeshLambertMaterial;