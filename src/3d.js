import { Vec3 } from './math/Vec3.js';
import { Mat4 } from './math/Mat4.js';
import { Quat } from './math/Quat.js';
import { Geometry } from './geometries/Geometry.js';
import { Object3D } from './objects/Object3D.js';
import { Mesh } from './objects/Mesh.js';
import { InstancedMesh } from './objects/InstancedMesh.js';
import { Sprite3D } from './objects/Sprite3D.js';
import { Canvas } from './objects/Canvas';
import { Screen } from './objects/Screen';
// import { Light } from './objects/lights/Light.js';
// import { AmbientLight } from './objects/lights/AmbientLight.js';
// import { DirectionalLight } from './objects/lights/DirectionalLight.js';
// import { Camera } from './objects/Camera.js';
import { OrthographicCamera } from './objects/OrthographicCamera.js';
// import {
//     Attribute,
//     Float16Attribute,
//     Float32Attribute,
//     Float64Attribute, Int16Attribute,
//     Int32Attribute, Int8Attribute, Uint16Attribute,
//     Uint32Attribute, Uint8Attribute, Uint8ClampedAttribute
// } from "./renderers/Attribute";
// import {Material} from "./renderers/Material";
// import {InstancedMeshBasicMaterial, PointsMaterial} from "./renderers/materials";
// import {
//     ColorUniform,
//     FloatUniform, Matrix3Uniform, Matrix4Uniform,
//     TextureUniform,
//     Uniform,
//     Vector2Uniform,
//     Vector3Uniform,
//     Vector4Uniform
// } from "./renderers/Uniform";

// import { WebGLRenderer } from './renderers/WebGLRenderer.js';

// import { PlaneGeometry } from './renderers/geometries/PlaneGeometry.js';
import { BoxGeometry } from './geometries/BoxGeometry.js';
// import { MeshLambertMaterial } from './renderers/materials/MeshLambertMaterial.js';
import { MeshBasicMaterial } from './materials/MeshBasicMaterial.js';
import { MeshLambertMaterial } from './materials/MeshLambertMaterial.js';
// import { InstancedMeshLambertMaterial } from './renderers/materials/InstancedMeshLambertMaterial.js';
import { AmbientLight } from './objects/AmbientLight.js';
import { DirectionalLight } from './objects/DirectionalLight.js';

Tiny.Vec3 = Vec3;
Tiny.Mat4 = Mat4;
Tiny.Quat = Quat;
Tiny.Geometry = Geometry;
Tiny.MeshBasicMaterial = MeshBasicMaterial;
Tiny.MeshLambertMaterial = MeshLambertMaterial;
Tiny.Object3D = Object3D;
Tiny.Mesh = Mesh;
Tiny.Sprite3D = Sprite3D;
Tiny.AmbientLight = AmbientLight;
Tiny.DirectionalLight = DirectionalLight;
Tiny.InstancedMesh = InstancedMesh;
Tiny.Canvas = Canvas;
Tiny.Screen = Screen;

// Tiny.Light = Light;
// Tiny.AmbientLight = AmbientLight;

// Tiny.Camera = Camera;
Tiny.OrthographicCamera = OrthographicCamera;

// Tiny.WebGLRenderer = WebGLRenderer;
// Tiny.WebGlTexture = Texture;

// Tiny.PlaneGeometry = PlaneGeometry;
Tiny.BoxGeometry = BoxGeometry;

// Tiny.Material = Material;
// Tiny.MeshBasicMaterial = MeshBasicMaterial;
// Tiny.MeshLambertMaterial = MeshLambertMaterial;
// Tiny.PointsMaterial = PointsMaterial;

// Tiny.InstancedMeshBasicMaterial = InstancedMeshBasicMaterial;
// Tiny.InstancedMeshLambertMaterial = InstancedMeshLambertMaterial;

// Tiny.Uniform = Uniform;
// Tiny.FloatUniform = FloatUniform;
// Tiny.TextureUniform = TextureUniform;
// Tiny.Vector2Uniform = Vector2Uniform;
// Tiny.Vector3Uniform = Vector3Uniform;
// Tiny.Vector4Uniform = Vector4Uniform;
// Tiny.ColorUniform = ColorUniform;
// Tiny.Matrix3Uniform = Matrix3Uniform;
// Tiny.Matrix4Uniform = Matrix4Uniform;

// Tiny.Attribute = Attribute;

// Tiny.Float64Attribute = Float64Attribute;
// Tiny.Float32Attribute = Float32Attribute;
// Tiny.Float16Attribute = Float16Attribute;
// Tiny.Uint32Attribute = Uint32Attribute;
// Tiny.Int32Attribute = Int32Attribute;
// Tiny.Uint16Attribute = Uint16Attribute;
// Tiny.Int16Attribute = Int16Attribute;
// Tiny.Uint8ClampedAttribute = Uint8ClampedAttribute;
// Tiny.Uint8Attribute = Uint8Attribute;
// Tiny.Int8Attribute = Int8Attribute;
