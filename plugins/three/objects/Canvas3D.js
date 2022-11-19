
var THREE = require('three'),
    Mesh = THREE.Mesh,
    MeshBasicMaterial = THREE.MeshBasicMaterial,
    CanvasTexture = THREE.CanvasTexture,
    sRGBEncoding = THREE.sRGBEncoding,
    LinearFilter = THREE.LinearFilter,
    PlaneBufferGeometry = THREE.PlaneBufferGeometry;


var geometry = null;

class Canvas3D extends Mesh {

    constructor(width, height) {

        const renderer = new Tiny.CanvasRenderer(width, height, { transparent: true });
        // renderer.setClearColor("#ffffff");

        const canvasTexture = new CanvasTexture(renderer.domElement);
        canvasTexture.encoding = sRGBEncoding;
        canvasTexture.minFilter = LinearFilter;

        const material = new MeshBasicMaterial({
            map: canvasTexture,
            transparent: true
        });

        if (geometry == null) geometry = new PlaneBufferGeometry(1, 1);

        super(geometry, material);

        this.width = width;
        this.height = height;
        this.autoUpdate = false;
        this.renderer = renderer;
        const container = this.container = new Tiny.Scene();
        this.texture = canvasTexture;

        this.add = container.add.bind(container);
        this.remove = container.remove.bind(container);
    }

    onBeforeRender() 
    {
        this.autoUpdate && this.update();
    }


    update() 
    {
        this.renderer.render(this.container);

        this.texture.needsUpdate = true;
    }
}

Tiny.Canvas3D = Canvas3D;