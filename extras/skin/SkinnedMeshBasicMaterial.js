import {Color} from "../../src/math/Color";
import {Texture} from "../../src/renderers/Texture";
import {ColorUniform, FloatUniform, IntUniform, Matrix4Uniform, TextureUniform} from "../../src/renderers/Uniform";

const vertexDefault = /* glsl */ `
    attribute vec3 position;
    attribute vec3 normal;
    attribute vec2 uv;
    attribute vec4 skinIndex;
    attribute vec4 skinWeight;

    uniform mat4 modelMatrix;
    uniform mat4 projectViewMatrix;

    uniform sampler2D boneTexture;
    uniform int boneTextureSize;

    mat4 getBoneMatrix(const in float i) {
        float j = i * 4.0;
        float x = mod(j, float(boneTextureSize));
        float y = floor(j / float(boneTextureSize));

        float dx = 1.0 / float(boneTextureSize);
        float dy = 1.0 / float(boneTextureSize);

        y = dy * (y + 0.5);

        vec4 v1 = texture2D(boneTexture, vec2(dx * (x + 0.5), y));
        vec4 v2 = texture2D(boneTexture, vec2(dx * (x + 1.5), y));
        vec4 v3 = texture2D(boneTexture, vec2(dx * (x + 2.5), y));
        vec4 v4 = texture2D(boneTexture, vec2(dx * (x + 3.5), y));

        return mat4(v1, v2, v3, v4);
    }

    varying vec2 vUv;

    void main() {
        vUv = uv;

        mat4 boneMatX = getBoneMatrix(skinIndex.x);
        mat4 boneMatY = getBoneMatrix(skinIndex.y);
        mat4 boneMatZ = getBoneMatrix(skinIndex.z);
        mat4 boneMatW = getBoneMatrix(skinIndex.w);

        // Update position
        vec4 bindPos = vec4(position, 1.0);
        vec4 transformed = vec4(0.0);
        transformed += boneMatX * bindPos * skinWeight.x;
        transformed += boneMatY * bindPos * skinWeight.y;
        transformed += boneMatZ * bindPos * skinWeight.z;
        transformed += boneMatW * bindPos * skinWeight.w;
        vec3 pos = transformed.xyz;

        gl_Position = projectViewMatrix * modelMatrix * vec4(pos, 1.0);
    }
`;

const fragmentDefault = /* glsl */ `
    precision mediump float;

    uniform sampler2D uMap;

    varying vec2 vUv;

    void main() {
        vec3 tex = texture2D(uMap, vUv).rgb;

        gl_FragColor.rgb = tex;
        gl_FragColor.a = 1.0;
    }
`;

export class SkinnedMeshBasicMaterial extends Tiny.Material {
    constructor({
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
        super({
            vertex,
            fragment,
            uniforms: Object.assign({
                uMap: new TextureUniform(map),
                uColor: new ColorUniform(color),
                uOpacity: new FloatUniform(opacity),

                modelMatrix: new Matrix4Uniform(),
                projectViewMatrix: new Matrix4Uniform(),

                boneTexture: new TextureUniform(),
                boneTextureSize: new IntUniform(),
            }, uniforms),
            transparent,
            cullFace,
            frontFace,
            depthTest,
            depthWrite,
            depthFunc
        });
    }
}