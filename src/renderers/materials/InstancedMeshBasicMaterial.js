import {
    ColorUniform,
    FloatUniform,
    Matrix4Uniform,
    TextureUniform,
} from "../Uniform";

import { Material } from '../Material';
import { Texture } from '../Texture';
import { Color } from '../../math/Color';

var vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec3 position;
    
    attribute mat4 instanceMatrix;

    uniform mat4 projectViewMatrix;
    uniform mat4 modelMatrix;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        
        gl_Position = projectViewMatrix * instanceMatrix * modelMatrix * vec4(position, 1.0);
    }
`;

var fragment = /* glsl */ `
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

function InstancedMeshBasicMaterial(
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
    Material.call(this, {
        vertex,
        fragment,
        uniforms: {
            uMap: new TextureUniform(map),
            uColor: new ColorUniform(color),
            uOpacity: new FloatUniform(opacity),

            modelMatrix: new Matrix4Uniform(),
            projectViewMatrix: new Matrix4Uniform(),
        },
        transparent,
        cullFace,
        frontFace,
        depthTest,
        depthWrite,
        depthFunc
    });

    // @TODO check if we need this flag?
    this.InstancedMeshBasicMaterial = true;
}

InstancedMeshBasicMaterial.prototype = Object.create(Material.prototype);
InstancedMeshBasicMaterial.prototype.constructor = InstancedMeshBasicMaterial;

export {InstancedMeshBasicMaterial};