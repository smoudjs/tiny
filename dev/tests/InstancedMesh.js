import App from '../basic/App.js';
import { randomIn } from '../utils/Math';

class InstancedMeshTest {
    static name = 'instancedMesh';

    constructor(app) {
        this.app = app;
    }

    preload() {
        this.app.load.image('leaf', require('examples/textures/leaf.jpg'));
    }

    create() {
        const instancedMesh = new Tiny.InstancedMesh(
            new Tiny.BoxGeometry(0.5, 0.5, 0.5),
            new Tiny.MeshLambertMaterial({
                color: 0x23f334,
                opacity: 0.8,
                transparent: true,
                alphaMap: 'leaf',
                map: 'leaf'
            }),
            1000
        );

        const testMatrixes = [];

        const pos = 10;

        for (let i = 0; i < instancedMesh.count; i++) {
            const mat4 = new Tiny.Mat4();

            mat4.angleOffset = 50 * i;
            mat4.axis = new Tiny.Vec3(randomIn(pos), randomIn(pos), randomIn(pos));

            const r = Math.random() * Math.PI * 2;

            const cos = Math.cos(r);
            const sin = Math.sin(r);

            mat4.makeRotationX(cos);
            mat4.setPosition(cos * mat4.axis.x, sin * mat4.axis.y, -sin * mat4.axis.z);

            testMatrixes.push(mat4);

            instancedMesh.setMatrixAt(i, mat4);
        }

        instancedMesh.scale.set(0.5, 0.5, 0.5);

        this.testMatrixes = testMatrixes;
        this.instancedMesh = instancedMesh;

        this.app.scene.add(instancedMesh);
    }

    update(time, delta) {
        for (let i = 0; i < this.instancedMesh.count; i++) {
            const mat4 = this.testMatrixes[i];

            const cos = Math.cos((time + mat4.angleOffset) * 0.001);
            const sin = Math.sin((time + mat4.angleOffset) * 0.001);

            mat4.makeRotationX((time + mat4.angleOffset) * 0.001);
            mat4.setPosition(cos * mat4.axis.x, sin * mat4.axis.y, -sin * mat4.axis.z);

            this.instancedMesh.setMatrixAt(i, mat4);
        }

        this.instancedMesh.instanceMatrix.needsUpdate = true;
   } 
}

App.registerTest(InstancedMeshTest);
