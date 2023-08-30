
import { GLTFAnimation } from './GLTFAnimation.js';
import { GLTFSkin } from './GLTFSkin.js';

var Tiny = window.Tiny,
    Geometry = Tiny.Geometry,
    Object3D = Tiny.Object3D,
    Texture = Tiny.Texture,
    Mesh = Tiny.Mesh,
    MeshLambertMaterial = Tiny.MeshLambertMaterial,
    Mat4 = Tiny.Mat4,
    InstancedMesh = Tiny.InstancedMesh;

// Supports
// [x] glb
// [x] Geometry
// [x] Nodes and Hierarchy
// [x] Instancing
// [x] Skins
// [x] Textures
// [x] Animation
// [x] GLB support
// [x] Basis/ktx2
// [x] KHR_lights_punctual lights
// [ ] Morph Targets
// [ ] Materials
// [ ] Cameras

// TODO: Sparse accessor packing? For morph targets basically
// TODO: init accessor missing bufferView with 0s
// TODO: morph target animations
// TODO: option to turn off GPU instancing

const TYPE_ARRAY = {
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array,
    'image/jpeg': Uint8Array,
    'image/png': Uint8Array,
};

const TYPE_ATTRIBUTES = {
    5121: Tiny.Uint8Attribute,
    5122: Tiny.Int16Attribute,
    5123: Tiny.Uint16Attribute,
    5125: Tiny.Uint32Attribute,
    5126: Tiny.Float32Attribute,
}

const TYPE_SIZE = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16,
};

const ATTRIBUTES = {
    POSITION: 'position',
    NORMAL: 'normal',
    TANGENT: 'tangent',
    TEXCOORD_0: 'uv',
    TEXCOORD_1: 'uv2',
    COLOR_0: 'color',
    WEIGHTS_0: 'skinWeight',
    JOINTS_0: 'skinIndex',
};

const TRANSFORMS = {
    translation: 'position',
    rotation: 'quaternion',
    scale: 'scale',
};

export class GLTFLoader {
    static setBasisManager(manager) {
        this.basisManager = manager;
    }

    static async load(gl, src) {
        const dir = '/';

        // load main description json
        // const desc = await this.parseDesc(src);
        const desc = JSON.parse(src);

        return await this.parse(gl, desc, dir);
    }

    static async parse(gl, desc, cb) {
        if (desc.asset === undefined || desc.asset.version[0] < 2) console.warn('Only GLTF >=2.0 supported. Attempting to parse.');

        const buffers = await this.loadBuffers(desc);

        // Unbind current VAO so that new buffers don't get added to active mesh
        gl.renderer.bindVertexArray(null);

        // Create gl buffers from bufferViews
        const bufferViews = this.parseBufferViews(gl, desc, buffers);

        // Fetch the inverse bind matrices for skeleton joints
        const skins = this.parseSkins(gl, desc, bufferViews);

        // Create geometries for each mesh primitive
        const meshes = this.parseMeshes(gl, desc, bufferViews, [], skins);

        // Create transforms, meshes and hierarchy
        const nodes = this.parseNodes(gl, desc, meshes, skins, []);

        // Place nodes in skeletons
        this.populateSkins(skins, nodes);

        // Create animation handlers
        const animations = this.parseAnimations(gl, desc, nodes, bufferViews);

        // Get top level nodes for each scene
        const scenes = this.parseScenes(desc, nodes);
        const scene = scenes[desc.scene];

        // Remove null nodes (instanced transforms)
        for (let i = nodes.length; i >= 0; i--) if (!nodes[i]) nodes.splice(i, 1);

        for (let i = 0; i < nodes.length; i++) {
            const resourceElement = nodes[i];

            if (resourceElement.geometry) {
                resourceElement.geometry.computeVertexNormals();
            }
        }

        cb({
            json: desc,
            buffers,
            bufferViews,
            meshes,
            nodes,
            animations,
            scenes,
            scene,
            getObjectByName: function(name = '') {
                const {nodes} = this;

                for (let i = 0; i < nodes.length; i++) {
                    const node = nodes[i];

                    if (node.name === name) {
                        return node;
                    }
                }
            }
        });
    }

    static async parseDesc(src) {
        if (!src.match(/\.glb/)) {
            return await fetch(src).then((res) => res.json());
        } else {
            return await fetch(src)
                .then((res) => res.arrayBuffer())
                .then((glb) => this.unpackGLB(glb));
        }
    }

