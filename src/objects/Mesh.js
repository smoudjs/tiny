import { Vec4 } from '../math/Vec4';
import { Object3D } from './Object3D.js';
import { Mat3 } from '../math/Mat3.js';
import { Mat4 } from '../math/Mat4.js';

var ID = 0;

function Mesh(
    geometry,
    program,
    { mode = WebGLRenderingContext.TRIANGLES, frustumCulled = true, renderOrder = 0 } = {}
) {
    Object3D.call(this);

    this.id = ID++;
    this.geometry = geometry;
    this.program = program;
    this.mode = mode;

    // Used to skip frustum culling
    this.frustumCulled = frustumCulled;

    // Override sorting to force an order
    this.renderOrder = renderOrder;
    this.modelViewMatrix = new Mat4();
    this.normalMatrix = new Mat3();
    this.beforeRenderCallbacks = [];
    this.afterRenderCallbacks = [];
}

Mesh.prototype = Object.assign(Object.create(Object3D.prototype), {
    constructor: Mesh,

    onBeforeRender: function (f) {
        this.beforeRenderCallbacks.push(f);
        return this;
    },

    onAfterRender: function (f) {
        this.afterRenderCallbacks.push(f);
        return this;
    },

    draw: function ({ camera, directionalLight, ambientLight } = {}) {
        if (this.program.gl.renderer.state.currentProgram !== this.program.id) {
            if (this.program.isMeshLambertMaterial || this.program.isInstancedMeshLambertMaterial) {
                if (ambientLight) {
                    this.program.uniforms.ambientLight.set(
                        new Vec4(
                            ambientLight.color.r,
                            ambientLight.color.g,
                            ambientLight.color.b,
                            ambientLight.visible ? ambientLight.intensity : 0
                        )
                    );
                }

                if (directionalLight) {
                    this.program.uniforms.directionalLight.set(
                        new Vec4(
                            directionalLight.color.r,
                            directionalLight.color.g,
                            directionalLight.color.b,
                            directionalLight.visible ? directionalLight.intensity : 0
                        )
                    );

                    this.program.uniforms.directionalLightDirection.set(directionalLight.position);
                }
            }
        }

        if (camera.projectMatrixDirty) {
            this.program.uniforms.projectViewMatrix.set(camera.projectionViewMatrix);
        }

        this.program.uniforms.modelMatrix.set(this.worldMatrix);

        this.beforeRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));

        // determine if faces need to be flipped - when mesh scaled negatively
        var flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
        this.program.use({ flipFaces });
        this.geometry.draw({ mode: this.mode, program: this.program });
        this.afterRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
    }
});

export { Mesh };
