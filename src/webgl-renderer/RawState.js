import { mapWebGLBlendModes } from './utils/mapWebGLBlendModes.js';
import { Mat3 } from '../math/Mat3.js';

function WebGLRawState(gl, capabilities) {
    const isWebGL2 = capabilities.isWebGL2;

    const blendModes = mapWebGLBlendModes(gl);

    let activeBlend = -1;

    var currentBlendingEnabled = false;

    function setBlendMode(value) {
        return
        if ( currentBlendingEnabled === false ) {
            gl.enable( gl.BLEND );
            currentBlendingEnabled = true;

        }

        if (value === activeBlend) {
            return;
        }

        activeBlend = value;

        const mode = blendModes[value];

        if (mode.length === 2) {
            gl.blendFunc(mode[0], mode[1]);
        } else {
            gl.blendFuncSeparate(mode[0], mode[1], mode[2], mode[3]);
        }
    }

    // let activeShader = null;

    // const projectionMatrix = new Mat3();

    // var destinationFrame = { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight };
    // var sourceFrame = destinationFrame;

    // projectionMatrix.identity();
    // const el = projectionMatrix.elements;

    // // // TODO: make dest scale source
    // // if (!this.root)
    // // {
    // //     pm.a = 1 / destinationFrame.width * 2;
    // //     pm.d = 1 / destinationFrame.height * 2;

    // //     pm.tx = -1 - (sourceFrame.x * pm.a);
    // //     pm.ty = -1 - (sourceFrame.y * pm.d);
    // // }
    // // else
    // // {
    // el[0] = (1 / destinationFrame.width) * 2;
    // el[4] = (-1 / destinationFrame.height) * 2;

    // el[6] = -1 - sourceFrame.x * el[0];
    // el[7] = 1 - sourceFrame.y * el[4];
    // // }

    // // gl.bindFramebuffer(gl.FRAMEBUFFER, null );
    // // const resolution = 1.25;
    // // gl.disable(gl.SCISSOR_TEST);
    // // gl.viewport(
    // //     destinationFrame.x | 0,
    // //     destinationFrame.y | 0,
    // //     (destinationFrame.width * resolution) | 0,
    // //     (destinationFrame.height * resolution) | 0
    // // );

    // // gl.viewport(0,0, projectionFrame.width * this.resolution, projectionFrame.height * this.resolution);

    // function bindShader(shader, autoProject) {
    //     if (activeShader !== shader) {
    //         activeShader = shader;
    //         shader.bind();

    //         // `autoProject` normally would be a default parameter set to true
    //         // but because of how Babel transpiles default parameters
    //         // it hinders the performance of this method.
    //         if (autoProject !== false) {
    //             // automatically set the projection matrix
    //             console.log(projectionMatrix);
    //             window.shader = shader
    //             window.gl = gl
    //             window.projectionMatrix = projectionMatrix
    //             // gl.disable(gl.SCISSOR_TEST);
    //             // gl.clearColor(1, 1, 0, 1);
    //             // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //             shader._uniforms.projectionMatrix.setValue(gl, projectionMatrix);
    //         }
    //     }
    // }

    return {
        attrib: {
            // tempAttribState: new Array(capabilities.maxAttributes),
            // attribState: new Array(capabilities.maxAttributes)
        },
        // bindGeometry,
        setBlendMode,
        // bindShader
    };
}

export { WebGLRawState };
