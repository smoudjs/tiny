/**
 * Extracts the attributes
 * @class
 * @memberof PIXI.glCore.shader
 * @param gl {WebGLRenderingContext} The current WebGL rendering context
 * @param program {WebGLProgram} The shader program to get the attributes from
 * @return attributes {Object}
 */
function extractAttributes(gl, program) {
    var attributes = {};

    var totalAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);

    for (var i = 0; i < totalAttributes; i++) {
        var attribData = gl.getActiveAttrib(program, i);
        var type = mapType(gl, attribData.type);

        attributes[attribData.name] = {
            type: type,
            size: mapSize(type),
            location: gl.getAttribLocation(program, attribData.name),
            //TODO - make an attribute object
            pointer: pointer
        };
    }

    return attributes;
}

var GLSL_TO_SIZE = {
    float: 1,
    vec2: 2,
    vec3: 3,
    vec4: 4,

    int: 1,
    ivec2: 2,
    ivec3: 3,
    ivec4: 4,

    bool: 1,
    bvec2: 2,
    bvec3: 3,
    bvec4: 4,

    mat2: 4,
    mat3: 9,
    mat4: 16,

    sampler2D: 1
};

var mapSize = function (type) {
    return GLSL_TO_SIZE[type];
};

var mapType = function (gl, type) {
    if (!GL_TABLE) {
        var typeNames = Object.keys(GL_TO_GLSL_TYPES);

        GL_TABLE = {};

        for (var i = 0; i < typeNames.length; ++i) {
            var tn = typeNames[i];
            GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn];
        }
    }

    return GL_TABLE[type];
};

var GL_TABLE = null;

var GL_TO_GLSL_TYPES = {
    FLOAT: 'float',
    FLOAT_VEC2: 'vec2',
    FLOAT_VEC3: 'vec3',
    FLOAT_VEC4: 'vec4',

    INT: 'int',
    INT_VEC2: 'ivec2',
    INT_VEC3: 'ivec3',
    INT_VEC4: 'ivec4',

    BOOL: 'bool',
    BOOL_VEC2: 'bvec2',
    BOOL_VEC3: 'bvec3',
    BOOL_VEC4: 'bvec4',

    FLOAT_MAT2: 'mat2',
    FLOAT_MAT3: 'mat3',
    FLOAT_MAT4: 'mat4',

    SAMPLER_2D: 'sampler2D'
};

function pointer(type, normalized, stride, start) {
    // console.log(this.location)
    gl.vertexAttribPointer(
        this.location,
        this.size,
        type || gl.FLOAT,
        normalized || false,
        stride || 0,
        start || 0
    );
}

export { extractAttributes };
