/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/

import { Mat4 } from '../math/Mat4.js';
import { Object3D } from './Object3D.js';
import { Vec3 } from '../math/Vec3.js';

function Canvas() {

    Object3D.call( this );

    // this.matrixWorldInverse = new Mat4();

    // this.projectionMatrix = new Mat4();
    // this.projectionMatrixInverse = new Mat4();

}

Canvas.prototype = Object.assign( Object.create( Object3D.prototype ), {

    constructor: Canvas,

    isCanvas: true,

    isSprite: true

} );

export { Canvas };
