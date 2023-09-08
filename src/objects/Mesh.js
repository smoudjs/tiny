import {Vec4} from '../math/Vec4';
import {Object3D} from './Object3D.js';

var ID = 0;

function Mesh(
    geometry,
    material,
    {mode = WebGLRenderingContext.TRIANGLES, frustumCulled = true, renderOrder = 0} = {}
) {
    Object3D.call(this);

    this.id = ID++;
    this.geometry = geometry;
    this.material = material;
    this.mode = mode;

    // Used to skip frustum culling
    this.frustumCulled = frustumCulled;

    // Override sorting to force an order
    this.renderOrder = renderOrder;
    this.beforeRenderCallbacks = [];
    this.afterRenderCallbacks = [];
}

Mesh.prototype = Object.assign(Object.create(Object3D.prototype), {
    constructor: Mesh,

    isMesh: true,

    clone: function () {
        return new this.constructor(this.geometry, this.material).copy(this);
    },

    copy: function (source) {
        Object3D.prototype.copy.call(this, source);

        this.renderOrder = source.renderOrder;
        this.frustumCulled = source.frustumCulled;
        this.mode = source.mode;

        return this;
    },

    onBeforeRender: function (f) {
        this.beforeRenderCallbacks.push(f);
        return this;
    },

    onAfterRender: function (f) {
        this.afterRenderCallbacks.push(f);
        return this;
    },

    draw: function ({camera, directionalLight, ambientLight} = {}) {
        if (this.material.gl.renderer.state.currentProgram !== this.material.id) {
            if (this.material.isMeshLambertMaterial || this.material.isInstancedMeshLambertMaterial) {
                if (ambientLight) {
                    this.material.uniforms.ambientLight.set(
                        new Vec4(
                            ambientLight.color.r,
                            ambientLight.color.g,
                            ambientLight.color.b,
                            ambientLight.visible ? ambientLight.intensity : 0
                        )
                    );
                }

                if (directionalLight) {
                    this.material.uniforms.directionalLight.set(
                        new Vec4(
                            directionalLight.color.r,
                            directionalLight.color.g,
                            directionalLight.color.b,
                            directionalLight.visible ? directionalLight.intensity : 0
                        )
                    );

                    this.material.uniforms.directionalLightDirection.set(directionalLight.position);
                }
            }
        }

        if (camera.projectMatrixDirty) {
            this.material.uniforms.projectViewMatrix.set(camera.projectionViewMatrix);
        }

        this.material.uniforms.modelMatrix.set(this.worldMatrix);

        this.beforeRenderCallbacks.forEach((f) => f && f({mesh: this, camera}));

        // determine if faces need to be flipped - when mesh scaled negatively
        var flipFaces = this.material.cullFace && this.worldMatrix.determinant() < 0;
        this.material.use({flipFaces});
        this.geometry.draw({mode: this.mode, material: this.material});
        this.afterRenderCallbacks.forEach((f) => f && f({mesh: this, camera}));
    }
});

export {Mesh};
