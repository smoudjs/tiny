import {Vec3} from './math/Vec3';
import {Mat4} from './math/Mat4';
import {Quat} from './math/Quat';
import {Object3D} from './objects/Object3D';
import {Mesh} from './objects/Mesh';
import {InstancedMesh} from './objects/InstancedMesh';
import {Light} from './objects/lights/Light';
import {AmbientLight} from './objects/lights/AmbientLight';
import {DirectionalLight} from './objects/lights/DirectionalLight';
import {Camera} from './objects/Camera';
import {OrthographicCamera} from './objects/OrthographicCamera';
import {
    Attribute,
    Float16Attribute,
    Float32Attribute,
    Float64Attribute, Int16Attribute,
    Int32Attribute, Int8Attribute, Uint16Attribute,
    Uint32Attribute, Uint8Attribute, Uint8ClampedAttribute
} from "./renderers/Attribute";
import {Material} from "./renderers/Material";
import {InstancedMeshBasicMaterial, PointsMaterial} from "./renderers/materials";
import {
    ColorUniform,
    FloatUniform, Matrix3Uniform, Matrix4Uniform,
    TextureUniform,
    Uniform,
    Vector2Uniform,
    Vector3Uniform,
    Vector4Uniform
} from "./renderers/Uniform";

import {WebGLRenderer} from './renderers/WebGLRenderer';

import {PlaneGeometry} from './renderers/geometries/PlaneGeometry';
import {BoxGeometry} from './renderers/geometries/BoxGeometry';
import {MeshLambertMaterial} from './renderers/materials/MeshLambertMaterial';
import {MeshBasicMaterial} from './renderers/materials/MeshBasicMaterial';
import {InstancedMeshLambertMaterial} from './renderers/materials/InstancedMeshLambertMaterial';
import {Texture} from './renderers/Texture';

Tiny.Vec3 = Vec3;
Tiny.Mat4 = Mat4;
Tiny.Quat = Quat;

Tiny.Object3D = Object3D;
Tiny.Mesh = Mesh;
Tiny.InstancedMesh = InstancedMesh;

Tiny.Light = Light;
Tiny.AmbientLight = AmbientLight;
Tiny.DirectionalLight = DirectionalLight;

Tiny.Camera = Camera;
Tiny.OrthographicCamera = OrthographicCamera;

Tiny.WebGLRenderer = WebGLRenderer;
Tiny.WebGlTexture = Texture;

Tiny.PlaneGeometry = PlaneGeometry;
Tiny.BoxGeometry = BoxGeometry;

Tiny.Material = Material;
Tiny.MeshBasicMaterial = MeshBasicMaterial;
Tiny.MeshLambertMaterial = MeshLambertMaterial;
Tiny.PointsMaterial = PointsMaterial;

Tiny.InstancedMeshBasicMaterial = InstancedMeshBasicMaterial;
Tiny.InstancedMeshLambertMaterial = InstancedMeshLambertMaterial;

Tiny.Uniform = Uniform;
Tiny.FloatUniform = FloatUniform;
Tiny.TextureUniform = TextureUniform;
Tiny.Vector2Uniform = Vector2Uniform;
Tiny.Vector3Uniform = Vector3Uniform;
Tiny.Vector4Uniform = Vector4Uniform;
Tiny.ColorUniform = ColorUniform;
Tiny.Matrix3Uniform = Matrix3Uniform;
Tiny.Matrix4Uniform = Matrix4Uniform;

Tiny.Attribute = Attribute;

Tiny.Float64Attribute = Float64Attribute;
Tiny.Float32Attribute = Float32Attribute;
Tiny.Float16Attribute = Float16Attribute;
Tiny.Uint32Attribute = Uint32Attribute;
Tiny.Int32Attribute = Int32Attribute;
Tiny.Uint16Attribute = Uint16Attribute;
Tiny.Int16Attribute = Int16Attribute;
Tiny.Uint8ClampedAttribute = Uint8ClampedAttribute;
Tiny.Uint8Attribute = Uint8Attribute;
Tiny.Int8Attribute = Int8Attribute;
