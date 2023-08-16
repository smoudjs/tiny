import { Light } from './Light';

var AmbientLight = function (color, intensity) {
    Light.call(this, color, intensity);
    this.isAmbientLight = true;
};

AmbientLight.prototype = Object.create(Light.prototype);
AmbientLight.prototype.constructor = AmbientLight;

export { AmbientLight };
