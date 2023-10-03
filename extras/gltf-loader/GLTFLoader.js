/**
 * @author Rich Tibbett / https://github.com/richtr
 * @author mrdoob / http://mrdoob.com/
 * @author Tony Parisi / http://www.tonyparisi.com/
 * @author Takahiro / https://github.com/takahirox
 * @author Don McCurdy / https://www.donmccurdy.com
 */

var _RESERVED_CHARS_RE = '\\[\\]\\.:\\/';
var _reservedRe = new RegExp('[' + _RESERVED_CHARS_RE + ']', 'g');

function loadBase64(url) {
    // Check for data: URI
    var dataUriRegex = /^data:(.*?)(;base64)?,(.*)$/;
    var dataUriRegexResult = url.match(dataUriRegex);

    if (dataUriRegexResult) {
        var data = dataUriRegexResult[3];

        data = decodeURIComponent(data);

        data = atob(data);

        var view = new Uint8Array(data.length);

        for (var i = 0; i < data.length; i++) {

            view[i] = data.charCodeAt(i);

        }

        return view.buffer;
    } else {
        throw new Error("Data isn't a base64 format");
    }
}

function GLTFLoader() {
    this.dracoLoader = null;
}

GLTFLoader.prototype = Object.assign({}, {

    constructor: GLTFLoader,

    setDRACOLoader: function (dracoLoader) {
        this.dracoLoader = dracoLoader;

        return this;
    },

    parse: function (data, path, onLoad, onError) {
        var content = data;
        var extensions = {};

        var json = JSON.parse(content);

        if (json.asset === undefined || json.asset.version[0] < 2) {
            if (onError) onError(new Error('Tiny.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.'));

            return;
        }

        // @TODO Horch check if need
        // if (json.extensionsUsed) {
        //
        //     for (var i = 0; i < json.extensionsUsed.length; ++i) {
        //
        //         var extensionName = json.extensionsUsed[i];
        //         var extensionsRequired = json.extensionsRequired || [];
        //
        //         switch (extensionName) {
        //
        //             case EXTENSIONS.KHR_LIGHTS_PUNCTUAL:
        //                 extensions[extensionName] = new GLTFLightsExtension(json);
        //                 break;
        //
        //             case EXTENSIONS.KHR_MATERIALS_UNLIT:
        //                 extensions[extensionName] = new GLTFMaterialsUnlitExtension();
        //                 break;
        //
        //             case EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:
        //                 extensions[extensionName] = new GLTFMaterialsPbrSpecularGlossinessExtension();
        //                 break;
        //
        //             case EXTENSIONS.KHR_DRACO_MESH_COMPRESSION:
        //                 extensions[extensionName] = new GLTFDracoMeshCompressionExtension(json, this.dracoLoader);
        //                 break;
        //
        //             case EXTENSIONS.MSFT_TEXTURE_DDS:
        //                 extensions[extensionName] = new GLTFTextureDDSExtension(this.ddsLoader);
        //                 break;
        //
        //             case EXTENSIONS.KHR_TEXTURE_TRANSFORM:
        //                 extensions[extensionName] = new GLTFTextureTransformExtension();
        //                 break;
        //
        //             case EXTENSIONS.KHR_MESH_QUANTIZATION:
        //                 extensions[extensionName] = new GLTFMeshQuantizationExtension();
        //                 break;
        //
        //             default:
        //
        //                 if (extensionsRequired.indexOf(extensionName) >= 0) {
        //
        //                     console.warn('Tiny.GLTFLoader: Unknown extension "' + extensionName + '".');
        //
        //                 }
        //
        //         }
        //
        //     }
        // }

        var parser = new GLTFParser(json, extensions, {

            path: path || this.resourcePath || '',
            crossOrigin: this.crossOrigin,
            manager: this.manager

        });

        parser.parse(onLoad, onError);
    }

});

/* GLTFREGISTRY */

function GLTFRegistry() {

    var objects = {};

    return {

        get: function (key) {

            return objects[key];

        },

        add: function (key, object) {

            objects[key] = object;

        },

        remove: function (key) {

            delete objects[key];

        },

        removeAll: function () {

            objects = {};

        }

    };

}

/*********************************/
/********** EXTENSIONS ***********/
/*********************************/

var EXTENSIONS = {
    KHR_BINARY_GLTF: 'KHR_binary_glTF',
    KHR_DRACO_MESH_COMPRESSION: 'KHR_draco_mesh_compression',
    KHR_LIGHTS_PUNCTUAL: 'KHR_lights_punctual',
    KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS: 'KHR_materials_pbrSpecularGlossiness',
    KHR_MATERIALS_UNLIT: 'KHR_materials_unlit',
    KHR_TEXTURE_TRANSFORM: 'KHR_texture_transform',
    KHR_MESH_QUANTIZATION: 'KHR_mesh_quantization',
    MSFT_TEXTURE_DDS: 'MSFT_texture_dds'
};

/**
 * DDS Texture Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Vendor/MSFT_texture_dds
 *
 */
function GLTFTextureDDSExtension(ddsLoader) {

    if (!ddsLoader) {

        throw new Error('Tiny.GLTFLoader: Attempting to load .dds texture without importing Tiny.DDSLoader');

    }

    this.name = EXTENSIONS.MSFT_TEXTURE_DDS;
    this.ddsLoader = ddsLoader;

}

/**
 * Punctual Lights Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_lights_punctual
 */
function GLTFLightsExtension(json) {

    this.name = EXTENSIONS.KHR_LIGHTS_PUNCTUAL;

    var extension = (json.extensions && json.extensions[EXTENSIONS.KHR_LIGHTS_PUNCTUAL]) || {};
    this.lightDefs = extension.lights || [];

}

/* BINARY EXTENSION */
var BINARY_EXTENSION_HEADER_MAGIC = 'glTF';
var BINARY_EXTENSION_HEADER_LENGTH = 12;
var BINARY_EXTENSION_CHUNK_TYPES = {JSON: 0x4E4F534A, BIN: 0x004E4942};

function GLTFBinaryExtension(data) {

    this.name = EXTENSIONS.KHR_BINARY_GLTF;
    this.content = null;
    this.body = null;

    var headerView = new DataView(data, 0, BINARY_EXTENSION_HEADER_LENGTH);

    this.header = {
        magic: Tiny.LoaderUtils.decodeText(new Uint8Array(data.slice(0, 4))),
        version: headerView.getUint32(4, true),
        length: headerView.getUint32(8, true)
    };

    if (this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC) {

        throw new Error('Tiny.GLTFLoader: Unsupported glTF-Binary header.');

    } else if (this.header.version < 2.0) {

        throw new Error('Tiny.GLTFLoader: Legacy binary file detected.');

    }

    var chunkView = new DataView(data, BINARY_EXTENSION_HEADER_LENGTH);
    var chunkIndex = 0;

    while (chunkIndex < chunkView.byteLength) {

        var chunkLength = chunkView.getUint32(chunkIndex, true);
        chunkIndex += 4;

        var chunkType = chunkView.getUint32(chunkIndex, true);
        chunkIndex += 4;

        if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.JSON) {

            var contentArray = new Uint8Array(data, BINARY_EXTENSION_HEADER_LENGTH + chunkIndex, chunkLength);
            this.content = Tiny.LoaderUtils.decodeText(contentArray);

        } else if (chunkType === BINARY_EXTENSION_CHUNK_TYPES.BIN) {

            var byteOffset = BINARY_EXTENSION_HEADER_LENGTH + chunkIndex;
            this.body = data.slice(byteOffset, byteOffset + chunkLength);

        }

        // Clients must ignore chunks with unknown types.

        chunkIndex += chunkLength;

    }

    if (this.content === null) {

        throw new Error('Tiny.GLTFLoader: JSON content not found.');

    }

}

