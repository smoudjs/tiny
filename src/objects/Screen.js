/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
 */

import { Mat3 } from '../math/Mat3.js';
import { Container } from './Container.js';
import { Vec3 } from '../math/Vec3.js';

function Screen() {
    Container.call(this);

    this.visible = true;
    this.worldAlpha = 1;
    this.worldTransform = new Mat3();

    // this.matrixWorldInverse = new Mat4();

    // this.projectionMatrix = new Mat4();
    // this.projectionMatrixInverse = new Mat4();
}

Screen.prototype = Object.assign(Object.create(Container.prototype), {
    constructor: Screen,

    isObject: true,

    isScreen: true,

    updateMatrixWorld: function () {

        for (var i = 0, j = this.children.length; i < j; i++) {
            this.children[i].updateTransform();
        }
    }
});

export { Screen };
