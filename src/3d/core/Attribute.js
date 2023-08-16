
// @TODO implement correct attribute class
export class Attribute {
    constructor(attrJSON) {
        Object.assign(this, attrJSON);
    }

    set(array, offset = 0) {
        this.data.set(array, offset);

        this.needsUpdate = true;
    }

    getX(index) {
        let x = this.data[index * this.size];

        //@TODO uncomment later
        // if ( this.normalized ) x = denormalize( x, this.array );

        return x;
    }

    getY(index) {
        let y = this.data[index * this.size + 1];

        //@TODO uncomment later
        // if ( this.normalized ) x = denormalize( x, this.array );

        return y;
    }

    getZ(index) {
        let z = this.data[index * this.size + 2];

        //@TODO uncomment later
        // if ( this.normalized ) x = denormalize( x, this.array );

        return z;
    }

    setXYZ( index, x, y, z ) {
        const {data, size} = this;

        index *= size;

        //@TODO uncomment later
        // if ( this.normalized ) {
        //     x = normalize( x, this.data );
        //     y = normalize( y, this.data );
        //     z = normalize( z, this.data );
        // }

        data[ index + 0 ] = x;
        data[ index + 1 ] = y;
        data[ index + 2 ] = z;

        return this;
    }
}