    // From https://github.com/donmccurdy/glTF-Object3D/blob/e4108cc/packages/core/src/io/io.ts#L32
    static unpackGLB(glb) {
        // Decode and verify GLB header.
        const header = new Uint32Array(glb, 0, 3);
        if (header[0] !== 0x46546c67) {
            throw new Error('Invalid glTF asset.');
        } else if (header[1] !== 2) {
            throw new Error(`Unsupported glTF binary version, "${header[1]}".`);
        }
        // Decode and verify chunk headers.
        const jsonChunkHeader = new Uint32Array(glb, 12, 2);
        const jsonByteOffset = 20;
        const jsonByteLength = jsonChunkHeader[0];
        if (jsonChunkHeader[1] !== 0x4e4f534a) {
            throw new Error('Unexpected GLB layout.');
        }

        // Decode JSON.
        const jsonText = new TextDecoder().decode(glb.slice(jsonByteOffset, jsonByteOffset + jsonByteLength));
        const json = JSON.parse(jsonText);
        // JSON only
        if (jsonByteOffset + jsonByteLength === glb.byteLength) return json;

        const binaryChunkHeader = new Uint32Array(glb, jsonByteOffset + jsonByteLength, 2);
        if (binaryChunkHeader[1] !== 0x004e4942) {
            throw new Error('Unexpected GLB layout.');
        }
        // Decode content.
        const binaryByteOffset = jsonByteOffset + jsonByteLength + 8;
        const binaryByteLength = binaryChunkHeader[0];
        const binary = glb.slice(binaryByteOffset, binaryByteOffset + binaryByteLength);
        // Attach binary to buffer
        json.buffers[0].binary = binary;
        return json;
    }

