import {tinyVSthreeCubesAmount} from "../constants";
import resources from "./resources";

const random = (s = 5) => {
    return (Math.random() - 0.5) * s;
}

const aLofOFBoxesSimulation = (amount) => {
    const color = new Tiny.Color(1, 0, 0);

    let material = new Tiny.MeshLambertMaterial({
        color: color,
        // opacity: 1,
        transparent: false,
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
        const box = new Tiny.Mesh(
            geometry,
            material
        );

        if (!newMat && i > amount/2) {
            material = new Tiny.MeshLambertMaterial({
                color: new Tiny.Color(0, 1, 0),
                // opacity: 0.5,
                transparent: false,
            });

            newMat = true;
        }

        box.position.set(random(), random(), random())

        game.world.add(box);
    }
};

export default class BunnyApp extends Tiny.App {
    constructor(width, height, parentNode, states) {
        super(states);

        this.width = width;
        this.height = height;

        window.game = this;

        this.renderer = new Tiny.WebGLRenderer( {
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
    }

    preload() {
        this.load.all(resources);
    }

    create() {
        // this.textures = resources.map((e) => e.key);

        // this.testTexture = new Tiny.WebGlTexture(this.renderer.gl, {
        //     image: Tiny.Cache.image['rabbitv3']
        // });
        //
        // this.testTexture2 = new Tiny.WebGlTexture(this.renderer.gl, {
        //     image: Tiny.Cache.image['rabbitv3_batman']
        // });

        this.box = new Tiny.Mesh(
            new Tiny.BoxGeometry(),
            new Tiny.MeshLambertMaterial(
                {
                    color: new Tiny.Color(1, 0, 0)
                }
            )
        );

        this.ambientLight = new Tiny.AmbientLight(undefined, 0.5);
        this.directionalLight = new Tiny.DirectionalLight(undefined, 0.5);

        this.directionalLight.position.set(0, 10, 0);

        const {box, world} = this;

        // world.add(box);

        aLofOFBoxesSimulation(tinyVSthreeCubesAmount);

        this.resize(window.innerWidth, window.innerHeight);
    }

    setPixelRatio(dpr) {
        this.renderer.setPixelRatio(dpr);
    }

    update(time, delta) {
        delta *= 0.001;

        // this.box.rotation.x += delta;
        // this.box.rotation.z += delta;
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

        const {worldCamera} = this;

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
