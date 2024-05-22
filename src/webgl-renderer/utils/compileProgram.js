function compileShader(gl, type, string) {
	const shader = gl.createShader(type);

	gl.shaderSource(shader, string);
	gl.compileShader(shader);

	return shader;
}

/**
 * Compile GL program
 * @param gl {WebGLRenderingContext} The current WebGL context {WebGLProgram}
 * @param vertexSrc {string|string[]} The vertex shader source as an array of strings.
 * @param fragmentSrc {string|string[]} The fragment shader source as an array of strings.
 * @param parameters {Object} An attribute location map that lets you manually set the attribute locations
 * @return {WebGLProgram} the shader program
 */
function compileProgram(gl, vertexSrc, fragmentSrc, parameters) {
	parameters = parameters || {};
	const program = gl.createProgram();

	const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSrc);
	const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc);

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	if (parameters.index0AttributeName !== undefined) {
		gl.bindAttribLocation(program, 0, parameters.index0AttributeName);
	} else if (parameters.morphTargets === true) {
		// programs with morphTargets displace position out of attribute 0
		gl.bindAttribLocation(program, 0, 'position');
	}

	const attribs = parameters.attributeLocations;
	if (attribs) {
		for (var i in attribs) {
			gl.bindAttribLocation(program, attribs[i], i);
		}
	}

	gl.linkProgram(program);

	// check for link errors
	if (true) {
		const programLog = gl.getProgramInfoLog(program).trim();
		const vertexLog = gl.getShaderInfoLog(vertexShader).trim();
		const fragmentLog = gl.getShaderInfoLog(fragmentShader).trim();

		let runnable = true;
		let haveDiagnostics = true;

		if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
			runnable = false;

			const vertexErrors = getShaderErrors(gl, vertexShader, 'vertex');
			const fragmentErrors = getShaderErrors(gl, fragmentShader, 'fragment');

			console.error(
				'THREE.WebGLProgram: shader error: ',
				gl.getError(),
				'gl.VALIDATE_STATUS',
				gl.getProgramParameter(program, gl.VALIDATE_STATUS),
				'gl.getProgramInfoLog',
				programLog,
				vertexErrors,
				fragmentErrors
			);
		} else if (programLog !== '') {
			console.warn('THREE.WebGLProgram: gl.getProgramInfoLog()', programLog);
		} else if (vertexLog === '' || fragmentLog === '') {
			haveDiagnostics = false;
		}

		// if ( haveDiagnostics ) {

		// 	this.diagnostics = {

		// 		runnable: runnable,

		// 		programLog: programLog,

		// 		vertexShader: {

		// 			log: vertexLog,
		// 			prefix: prefixVertex

		// 		},

		// 		fragmentShader: {

		// 			log: fragmentLog,
		// 			prefix: prefixFragment

		// 		}

		// 	};

		// }
	}

	// Clean up

	// Crashes in iOS9 and iOS10. #18402
	// gl.detachShader( program, vertexShader );
	// gl.detachShader( program, fragmentShader );

	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);

	return program;
}

function addLineNumbers(string) {
	const lines = string.split('\n');

	for (let i = 0; i < lines.length; i++) {
		lines[i] = i + 1 + ': ' + lines[i];
	}

	return lines.join('\n');
}

function getShaderErrors(gl, shader, type) {
	const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	const log = gl.getShaderInfoLog(shader).trim();

	if (status && log === '') return '';

	// --enable-privileged-webgl-extension
	// console.log( '**' + type + '**', gl.getExtension( 'WEBGL_debug_shaders' ).getTranslatedShaderSource( shader ) );

	const source = gl.getShaderSource(shader);

	return 'THREE.WebGLShader: gl.getShaderInfoLog() ' + type + '\n' + log + addLineNumbers(source);
}

export { compileShader, compileProgram };