    // Threejs GLTF Loader https://github.com/mrdoob/three.js/blob/master/examples/js/loaders/GLTFLoader.js#L1085
    static resolveURI(uri, dir = '') {
        // Invalid URI
        if (typeof uri !== 'string' || uri === '') return '';

        // Host Relative URI
        if (/^https?:\/\//i.test(dir) && /^\//.test(uri)) {
            dir = dir.replace(/(^https?:\/\/[^\/]+).*/i, '$1');
        }

        // Absolute URI http://, https://, //
        if (/^(https?:)?\/\//i.test(uri)) return uri;

        // Data URI
        if (/^data:.*,.*$/i.test(uri)) return uri;

        // Blob URI
        if (/^blob:.*$/i.test(uri)) return uri;

        // Relative URI
        return dir + uri;
    }

    static async loadBuffers(desc) {
        if (!desc.buffers) return null;
        return await Promise.all(
            desc.buffers.map((buffer) => {
                // For GLB, binary buffer ready to go
                if (buffer.binary) return buffer.binary;
                const uri = this.resolveURI(buffer.uri);
                return fetch(uri).then((res) => res.arrayBuffer());
            })
        );
    }

    static parseBufferViews(gl, desc, buffers) {
        if (!desc.bufferViews) return null;
        // Clone to leave description pure
        const bufferViews = desc.bufferViews.map((o) => Object.assign({}, o));

        desc.meshes &&
        desc.meshes.forEach(({ primitives }) => {
            primitives.forEach(({ attributes, indices }) => {
                // Flag bufferView as an attribute, so it knows to create a gl buffer
                for (let attr in attributes) bufferViews[desc.accessors[attributes[attr]].bufferView].isAttribute = true;

                if (indices === undefined) return;
                bufferViews[desc.accessors[indices].bufferView].isAttribute = true;

                // Make sure indices bufferView have a target property for gl buffer binding
                bufferViews[desc.accessors[indices].bufferView].target = gl.ELEMENT_ARRAY_BUFFER;
            });
        });

        // Get componentType of each bufferView from the accessors
        desc.accessors.forEach(({ bufferView: i, componentType }) => {
            bufferViews[i].componentType = componentType;
        });

        // Get mimetype of bufferView from images
        desc.images &&
        desc.images.forEach(({ uri, bufferView: i, mimeType }) => {
            if (i === undefined) return;
            bufferViews[i].mimeType = mimeType;
        });

        // Push each bufferView to the GPU as a separate buffer
        bufferViews.forEach(
            (
                {
                    buffer: bufferIndex, // required
                    byteOffset = 0, // optional
                    byteLength, // required
                    byteStride, // optional
                    target = gl.ARRAY_BUFFER, // optional, added above for elements
                    name, // optional
                    extensions, // optional
                    extras, // optional

                    componentType, // optional, added from accessor above
                    mimeType, // optional, added from images above
                    isAttribute,
                },
                i
            ) => {
                bufferViews[i].data = buffers[bufferIndex].slice(byteOffset, byteOffset + byteLength);

                if (!isAttribute) return;
                // Create gl buffers for the bufferView, pushing it to the GPU
                const buffer = gl.createBuffer();
                gl.bindBuffer(target, buffer);
                gl.renderer.state.boundBuffer = buffer;
                gl.bufferData(target, bufferViews[i].data, gl.STATIC_DRAW);
                bufferViews[i].buffer = buffer;
            }
        );

        return bufferViews;
    }

    static parseSkins(gl, desc, bufferViews) {
        if (!desc.skins) return null;
        return desc.skins.map(
            ({
                 inverseBindMatrices, // optional
                 skeleton, // optional
                 joints, // required
                 // name,
                 // extensions,
                 // extras,
             }) => {
                return {
                    inverseBindMatrices: this.parseAccessor(inverseBindMatrices, desc, bufferViews),
                    skeleton,
                    joints,
                };
            }
        );
    }

    static parseMeshes(gl, desc, bufferViews, materials, skins) {
        if (!desc.meshes) return null;
        return desc.meshes.map(
            (
                {
                    primitives, // required
                    weights, // optional
                    name, // optional
                    extensions, // optional
                    extras, // optional
                },
                meshIndex
            ) => {
                // TODO: weights stuff ?
                // Parse through nodes to see how many instances there are
                // and if there is a skin attached
                // If multiple instances of a skin, need to create each
                let numInstances = 0;
                let skinIndices = [];
                let isLightmap = false;
                desc.nodes &&
                desc.nodes.forEach(({ mesh, skin, extras }) => {
                    if (mesh === meshIndex) {
                        numInstances++;
                        if (skin !== undefined) skinIndices.push(skin);
                        if (extras && extras.lightmap_scale_offset) isLightmap = true;
                    }
                });
                let isSkin = !!skinIndices.length;

                // For skins, return array of skin meshes to account for multiple instances
                if (isSkin) {
                    primitives = skinIndices.map((skinIndex) => {
                        return this.parsePrimitives(gl, primitives, desc, bufferViews, materials, 1, isLightmap).map(
                            ({ geometry, program, mode }) => {
                                const mesh = new GLTFSkin(gl, { skeleton: skins[skinIndex], geometry, program, mode });
                                mesh.name = name;
                                // TODO: support skin frustum culling
                                mesh.frustumCulled = false;
                                return mesh;
                            }
                        );
                    });
                    // For retrieval to add to node
                    primitives.instanceCount = 0;
                    primitives.numInstances = numInstances;
                } else {
                    primitives = this.parsePrimitives(gl, primitives, desc, bufferViews, materials, numInstances, isLightmap).map(
                        ({ geometry, program, mode }) => {
                            // InstancedMesh class has custom frustum culling for instances
                            const meshConstructor = geometry.attributes.instanceMatrix ? InstancedMesh : Mesh;
                            const mesh = new meshConstructor(geometry, program, { mode });
                            mesh.name = name;
                            // Tag mesh so that nodes can add their transforms to the instance attribute
                            mesh.numInstances = numInstances;
                            return mesh;
                        }
                    );
                }

                return {
                    primitives,
                    weights,
                    name,
                };
            }
        );
    }

    static parsePrimitives(gl, primitives, desc, bufferViews, materials, numInstances, isLightmap) {
        return primitives.map(
            ({
                 attributes, // required
                 indices, // optional
                 material: materialIndex, // optional
                 mode = 4, // optional
                 targets, // optional
                 extensions, // optional
                 extras, // optional
             }) => {
                // TODO: materials
                const program = new MeshLambertMaterial();

                program.initialize(gl);

                if (materialIndex !== undefined) {
                    program.gltfMaterial = materials[materialIndex];
                }

                const geometry = new Geometry();

                geometry.initialize(gl);

                // Add each attribute found in primitive
                for (let attr in attributes) {
                    geometry.setAttribute(ATTRIBUTES[attr], this.parseAccessor(attributes[attr], desc, bufferViews));
                }

                // Add index attribute if found
                if (indices !== undefined) {
                    const data = this.parseAccessor(indices, desc, bufferViews);

                    geometry.setIndex(data.array);
                }

                // Add instanced transform attribute if multiple instances
                // Ignore if skin as we don't support instanced skins out of the box
                if (numInstances > 1) {
                    geometry.addAttribute('instanceMatrix', {
                        instanced: 1,
                        size: 16,
                        data: new Float32Array(numInstances * 16),
                    });
                }

                return {
                    geometry,
                    program,
                    mode,
                };
            }
        );
    }

    static parseAccessor(index, desc, bufferViews) {
        // TODO: init missing bufferView with 0s
        // TODO: support sparse

        const {
            bufferView: bufferViewIndex, // optional
            byteOffset = 0, // optional
            componentType, // required
            normalized = false, // optional
            count, // required
            type, // required
            min, // optional
            max, // optional
            sparse, // optional
            // name, // optional
            // extensions, // optional
            // extras, // optional
        } = desc.accessors[index];

        const {
            data, // attached in parseBufferViews
            buffer, // replaced to be the actual GL buffer
            byteOffset: bufferByteOffset = 0,
            // byteLength, // applied in parseBufferViews
            byteStride = 0,
            target,
            // name,
            // extensions,
            // extras,
        } = bufferViews[bufferViewIndex];

        const size = TYPE_SIZE[type];

        // Parse data from joined buffers
        const TypeArray = TYPE_ARRAY[componentType];
        const elementBytes = TypeArray.BYTES_PER_ELEMENT;
        const componentStride = byteStride / elementBytes;
        const isInterleaved = !!byteStride && componentStride !== size;

        let filteredData;

        // Convert data to typed array for various uses (bounding boxes, raycasting, animation, merging etc)
        if (isInterleaved) {
            // First convert entire buffer to type
            const typedData = new TypeArray(data, byteOffset);
            // TODO: add length to not copy entire buffer if can help it
            // const typedData = new TypeArray(data, byteOffset, (count - 1) * componentStride)

            // Create output with length
            filteredData = new TypeArray(count * size);

            // Add element by element
            for (let i = 0; i < count; i++) {
                const start = componentStride * i;
                const end = start + size;
                filteredData.set(typedData.slice(start, end), i * size);
            }
        } else {
            // Simply a slice
            filteredData = new TypeArray(data, byteOffset, count * size);
        }

        return new TYPE_ATTRIBUTES[componentType](filteredData, size, normalized);

        // Return attribute data
        return {
            data: filteredData,
            size,
            type: componentType,
            normalized,
            buffer,
            stride: byteStride,
            offset: byteOffset,
            count,
            min,
            max,
        };
    }

    static parseNodes(gl, desc, meshes, skins, images) {
        if (!desc.nodes) return null;
        const nodes = desc.nodes.map(
            ({
                 camera, // optional
                 children, // optional
                 skin: skinIndex, // optional
                 matrix, // optional
                 mesh: meshIndex, // optional
                 rotation, // optional
                 scale, // optional
                 translation, // optional
                 weights, // optional
                 name, // optional
                 extensions, // optional
                 extras, // optional
             }) => {
                const node = new Object3D();
                if (name) node.name = name;
                node.extras = extras;
                node.extensions = extensions;

                // Need to attach to node as may have same material but different lightmap
                if (extras && extras.lightmapTexture !== undefined) {
                    extras.lightmapTexture.texture = this.createTexture(gl, desc, images, { source: extras.lightmapTexture.index });
                }

                // Apply transformations
                if (matrix) {
                    node.matrix.copy(matrix);
                    node.decompose();
                } else {
                    if (rotation) node.quaternion.copy(rotation);
                    if (scale) node.scale.copy(scale);
                    if (translation) node.position.copy(translation);
                    node.updateMatrix();
                }

                // Flags for avoiding duplicate transforms and removing unused instance nodes
                let isInstanced = false;
                let isFirstInstance = true;
                let isInstancedMatrix = false;
                let isSkin = skinIndex !== undefined;

                // add mesh if included
                if (meshIndex !== undefined) {
                    if (isSkin) {
                        meshes[meshIndex].primitives[meshes[meshIndex].primitives.instanceCount].forEach((mesh) => {
                            mesh.extras = extras;
                            node.add(mesh);
                        });
                        meshes[meshIndex].primitives.instanceCount++;
                        // Remove properties once all instances added
                        if (meshes[meshIndex].primitives.instanceCount === meshes[meshIndex].primitives.numInstances) {
                            delete meshes[meshIndex].primitives.numInstances;
                            delete meshes[meshIndex].primitives.instanceCount;
                        }
                    } else {
                        meshes[meshIndex].primitives.forEach((mesh) => {
                            mesh.extras = extras;

                            // instanced mesh might only have 1
                            if (mesh.geometry.isInstanced) {
                                isInstanced = true;
                                if (!mesh.instanceCount) {
                                    mesh.instanceCount = 0;
                                } else {
                                    isFirstInstance = false;
                                }
                                if (mesh.geometry.attributes.instanceMatrix) {
                                    isInstancedMatrix = true;
                                    node.matrix.toArray(mesh.geometry.attributes.instanceMatrix.data, mesh.instanceCount * 16);
                                }

                                if (mesh.geometry.attributes.lightmapScaleOffset) {
                                    mesh.geometry.attributes.lightmapScaleOffset.data.set(extras.lightmap_scale_offset, mesh.instanceCount * 4);
                                }

                                mesh.instanceCount++;

                                if (mesh.instanceCount === mesh.numInstances) {
                                    // Remove properties once all instances added
                                    delete mesh.numInstances;
                                    delete mesh.instanceCount;
                                    // Flag attribute as dirty
                                    if (mesh.geometry.attributes.instanceMatrix) {
                                        mesh.geometry.attributes.instanceMatrix.needsUpdate = true;
                                    }
                                    if (mesh.geometry.attributes.lightmapScaleOffset) {
                                        mesh.geometry.attributes.lightmapScaleOffset.needsUpdate = true;
                                    }
                                }
                            }

                            // For instances, only the first node will actually have the mesh
                            if (isInstanced) {
                                if (isFirstInstance) node.add(mesh);
                            } else {
                                node.add(mesh);
                            }
                        });
                    }
                }

                // Reset node if instanced to not duplicate transforms
                if (isInstancedMatrix) {
                    // Remove unused nodes just providing an instance transform
                    if (!isFirstInstance) return null;
                    // Avoid duplicate transform for node containing the instanced mesh
                    node.matrix.identity();
                    node.decompose();
                }

                if (meshIndex !== undefined) {
                    meshes[meshIndex].primitives[0].name = node.name;

                    return meshes[meshIndex].primitives[0];
                }
                return node;
            }
        );

        desc.nodes.forEach(({ children = [] }, i) => {
            // Set hierarchy now all nodes created
            children.forEach((childIndex) => {
                if (!nodes[childIndex]) return;
                nodes[i].add(nodes[childIndex]);
            });
        });

        // Add frustum culling for instances now that instanceMatrix attribute is populated
        meshes.forEach(({ primitives }, i) => {
            primitives.forEach((primitive, i) => {
                if (primitive.isInstancedMesh) primitive.addFrustumCull();
            });
        });

        return nodes;
    }

    static populateSkins(skins, nodes) {
        if (!skins) return;
        skins.forEach((skin) => {
            skin.joints = skin.joints.map((i, index) => {
                const joint = nodes[i];
                joint.skin = skin;
                joint.bindInverse = new Mat4(...skin.inverseBindMatrices.data.slice(index * 16, (index + 1) * 16));
                return joint;
            });
            if (skin.skeleton) skin.skeleton = nodes[skin.skeleton];
        });
    }

    static parseAnimations(gl, desc, nodes, bufferViews) {
        if (!desc.animations) return null;
        return desc.animations.map(
            (
                {
                    channels, // required
                    samplers, // required
                    name, // optional
                    // extensions, // optional
                    // extras,  // optional
                },
                animationIndex
            ) => {
                const data = channels.map(
                    ({
                         sampler: samplerIndex, // required
                         target, // required
                         // extensions, // optional
                         // extras, // optional
                     }) => {
                        const {
                            input: inputIndex, // required
                            interpolation = 'LINEAR',
                            output: outputIndex, // required
                            // extensions, // optional
                            // extras, // optional
                        } = samplers[samplerIndex];

                        const {
                            node: nodeIndex, // optional - TODO: when is it not included?
                            path, // required
                            // extensions, // optional
                            // extras, // optional
                        } = target;

                        const node = nodes[nodeIndex];
                        const transform = TRANSFORMS[path];
                        const times = this.parseAccessor(inputIndex, desc, bufferViews).data;
                        const values = this.parseAccessor(outputIndex, desc, bufferViews).data;

                        // Store reference on node for cyclical retrieval
                        if (!node.animations) node.animations = [];
                        if (!node.animations.includes(animationIndex)) node.animations.push(animationIndex);

                        return {
                            node,
                            transform,
                            interpolation,
                            times,
                            values,
                        };
                    }
                );

                return {
                    name,
                    animation: new GLTFAnimation(data),
                };
            }
        );
    }

    static parseScenes(desc, nodes) {
        if (!desc.scenes) return null;
        return desc.scenes.map(
            ({
                 nodes: nodesIndices = [],
                 name, // optional
                 extensions,
                 extras,
             }) => {
                const scene = nodesIndices.reduce((map, i) => {
                    // Don't add null nodes (instanced transforms)
                    if (nodes[i]) map.push(nodes[i]);
                    return map;
                }, []);
                scene.extras = extras;
                return scene;
            }
        );
    }
}
