var THREE = require("three"),
    Sprite = THREE.Sprite,
    SpriteMaterial = THREE.SpriteMaterial,
    CanvasTexture = THREE.CanvasTexture,
    sRGBEncoding = THREE.sRGBEncoding,
    LinearFilter = THREE.LinearFilter;

class Canvas2D extends Sprite {
    constructor(width, height) {
        const renderer = new Tiny.CanvasRenderer(width, height, { transparent: true });
        // renderer.setClearColor("#ffffff");

        const canvasTexture = new CanvasTexture(renderer.domElement);
        canvasTexture.encoding = sRGBEncoding;
        canvasTexture.minFilter = LinearFilter;

        const material = new SpriteMaterial({
            map: canvasTexture
            // color: 0x00ffff,
            // depthWrite: false
        });

        super(material);

        this.width = width;
        this.height = height;
        this.autoUpdate = false;
        this.renderer = renderer;
        const container = (this.container = new Tiny.Scene());
        this.texture = canvasTexture;

        this.add = container.add.bind(container);
        this.remove = container.remove.bind(container);
    }

    onBeforeRender() {
        this.autoUpdate && this.update();
    }

    update() {
        this.renderer.render(this.container);

        this.texture.needsUpdate = true;
    }
}

Tiny.Canvas2D = Canvas2D;
