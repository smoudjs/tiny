import {
    ColorUniform,
    FloatUniform,
    Matrix4Uniform,
    TextureUniform,
} from '../Uniform';

import {Material} from '../Material';
import {Texture} from '../Texture';
import {Color} from '../../math/Color';

var vertexDefault = /* glsl */ `
    attribute vec2 uv;
    attribute vec3 position;

    uniform mat4 projectViewMatrix;
    uniform mat4 modelMatrix;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        
        gl_Position = projectViewMatrix * modelMatrix * vec4(position, 1.0);
    }
`;

var fragmentDefault = /* glsl */ `
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

function MeshBasicMaterial({
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
            uMap: new TextureUniform(map),
            uColor: new ColorUniform(color),
            uOpacity: new FloatUniform(opacity),

            modelMatrix: new Matrix4Uniform(),
            projectViewMatrix: new Matrix4Uniform()
        }, uniforms),
        transparent,
        cullFace,
        frontFace,
        depthTest,
        depthWrite,
        depthFunc
    })
}

MeshBasicMaterial.prototype = Object.create(Material.prototype);
MeshBasicMaterial.prototype.constructor = MeshBasicMaterial;

export {MeshBasicMaterial};
