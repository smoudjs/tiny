import { GLShader } from '../../core/GLShader.js';

const vertexSrc = [
    'precision highp float;',
    'attribute vec2 aVertexPosition;',
    'attribute vec4 aColor;',

    'uniform mat3 translationMatrix;',
    'uniform mat3 projectionMatrix;',

    'uniform float alpha;',
    'uniform vec3 tint;',

    'varying vec4 vColor;',

    'void main(void){',
    '   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, -1.0, 1.0);',
    '   vColor = aColor * vec4(tint * alpha, alpha);',
    '}'
].join('\n');

const fragmentSrc = [
    'precision mediump float;',
    'varying vec4 vColor;',
    'void main(void){',
    '   gl_FragColor = vColor;',
    '}'
].join('\n');

/**
 * This shader is used to draw simple primitive shapes for {@link PIXI.Graphics}.
 *
 * @class
 * @memberof PIXI
 * @extends PIXI.Shader
 */
function PrimitiveShader(renderer) {
    // const uniforms = {
    //     projectionMatrix: { value: new Mat3() },
    //     translationMatrix: { value: new Mat3() },
    //     tint: { value: null },
    //     alpha: { value: null }
    // };

    GLShader.call(this, renderer, vertexSrc, fragmentSrc);
}

export { PrimitiveShader };
