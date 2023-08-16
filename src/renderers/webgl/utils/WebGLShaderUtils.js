/**
 * @author Mat Groves http://matgroves.com/ @Doormat23
 */

/**
 * @method initDefaultShaders
 * @static
 * @private
 */
var initDefaultShaders = function () {};

/**
 * @method CompileVertexShader
 * @static
 * @param gl {WebGLContext} the current WebGL drawing context
 * @param shaderSrc {Array}
 * @return {Any}
 */
var CompileVertexShader = function (gl, shaderSrc) {
    return _CompileShader(gl, shaderSrc, gl.VERTEX_SHADER);
};

/**
 * @method CompileFragmentShader
 * @static
 * @param gl {WebGLContext} the current WebGL drawing context
 * @param shaderSrc {Array}
 * @return {Any}
 */
var CompileFragmentShader = function (gl, shaderSrc) {
    return _CompileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
};

/**
 * @method _CompileShader
 * @static
 * @private
 * @param gl {WebGLContext} the current WebGL drawing context
 * @param shaderSrc {Array}
 * @param shaderType {Number}
 * @return {Any}
 */
var _CompileShader = function (gl, shaderSrc, shaderType) {
    var src = shaderSrc.join('\n');
    var shader = gl.createShader(shaderType);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        window.console.log(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
};

/**
 * @method compileProgram
 * @static
 * @param gl {WebGLContext} the current WebGL drawing context
 * @param vertexSrc {Array}
 * @param fragmentSrc {Array}
 * @return {Any}
 */
var compileProgram = function (gl, vertexSrc, fragmentSrc) {
    var fragmentShader = CompileFragmentShader(gl, fragmentSrc);
    var vertexShader = CompileVertexShader(gl, vertexSrc);

    var shaderProgram = gl.createProgram();

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        window.console.log('Could not initialise shaders');
    }

    return shaderProgram;
};

export { compileProgram };