/**
 * DRACO Mesh Compression Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_draco_mesh_compression
 */
function GLTFDracoMeshCompressionExtension(json, dracoLoader) {

    if (!dracoLoader) {

        throw new Error('Tiny.GLTFLoader: No DRACOLoader instance provided.');

    }

    this.name = EXTENSIONS.KHR_DRACO_MESH_COMPRESSION;
    this.json = json;
    this.dracoLoader = dracoLoader;
    this.dracoLoader.preload();

}

GLTFDracoMeshCompressionExtension.prototype.decodePrimitive = function (primitive, parser) {

    var json = this.json;
    var dracoLoader = this.dracoLoader;
    var bufferViewIndex = primitive.extensions[this.name].bufferView;
    var gltfAttributeMap = primitive.extensions[this.name].attributes;
    var threeAttributeMap = {};
    var attributeNormalizedMap = {};
    var attributeTypeMap = {};

    for (var attributeName in gltfAttributeMap) {

        var threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();

        threeAttributeMap[threeAttributeName] = gltfAttributeMap[attributeName];

    }

    for (attributeName in primitive.attributes) {

        var threeAttributeName = ATTRIBUTES[attributeName] || attributeName.toLowerCase();

        if (gltfAttributeMap[attributeName] !== undefined) {

            var accessorDef = json.accessors[primitive.attributes[attributeName]];
            var componentType = WEBGL_COMPONENT_TYPES[accessorDef.componentType];

            attributeTypeMap[threeAttributeName] = componentType;
            attributeNormalizedMap[threeAttributeName] = accessorDef.normalized === true;

        }

    }

    // return parser.getDependency('bufferView', bufferViewIndex).then(function (bufferView) {
    //
    //     return new Promise(function (resolve) {
    //
    //         dracoLoader.decodeDracoFile(bufferView, function (geometry) {
    //
    //             for (var attributeName in geometry.attributes) {
    //
    //                 var attribute = geometry.attributes[attributeName];
    //                 var normalized = attributeNormalizedMap[attributeName];
    //
    //                 if (normalized !== undefined) attribute.normalized = normalized;
    //
    //             }
    //
    //             resolve(geometry);
    //
    //         }, threeAttributeMap, attributeTypeMap);
    //
    //     });
    //
    // });

};

/**
 * Texture Transform Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_texture_transform
 */
function GLTFTextureTransformExtension() {

    this.name = EXTENSIONS.KHR_TEXTURE_TRANSFORM;

}

GLTFTextureTransformExtension.prototype.extendTexture = function (texture, transform) {

    texture = texture.clone();

    if (transform.offset !== undefined) {

        texture.offset.fromArray(transform.offset);

    }

    if (transform.rotation !== undefined) {

        texture.rotation = transform.rotation;

    }

    if (transform.scale !== undefined) {

        texture.repeat.fromArray(transform.scale);

    }

    if (transform.texCoord !== undefined) {

        console.warn('Tiny.GLTFLoader: Custom UV sets in "' + this.name + '" extension not yet supported.');

    }

    texture.needsUpdate = true;

    return texture;

};

/**
 * Mesh Quantization Extension
 *
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_mesh_quantization
 */
function GLTFMeshQuantizationExtension() {

    this.name = EXTENSIONS.KHR_MESH_QUANTIZATION;

}

/*********************************/
/********** INTERPOLATION ********/
/*********************************/

// Spline Interpolation
// Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#appendix-c-spline-interpolation
// function GLTFCubicSplineInterpolant(parameterPositions, sampleValues, sampleSize, resultBuffer) {
//
//     Tiny.Interpolant.call(this, parameterPositions, sampleValues, sampleSize, resultBuffer);
//
// }
//
// GLTFCubicSplineInterpolant.prototype = Object.create(Tiny.Interpolant.prototype);
// GLTFCubicSplineInterpolant.prototype.constructor = GLTFCubicSplineInterpolant;
//
// GLTFCubicSplineInterpolant.prototype.copySampleValue_ = function (index) {
//
//     // Copies a sample value to the result buffer. See description of glTF
//     // CUBICSPLINE values layout in interpolate_() function below.
//
//     var result = this.resultBuffer,
//         values = this.sampleValues,
//         valueSize = this.valueSize,
//         offset = index * valueSize * 3 + valueSize;
//
//     for (var i = 0; i !== valueSize; i++) {
//
//         result[i] = values[offset + i];
//
//     }
//
//     return result;
//
// };
//
// GLTFCubicSplineInterpolant.prototype.beforeStart_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;
//
// GLTFCubicSplineInterpolant.prototype.afterEnd_ = GLTFCubicSplineInterpolant.prototype.copySampleValue_;
//
// GLTFCubicSplineInterpolant.prototype.interpolate_ = function (i1, t0, t, t1) {
//
//     var result = this.resultBuffer;
//     var values = this.sampleValues;
//     var stride = this.valueSize;
//
//     var stride2 = stride * 2;
//     var stride3 = stride * 3;
//
//     var td = t1 - t0;
//
//     var p = (t - t0) / td;
//     var pp = p * p;
//     var ppp = pp * p;
//
//     var offset1 = i1 * stride3;
//     var offset0 = offset1 - stride3;
//
//     var s2 = -2 * ppp + 3 * pp;
//     var s3 = ppp - pp;
//     var s0 = 1 - s2;
//     var s1 = s3 - pp + p;
//
//     // Layout of keyframe output values for CUBICSPLINE animations:
//     //   [ inTangent_1, splineVertex_1, outTangent_1, inTangent_2, splineVertex_2, ... ]
//     for (var i = 0; i !== stride; i++) {
//
//         var p0 = values[offset0 + i + stride]; // splineVertex_k
//         var m0 = values[offset0 + i + stride2] * td; // outTangent_k * (t_k+1 - t_k)
//         var p1 = values[offset1 + i + stride]; // splineVertex_k+1
//         var m1 = values[offset1 + i] * td; // inTangent_k+1 * (t_k+1 - t_k)
//
//         result[i] = s0 * p0 + s1 * m0 + s2 * p1 + s3 * m1;
//
//     }
//
//     return result;
//
// };

/*********************************/
/********** INTERNALS ************/
/*********************************/

/* CONSTANTS */

var WEBGL_CONSTANTS = {
    FLOAT: 5126,
    //FLOAT_MAT2: 35674,
    FLOAT_MAT3: 35675,
    FLOAT_MAT4: 35676,
    FLOAT_VEC2: 35664,
    FLOAT_VEC3: 35665,
    FLOAT_VEC4: 35666,
    LINEAR: 9729,
    REPEAT: 10497,
    SAMPLER_2D: 35678,
    POINTS: 0,
    LINES: 1,
    LINE_LOOP: 2,
    LINE_STRIP: 3,
    TRIANGLES: 4,
    TRIANGLE_STRIP: 5,
    TRIANGLE_FAN: 6,
    UNSIGNED_BYTE: 5121,
    UNSIGNED_SHORT: 5123
};

