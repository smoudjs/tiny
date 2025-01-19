import Bunny from '../bunny-mark/Bunny';
import { drawTexture } from '../utils/drawTexture';

const random = (s = 5) => {
    return (Math.random() - 0.5) * s;
};

export default class BasicApp extends Tiny.App {
    static tests = [];

    static registerTest(Test) {
        this.tests.push(Test);
    }

    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;

        this.renderer = new Tiny.WebGLRenderer({
            width: width,
            height: height,
            // resolution: 0.45,
            autoResize: true
        });

        this.renderer.setClearColor('#232323');

        document.body.appendChild(this.renderer.domElement);
        this.inputView = this.renderer.domElement
        // view.style.position = 'absolute';

        // view.style.top = "0px";
        // view.style.left = "0px";

        // view.style.transformOrigin = '0% 0%';
        // view.style.perspective = '1000px';

        this.scene = new Tiny.Scene();
        this.cameraO = new Tiny.OrthographicCamera(1, 1, 1, 1, 0.1, 1000); // OrthographicCamera
        this.cameraP = new Tiny.PerspectiveCamera(50, width / height, 0.1, 1000);
        this.camera = this.cameraP;
        this.camera.position.set(10, 10, 10);
        this.camera.lookAt(0, 0, 0);

        this.screen2d = new Tiny.Screen();
        this.scene.add(this.screen2d);

        this.scene2d = this.screen2d;

        // this.stats = {begin: function(){}, end: function(){}}
        this.stats = new Stats();
        this.stats.domElement.id = 'stats';
        document.body.appendChild(this.stats.domElement);

        this.tests = [];

        for (let ctor of BasicApp.tests) {
            var tst = new ctor(this);
            tst.name = ctor.name;
            this.tests.push(tst);
        }
    }

    preload() {
        for (let i = 0; i < this.tests.length; i++) {
            if (this.tests[i].preload) this.tests[i].preload();
        }
    }

    create() {
        for (let i = 0; i < this.tests.length; i++) {
            if (this.tests[i].create) this.tests[i].create();
        }

        const alight = new Tiny.AmbientLight(0xffffff, 0.2);
        this.scene.add(alight);

        const dlight = new Tiny.DirectionalLight(0xffffff, 1);
        this.scene.add(dlight);
        dlight.position.set(20, 1, 10);
        dlight.lookAt(0, 0, 0);

        this.resize(this.width, this.height);
    }

    setPixelRatio(dpr) {
        this.renderer.setPixelRatio(dpr);
    }

    update(time, delta) {
        for (let i = 0; i < this.tests.length; i++) {
            if (this.tests[i].update) this.tests[i].update(time, delta);
        }

        this.stats.begin();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.stats.end();
    }

    resizeCamera() {
        if (this.camera) {
            var aspect = this.width / this.height;
            var distance = 5;

            if (this.camera.isOrthographicCamera) {
                this.camera.left = -distance * aspect;
                this.camera.right = distance * aspect;
                this.camera.top = distance;
                this.camera.bottom = -distance;
            } else {
                this.camera.fov = distance * 7;
                this.camera.aspect = aspect;
            }

            this.camera.updateProjectionMatrix();
        }
    }

    resize(width, height) {
        super.resize(width, height);

        this.renderer.resize(width, height);

        this.resizeCamera();

        for (let i = 0; i < this.tests.length; i++) {
            if (this.tests[i].resize) this.tests[i].resize(width, height);
        }
    }

    destroy(clearCache) {
        super.destroy(clearCache);

        this.scene.destroy();
        this.renderer.destroy(true);
        for (let i = 0; i < this.tests.length; i++) {
            if (this.tests[i].destroy) this.tests[i].destroy(width, height);
        }
        this.tests.length = 0;
    }
}
