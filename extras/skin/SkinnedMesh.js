const tempMat4 = /* @__PURE__ */ new Tiny.Mat4();

export class SkinnedMesh extends Tiny.Mesh {
    constructor(geometry, material) {
        super(geometry, material);
    }

    createBoneTexture() {
        if (!this.bones.length) return;
        const gl = game.renderer.gl;

        const size = Math.max(4, Math.pow(2, Math.ceil(Math.log(Math.sqrt(this.bones.length * 4)) / Math.LN2)));
        this.boneMatrices = new Float32Array(size * size * 4);
        this.material.uniforms.boneTextureSize.set(size);
        this.boneTexture = new Tiny.WebGlTexture(gl, {
            image: this.boneMatrices,
            generateMipmaps: false,
            type: gl.FLOAT,
            internalFormat: gl.renderer.isWebgl2 ? gl.RGBA32F : gl.RGBA,
            minFilter: gl.NEAREST,
            magFilter: gl.NEAREST,
            wrapS: gl.CLAMP_TO_EDGE,
            wrapT: gl.CLAMP_TO_EDGE,
            flipY: false,
            width: size,
            anisotropy: 1,
            format: gl.RGBA,
            unpackAlignment: 1
        });

        this.material.uniforms.boneTexture.set(this.boneTexture);
    }

    normalizeSkinWeights() {
        var vector = new Tiny.Vec4();

        var skinWeight = this.geometry.attributes.skinWeight;

        for ( var i = 0, l = skinWeight.count; i < l; i ++ ) {

            vector.x = skinWeight.getX( i );
            vector.y = skinWeight.getY( i );
            vector.z = skinWeight.getZ( i );
            vector.w = skinWeight.getW( i );

            var scale = 1.0 / vector.manhattanLength();

            if ( scale !== Infinity ) {

                vector.multiplyScalar( scale );

            } else {

                vector.set( 1, 0, 0, 0 ); // do something reasonable

            }

            skinWeight.setXYZW( i, vector.x, vector.y, vector.z, vector.w );

        }

    }

    draw({ camera } = {}) {
        // Update world matrices manually, as not part of scene graph
        // Update bone texture
        this.bones.forEach((bone, i) => {
            bone.updateTransform();
            // Find difference between current and bind pose
            tempMat4.multiplyMatrices(bone.worldMatrix, bone.bindInverse);
            this.boneMatrices.set(tempMat4.elements, i * 16);
        });
        if (this.boneTexture) this.boneTexture.needsUpdate = true;

        super.draw({ camera });
    }
}