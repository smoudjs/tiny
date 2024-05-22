/**
 * Base for a common object renderer that can be used as a system renderer plugin.
 *
 * @class
 * @extends PIXI.WebGLManager
 * @memberof PIXI
 */

/**
 * @param {PIXI.WebGLRenderer} renderer - The renderer this manager works for.
 */
function ObjectRenderer(renderer) {
    /**
     * The renderer this manager works for.
     *
     * @member {PIXI.WebGLRenderer}
     */
    this.renderer = renderer;

    this.renderer.on('context', this.onContextChange, this);
}

Object.assign(ObjectRenderer.prototype, {
    constructor: ObjectRenderer,

    onContextChange: function () {
        // do some codes init!
    },

    /**
     * Starts the renderer and sets the shader
     *
     */
    start: function () {
        // set the shader..
    },

    /**
     * Stops the renderer
     *
     */
    stop: function () {
        this.flush();
    },

    /**
     * Stub method for rendering content and emptying the current batch.
     *
     */
    flush: function () {
        // flush!
    },

    /**
     * Renders an object
     *
     * @param {PIXI.DisplayObject} object - The object to render.
     */
    render: function (
        object // eslint-disable-line no-unused-vars
    ) {
        // render the object
    },

    /**
     * Generic destroy methods to be overridden by the subclass
     *
     */
    destroy: function () {
        this.renderer.off('context', this.onContextChange, this);

        this.renderer = null;
    }
});

export { ObjectRenderer };