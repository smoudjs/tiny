import {ColorUniform, FloatUniform, Matrix4Uniform, TextureUniform} from "../Uniform";

import {Material} from '../Material';
import {Texture} from '../Texture';
import {Color} from '../../math/Color';
import {InstancedMeshLambertMaterial} from "./InstancedMeshLambertMaterial";

var vertex = /* glsl */ `
    attribute vec3 position;
    attribute float size;

    uniform mat4 projectViewMatrix;
    uniform mat4 modelMatrix;

    void main() {
        gl_Position = projectViewMatrix * modelMatrix * vec4(position, 1.0);
        gl_PointSize = size;
    }
`;

var fragment = /* glsl */ `
    precision highp float;

    uniform sampler2D uMap;
    uniform vec3 uColor;
    uniform float uOpacity;
    
    void main() {
      vec4 tex = texture2D(uMap, gl_PointCoord);
        
      gl_FragColor = tex * vec4(uColor, uOpacity);
    }
`;

function PointsMaterial(
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
        depthFunc,
    })
}

PointsMaterial.prototype = Object.create(Material.prototype);
PointsMaterial.prototype.constructor = PointsMaterial;

export {PointsMaterial};