var WEBGL_COMPONENT_TYPES = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
};

var WEBGL_FILTERS = {
    9728: Tiny.NearestFilter,
    9729: Tiny.LinearFilter,
    9984: Tiny.NearestMipmapNearestFilter,
    9985: Tiny.LinearMipmapNearestFilter,
    9986: Tiny.NearestMipmapLinearFilter,
    9987: Tiny.LinearMipmapLinearFilter
};

var WEBGL_TYPE_SIZES = {
    'SCALAR': 1,
    'VEC2': 2,
    'VEC3': 3,
    'VEC4': 4,
    'MAT2': 4,
    'MAT3': 9,
    'MAT4': 16
};

var ATTRIBUTES = {
    POSITION: 'position',
    NORMAL: 'normal',
    TANGENT: 'tangent',
    TEXCOORD_0: 'uv',
    TEXCOORD_1: 'uv2',
    COLOR_0: 'color',
    WEIGHTS_0: 'skinWeight',
    JOINTS_0: 'skinIndex',
};

var PATH_PROPERTIES = {
    scale: 'scale',
    translation: 'position',
    rotation: 'quaternion',
    weights: 'morphTargetInfluences'
};

var INTERPOLATION = {
    CUBICSPLINE: undefined, // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
                            // keyframe track will be initialized with a default interpolation type, then modified.
    LINEAR: Tiny.InterpolateLinear,
    STEP: Tiny.InterpolateDiscrete
};

/* UTILITY FUNCTIONS */

function resolveURL(url, path) {

    // Invalid URL
    if (typeof url !== 'string' || url === '') return '';

    // Host Relative URL
    if (/^https?:\/\//i.test(path) && /^\//.test(url)) {

        path = path.replace(/(^https?:\/\/[^\/]+).*/i, '$1');

    }

    // Absolute URL http://,https://,//
    if (/^(https?:)?\/\//i.test(url)) return url;

    // Data URI
    if (/^data:.*,.*$/i.test(url)) return url;

    // Blob URL
    if (/^blob:.*$/i.test(url)) return url;

    // Relative URL
    return path + url;

}

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#default-material
 */
function createDefaultMaterial(cache) {

    if (cache['DefaultMaterial'] === undefined) {

        cache['DefaultMaterial'] = new Tiny.MeshLambertMaterial();

    }

    return cache['DefaultMaterial'];

}

function addUnknownExtensionsToUserData(knownExtensions, object, objectDef) {

    // Add unknown glTF extensions to an object's userData.

    for (var name in objectDef.extensions) {

        if (knownExtensions[name] === undefined) {

            object.userData.gltfExtensions = object.userData.gltfExtensions || {};
            object.userData.gltfExtensions[name] = objectDef.extensions[name];

        }

    }

}

/**
 * @param {Tiny.Object3D|Tiny.Material|Tiny.Geometry} object
 * @param {GLTF.definition} gltfDef
 */
function assignExtrasToUserData(object, gltfDef) {

    if (gltfDef.extras !== undefined) {

        if (typeof gltfDef.extras === 'object') {

            Object.assign(object.userData, gltfDef.extras);

        } else {

            console.warn('Tiny.GLTFLoader: Ignoring primitive type .extras, ' + gltfDef.extras);

        }

    }

}


// @TODO Horch check if need
/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#morph-targets
 *
 * @param {Tiny.Geometry} geometry
 * @param {Array<GLTF.Target>} targets
 * @param {GLTFParser} parser
 * @return {Tiny.Geometry}
 */
function addMorphTargets(geometry, targets, parser) {

    var hasMorphPosition = false;
    var hasMorphNormal = false;

    for (var i = 0, il = targets.length; i < il; i++) {

        var target = targets[i];

        if (target.POSITION !== undefined) hasMorphPosition = true;
        if (target.NORMAL !== undefined) hasMorphNormal = true;

        if (hasMorphPosition && hasMorphNormal) break;

    }

    // if (!hasMorphPosition && !hasMorphNormal) return Promise.resolve(geometry);

    var pendingPositionAccessors = [];
    var pendingNormalAccessors = [];

    for (var i = 0, il = targets.length; i < il; i++) {

        var target = targets[i];

        if (hasMorphPosition) {

            var pendingAccessor = target.POSITION !== undefined
                ? parser.getDependency('accessor', target.POSITION)
                : geometry.attributes.position;

            pendingPositionAccessors.push(pendingAccessor);

        }

        if (hasMorphNormal) {

            var pendingAccessor = target.NORMAL !== undefined
                ? parser.getDependency('accessor', target.NORMAL)
                : geometry.attributes.normal;

            pendingNormalAccessors.push(pendingAccessor);

        }

    }

    // return Promise.all([
    //     Promise.all(pendingPositionAccessors),
    //     Promise.all(pendingNormalAccessors)
    // ]).then(function (accessors) {
    //
    //     var morphPositions = accessors[0];
    //     var morphNormals = accessors[1];
    //
    //     if (hasMorphPosition) geometry.morphAttributes.position = morphPositions;
    //     if (hasMorphNormal) geometry.morphAttributes.normal = morphNormals;
    //     geometry.morphTargetsRelative = true;
    //
    //     return geometry;
    //
    // });

}

/**
 * @param {Tiny.Mesh} mesh
 * @param {GLTF.Mesh} meshDef
 */
function updateMorphTargets(mesh, meshDef) {

    mesh.updateMorphTargets();

    if (meshDef.weights !== undefined) {

        for (var i = 0, il = meshDef.weights.length; i < il; i++) {

            mesh.morphTargetInfluences[i] = meshDef.weights[i];

        }

    }

    // .extras has user-defined data, so check that .extras.targetNames is an array.
    if (meshDef.extras && Array.isArray(meshDef.extras.targetNames)) {

        var targetNames = meshDef.extras.targetNames;

        if (mesh.morphTargetInfluences.length === targetNames.length) {

            mesh.morphTargetDictionary = {};

            for (var i = 0, il = targetNames.length; i < il; i++) {

                mesh.morphTargetDictionary[targetNames[i]] = i;

            }

        } else {

            console.warn('Tiny.GLTFLoader: Invalid extras.targetNames length. Ignoring names.');

        }

    }

}

function createPrimitiveKey(primitiveDef) {

    var dracoExtension = primitiveDef.extensions && primitiveDef.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION];
    var geometryKey;

    if (dracoExtension) {

        geometryKey = 'draco:' + dracoExtension.bufferView
            + ':' + dracoExtension.indices
            + ':' + createAttributesKey(dracoExtension.attributes);

    } else {

        geometryKey = primitiveDef.indices + ':' + createAttributesKey(primitiveDef.attributes) + ':' + primitiveDef.mode;

    }

    return geometryKey;

}

function createAttributesKey(attributes) {

    var attributesKey = '';

    var keys = Object.keys(attributes).sort();

    for (var i = 0, il = keys.length; i < il; i++) {

        attributesKey += keys[i] + ':' + attributes[keys[i]] + ';';

    }

    return attributesKey;

}

/* GLTF PARSER */

