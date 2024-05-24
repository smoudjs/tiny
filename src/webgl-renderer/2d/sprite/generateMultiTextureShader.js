// import Shader from '../../Shader';
// import { readFileSync } from 'fs';
// import { join } from 'path';
import { compileProgram } from '../../utils/compileProgram.js';
import { device } from '../../../utils/Device.js';
import { Mat3 } from '../../../math/Mat3.js';
import { GLShader } from '../core/GLShader.js';

const fragTemplate = [
    'varying vec2 vTextureCoord;',
    'varying vec4 vColor;',
    'varying float vTextureId;',
    'uniform sampler2D uSamplers[%count%];',

    'void main(void){',
    'vec4 color;',
    '%forloop%',
    'gl_FragColor = color * vColor;',
    '}'
].join('\n');

const vertexSrc = [
    'precision highp float;',
    'attribute vec2 aVertexPosition;',
    'attribute vec2 aTextureCoord;',
    'attribute vec4 aColor;',
    'attribute float aTextureId;',

    'uniform mat3 projectionMatrix;',

    'varying vec2 vTextureCoord;',
    'varying vec4 vColor;',
    'varying float vTextureId;',

    'void main(void){',
    '    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, -1.0, 1.0);',

    '    vTextureCoord = aTextureCoord;',
    '    vTextureId = aTextureId;',
    '    vColor = aColor;',
    '}'
].join('\n');

function checkPrecision(src, def) {
    if (src.trim().substring(0, 9) !== 'precision') {
        return `precision ${def} float;\n${src}`;
    }

    return src;
}

export function generateMultiTextureShader(renderer, maxTextures) {
    const gl = renderer.gl;
    let fragmentSrc = fragTemplate;

    fragmentSrc = fragmentSrc.replace(/%count%/gi, maxTextures);
    fragmentSrc = fragmentSrc.replace(/%forloop%/gi, generateSampleSrc(maxTextures));

    const vertexPrecision = 'highp';
    const fragPrecision = device.apple.device ? 'highp' : 'mediump';

    const sampleValues = new Array(maxTextures);

    // for (let i = 0; i < maxTextures; i++) {
    //     sampleValues[i] = null;
    // }

    const uniforms = {
        projectionMatrix: { value: new Mat3() },
        uSamplers: { value: null }
    };

    const shader = new GLShader(
        renderer,
        checkPrecision(vertexSrc, vertexPrecision),
        checkPrecision(fragmentSrc, fragPrecision),
        uniforms
    );

    renderer.textures.resetTextureUnits();
    gl.useProgram(shader.program);
    shader.uniforms.setValue(gl, 'uSamplers', sampleValues, renderer.textures);

    // shader.uniforms.uSamplers = sampleValues;

    return shader;
}

function generateSampleSrc(maxTextures) {
    let src = '';

    src += '\n';
    src += '\n';

    for (let i = 0; i < maxTextures; i++) {
        if (i > 0) {
            src += '\nelse ';
        }

        if (i < maxTextures - 1) {
            src += `if(vTextureId < ${i}.5)`;
        }

        src += '\n{';
        src += `\n\tcolor = texture2D(uSamplers[${i}], vTextureCoord);`;
        src += '\n}';
    }

    src += '\n';
    src += '\n';

    return src;
}
