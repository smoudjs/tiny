import { WebGLRenderer } from '../WebGLRenderer.js';

/**
 * TextureGCSystem. This class manages the GPU and ensures that it does not get clogged
 * up with textures that are no longer being used.
 *
 * @class
 * @memberof Tiny
 */

function TextureGCSystem(renderer) {
    this.renderer = renderer;

    this.count = 0;
    this.checkCount = 0;
    this.maxIdle = TextureGCSystem.defaultMaxIdle;
    this.checkCountMax = TextureGCSystem.defaultCheckCountMax;
    this.active = TextureGCSystem.defaultActive;

    renderer.on('postrender', this.postrender, this);
}

Object.assign(TextureGCSystem.prototype, {
    constructor: TextureGCSystem,

    /**
     * Checks to see when the last time a texture was used
     * if the texture has not been used for a specified amount of time it will be removed from the GPU
     */
    postrender: function () {
        // if (!this.renderer.renderingToScreen) return;

        this.count++;

        if (!this.active) return;

        this.checkCount++;

        if (this.checkCount > this.checkCountMax) {
            this.checkCount = 0;

            this.run();
        }
    },

    /**
     * Checks to see when the last time a texture was used
     * if the texture has not been used for a specified amount of time it will be removed from the GPU
     */
    run: function () {
        // const tm = this.renderer.textureManager;
        const managedTextures = this.renderer.textures.managedTextures;
        let wasRemoved = false;

        for (let i = 0; i < managedTextures.length; i++) {
            const texture = managedTextures[i];

            // only supports non generated textures at the moment!
            if (!texture._glRenderTargets && this.count - texture.touched > this.maxIdle) {
                texture.dispose();
                // console.log(texture.uuid + ': Dispose !');

                // tm.destroyTexture(texture, true);
                // managedTextures[i] = null;
                // wasRemoved = true;
            }
        }

        // if (wasRemoved) {
        //     let j = 0;

        //     for (let i = 0; i < managedTextures.length; i++) {
        //         if (managedTextures[i] !== null) {
        //             managedTextures[j++] = managedTextures[i];
        //         }
        //     }

        //     managedTextures.length = j;
        // }
    },

    /**
     * Removes all the textures within the specified displayObject and its children from the GPU
     *
     * @param {PIXI.DisplayObject} displayObject - the displayObject to remove the textures from.
     */
    unload: function (displayObject) {
        const tm = this.renderer.textureManager;

        // only destroy non generated textures
        if (displayObject._texture && displayObject._texture._glRenderTargets) {
            tm.destroyTexture(displayObject._texture, true);
        }

        for (let i = displayObject.children.length - 1; i >= 0; i--) {
            this.unload(displayObject.children[i]);
        }
    },

    dispose: function () {
        this.renderer.off('postrender', this.postrender, this);
        this.renderer = null;
    }
});

TextureGCSystem.system = {
    name: 'textureGC',
    rooted: true
};

/**
 * If set to true, this will enable the garbage collector on the GPU.
 * @default true
 */
TextureGCSystem.defaultActive = true;

/**
 * The maximum idle frames before a texture is destroyed by garbage collection.
 * @default 60 * 60
 */
TextureGCSystem.defaultMaxIdle = 60 * 60;

/**
 * Frames between two garbage collections.
 * @default 600
 */
TextureGCSystem.defaultCheckCountMax = 600;

WebGLRenderer.registerSystem(TextureGCSystem);

export { TextureGCSystem };
