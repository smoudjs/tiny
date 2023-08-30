import {denormalize, normalize} from '../math/MathFunc';

import {Vec2} from "../math/Vec2-3d";
import {Vec3} from "../math/Vec3";

import {StaticDrawUsage} from "./WebGLRenderer";

const _vector = /*@__PURE__*/ new Vec3();
const _vector2 = /*@__PURE__*/ new Vec2();

function Attribute(array, itemSize = 1, normalized = false) {
    this.isAttribute = true;

    this.array = array;
    this.itemSize = itemSize;
    this.count = array !== undefined ? array.length / itemSize : 0;
    this.normalized = normalized;

    this.usage = StaticDrawUsage;
    this.updateRange = {offset: 0, count: -1};
    this.offset = 0;
    this.stride = 0;
    this.instanced = 0;

    this.needsUpdate = true;
}

Attribute.prototype = {
    constructor: Attribute,

    copy(source) {

        this.name = source.name;
        this.array = new source.array.constructor(source.array);
        this.itemSize = source.itemSize;
        this.count = source.count;
        this.normalized = source.normalized;

        this.usage = source.usage;

        return this;

    },

    applyMatrix3(m) {

        if (this.itemSize === 2) {

            for (let i = 0, l = this.count; i < l; i++) {

                _vector2.fromAttribute(this, i);
                _vector2.applyMatrix3(m);

                this.setXY(i, _vector2.x, _vector2.y);

            }

        } else if (this.itemSize === 3) {

            for (let i = 0, l = this.count; i < l; i++) {

                _vector.fromAttribute(this, i);
                _vector.applyMatrix3(m);

                this.setXYZ(i, _vector.x, _vector.y, _vector.z);

            }

        }

        return this;

    },

    applyMatrix4(m) {

        for (let i = 0, l = this.count; i < l; i++) {

            _vector.fromAttribute(this, i);

            _vector.applyMatrix4(m);

            this.setXYZ(i, _vector.x, _vector.y, _vector.z);

        }

        return this;

    },

    applyNormalMatrix(m) {

        for (let i = 0, l = this.count; i < l; i++) {

            _vector.fromAttribute(this, i);

            _vector.applyNormalMatrix(m);

            this.setXYZ(i, _vector.x, _vector.y, _vector.z);

        }

        return this;

    },

    transformDirection(m) {

        for (let i = 0, l = this.count; i < l; i++) {

            _vector.fromAttribute(this, i);

            _vector.transformDirection(m);

            this.setXYZ(i, _vector.x, _vector.y, _vector.z);

        }

        return this;

    },

    set(value, offset = 0) {

        // Matching Attribute constructor, do not normalize the array.
        this.array.set(value, offset);

        this.needsUpdate = true;

        return this;

    },

    getX(index) {

        let x = this.array[index * this.itemSize];

        if (this.normalized) x = denormalize(x, this.array);

        return x;

    },

    setX(index, x) {

        if (this.normalized) x = normalize(x, this.array);

        this.array[index * this.itemSize] = x;

        return this;

    },

    getY(index) {

        let y = this.array[index * this.itemSize + 1];

        if (this.normalized) y = denormalize(y, this.array);

        return y;

    },

    setY(index, y) {

        if (this.normalized) y = normalize(y, this.array);

        this.array[index * this.itemSize + 1] = y;

        return this;

    },

    getZ(index) {

        let z = this.array[index * this.itemSize + 2];

        if (this.normalized) z = denormalize(z, this.array);

        return z;

    },

    setZ(index, z) {

        if (this.normalized) z = normalize(z, this.array);

        this.array[index * this.itemSize + 2] = z;

        return this;

    },

    getW(index) {

        let w = this.array[index * this.itemSize + 3];

        if (this.normalized) w = denormalize(w, this.array);

        return w;

    },

    setW(index, w) {

        if (this.normalized) w = normalize(w, this.array);

        this.array[index * this.itemSize + 3] = w;

        return this;

    },

    setXY(index, x, y) {

        index *= this.itemSize;

        if (this.normalized) {

            x = normalize(x, this.array);
            y = normalize(y, this.array);

        }

        this.array[index + 0] = x;
        this.array[index + 1] = y;

        return this;

    },

    setXYZ(index, x, y, z) {

        index *= this.itemSize;

        if (this.normalized) {

            x = normalize(x, this.array);
            y = normalize(y, this.array);
            z = normalize(z, this.array);

        }

        this.array[index + 0] = x;
        this.array[index + 1] = y;
        this.array[index + 2] = z;

        return this;

    },

    setXYZW(index, x, y, z, w) {

        index *= this.itemSize;

        if (this.normalized) {

            x = normalize(x, this.array);
            y = normalize(y, this.array);
            z = normalize(z, this.array);
            w = normalize(w, this.array);

        }

        this.array[index + 0] = x;
        this.array[index + 1] = y;
        this.array[index + 2] = z;
        this.array[index + 3] = w;

        return this;

    },

    clone() {

        return new this.constructor(this.array, this.itemSize).copy(this);

    }
}

