import { Light } from './Light';

var DirectionalLight = function (color, intensity) {
    Light.call(this, color, intensity);
    this.isDirectionalLight = true;
};

DirectionalLight.prototype = Object.create(Light.prototype);
DirectionalLight.prototype.constructor = DirectionalLight;

export { DirectionalLight };
