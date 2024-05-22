import { compileProgram } from '../../utils/compileProgram.js';
import { extractAttributes } from '../../utils/extractAttributes.js';
import { WebGLUniforms } from '../../Uniforms.js';

// var compileProgram = require('./shader/compileProgram'),
// 	extractAttributes = require('./shader/extractAttributes'),
// 	extractUniforms = require('./shader/extractUniforms'),
// 	generateUniformAccessObject = require('./shader/generateUniformAccessObject');

/**
 * Helper class to create a webGL GLShader
 *
 * @class
 * @memberof PIXI.glCore
 * @param gl {WebGLRenderingContext}
 * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
 * @param fragmentSrc {string|string[]} The fragment shader source as an array of strings.
 * @param attributeLocations {object} A key value pair showing which location eact attribute should sit eg {position:0, uvs:1}
 */
var GLShader = function (renderer, vertexSrc, fragmentSrc, uniforms, attributeLocations) {
	const gl = renderer.gl;

	uniforms = uniforms || {};
	/**
	 * The current WebGL rendering context
	 *
	 * @member {WebGLRenderingContext}
	 */
	this.gl = gl;

	/**
	 * The shader program
	 *
	 * @member {WebGLProgram}
	 */
	// First compile the program..
	const program = (this.program = compileProgram(gl, vertexSrc, fragmentSrc, {
		attributeLocations: attributeLocations
	}));

	/**
	 * The attributes of the shader as an object containing the following properties
	 * {
	 * 	type,
	 * 	size,
	 * 	location,
	 * 	pointer
	 * }
	 * @member {Object}
	 */
	// next extract the attributes
	this.attributes = extractAttributes(gl, program);

	const _uniforms = new WebGLUniforms(gl, program);

	// console.log(cachedUniforms);

	// const progUniforms = program.getUniforms();
	const uniformsList = WebGLUniforms.seqWithValue(_uniforms.seq, uniforms);

	this.uniformsList = uniformsList;
	this.uniforms = uniforms;
	this._uniforms = _uniforms.map;

	window.a = this;

	// console.log(uniformsList);

	// this.uniformData = extractUniforms(gl, this.program);

	/**
	 * The uniforms of the shader as an object containing the following properties
	 * {
	 * 	gl,
	 * 	data
	 * }
	 * @member {Object}
	 */
	// this.uniforms = generateUniformAccessObject(gl, this.uniformData);
};

Object.assign(GLShader.prototype, {
	/**
	 * Uses this shader
	 *
	 * @return {PIXI.glCore.GLGLShader} Returns itself.
	 */
	// bind: function () {
	// 	this.gl.useProgram(this.program);
	// 	return this;
	// },

	/**
	 * Destroys this shader
	 * TODO
	 */
	dispose: function () {
		this.attributes = null;
		this.uniformData = null;
		this.uniforms = null;

		this.gl.deleteProgram(this.program);
	}
});
export { GLShader };
