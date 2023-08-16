export * from './3d//math';
export * from './3d/core';
export * from './3d/extras';

import { Light } from './objects/lights/Light';
import { AmbientLight } from './objects/lights/AmbientLight';
import { DirectionalLight } from './objects/lights/DirectionalLight';

Tiny.Light = Light;
Tiny.AmbientLight = AmbientLight;
Tiny.DirectionalLight = DirectionalLight;
