import { compileProgram } from './utils/compileProgram';

var ID = 0;

var Shader = function(vertex, fragment, uniforms, attributeLocations)
{
    this.id = ID++;
    if (!vertex) console.warn('vertex shader not supplied');
    if (!fragment) console.warn('fragment shader not supplied');

    this.vertex = vertex;
    this.fragment = fragment;
    this.uniforms = uniforms;
    this.attributeLocations = attributeLocations;
    this.program = null;


    /**
     * The attributes of the shader as an object containing the following properties
     * {
     *  type,
     *  size,
     *  location,
     *  pointer
     * }
     * @member {Object}
     */
    // next extract the attributes
    // this.attributes = extractAttributes(gl, this.program);

    // this.uniformData = extractUniforms(gl, this.program);

    /**
     * The uniforms of the shader as an object containing the following properties
     * {
     *  gl,
     *  data
     * }
     * @member {Object}
     */
    // this.uniforms = generateUniformAccessObject( gl, this.uniformData );

};


Shader.prototype = {
    constructor: Shader,

    update(gl) {
        if (this.program) return;

        this.program = compileProgram(gl, this.vertex, this.fragment, this.attributeLocations);

        
    }
}


/**
 * Uses this shader
 * 
 * @return {PIXI.glCore.GLShader} Returns itself.
 */
Shader.prototype.bind = function()
{
    this.gl.useProgram(this.program);
    return this;
};

/**
 * Destroys this shader
 * TODO
 */
Shader.prototype.destroy = function()
{
    this.attributes = null;
    this.uniformData = null;
    this.uniforms = null;

    var gl = this.gl;
    gl.deleteProgram(this.program);
};


module.exports = Shader;
