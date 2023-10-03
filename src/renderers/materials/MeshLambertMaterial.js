import {
    ColorUniform,
    FloatUniform,
    Matrix4Uniform,
    TextureUniform,
    Vector3Uniform,
    Vector4Uniform
} from '../Uniform';

import {Material} from '../Material';
import {Texture} from '../Texture';
import {Color} from '../../math/Color';

var vertexDefault = /* glsl */ `
    attribute vec2 uv;
    attribute vec3 position;
    attribute vec3 normal;
    
    uniform mat4 projectViewMatrix;
    uniform mat4 modelMatrix;

    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
        vUv = uv;
        vNormal = mat3(modelMatrix) * normal;
        
        gl_Position = projectViewMatrix * modelMatrix * vec4(position, 1.0);
    }
`;

var fragmentDefault = /* glsl */ `
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

function MeshLambertMaterial({
     vertex = vertexDefault,
     fragment = fragmentDefault,
     map = Texture.WHITE,
     color = Color.WHITE,
     opacity = 1,
     transparent = false,
     cullFace = WebGLRenderingContext.BACK,
     frontFace = WebGLRenderingContext.CCW,
     depthTest = true,
     depthWrite = true,
     depthFunc = WebGLRenderingContext.LESS,
     uniforms = {}
 } = {}) {
    Material.call(this, {
        vertex,
        fragment,
        uniforms: Object.assign({
            uColor: new ColorUniform(color),
            uMap: new TextureUniform(map),
            uOpacity: new FloatUniform(opacity),

            modelMatrix: new Matrix4Uniform(),
            projectViewMatrix: new Matrix4Uniform(),

            directionalLight: new Vector4Uniform(),
            directionalLightDirection: new Vector3Uniform(),
            ambientLight: new Vector4Uniform()
        }, uniforms),
        transparent,
        cullFace,
        frontFace,
        depthTest,
        depthWrite,
        depthFunc
    });

    this.isMeshLambertMaterial = true;
}

MeshLambertMaterial.prototype = Object.create(Material.prototype);
MeshLambertMaterial.prototype.constructor = MeshLambertMaterial;

export {MeshLambertMaterial};
