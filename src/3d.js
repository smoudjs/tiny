import { Vec3 } from './math/Vec3';
import { Mat4 } from './math/Mat4';
import { Object3D } from './objects/Object3D';
import { Mesh } from './objects/Mesh';
import { InstancedMesh } from './objects/InstancedMesh';
import { Light } from './objects/lights/Light';
import { AmbientLight } from './objects/lights/AmbientLight';
import { DirectionalLight } from './objects/lights/DirectionalLight';
import { OrthographicCamera } from './objects/OrthographicCamera';

import { WebGLRenderer } from './renderers/WebGLRenderer';

import { PlaneGeometry } from './renderers/geometries/PlaneGeometry';
import { BoxGeometry } from './renderers/geometries/BoxGeometry';
import { MeshLambertMaterial } from './renderers/materials/MeshLambertMaterial';
import { MeshBasicMaterial } from './renderers/materials/MeshBasicMaterial';
import { InstancedMeshLambertMaterial } from './renderers/materials/InstancedMeshLambertMaterial';
import { Texture } from './renderers/Texture';

Tiny.Vec3 = Vec3;
Tiny.Mat4 = Mat4;
Tiny.Object3D = Object3D;
Tiny.Mesh = Mesh;
Tiny.InstancedMesh = InstancedMesh;
Tiny.Light = Light;
Tiny.AmbientLight = AmbientLight;
Tiny.DirectionalLight = DirectionalLight;
Tiny.OrthographicCamera = OrthographicCamera;

Tiny.WebGLRenderer = WebGLRenderer;

Tiny.WebGlTexture = Texture;
Tiny.PlaneGeometry = PlaneGeometry;
Tiny.BoxGeometry = BoxGeometry;
Tiny.MeshLambertMaterial = MeshLambertMaterial;
Tiny.MeshBasicMaterial = MeshBasicMaterial;
Tiny.InstancedMeshLambertMaterial = InstancedMeshLambertMaterial;
