var EMPTY_ARRAY_BUFFER = new ArrayBuffer(0);

function GLBuffer(gl, type, data, drawType) {
    /**
     * The current WebGL rendering context
     *
     * @member {WebGLRenderingContext}
     */
    this.gl = gl;

    /**
     * The WebGL buffer, created upon instantiation
     *
     * @member {WebGLBuffer}
     */
    this.buffer = gl.createBuffer();

    /**
     * The type of the buffer
     *
     * @member {gl.ARRAY_BUFFER|gl.ELEMENT_ARRAY_BUFFER}
     */
    this.type = type || gl.ARRAY_BUFFER;

    /**
     * The draw type of the buffer
     *
     * @member {gl.STATIC_DRAW|gl.DYNAMIC_DRAW|gl.STREAM_DRAW}
     */
    this.drawType = drawType || gl.STATIC_DRAW;

    /**
     * The data in the buffer, as a typed array
     *
     * @member {ArrayBuffer| SharedArrayBuffer|ArrayBufferView}
     */
    this.data = EMPTY_ARRAY_BUFFER;

    if (data) {
        this.upload(data);
    }

    this._updateID = 0;
}

Object.assign(GLBuffer.prototype, {
    /**
     * Uploads the buffer to the GPU
     * @param data {ArrayBuffer| SharedArrayBuffer|ArrayBufferView} an array of data to upload
     * @param offset {Number} if only a subset of the data should be uploaded, this is the amount of data to subtract
     * @param dontBind {Boolean} whether to bind the buffer before uploading it
     */
    upload: function (data, offset, dontBind) {
        // todo - needed?
        if (!dontBind) this.bind();

        var gl = this.gl;

        data = data || this.data;
        offset = offset || 0;

        if (this.data.byteLength >= data.byteLength) {
            gl.bufferSubData(this.type, offset, data);
        } else {
            gl.bufferData(this.type, data, this.drawType);
        }

        this.data = data;
    },
    /**
     * Binds the buffer
     *
     */
    bind: function () {
        var gl = this.gl;
        gl.bindBuffer(this.type, this.buffer);
    },

    /**
     * Destroys the buffer
     *
     */
    dispose: function () {
        this.gl.deleteBuffer(this.buffer);
    }
});

export { GLBuffer };
