function WebGLShader(gl, type, string) {
	const shader = gl.createShader(type);

	gl.shaderSource(shader, string);
	gl.compileShader(shader);

	return shader;
}

function WebGLRawProgram(gl, vertexGlsl, fragmentGlsl, parameters) {
	const program = gl.createProgram();

	const glVertexShader = WebGLShader(gl, gl.VERTEX_SHADER, vertexGlsl);
	const glFragmentShader = WebGLShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl);

	gl.attachShader(program, glVertexShader);
	gl.attachShader(program, glFragmentShader);

	if (parameters.index0AttributeName !== undefined) {
		gl.bindAttribLocation(program, 0, parameters.index0AttributeName);
	} else if (parameters.morphTargets === true) {
		// programs with morphTargets displace position out of attribute 0
		gl.bindAttribLocation(program, 0, 'position');
	}

	gl.linkProgram(program);

	// check for link errors
	if (true) {
		const programLog = gl.getProgramInfoLog(program).trim();
		const vertexLog = gl.getShaderInfoLog(glVertexShader).trim();
		const fragmentLog = gl.getShaderInfoLog(glFragmentShader).trim();

		let runnable = true;
		let haveDiagnostics = true;

		if (gl.getProgramParameter(program, gl.LINK_STATUS) === false) {
			runnable = false;

			const vertexErrors = getShaderErrors(gl, glVertexShader, 'vertex');
			const fragmentErrors = getShaderErrors(gl, glFragmentShader, 'fragment');

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
	// gl.detachShader( program, glVertexShader );
	// gl.detachShader( program, glFragmentShader );

	gl.deleteShader(glVertexShader);
	gl.deleteShader(glFragmentShader);

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

export { WebGLShader, WebGLRawProgram };