function GLTFParser(json, extensions, options) {

    this.json = json || {};
    this.extensions = extensions || {};
    this.options = options || {};

    // loader object cache
    this.cache = new GLTFRegistry();

    // Geometry caching
    this.primitiveCache = {};
}

GLTFParser.prototype.parse = function (onLoad, onError) {

    var parser = this;
    var json = this.json;
    var extensions = this.extensions;

    // Clear the loader cache
    this.cache.removeAll();

    // Mark the special nodes/meshes in json for efficient parse
    this.markDefs();

    var dependencies = [
        this.getDependencies('scene'),
        this.getDependencies('animation'),
    ];

    var result = {
        scene: dependencies[0][json.scene || 0],
        scenes: dependencies[0],
        animations: dependencies[1],
        // cameras: dependencies[2],
        asset: json.asset,
        parser: parser,
        userData: {}
    };

    addUnknownExtensionsToUserData(extensions, result, json);

    assignExtrasToUserData(result, json);

    onLoad(result);

};

/**
 * Marks the special nodes/meshes in json for efficient parse.
 */
GLTFParser.prototype.markDefs = function () {

    var nodeDefs = this.json.nodes || [];
    var skinDefs = this.json.skins || [];
    var meshDefs = this.json.meshes || [];

    var meshReferences = {};
    var meshUses = {};

    // Nothing in the node definition indicates whether it is a Bone or an
    // Object3D. Use the skins' joint references to mark bones.
    for (var skinIndex = 0, skinLength = skinDefs.length; skinIndex < skinLength; skinIndex++) {

        var joints = skinDefs[skinIndex].joints;

        for (var i = 0, il = joints.length; i < il; i++) {

            nodeDefs[joints[i]].isBone = true;

        }

    }

    // Meshes can (and should) be reused by multiple nodes in a glTF asset. To
    // avoid having more than one Tiny.Mesh with the same name, count
    // references and rename instances below.
    //
    // Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
    for (var nodeIndex = 0, nodeLength = nodeDefs.length; nodeIndex < nodeLength; nodeIndex++) {

        var nodeDef = nodeDefs[nodeIndex];

        if (nodeDef.mesh !== undefined) {

            if (meshReferences[nodeDef.mesh] === undefined) {

                meshReferences[nodeDef.mesh] = meshUses[nodeDef.mesh] = 0;

            }

            meshReferences[nodeDef.mesh]++;

            // Nothing in the mesh definition indicates whether it is
            // a SkinnedMesh or Mesh. Use the node's mesh reference
            // to mark SkinnedMesh if node has skin.
            if (nodeDef.skin !== undefined) {

                meshDefs[nodeDef.mesh].isSkinnedMesh = true;

            }

        }

    }

    this.json.meshReferences = meshReferences;
    this.json.meshUses = meshUses;

};

/**
 * Requests the specified dependency asynchronously, with caching.
 * @param {string} type
 * @param {number} index
 * @return {Tiny.Object3D|Tiny.Material|Tiny.Texture|Tiny.AnimationClip|ArrayBuffer|Object}
 */
GLTFParser.prototype.getDependency = function (type, index) {

    var cacheKey = type + ':' + index;
    var dependency = this.cache.get(cacheKey);

    if (!dependency) {
        switch (type) {

            case 'scene':
                dependency = this.loadScene(index);
                break;

            case 'node':
                dependency = this.loadNode(index);
                break;

            case 'mesh':
                dependency = this.loadMesh(index);
                break;

            case 'accessor':
                dependency = this.loadAccessor(index);
                break;

            case 'bufferView':
                dependency = this.loadBufferView(index);
                break;

            case 'buffer':
                dependency = this.loadBuffer(index);
                break;

            case 'skin':
                dependency = this.loadSkin(index);
                break;

            case 'animation':
                dependency = this.loadAnimation(index);
                break;

            default:
                throw new Error('Unknown type: ' + type);

        }

        this.cache.add(cacheKey, dependency);

    }

    return dependency;

};

/**
 * Requests all dependencies of the specified type asynchronously, with caching.
 * @param {string} type
 * @return {Array<Object>}
 */
GLTFParser.prototype.getDependencies = function (type) {

    var dependencies = this.cache.get(type);

    if (!dependencies) {

        var parser = this;
        var defs = this.json[type + (type === 'mesh' ? 'es' : 's')] || [];

        dependencies = defs.map(function (def, index) {

            return parser.getDependency(type, index);

        });

        this.cache.add(type, dependencies);

    }

    return dependencies;

};

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
 * @param {number} bufferIndex
 * @return {ArrayBuffer}
 */
GLTFParser.prototype.loadBuffer = function (bufferIndex) {

    var bufferDef = this.json.buffers[bufferIndex];

    if (bufferDef.type && bufferDef.type !== 'arraybuffer') {

        throw new Error('Tiny.GLTFLoader: ' + bufferDef.type + ' buffer type is not supported.');

    }

    return loadBase64(bufferDef.uri);

};

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
 * @param {number} bufferViewIndex
 * @return {ArrayBuffer}
 */
GLTFParser.prototype.loadBufferView = function (bufferViewIndex) {

    var bufferViewDef = this.json.bufferViews[bufferViewIndex];

    var buffer = this.getDependency('buffer', bufferViewDef.buffer);

    var byteLength = bufferViewDef.byteLength || 0;
    var byteOffset = bufferViewDef.byteOffset || 0;

    return buffer.slice(byteOffset, byteOffset + byteLength);
};

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
 * @param {number} accessorIndex
 * @return {Tiny.Attribute|Tiny.InterleavedBufferAttribute}
 */
