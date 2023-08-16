import { tinyVSthreeCubesAmount } from '../constants';

const random = (s = 5) => {
    return (Math.random() - 0.5) * s;
};

const aLofOFBoxesSimulation = (amount) => {
    const color = new Tiny.Color(1, 0, 0);

    let material = new Tiny.MeshLambertMaterial({
        color: color,
        // opacity: 1,
        transparent: false
    });

    let o = 1;

    let newMat = false;

    setInterval(() => {
        // color.b += 0.01;
        // o -= 0.01;
        // material.uniforms.uOpacity.set(o);
    }, 16);

    const geometry = new Tiny.BoxGeometry();

    for (let i = 0; i < amount; i++) {
        const box = new Tiny.Mesh(geometry, material);

        if (!newMat && i > amount / 2) {
            material = new Tiny.MeshLambertMaterial({
                color: new Tiny.Color(0, 1, 0),
                // opacity: 0.5,
                transparent: false
            });

            newMat = true;
        }

        box.position.set(random(), random(), random());

        game.world.add(box);
    }
};

export default class BasicApp extends Tiny.App {
    constructor(width, height, parentNode, states) {
        super(states);

        this.width = width;
        this.height = height;

        window.game = this;

        this.renderer = new Tiny.WebGLRenderer({
            width,
            height
        });

        this.renderer.setClearColor(new Tiny.Color(0.9, 0.9, 0.9), 1);

        var view = (this.inputView = this.renderer.domElement);

        parentNode = parentNode ? document.getElementById(parentNode) : document.body;
        parentNode.appendChild(view);
        // view.style.position = 'absolute';

        // view.style.top = "0px";
        // view.style.left = "0px";

        // view.style.transformOrigin = '0% 0%';
        view.style.perspective = '1000px';

        this.world = new Tiny.Object3D();
        this.worldCamera = new Tiny.OrthographicCamera();

        this.worldCamera.position.set(10, 10, 10);
        this.worldCamera.lookAt(0, 0, 0);

        this.control = new Tiny.OrbitControls(this.worldCamera, { element: view });
    }

    preload() {
        this.load.image('rabbitv3', require('textures/bunnies/rabbitv3.png'));
        this.load.image('rabbitv3_batman', require('textures/bunnies/rabbitv3_batman.png'));
    }

    create() {
        // this.textures = resources.map((e) => e.key);

        this.testTexture = new Tiny.WebGlTexture(this.renderer.gl, {
            image: Tiny.Cache.image['rabbitv3']
        });
        //
        // this.testTexture2 = new Tiny.WebGlTexture(this.renderer.gl, {
        //     image: Tiny.Cache.image['rabbitv3_batman']
        // });

        this.box = new Tiny.Mesh(
            new Tiny.BoxGeometry(3,3,3),
            new Tiny.MeshBasicMaterial({
                color: new Tiny.Color(1, 1, 0)
            })
        );

        this.ambientLight = new Tiny.AmbientLight(undefined, 0.5);
        this.directionalLight = new Tiny.DirectionalLight(undefined, 0.5);

        this.directionalLight.position.set(0, 10, 0);

        // this.instancedMesh = new Tiny.InstancedMesh(
        //     new Tiny.BoxGeometry(0.5, 0.5, 0.5),
        //     new Tiny.InstancedMeshLambertMaterial({
        //         color: new Tiny.Color(1, 0, 0)
        //         // map: this.testTexture
        //     }),
        //     tinyVSthreeCubesAmount
        // );

        const { box, world, instancedMesh } = this;

        // box.position.x = 10;

        const testMatrixes = [];

        const pos = 10;

        // for (let i = 0; i < instancedMesh.count; i++) {
        //     const mat4 = new Tiny.Mat4();

        //     mat4.angleOffset = 50 * i;
        //     mat4.axis = new Tiny.Vec3(random(pos), random(pos), random(pos));

        //     const r = Math.random() * Math.PI * 2;

        //     const cos = Math.cos(r);
        //     const sin = Math.sin(r);

        //     mat4.makeRotationX(cos);
        //     mat4.setPosition(cos * mat4.axis.x, sin * mat4.axis.y, -sin * mat4.axis.z);

        //     testMatrixes.push(mat4);

        //     instancedMesh.setMatrixAt(i, mat4);
        // }

        // game.on('update', () => {
        //     // return;

        //     for (let i = 0; i < instancedMesh.count; i++) {
        //         const mat4 = testMatrixes[i];

        //         const cos = Math.cos((game.time + mat4.angleOffset) * 0.001);
        //         const sin = Math.sin((game.time + mat4.angleOffset) * 0.001);

        //         mat4.makeRotationX((game.time + mat4.angleOffset) * 0.001);
        //         mat4.setPosition(cos * mat4.axis.x, sin * mat4.axis.y, -sin * mat4.axis.z);

        //         instancedMesh.setMatrixAt(i, mat4);
        //     }
        // });

        world.add(box);
        // world.add(instancedMesh);

        // aLofOFBoxesSimulation(tinyVSthreeCubesAmount);

        this.resize(window.innerWidth, window.innerHeight);
    }

    setPixelRatio(dpr) {
        this.renderer.setPixelRatio(dpr);
    }

    update(time, delta) {
        delta *= 0.001;
        this.time = time;
        this.control.update();

        this.box.rotation.x += delta;
        this.box.rotation.z += delta;
    }

    render() {
        this.renderer.render({
            scene: this.world,
            camera: this.worldCamera,
            ambientLight: this.ambientLight,
            directionalLight: this.directionalLight
        });
    }

    resize(width, height) {
        super.resize(width, height);

        this.renderer.resize(width, height);

        const { worldCamera } = this;

        const aspect = width / height;
        const distance = 10;

        worldCamera.left = -distance * aspect;
        worldCamera.right = distance * aspect;
        worldCamera.top = distance;
        worldCamera.bottom = -distance;

        worldCamera.updateProjectionMatrix();
    }

    destroy(clearCache) {
        super.destroy(clearCache);

        this.scene.destroy();
        this.renderer.destroy(true);
    }
}
