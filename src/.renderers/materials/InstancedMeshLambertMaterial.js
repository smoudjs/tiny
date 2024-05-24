import {
    ColorUniform,
    FloatUniform,
    Matrix4Uniform,
    TextureUniform,
    Vector3Uniform,
    Vector4Uniform
} from '../Uniform';

import { Material } from '../Material';
import { Texture } from '../Texture';
import { Color } from '../../math/Color';

var vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec3 position;
    attribute vec3 normal;
    
    attribute mat4 instanceMatrix;
    
    uniform mat4 projectViewMatrix;
    uniform mat4 modelMatrix;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
        vUv = uv;
    
        mat4 modelInstancedMatrix = modelMatrix * instanceMatrix;
    
        vNormal = mat3(modelInstancedMatrix) * normal;
    
        gl_Position = projectViewMatrix * modelInstancedMatrix * vec4(position, 1.0);
    }
`;

var fragment = /* glsl */ `
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
        vec4 tex = texture2D(uMap, vUv);
        
        float directional = max(dot(normal, normalize(directionalLightDirection)), 0.0);
        
        vec3 directLightColor = directionalLight.rgb * directionalLight.a * directional;
        
        vec3 ambLightColor = ambientLight.rgb * ambientLight.a;
        
        gl_FragColor.rgb = tex.rgb * (ambLightColor + directLightColor) * uColor;
        gl_FragColor.a = tex.a * uOpacity;
    }
`;

function InstancedMeshLambertMaterial({
    map = Texture.WHITE,
    color = Color.WHITE,
    opacity = 1,
    transparent = false,
    cullFace = WebGLRenderingContext.BACK,
    frontFace = WebGLRenderingContext.CCW,
    depthTest = true,
    depthWrite = true,
    depthFunc = WebGLRenderingContext.LESS
} = {}) {

    Material.call(this, {
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
            ambientLight: new Vector4Uniform()
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

InstancedMeshLambertMaterial.prototype = Object.create(Material.prototype);
InstancedMeshLambertMaterial.prototype.constructor = InstancedMeshLambertMaterial;

export { InstancedMeshLambertMaterial };