GLTFParser.prototype.loadAccessor = function (accessorIndex) {

    var parser = this;
    var json = this.json;

    var accessorDef = this.json.accessors[accessorIndex];

    if (accessorDef.bufferView === undefined && accessorDef.sparse === undefined) {
       return null;
    }

    var bufferViews = [];

    if (accessorDef.bufferView !== undefined) {

        bufferViews.push(this.getDependency('bufferView', accessorDef.bufferView));

    } else {

        bufferViews.push(null);

    }

    if (accessorDef.sparse !== undefined) {

        bufferViews.push(this.getDependency('bufferView', accessorDef.sparse.indices.bufferView));
        bufferViews.push(this.getDependency('bufferView', accessorDef.sparse.values.bufferView));

    }

    var bufferView = bufferViews[0];

    var itemSize = WEBGL_TYPE_SIZES[accessorDef.type];
    var TypedArray = WEBGL_COMPONENT_TYPES[accessorDef.componentType];

    // For VEC3: itemSize is 3, elementBytes is 4, itemBytes is 12.
    var elementBytes = TypedArray.BYTES_PER_ELEMENT;
    var itemBytes = elementBytes * itemSize;
    var byteOffset = accessorDef.byteOffset || 0;
    var byteStride = accessorDef.bufferView !== undefined ? json.bufferViews[accessorDef.bufferView].byteStride : undefined;
    var normalized = accessorDef.normalized === true;
    var array, bufferAttribute;

    // The buffer is not interleaved if the stride is the item size in bytes.
    if (byteStride && byteStride !== itemBytes) {

        // Each "slice" of the buffer, as defined by 'count' elements of 'byteStride' bytes, gets its own InterleavedBuffer
        // This makes sure that IBA.count reflects accessor.count properly
        var ibSlice = Math.floor(byteOffset / byteStride);
        var ibCacheKey = 'InterleavedBuffer:' + accessorDef.bufferView + ':' + accessorDef.componentType + ':' + ibSlice + ':' + accessorDef.count;
        var ib = parser.cache.get(ibCacheKey);

        if (!ib) {

            array = new TypedArray(bufferView, ibSlice * byteStride, accessorDef.count * byteStride / elementBytes);

            // Integer parameters to IB/IBA are in array elements, not bytes.
            ib = new Tiny.InterleavedBuffer(array, byteStride / elementBytes);

            parser.cache.add(ibCacheKey, ib);

        }

        bufferAttribute = new Tiny.InterleavedBufferAttribute(ib, itemSize, (byteOffset % byteStride) / elementBytes, normalized);

    } else {

        if (bufferView === null) {

            array = new TypedArray(accessorDef.count * itemSize);

        } else {

            array = new TypedArray(bufferView, byteOffset, accessorDef.count * itemSize);

        }

        bufferAttribute = new Tiny.Attribute(array, itemSize, normalized);

    }

    // https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#sparse-accessors
    if (accessorDef.sparse !== undefined) {

        var itemSizeIndices = WEBGL_TYPE_SIZES.SCALAR;
        var TypedArrayIndices = WEBGL_COMPONENT_TYPES[accessorDef.sparse.indices.componentType];

        var byteOffsetIndices = accessorDef.sparse.indices.byteOffset || 0;
        var byteOffsetValues = accessorDef.sparse.values.byteOffset || 0;

        var sparseIndices = new TypedArrayIndices(bufferViews[1], byteOffsetIndices, accessorDef.sparse.count * itemSizeIndices);
        var sparseValues = new TypedArray(bufferViews[2], byteOffsetValues, accessorDef.sparse.count * itemSize);

        if (bufferView !== null) {

            // Avoid modifying the original ArrayBuffer, if the bufferView wasn't initialized with zeroes.
            bufferAttribute = new Tiny.Attribute(bufferAttribute.array.slice(), bufferAttribute.itemSize, bufferAttribute.normalized);

        }

        for (var i = 0, il = sparseIndices.length; i < il; i++) {

            var index = sparseIndices[i];

            bufferAttribute.setX(index, sparseValues[i * itemSize]);
            if (itemSize >= 2) bufferAttribute.setY(index, sparseValues[i * itemSize + 1]);
            if (itemSize >= 3) bufferAttribute.setZ(index, sparseValues[i * itemSize + 2]);
            if (itemSize >= 4) bufferAttribute.setW(index, sparseValues[i * itemSize + 3]);
            if (itemSize >= 5) throw new Error('Tiny.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.');

        }

    }

    return bufferAttribute;
};

/**
 * Assigns final material to a Mesh, Line, or Points instance. The instance
 * already has a material (generated from the glTF material options alone)
 * but reuse of the same glTF material may require multiple threejs materials
 * to accomodate different primitive types, defines, etc. New materials will
 * be created if necessary, and reused from a cache.
 * @param  {Tiny.Mesh} mesh Mesh, Line, or Points instance.
 */
GLTFParser.prototype.assignFinalMaterial = function (mesh) {

    var geometry = mesh.geometry;
    var material = mesh.material;
    var extensions = this.extensions;

    var useVertexTangents = geometry.attributes.tangent !== undefined;
    var useVertexColors = geometry.attributes.color !== undefined;
    var useFlatShading = geometry.attributes.normal === undefined;
    var useSkinning = mesh.isSkinnedMesh === true;
    var useMorphTargets = mesh.geometry.morphAttributes && Object.keys(geometry.morphAttributes).length > 0;
    var useMorphNormals = useMorphTargets && geometry.morphAttributes.normal !== undefined;

    if (mesh.isPoints) {

        var cacheKey = 'PointsMaterial:' + material.uuid;

        var pointsMaterial = this.cache.get(cacheKey);

        if (!pointsMaterial) {

            pointsMaterial = new Tiny.PointsMaterial();
            Tiny.Material.prototype.copy.call(pointsMaterial, material);
            pointsMaterial.color.copy(material.color);
            pointsMaterial.map = material.map;
            pointsMaterial.sizeAttenuation = false; // glTF spec says points should be 1px

            this.cache.add(cacheKey, pointsMaterial);

        }

        material = pointsMaterial;

    } else if (mesh.isLine) {

        var cacheKey = 'LineBasicMaterial:' + material.uuid;

        var lineMaterial = this.cache.get(cacheKey);

        if (!lineMaterial) {

            lineMaterial = new Tiny.LineBasicMaterial();
            Tiny.Material.prototype.copy.call(lineMaterial, material);
            lineMaterial.color.copy(material.color);

            this.cache.add(cacheKey, lineMaterial);

        }

        material = lineMaterial;

    }

    // Clone the material if it will be modified
    // if (useVertexTangents || useVertexColors || useFlatShading || useSkinning || useMorphTargets) {
    //
    //     var cacheKey = 'ClonedMaterial:' + material.uuid + ':';
    //
    //     if (material.isGLTFSpecularGlossinessMaterial) cacheKey += 'specular-glossiness:';
    //     if (useSkinning) cacheKey += 'skinning:';
    //     if (useVertexTangents) cacheKey += 'vertex-tangents:';
    //     if (useVertexColors) cacheKey += 'vertex-colors:';
    //     if (useFlatShading) cacheKey += 'flat-shading:';
    //     if (useMorphTargets) cacheKey += 'morph-targets:';
    //     if (useMorphNormals) cacheKey += 'morph-normals:';
    //
    //     var cachedMaterial = this.cache.get(cacheKey);
    //
    //     if (!cachedMaterial) {
    //
    //         cachedMaterial = material.isGLTFSpecularGlossinessMaterial
    //             ? extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].cloneMaterial(material)
    //             : material.clone();
    //
    //         if (useSkinning) cachedMaterial.skinning = true;
    //         if (useVertexTangents) cachedMaterial.vertexTangents = true;
    //         if (useVertexColors) cachedMaterial.vertexColors = Tiny.VertexColors;
    //         if (useFlatShading) cachedMaterial.flatShading = true;
    //         if (useMorphTargets) cachedMaterial.morphTargets = true;
    //         if (useMorphNormals) cachedMaterial.morphNormals = true;
    //
    //         this.cache.add(cacheKey, cachedMaterial);
    //
    //     }
    //
    //     material = cachedMaterial;
    //
    // }
    //
    // // workarounds for mesh and geometry
    //
    // if (material.aoMap && geometry.attributes.uv2 === undefined && geometry.attributes.uv !== undefined) {
    //
    //     geometry.setAttribute('uv2', new Tiny.Attribute(geometry.attributes.uv.array, 2));
    //
    // }
    //
    // if (material.isGLTFSpecularGlossinessMaterial) {
    //
    //     // for GLTFSpecularGlossinessMaterial(ShaderMaterial) uniforms runtime update
    //     mesh.onBeforeRender = extensions[EXTENSIONS.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].refreshUniforms;
    //
    // }
    //
    // // https://github.com/mrdoob/Tiny.js/issues/11438#issuecomment-507003995
    // if (material.normalScale && !useVertexTangents) {
    //
    //     material.normalScale.y = -material.normalScale.y;
    //
    // }

    mesh.material = material;
};

