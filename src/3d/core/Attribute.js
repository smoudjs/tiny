// @TODO implement correct attribute class

function Attribute(attrJSON) {
    Object.assign(this, attrJSON);
}

Attribute.prototype = {
    constructor: Attribute,

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