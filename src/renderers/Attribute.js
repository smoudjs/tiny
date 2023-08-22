import {Vec3} from "../math/Vec3.js";
import {normalize} from "../math/MathFunc";

var _vector = new Vec3();

// @TODO implement correct attribute class

function Attribute(attrJSON) {
    Object.assign(this, attrJSON);
}

Attribute.prototype = {
    constructor: Attribute,

    applyMatrix4: function (m) {
        for (var i = 0, l = this.count; i < l; i++) {

            _vector.fromBufferAttribute(this, i);

            _vector.applyMatrix4(m);

            this.setXYZ(i, _vector.x, _vector.y, _vector.z);

        }

        return this;
    },

    applyNormalMatrix: function (m) {
        for (var i = 0, l = this.count; i < l; i++) {

            _vector.fromBufferAttribute(this, i);

            _vector.applyNormalMatrix(m);

            this.setXYZ(i, _vector.x, _vector.y, _vector.z);

        }

        return this;
    },

    setXYZW: function (index, x, y, z, w) {

        index *= this.itemSize;

        if (this.normalized) {

            x = normalize(x, this.array);
            y = normalize(y, this.array);
            z = normalize(z, this.array);
            w = normalize(w, this.array);

        }

        this.data[index + 0] = toHalfFloat(x);
        this.data[index + 1] = toHalfFloat(y);
        this.data[index + 2] = toHalfFloat(z);
        this.data[index + 3] = toHalfFloat(w);

        return this;
    },

    clone: function () {
        var obj = new this.constructor().copy(this);

        obj.buffer = null;

        return obj;
    },

    copy: function (source) {
        Object.assign(this, source);

        this.data = new source.data.constructor(source.data);

        return this;
    },

    set: function (array, offset = 0) {
        this.data.set(array, offset);

        this.needsUpdate = true;
    },

    getX: function (index) {
        var x = this.data[index * this.size];

        //@TODO uncomment later
        // if ( this.normalized ) x = denormalize( x, this.array );

        return x;
    },

    getY: function (index) {
        var y = this.data[index * this.size + 1];

        //@TODO uncomment later
        // if ( this.normalized ) x = denormalize( x, this.array );

        return y;
    },

    getZ: function (index) {
        var z = this.data[index * this.size + 2];

        //@TODO uncomment later
        // if ( this.normalized ) x = denormalize( x, this.array );

        return z;
    },

    setXYZ: function (index, x, y, z) {
        var {data, size} = this;

        index *= size;

        //@TODO uncomment later
        // if ( this.normalized ) {
        //     x = normalize( x, this.data );
        //     y = normalize( y, this.data );
        //     z = normalize( z, this.data );
        // }

        data[index + 0] = x;
        data[index + 1] = y;
        data[index + 2] = z;

        return this;
    }
}

Tiny.Attribute = Attribute;

export {Attribute};