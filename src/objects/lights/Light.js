import { Object3D } from '../Object3D';
import { Color } from '../../math/Color';

var Light = function (color, intensity) {
    Object3D.call(this);

    this.color = new Color(color);
    this.intensity = intensity !== undefined ? intensity : 1;
};

Light.prototype = Object.create(Object3D.prototype);
Light.prototype.constructor = Light;