/**
 * @param {Tiny.Geometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 */
function computeBounds(geometry, primitiveDef, parser) {

    var attributes = primitiveDef.attributes;

    var box = new Tiny.Box3();

    if (attributes.POSITION !== undefined) {

        var accessor = parser.json.accessors[attributes.POSITION];

        var min = accessor.min;
        var max = accessor.max;

        // glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

        if (min !== undefined && max !== undefined) {

            box.set(
                new Tiny.Vector3(min[0], min[1], min[2]),
                new Tiny.Vector3(max[0], max[1], max[2]));

        } else {

            console.warn('Tiny.GLTFLoader: Missing min/max properties for accessor POSITION.');

            return;

        }

    } else {

        return;

    }

    var targets = primitiveDef.targets;

    if (targets !== undefined) {

        var vector = new Tiny.Vector3();

        for (var i = 0, il = targets.length; i < il; i++) {

            var target = targets[i];

            if (target.POSITION !== undefined) {

                var accessor = parser.json.accessors[target.POSITION];
                var min = accessor.min;
                var max = accessor.max;

                // glTF requires 'min' and 'max', but VRM (which extends glTF) currently ignores that requirement.

                if (min !== undefined && max !== undefined) {

                    // we need to get max of absolute components because target weight is [-1,1]
                    vector.setX(Math.max(Math.abs(min[0]), Math.abs(max[0])));
                    vector.setY(Math.max(Math.abs(min[1]), Math.abs(max[1])));
                    vector.setZ(Math.max(Math.abs(min[2]), Math.abs(max[2])));

                    box.expandByVector(vector);

                } else {

                    console.warn('Tiny.GLTFLoader: Missing min/max properties for accessor POSITION.');

                }

            }

        }

    }

    geometry.boundingBox = box;

    var sphere = new Tiny.Sphere();

    box.getCenter(sphere.center);
    sphere.radius = box.min.distanceTo(box.max) / 2;

    geometry.boundingSphere = sphere;

}

/**
 * @param {Tiny.Geometry} geometry
 * @param {GLTF.Primitive} primitiveDef
 * @param {GLTFParser} parser
 * @return {Tiny.Geometry}
 */
function addPrimitiveAttributes(geometry, primitiveDef, parser) {

    var attributes = primitiveDef.attributes;

    function assignAttributeAccessor(accessorIndex, attributeName) {

        var accessor = parser.getDependency('accessor', accessorIndex);

        geometry.setAttribute(attributeName, accessor);
    }

    for (var gltfAttributeName in attributes) {

        var threeAttributeName = ATTRIBUTES[gltfAttributeName] || gltfAttributeName.toLowerCase();

        // Skip attributes already provided by e.g. Draco extension.
        if (threeAttributeName in geometry.attributes) continue;

        assignAttributeAccessor(attributes[gltfAttributeName], threeAttributeName);
    }

    if (primitiveDef.indices !== undefined && !geometry.index) {

        var accessor = parser.getDependency('accessor', primitiveDef.indices);
        geometry.setIndex(accessor);

    }

    assignExtrasToUserData(geometry, primitiveDef);

    // computeBounds(geometry, primitiveDef, parser);

    return primitiveDef.targets !== undefined
        ? addMorphTargets(geometry, primitiveDef.targets, parser)
        : geometry;

}

/**
 * @param {Tiny.Geometry} geometry
 * @param {Number} drawMode
 * @return {Tiny.Geometry}
 */
function toTrianglesDrawMode(geometry, drawMode) {

    var index = geometry.getIndex();

    // generate index if not present

    if (index === null) {

        var indices = [];

        var position = geometry.getAttribute('position');

        if (position !== undefined) {

            for (var i = 0; i < position.count; i++) {

                indices.push(i);

            }

            geometry.setIndex(indices);
            index = geometry.getIndex();

        } else {

            console.error('Tiny.GLTFLoader.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.');
            return geometry;

        }

    }

    //

    var numberOfTriangles = index.count - 2;
    var newIndices = [];

    if (drawMode === Tiny.TriangleFanDrawMode) {

        // gl.TRIANGLE_FAN

        for (var i = 1; i <= numberOfTriangles; i++) {

            newIndices.push(index.getX(0));
            newIndices.push(index.getX(i));
            newIndices.push(index.getX(i + 1));

        }

    } else {

        // gl.TRIANGLE_STRIP

        for (var i = 0; i < numberOfTriangles; i++) {

            if (i % 2 === 0) {

                newIndices.push(index.getX(i));
                newIndices.push(index.getX(i + 1));
                newIndices.push(index.getX(i + 2));


            } else {

                newIndices.push(index.getX(i + 2));
                newIndices.push(index.getX(i + 1));
                newIndices.push(index.getX(i));

            }

        }

    }

    if ((newIndices.length / 3) !== numberOfTriangles) {

        console.error('Tiny.GLTFLoader.toTrianglesDrawMode(): Unable to generate correct amount of triangles.');

    }

    // build final geometry

    var newGeometry = geometry.clone();
    newGeometry.setIndex(newIndices);

    return newGeometry;

}

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
 *
 * Creates BufferGeometries from primitives.
 *
 * @param {Array<GLTF.Primitive>} primitives
 * @return {Array<Tiny.Geometry>}
 */
GLTFParser.prototype.loadGeometries = function (primitives) {

    var parser = this;
    var extensions = this.extensions;
    var cache = this.primitiveCache;

    // @TODO horch add graco later
    function createDracoPrimitive(primitive) {

        return extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]
            .decodePrimitive(primitive, parser)
            .then(function (geometry) {

                return addPrimitiveAttributes(geometry, primitive, parser);

            });

    }

    var geometries = [];

    for (var i = 0, il = primitives.length; i < il; i++) {

        var primitive = primitives[i];
        var cacheKey = createPrimitiveKey(primitive);

        // See if we've already created this geometry
        var cached = cache[cacheKey];

        if (cached) {

            // Use the cached geometry if it exists
            geometries.push(cached.geometry);
        } else {
            var geometry;

            if (primitive.extensions && primitive.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION]) {

                // Use DRACO geometry if available
                geometry = createDracoPrimitive(primitive);

            } else {

                // Otherwise create a new geometry
                geometry = addPrimitiveAttributes(new Tiny.Geometry(), primitive, parser);
            }

            // Cache this geometry
            cache[cacheKey] = {primitive: primitive, geometry};

            geometries.push(geometry);

        }

    }

    return geometries;
};

/**
 * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
 * @param {number} meshIndex
 * @return {Tiny.Object3D|Tiny.Mesh|Tiny.SkinnedMesh}
 */
