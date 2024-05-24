function Uniform({ value, boundary, itemSize }) {
    this.boundary = boundary; // used to build the uniform buffer according to the STD140 layout
    this.itemSize = itemSize;

    this.location = null;

    this.glValue = itemSize === 1 ? 0 : new Float32Array(this.itemSize);

    this.dirty = false;

    value && this.set(value);
}

Uniform.prototype = {
    constructor: Uniform,

    set(value) {
        this.value = value;

        this.dirty = true;
    },

    apply(gl) {}
};

function FloatUniform(value) {
    Uniform.call(this, {
        value,
        boundary: 0,
        itemSize: 1
    });
}

FloatUniform.prototype = Object.assign(Object.create(Uniform), {
    constructor: FloatUniform,

    set: function (value) {
        Uniform.prototype.set.call(this, value);

        this.glValue = value;
    },

    apply: function (gl) {
        gl.uniform1f(this.location, this.glValue);

        this.dirty = false;
    }
});

function TextureUniform(value) {
    Uniform.call(this, {
        value,
        boundary: 0,
        itemSize: 1
    });
}

TextureUniform.prototype = Object.assign(Uniform.prototype, {
    constructor: TextureUniform,

    isTextureUniform: true,

    apply: function (gl, unit) {
        gl.uniform1i(this.location, unit);

        this.dirty = false;
    }
});

function Vector2Uniform(value) {
    Uniform.call(this, {
        value,
        boundary: 8,
        itemSize: 2
    });
}

Vector2Uniform.prototype = Object.assign(Object.create(Uniform), {
    constructor: Vector2Uniform,

    set: function (value) {
        Uniform.prototype.set.call(this).call(this, value);

        this.glValue[0] = value.x;
        this.glValue[1] = value.y;
    },

    apply: function (gl) {
        gl.uniform2fv(this.location, this.glValue);

        this.dirty = false;
    }
});

function Vector3Uniform(value) {
    Uniform.call(this, {
        value,
        boundary: 12,
        itemSize: 3
    });
}

Vector3Uniform.prototype = Object.assign(Object.create(Uniform), {
    constructor: Vector3Uniform,

    set: function (value) {
        Uniform.prototype.set.call(this, value);

        this.glValue[0] = value.x;
        this.glValue[1] = value.y;
        this.glValue[2] = value.z;
    },

    apply: function (gl) {
        gl.uniform3fv(this.location, this.glValue);

        this.dirty = false;
    }
});

function Vector4Uniform(value) {
    Uniform.call(this, {
        value,
        boundary: 16,
        itemSize: 4
    });
}

Vector4Uniform.prototype = Object.assign(Object.create(Uniform), {
    constructor: Vector4Uniform,

    set: function (value) {
        Uniform.prototype.set.call(this, value);

        this.glValue[0] = value.x;
        this.glValue[1] = value.y;
        this.glValue[2] = value.z;
        this.glValue[3] = value.w;
    },

    apply: function (gl) {
        gl.uniform4fv(this.location, this.glValue);

        this.dirty = false;
    }
});

function ColorUniform(value) {
    Uniform.call(this, {
        value,
        boundary: 16,
        itemSize: 3
    });
}

ColorUniform.prototype = Object.assign(Object.create(Uniform), {
    constructor: ColorUniform,

    set: function (value) {
        Uniform.prototype.set.call(this, value);

        this.glValue[0] = value.r;
        this.glValue[1] = value.g;
        this.glValue[2] = value.b;
    },

    apply: function (gl) {
        gl.uniform3fv(this.location, this.glValue);

        this.dirty = false;
    }
});

function Matrix3Uniform(value) {
    Uniform.call(this, {
        value,
        boundary: 48,
        itemSize: 12
    });
}

Matrix3Uniform.prototype = Object.assign(Object.create(Uniform), {
    constructor: Matrix3Uniform,

    set: function (value) {
        Uniform.prototype.set.call(this, value);

        this.glValue.set(value.elements);
    },

    apply: function (gl) {
        gl.uniformMatrix3fv(this.location, false, this.glValue);

        this.dirty = false;
    }
});

function Matrix4Uniform(value) {
    Uniform.call(this, {
        value,
        boundary: 64,
        itemSize: 16
    });
}

Matrix4Uniform.prototype = Object.assign(Object.create(Uniform), {
    constructor: Matrix4Uniform,

    set: function (value) {
        Uniform.prototype.set.call(this, value);

        this.glValue.set(value.elements);
    },

    apply: function (gl) {
        gl.uniformMatrix4fv(this.location, false, this.glValue);

        this.dirty = false;
    }
});

export {
    Uniform,
    FloatUniform,
    TextureUniform,
    Vector2Uniform,
    Vector3Uniform,
    Vector4Uniform,
    ColorUniform,
    Matrix3Uniform,
    Matrix4Uniform
};