function Int8Attribute(array, itemSize, normalized) {
    Attribute.call(this, new Int8Array(array), itemSize, normalized);
}

Int8Attribute.prototype = Object.assign(Object.create(Attribute.prototype), {
    constructor: Int8Attribute,
});

// @TODO Horch check if needed
function Uint8Attribute(array, itemSize, normalized) {
    Attribute.call(this, new Uint8Array(array), itemSize, normalized);
}

Uint8Attribute.prototype = Object.assign(Object.create(Attribute.prototype), {
    constructor: Uint8Attribute,
});

// @TODO Horch check if needed
function Uint8ClampedAttribute(array, itemSize, normalized) {
    Attribute.call(this, new Uint8ClampedArray(array), itemSize, normalized);
}

Uint8ClampedAttribute.prototype = Object.assign(Object.create(Attribute.prototype), {
    constructor: Uint8ClampedAttribute,
});

function Int16Attribute(array, itemSize, normalized) {
    Attribute.call(this, new Int16Array(array), itemSize, normalized);
}

Int16Attribute.prototype = Object.assign(Object.create(Attribute.prototype), {
    constructor: Int16Attribute,
});

function Uint16Attribute(array, itemSize, normalized) {
    Attribute.call(this, new Uint16Array(array), itemSize, normalized);
}

Uint16Attribute.prototype = Object.assign(Object.create(Attribute.prototype), {
    constructor: Uint16Attribute,
});

function Int32Attribute(array, itemSize, normalized) {
    Attribute.call(this, new Int32Array(array), itemSize, normalized);
}

Int32Attribute.prototype = Object.assign(Object.create(Attribute.prototype), {
    constructor: Int32Attribute,
});

function Uint32Attribute(array, itemSize, normalized) {
    Attribute.call(this, new Uint32Array(array), itemSize, normalized);
}

Uint32Attribute.prototype = Object.assign(Object.create(Attribute.prototype), {
    constructor: Uint32Attribute,
});

// @TODO Horch check if needed
function Float16Attribute(array, itemSize, normalized) {

    Attribute.call(this, new Uint16Array(array), itemSize, normalized);
}

Float16Attribute.prototype = Object.assign(Object.create(Attribute.prototype), {
    constructor: Float16Attribute,
});

function Float32Attribute(array, itemSize, normalized) {
    Attribute.call(this, new Float32Array(array), itemSize, normalized);
}

Float32Attribute.prototype = Object.assign(Object.create(Attribute.prototype), {
    constructor: Float32Attribute,
});

// @TODO Horch check if needed
function Float64Attribute(array, itemSize, normalized) {
    Attribute.call(this, new Float64Array(array), itemSize, normalized);
}

Float64Attribute.prototype = Object.assign(Object.create(Attribute.prototype), {
    constructor: Float64Attribute,
});

export {
    Float64Attribute,
    Float32Attribute,
    Float16Attribute,
    Uint32Attribute,
    Int32Attribute,
    Uint16Attribute,
    Int16Attribute,
    Uint8ClampedAttribute,
    Uint8Attribute,
    Int8Attribute,
    Attribute
};
