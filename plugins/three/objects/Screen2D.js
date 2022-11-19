
var THREE = require('three'),
    Scene = THREE.Scene,
    OrthographicCamera = THREE.OrthographicCamera;

class Screen2D extends Tiny.Canvas2D {

    constructor(width, height) {

        super(width, height);

        this.autoUpdate = true;

        this.scene = new Scene();
        this.camera = new OrthographicCamera(-this.width / 2, this.width / 2, this.height / 2, -this.height / 2, 1, 10);
        
        this.scale.set(this.width, this.height, 1);
        this.camera.position.z = 1;
        this.scene.add(this);



        // this.setSize(this.width, this.height)
        // const renderer = new Tiny.CanvasRenderer(width, height, { transparent: true });
        // // renderer.setClearColor(0xffffff, 0.1);

        // const scene = new Tiny.Scene();

        // const canvasTexture = new CanvasTexture(renderer.view);
        // canvasTexture.encoding = sRGBEncoding;
        // canvasTexture.minFilter = LinearFilter;

        // const material = new SpriteMaterial({
        //     map: canvasTexture,
        //     // color: 0x00ffff,
        //     // depthWrite: false
        // });

        // super(material);

        // this.width = width;
        // this.height = height;
        // this.autoUpdate = false;
        // this.renderer = renderer;
        // this.scene = scene;
        // this.texture = canvasTexture;

        // this.add = scene.add.bind(scene);
        // this.remove = scene.remove.bind(scene);
    }

    setSize(width, height) 
    {
        this.renderer.resize(width, height)
        
        this.width = width;
        this.height = height;

        this.camera.left = -this.width / 2;
        this.camera.right = this.width / 2;
        this.camera.top = this.height / 2;
        this.camera.bottom = -this.height / 2;
        this.camera.updateProjectionMatrix();

        this.scale.set(this.width, this.height, 1);
    }
}

Tiny.Screen2D = Screen2D;