GLTFParser.prototype.loadMesh = function (meshIndex) {

    var parser = this;
    var json = this.json;

    var meshDef = json.meshes[meshIndex];
    var primitives = meshDef.primitives;

    var materials = [];

    for (var i = 0, il = primitives.length; i < il; i++) {

        var material = createDefaultMaterial(this.cache);

        materials.push(material);

    }

    var geometries = parser.loadGeometries(primitives);

    var meshes = [];

    for (var i = 0, il = geometries.length; i < il; i++) {

        var geometry = geometries[i];
        var primitive = primitives[i];

        // 1. create Mesh

        var mesh;

        var material = materials[i];

        if (primitive.mode === WEBGL_CONSTANTS.TRIANGLES ||
            primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ||
            primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN ||
            primitive.mode === undefined) {

            // .isSkinnedMesh isn't in glTF spec. See .markDefs()
            mesh = meshDef.isSkinnedMesh === true
                ? new Tiny.SkinnedMesh(geometry, material)
                : new Tiny.Mesh(geometry, material);

            if (mesh.isSkinnedMesh === true && !mesh.geometry.attributes.skinWeight.normalized) {

                // we normalize floating point skin weight array to fix malformed assets (see #15319)
                // it's important to skip this for non-float32 data since normalizeSkinWeights assumes non-normalized inputs
                mesh.normalizeSkinWeights();

            }

            if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP) {

                mesh.geometry = toTrianglesDrawMode(mesh.geometry, Tiny.TriangleStripDrawMode);

            } else if (primitive.mode === WEBGL_CONSTANTS.TRIANGLE_FAN) {

                mesh.geometry = toTrianglesDrawMode(mesh.geometry, Tiny.TriangleFanDrawMode);

            }

        } else if (primitive.mode === WEBGL_CONSTANTS.LINES) {

            mesh = new Tiny.LineSegments(geometry, material);

        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_STRIP) {

            mesh = new Tiny.Line(geometry, material);

        } else if (primitive.mode === WEBGL_CONSTANTS.LINE_LOOP) {

            mesh = new Tiny.LineLoop(geometry, material);

        } else if (primitive.mode === WEBGL_CONSTANTS.POINTS) {

            mesh = new Tiny.Points(geometry, material);

        } else {

            throw new Error('Tiny.GLTFLoader: Primitive mode unsupported: ' + primitive.mode);

        }

        if (mesh.geometry.morphAttributes && Object.keys(mesh.geometry.morphAttributes).length > 0) {

            updateMorphTargets(mesh, meshDef);

        }

        mesh.name = meshDef.name || ('mesh_' + meshIndex);

        if (geometries.length > 1) mesh.name += '_' + i;

        assignExtrasToUserData(mesh, meshDef);

        parser.assignFinalMaterial(mesh);

        meshes.push(mesh);

    }

    if (meshes.length === 1) {

        return meshes[0];

    }

    var group = new Tiny.Object3D();

    for (var i = 0, il = meshes.length; i < il; i++) {

        group.add(meshes[i]);

    }

    return group;
};

/**
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
 * @param {number} skinIndex
 * @return {Object}
 */
GLTFParser.prototype.loadSkin = function (skinIndex) {
    var skinDef = this.json.skins[skinIndex];

    var skinEntry = {joints: skinDef.joints};

    if (skinDef.inverseBindMatrices === undefined) {

        return skinEntry;

    }

    var accessor = this.getDependency('accessor', skinDef.inverseBindMatrices);

    skinEntry.inverseBindMatrices = accessor;

    return skinEntry;
};

/**
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
 * @param {number} animationIndex
 * @return {Tiny.AnimationClip}
 */
GLTFParser.prototype.loadAnimation = function (animationIndex) {

    // var json = this.json;
    //
    // var animationDef = json.animations[animationIndex];
    //
    // var pendingNodes = [];
    // var pendingInputAccessors = [];
    // var pendingOutputAccessors = [];
    // var pendingSamplers = [];
    // var pendingTargets = [];
    //
    // for (var i = 0, il = animationDef.channels.length; i < il; i++) {
    //
    //     var channel = animationDef.channels[i];
    //     var sampler = animationDef.samplers[channel.sampler];
    //     var target = channel.target;
    //     var name = target.node !== undefined ? target.node : target.id; // NOTE: target.id is deprecated.
    //     var input = animationDef.parameters !== undefined ? animationDef.parameters[sampler.input] : sampler.input;
    //     var output = animationDef.parameters !== undefined ? animationDef.parameters[sampler.output] : sampler.output;
    //
    //     pendingNodes.push(this.getDependency('node', name));
    //     pendingInputAccessors.push(this.getDependency('accessor', input));
    //     pendingOutputAccessors.push(this.getDependency('accessor', output));
    //     pendingSamplers.push(sampler);
    //     pendingTargets.push(target);
    //
    // }
    //
    // return Promise.all([
    //
    //     Promise.all(pendingNodes),
    //     Promise.all(pendingInputAccessors),
    //     Promise.all(pendingOutputAccessors),
    //     Promise.all(pendingSamplers),
    //     Promise.all(pendingTargets)
    //
    // ]).then(function (dependencies) {
    //
    //     var nodes = dependencies[0];
    //     var inputAccessors = dependencies[1];
    //     var outputAccessors = dependencies[2];
    //     var samplers = dependencies[3];
    //     var targets = dependencies[4];
    //
    //     var tracks = [];
    //
    //     for (var i = 0, il = nodes.length; i < il; i++) {
    //
    //         var node = nodes[i];
    //         var inputAccessor = inputAccessors[i];
    //         var outputAccessor = outputAccessors[i];
    //         var sampler = samplers[i];
    //         var target = targets[i];
    //
    //         if (node === undefined) continue;
    //
    //         node.updateMatrix();
    //         node.matrixAutoUpdate = true;
    //
    //         var TypedKeyframeTrack;
    //
    //         switch (PATH_PROPERTIES[target.path]) {
    //
    //             case PATH_PROPERTIES.weights:
    //
    //                 TypedKeyframeTrack = Tiny.NumberKeyframeTrack;
    //                 break;
    //
    //             case PATH_PROPERTIES.rotation:
    //
    //                 TypedKeyframeTrack = Tiny.QuaternionKeyframeTrack;
    //                 break;
    //
    //             case PATH_PROPERTIES.position:
    //             case PATH_PROPERTIES.scale:
    //             default:
    //
    //                 TypedKeyframeTrack = Tiny.VectorKeyframeTrack;
    //                 break;
    //
    //         }
    //
    //         var targetName = node.name ? node.name : node.uuid;
    //
    //         var interpolation = sampler.interpolation !== undefined ? INTERPOLATION[sampler.interpolation] : Tiny.InterpolateLinear;
    //
    //         var targetNames = [];
    //
    //         if (PATH_PROPERTIES[target.path] === PATH_PROPERTIES.weights) {
    //
    //             // Node may be a Tiny.Group (glTF mesh with several primitives) or a Tiny.Mesh.
    //             node.traverse(function (object) {
    //
    //                 if (object.isMesh === true && object.morphTargetInfluences) {
    //
    //                     targetNames.push(object.name ? object.name : object.uuid);
    //
    //                 }
    //
    //             });
    //
    //         } else {
    //
    //             targetNames.push(targetName);
    //
    //         }
    //
    //         var outputArray = outputAccessor.array;
    //
    //         if (outputAccessor.normalized) {
    //
    //             var scale;
    //
    //             if (outputArray.constructor === Int8Array) {
    //
    //                 scale = 1 / 127;
    //
    //             } else if (outputArray.constructor === Uint8Array) {
    //
    //                 scale = 1 / 255;
    //
    //             } else if (outputArray.constructor == Int16Array) {
    //
    //                 scale = 1 / 32767;
    //
    //             } else if (outputArray.constructor === Uint16Array) {
    //
    //                 scale = 1 / 65535;
    //
    //             } else {
    //
    //                 throw new Error('Tiny.GLTFLoader: Unsupported output accessor component type.');
    //
    //             }
    //
    //             var scaled = new Float32Array(outputArray.length);
    //
    //             for (var j = 0, jl = outputArray.length; j < jl; j++) {
    //
    //                 scaled[j] = outputArray[j] * scale;
    //
    //             }
    //
    //             outputArray = scaled;
    //
    //         }
    //
    //         for (var j = 0, jl = targetNames.length; j < jl; j++) {
    //
    //             var track = new TypedKeyframeTrack(
    //                 targetNames[j] + '.' + PATH_PROPERTIES[target.path],
    //                 inputAccessor.array,
    //                 outputArray,
    //                 interpolation
    //             );
    //
    //             // Override interpolation with custom factory method.
    //             if (sampler.interpolation === 'CUBICSPLINE') {
    //
    //                 track.createInterpolant = function InterpolantFactoryMethodGLTFCubicSpline(result) {
    //
    //                     // A CUBICSPLINE keyframe in glTF has three output values for each input value,
    //                     // representing inTangent, splineVertex, and outTangent. As a result, track.getValueSize()
    //                     // must be divided by three to get the interpolant's sampleSize argument.
    //
    //                     return new GLTFCubicSplineInterpolant(this.times, this.values, this.getValueSize() / 3, result);
    //
    //                 };
    //
    //                 // Mark as CUBICSPLINE. `track.getInterpolation()` doesn't support custom interpolants.
    //                 track.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = true;
    //
    //             }
    //
    //             tracks.push(track);
    //
    //         }
    //
    //     }
    //
    //     var name = animationDef.name !== undefined ? animationDef.name : 'animation_' + animationIndex;
    //
    //     return new Tiny.AnimationClip(name, undefined, tracks);
    //
    // });

};

