import {Color} from "three";
import {tinyVSthreeCubesAmount} from "../constants";

const random = (s = 5) => {
    return (Math.random() - 0.5) * s;
}

const aLofOFBoxesSimulation = (amount) => {
    let material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(1, 0, 0)
    });

    debugger;
    const geometry = new THREE.BoxGeometry();

    let newMat = false;

    for (let i = 0; i < amount; i++) {
        const box = new THREE.Mesh(
            geometry,
            material
        );

        if (!newMat && i > amount/2) {
            material = new THREE.MeshLambertMaterial({
                color: new Color(0, 1, 0),
                // opacity: 1,
                // transparent: false
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

        window.game = this;

        this.width = width;
        this.height = height;

        this.renderer = new THREE.WebGLRenderer( );

        this.renderer.setClearColor(new THREE.Color(0.9, 0.9, 0.9));

        var view = (this.inputView = this.renderer.domElement);

        parentNode = parentNode ? document.getElementById(parentNode) : document.body;
        parentNode.appendChild(view);
        // view.style.position = 'absolute';

        // view.style.top = "0px";
        // view.style.left = "0px";

        // view.style.transformOrigin = '0% 0%';
        view.style.perspective = '1000px';

        this.world = new THREE.Object3D();
        this.worldCamera = new THREE.OrthographicCamera();

        this.world.autoUpdate = true;

        this.worldCamera.position.set(10, 10, 10);
        this.worldCamera.lookAt(0, 0, 0);
    }

    preload() {
        // this.load.all(resources);
    }

    create() {
        // this.textures = resources.map((e) => e.key);

        this.box = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshLambertMaterial({color: new THREE.Color(1, 0, 0)})
        );

        const {box, world} = this;

        const ambientLight = new THREE.AmbientLight(undefined, 0.5);
        const directionalLight = new THREE.DirectionalLight(undefined, 0.5);

        world.add(ambientLight, directionalLight);

        aLofOFBoxesSimulation(tinyVSthreeCubesAmount);

        this.resize(window.innerWidth, window.innerHeight);
    }

    setPixelRatio(dpr) {
        this.renderer.setPixelRatio(dpr);
    }

    update(time, delta) {
        // delta *= 0.001;
        //
        // this.box.rotation.x += delta;
        // this.box.rotation.y += delta;
    }

    render() {
        debugger;
        this.renderer.render(this.world, this.worldCamera);
    }

    resize(width, height) {
        super.resize(width, height);

        this.renderer.setSize(width, height);

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
