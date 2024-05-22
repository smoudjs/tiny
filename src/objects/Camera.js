/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/

import { Mat4 } from '../math/Mat4.js';
import { Object3D } from './Object3D.js';
import { Vec3 } from '../math/Vec3.js';

function Camera() {

    Object3D.call( this );

    this.type = 'Camera';

    this.matrixWorldInverse = new Mat4();

    this.projectionMatrix = new Mat4();
    this.projectionMatrixInverse = new Mat4();

}

Camera.prototype = Object.assign( Object.create( Object3D.prototype ), {

    constructor: Camera,

    isCamera: true,

    copy: function ( source, recursive ) {

        Object3D.prototype.copy.call( this, source, recursive );

        this.matrixWorldInverse.copy( source.matrixWorldInverse );

        this.projectionMatrix.copy( source.projectionMatrix );
        this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

        return this;

    },

    getWorldDirection: function ( target ) {

        if ( target === undefined ) {

            console.warn( 'THREE.Camera: .getWorldDirection() target is now required' );
            target = new Vec3();

        }

        this.updateMatrixWorld( true );

        var e = this.matrixWorld.elements;

        return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize();

    },

    updateMatrixWorld: function ( force ) {

        Object3D.prototype.updateMatrixWorld.call( this, force );

        this.matrixWorldInverse.getInverse( this.matrixWorld );

    },

    clone: function () {

        return new this.constructor().copy( this );

    }

} );

export { Camera };