/**
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
 * @param {number} nodeIndex
 * @return {Tiny.Object3D}
 */
GLTFParser.prototype.loadNode = function (nodeIndex) {

    var json = this.json;
    var extensions = this.extensions;
    var parser = this;

    var meshReferences = json.meshReferences;
    var meshUses = json.meshUses;

    var nodeDef = json.nodes[nodeIndex];

    var node;

    if (nodeDef.mesh !== undefined) {
        var mesh = parser.getDependency('mesh', nodeDef.mesh);

        if (meshReferences[nodeDef.mesh] > 1) {
            var instanceNum = meshUses[nodeDef.mesh]++;

            node = mesh.clone();
            node.name += '_instance_' + instanceNum;

            // onBeforeRender copy for Specular-Glossiness
            node.onBeforeRender = mesh.onBeforeRender;

            for (var i = 0, il = node.children.length; i < il; i++) {

                node.children[i].name += '_instance_' + instanceNum;
                node.children[i].onBeforeRender = mesh.children[i].onBeforeRender;

            }

        } else {
            node = mesh;
        }

        // if weights are provided on the node, override weights on the mesh.
        if (nodeDef.weights !== undefined) {
            node.traverse(function (o) {

                if (!o.isMesh) return;

                for (var i = 0, il = nodeDef.weights.length; i < il; i++) {

                    o.morphTargetInfluences[i] = nodeDef.weights[i];

                }

            });

        }
    }

    // .isBone isn't in glTF spec. See .markDefs
    if (nodeDef.isBone === true) {
        node = new Tiny.Bone();
    }
    else if (!node) {
        node = new Tiny.Object3D();
    }

    // if (node !== objects[0]) {
    //
    //     for (var i = 0, il = objects.length; i < il; i++) {
    //
    //         node.add(objects[i]);
    //
    //     }
    //
    // }

    if (nodeDef.name !== undefined) {

        node.name = nodeDef.name.replace(/\s/g, '_').replace(_reservedRe, '')

        // node.userData.name = nodeDef.name;
        // node.name = Tiny.PropertyBinding.sanitizeNodeName(nodeDef.name);

    }

    assignExtrasToUserData(node, nodeDef);

    if (nodeDef.extensions) addUnknownExtensionsToUserData(extensions, node, nodeDef);

    if (nodeDef.matrix !== undefined) {

        var matrix = new Tiny.Mat4();
        matrix.fromArray(nodeDef.matrix);
        node.applyMatrix(matrix);

    } else {

        if (nodeDef.translation !== undefined) {

            node.position.fromArray(nodeDef.translation);

        }

        if (nodeDef.rotation !== undefined) {

            node.quaternion.fromArray(nodeDef.rotation);

        }

        if (nodeDef.scale !== undefined) {

            node.scale.fromArray(nodeDef.scale);

        }

    }

    return node;
};

/**
 * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
 * @param {number} sceneIndex
 * @return {Tiny.Object3D}
 */
GLTFParser.prototype.loadScene = function () {

    // scene node hierachy builder

    function buildNodeHierachy(nodeId, parentObject, json, parser) {

        var nodeDef = json.nodes[nodeId];

        var node = parser.getDependency('node', nodeId);

        if (nodeDef.skin !== undefined) {
            // build skeleton here as well

            var skinEntry = parser.getDependency('skin', nodeDef.skin);

            var jointNodes = [];

            for (var i = 0, il = skinEntry.joints.length; i < il; i++) {

                jointNodes.push(parser.getDependency('node', skinEntry.joints[i]));

            }

            node.traverse(function (mesh) {
                if (!mesh.isMesh) return;

                var bones = [];
                var boneInverses = [];

                for (var j = 0, jl = jointNodes.length; j < jl; j++) {

                    var jointNode = jointNodes[j];

                    if (jointNode) {

                        bones.push(jointNode);

                        var mat = new Tiny.Mat4();

                        if (skinEntry.inverseBindMatrices !== undefined) {

                            mat.fromArray(skinEntry.inverseBindMatrices.array, j * 16);

                        }

                        boneInverses.push(mat);

                    } else {

                        console.warn('Tiny.GLTFLoader: Joint "%s" could not be found.', skinEntry.joints[j]);

                    }

                }

                mesh.bind(new Tiny.Skeleton(bones, boneInverses), mesh.worldMatrix);

            });
        }

        parentObject.add(node);

        if (nodeDef.children) {

            var children = nodeDef.children;

            for (var i = 0, il = children.length; i < il; i++) {
                var child = children[i];

                buildNodeHierachy(child, node, json, parser);
            }

        }

        return node;
    }

    return function loadScene(sceneIndex) {

        var json = this.json;
        var extensions = this.extensions;
        var sceneDef = this.json.scenes[sceneIndex];
        var parser = this;

        var scene = new Tiny.Object3D();
        if (sceneDef.name !== undefined) scene.name = sceneDef.name;

        assignExtrasToUserData(scene, sceneDef);

        if (sceneDef.extensions) addUnknownExtensionsToUserData(extensions, scene, sceneDef);

        var nodeIds = sceneDef.nodes || [];

        for (var i = 0, il = nodeIds.length; i < il; i++) {
            buildNodeHierachy(nodeIds[i], scene, json, parser);
        }

        return scene;
    };

}();

export {GLTFLoader};