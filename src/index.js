import './utils/polyfills.js';

/**
 * Core modules
 */
export { CanvasBuffer } from './utils/CanvasBuffer.js';
export { EventTarget } from './utils/EventTarget.js';
export { SystemTarget } from './utils/SystemTarget.js';
export { _Math } from './math/Math.js';
export { Color } from './math/Color.js';
export { Mat3 } from './math/Mat3.js';
export { Vec2 } from './math/Vec2.js';

/**
 * Apps modules
 */
export { App } from './app/App.js';
export { RAF } from './app/RAF.js';
export { LoadingSystem } from './loaders/LoadingSystem.js';
import './loaders/ImageLoader.js';
import './loaders/AtlasLoader.js';
import './loaders/SpritesheetLoader.js';
export { Cache } from './loaders/Cache.js';
export { InputSystem } from './app/Input.js';
export { Timer } from './app/Timer.js';
export { TweenSystem, Easing, Interpolation } from './app/Tween.js';

/**
 * 2D modules
 */
export { Object2D } from './objects/Object2D.js';
export { Scene } from './objects/Scene.js';
export { Sprite } from './objects/Sprite.js';
export { Text } from './objects/Text.js';
export { Graphics } from './objects/Graphics.js';
export { BaseTexture } from './textures/BaseTexture.js';
export { Texture } from './textures/Texture.js';
export { TextureUvs } from './textures/TextureUvs.js';
export { RenderTexture } from './textures/RenderTexture.js';
export { Rectangle } from './math/shapes/Rectangle.js';

/**
 * 3D modules
 */
export { Vec3 } from './math/Vec3.js';
export { Mat4 } from './math/Mat4.js';
export { Quat } from './math/Quat.js';
export { Geometry } from './geometries/Geometry.js';
export { Object3D } from './objects/Object3D.js';
export { Mesh } from './objects/Mesh.js';
export { InstancedMesh } from './objects/InstancedMesh.js';
export { Sprite3D } from './objects/Sprite3D.js';
export { Canvas } from './objects/Canvas.js';
export { Screen } from './objects/Screen.js';
// export { Light } from './objects/lights/Light.js';
// export { AmbientLight } from './objects/lights/AmbientLight.js';
// export { DirectionalLight } from './objects/lights/DirectionalLight.js';
// export { Camera } from './objects/Camera.js';
export { OrthographicCamera } from './objects/OrthographicCamera.js';
export { PerspectiveCamera } from './objects/PerspectiveCamera.js';
// export {
//     Attribute,
//     Float16Attribute,
//     Float32Attribute,
//     Float64Attribute, Int16Attribute,
//     Int32Attribute, Int8Attribute, Uint16Attribute,
//     Uint32Attribute, Uint8Attribute, Uint8ClampedAttribute
// } from "./renderers/Attribute";
// export {Material} from "./renderers/Material";
// export {InstancedMeshBasicMaterial, PointsMaterial} from "./renderers/materials";
// export {
//     ColorUniform,
//     FloatUniform, Matrix3Uniform, Matrix4Uniform,
//     TextureUniform,
//     Uniform,
//     Vector2Uniform,
//     Vector3Uniform,
//     Vector4Uniform
// } from "./renderers/Uniform";

// export { WebGLRenderer } from './renderers/WebGLRenderer.js';

// export { PlaneGeometry } from './renderers/geometries/PlaneGeometry.js';
export { BoxGeometry } from './geometries/BoxGeometry.js';
// export { MeshLambertMaterial } from './renderers/materials/MeshLambertMaterial.js';
export { MeshBasicMaterial } from './materials/MeshBasicMaterial.js';
export { MeshLambertMaterial } from './materials/MeshLambertMaterial.js';
// export { InstancedMeshLambertMaterial } from './renderers/materials/InstancedMeshLambertMaterial.js';
export { AmbientLight } from './objects/AmbientLight.js';
export { DirectionalLight } from './objects/DirectionalLight.js';

/**
 * WebGL renderer modules
 */
export { WebGLRenderer } from './webgl-renderer/WebGLRenderer.js';
export * from './webgl-renderer/2d/index.js';

export * from './constants.js';
