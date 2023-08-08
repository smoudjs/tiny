import { Object3D } from './Object3D.js';
import { Matrix3 } from '../math/Matrix3.js';
import { Matrix4 } from '../math/Matrix4.js';

let ID = 0;

export class Mesh extends Object3D {
    constructor(gl, { geometry, program, mode = gl.TRIANGLES, frustumCulled = true, renderOrder = 0 } = {}) {
        super();
        if (!gl.canvas) console.error('gl not passed as first argument to Mesh');
        this.gl = gl;
        this.id = ID++;
        this.geometry = geometry;
        this.program = program;
        this.mode = mode;

        // Used to skip frustum culling
        this.frustumCulled = frustumCulled;

        // Override sorting to force an order
        this.renderOrder = renderOrder;
        this.modelViewMatrix = new Matrix4();
        this.normalMatrix = new Matrix3();
        this.beforeRenderCallbacks = [];
        this.afterRenderCallbacks = [];
    }

    onBeforeRender(f) {
        this.beforeRenderCallbacks.push(f);
        return this;
    }

    onAfterRender(f) {
        this.afterRenderCallbacks.push(f);
        return this;
    }

    draw({ camera, directionalLight, ambientLight } = {}) {
        if (camera) {
            // Add empty matrix uniforms to program if unset
            if (!this.program.uniforms.modelMatrix) {
                Object.assign(this.program.uniforms, {
                    modelMatrix: { value: null },
                    viewMatrix: { value: null },
                    modelViewMatrix: { value: null },
                    normalMatrix: { value: null },
                    projectionMatrix: { value: null },
                    cameraPosition: { value: null },
                    directionalLightColor: {value: [
                        0,
                        0,
                        0,
                        0
                    ]},
                    directionalLightDirection: {value: [0, 0, 0]},
                    ambientLightColor: {value: [0, 0, 0, 0]}
                });
            }

            // Set the matrix uniforms
            this.program.uniforms.projectionMatrix.value = camera.projectionMatrix.elements;
            this.program.uniforms.cameraPosition.value = camera.worldPosition.toArray();
            this.program.uniforms.viewMatrix.value = camera.viewMatrix.elements;
            this.modelViewMatrix.multiplyMatrices(camera.viewMatrix, this.worldMatrix);
            this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
            this.program.uniforms.modelMatrix.value = this.worldMatrix.elements;
            this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix.elements;
            this.program.uniforms.normalMatrix.value = this.normalMatrix.elements;

            if (ambientLight) {
                this.program.uniforms.ambientLightColor.value = [
                    ambientLight.color.r,
                    ambientLight.color.g,
                    ambientLight.color.b,
                    ambientLight.visible ? ambientLight.intensity : 0
                ];
            }

            if (directionalLight) {
                this.program.uniforms.directionalLightColor.value = [
                    directionalLight.color.r,
                    directionalLight.color.g,
                    directionalLight.color.b,
                    directionalLight.visible ? directionalLight.intensity : 0
                ];

                this.program.uniforms.directionalLightDirection.value = directionalLight.position.toArray();
            }
        }
        this.beforeRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));

        // determine if faces need to be flipped - when mesh scaled negatively
        let flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
        this.program.use({ flipFaces });
        this.geometry.draw({ mode: this.mode, program: this.program });
        this.afterRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
    }
}
