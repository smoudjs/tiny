import { Attribute } from '../renderers/Attribute';
import { Mesh } from './Mesh.js';

const mat4Length = 16;

function InstancedMesh(geometry, material, count) {
    count = count !== undefined ? count : 1;

    if (!geometry.attributes.instancedMatrix) {
        const instancedMatrix = new Float32Array(count * mat4Length);

        geometry.attributes.instancedMatrix = new Attribute({
            instanced: 1,
            size: mat4Length,
            data: instancedMatrix
        });
    }

    geometry.instancedCount = count;

    Mesh.call(this, geometry, material);

    // Skip renderer frustum culling
    this.frustumCulled = false;
    this.isInstancedMesh = true;
}

InstancedMesh.prototype = Object.create(Mesh.prototype);
InstancedMesh.prototype.constructor = InstancedMesh;

Object.defineProperty(InstancedMesh.prototype, 'count', {
    get: function () {
        return this.geometry.instancedCount;
    },

    set: function (value) {
        this.geometry.instancedCount = value;
    }
});

InstancedMesh.prototype.setMatrixAt = function (index, matrix) {
    this.geometry.attributes.instancedMatrix.set(matrix.elements, index * mat4Length);
};

// @TODO add later
// addFrustumCull() {
//     this.instanceTransforms = null;
//     this.instanceLightmapScaleOffset = null;
//     this.totalInstanceCount = 0;
//     this.frustumCullFunction = null;
//     this.instanceRenderList = null;
//
//     // Get instanced mesh
//     if (!this.geometry.attributes.instanceMatrix)
//         console.error(`mesh ${this.name ? `"${this.name}" ` : ``}missing instanceMatrix attribute; unable to frustum cull`);
//
//     // Make list of transforms from instanceMatrix
//     const matrixData = this.geometry.attributes.instanceMatrix.data;
//     this.instanceTransforms = [];
//     for (let i = 0, j = 0; i < matrixData.length; i += mat4Length, j++) {
//         const transform = new Object3D();
//         transform.index = j;
//         transform.matrix.fromArray(matrixData, i);
//         transform.decompose();
//         this.instanceTransforms.push(transform);
//         // Add transforms to parent to update world matrices
//         transform.setParent(this.parent);
//     }
//     this.totalInstanceCount = this.instanceTransforms.length;
//
//     // Check for lightmap attributes - attach to transform
//     if (!!this.geometry.attributes.lightmapScaleOffset) {
//         const lightmapData = this.geometry.attributes.lightmapScaleOffset.data;
//         for (let i = 0, j = 0; i < lightmapData.length; i += 4, j++) {
//             this.instanceTransforms[j].lightmapData = new Vec4().fromArray(lightmapData, i);
//         }
//     }
//
//     this.frustumCullFunction = ({ camera }) => {
//         // frustum cull transforms each frame - pass world matrix
//         this.instanceRenderList = [];
//         this.instanceTransforms.forEach((transform) => {
//             if (!camera.frustumIntersectsMesh(this, transform.worldMatrix)) return;
//             this.instanceRenderList.push(transform);
//         });
//
//         // update instanceMatrix and instancedCount with visible
//         this.instanceRenderList.forEach((transform, i) => {
//             transform.matrix.toArray(this.geometry.attributes.instanceMatrix.data, i * mat4Length);
//
//             // Update lightmap attr
//             if (transform.lightmapData) {
//                 transform.lightmapData.toArray(this.geometry.attributes.lightmapScaleOffset.data, i * 4);
//                 this.geometry.attributes.lightmapScaleOffset.needsUpdate = true;
//             }
//         });
//         this.geometry.instancedCount = this.instanceRenderList.length;
//         this.geometry.attributes.instanceMatrix.needsUpdate = true;
//     };
//
//     this.onBeforeRender(this.frustumCullFunction);
// }
//
// removeFrustumCull() {
//     this.offBeforeRender(this.frustumCullFunction);
//     this.geometry.instancedCount = this.totalInstanceCount;
//     this.instanceTransforms.forEach((transform, i) => {
//         transform.matrix.toArray(this.geometry.attributes.instanceMatrix.data, i * mat4Length);
//
//         // Update lightmap attr
//         if (transform.lightmapData) {
//             transform.lightmapData.toArray(this.geometry.attributes.lightmapScaleOffset.data, i * 4);
//             this.geometry.attributes.lightmapScaleOffset.needsUpdate = true;
//         }
//     });
//     this.geometry.attributes.instanceMatrix.needsUpdate = true;
// }

export { InstancedMesh };
