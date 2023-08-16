import {ColorUniform, FloatUniform, Material, Matrix4Uniform, Texture, TextureUniform} from "../../core";
import {Color} from "../../math";
import {MeshLambertMaterial} from "./MeshLambertMaterial";

const vertex = /* glsl */ `
    attribute vec3 position;
    attribute float size;

    uniform mat4 projectViewMatrix;
    uniform mat4 modelMatrix;

    void main() {
        gl_Position = projectViewMatrix * modelMatrix * vec4(position, 1.0);
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
        } = {},
    ) {
        super({
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
        });
    }
}

Tiny.PointsMaterial = PointsMaterial;