import { Object2D } from './Object2D';
import { Mat3 } from '../math/Mat3';

var Scene = function (game) {
    Object2D.call(this);
    this.worldTransform = new Mat3();
    this.game = game;
};

Scene.prototype = Object.create(Object2D.prototype);
Scene.prototype.constructor = Scene;

Scene.prototype.updateTransform = function () {
    this.worldAlpha = 1;

    for (var i = 0, j = this.children.length; i < j; i++) {
        this.children[i].updateTransform();
    }
};

export { Scene };
