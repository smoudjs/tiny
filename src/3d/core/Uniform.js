import {Vec3, Vec4} from "../math";

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0, l = a.length; i < l; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

class Uniform {
    constructor(
        {
            value,
            boundary,
            itemSize
        }
) {
        this.boundary = boundary; // used to build the uniform buffer according to the STD140 layout
        this.itemSize = itemSize;

        this.location = null;

        this.glValue = itemSize === 1 ? 0 : new Float32Array(this.itemSize);

        this.dirty = false;

        value && this.set(value);
    }

    set(value) {
        this.value = value;

        this.dirty = true;
    }

    apply(gl) {

    }
}

class FloatUniform extends Uniform {
    constructor(value) {
        super({
            value,
            boundary: 0,
            itemSize: 1
        });
    }

    set(value) {
        super.set(value);

        this.glValue = value;
    }

    apply(gl) {
        gl.uniform1f(this.location, this.glValue);

        this.dirty = false;
    }
}

class TextureUniform extends Uniform {
    constructor(value) {
        super({
            value,
            boundary: 0,
            itemSize: 1
        });

        this.isTextureUniform = true;
    }

    apply(gl, unit) {
        gl.uniform1i(this.location, unit);

        this.dirty = false;
    }
}

class Vector2Uniform extends Uniform {
    constructor(value) {
        super({
            value,
            boundary: 8,
            itemSize: 2
        });
    }

    set(value) {
        super.set(value);

        this.glValue[0] = value.x;
        this.glValue[1] = value.y;
    }

    apply(gl) {
        gl.uniform2fv(this.location, this.glValue);

        this.dirty = false;
    }
}

class Vector3Uniform extends Uniform {
    constructor(value = new Vec3()) {
        super({
            value,
            boundary: 12,
            itemSize: 3
        });
    }

    set(value) {
        super.set(value);

        this.glValue[0] = value.x;
        this.glValue[1] = value.y;
        this.glValue[2] = value.z;
    }

    apply(gl) {
        gl.uniform3fv(this.location, this.glValue);

        this.dirty = false;
    }
}

class Vector4Uniform extends Uniform {
    constructor(value = new Vec4()) {
        super({
            value,
            boundary: 16,
            itemSize: 4
        });
    }

    set(value) {
        if (arraysEqual(this.glValue, value.toArray())) {
            return;
        }

        super.set(value);

        this.glValue[0] = value.x;
        this.glValue[1] = value.y;
        this.glValue[2] = value.z;
        this.glValue[3] = value.w;
    }

    apply(gl) {
        gl.uniform4fv(this.location, this.glValue);

        this.dirty = false;
    }
}

class ColorUniform extends Uniform {
    constructor(value) {
        super( {
            value,
            boundary: 16,
            itemSize: 3
        });
    }

    set(value) {
        super.set(value);

        this.glValue[0] = value.r;
        this.glValue[1] = value.g;
        this.glValue[2] = value.b;
    }

    apply(gl) {
        gl.uniform3fv(this.location, this.glValue);

        this.dirty = false;
    }
}

class Matrix3Uniform extends Uniform {
    constructor(value) {
        super( {
            value,
            boundary: 48,
            itemSize: 12
        });
    }

    set(value) {
        super.set(value);

        this.glValue.set(value.elements);
    }

    apply(gl) {
        gl.uniformMatrix3fv(this.location, false,this.glValue);

        this.dirty = false;
    }
}

class Matrix4Uniform extends Uniform {
    constructor(value) {
        super( {
            value,
            boundary: 64,
            itemSize: 16
        });
    }

    set(value) {
        super.set(value);

        this.glValue.set(value.elements);
    }

    apply(gl) {
        gl.uniformMatrix4fv(this.location, false,this.glValue);

        this.dirty = false;
    }
}

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
