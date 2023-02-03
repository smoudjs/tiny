var THREE = require("three"),
    Mesh = THREE.Mesh,
    MeshBasicMaterial = THREE.MeshBasicMaterial,
    CanvasTexture = THREE.CanvasTexture,
    sRGBEncoding = THREE.sRGBEncoding,
    LinearFilter = THREE.LinearFilter,
    PlaneBufferGeometry = THREE.PlaneBufferGeometry;

class Text3D extends Mesh {
    constructor(text, options) {
        options = options || {};
        options.size = options.size || 1;

        const _text = new Tiny.Text(text, options);

        const canvasTexture = new CanvasTexture(_text.canvas);
        canvasTexture.encoding = sRGBEncoding;
        canvasTexture.minFilter = LinearFilter;

        const material = new MeshBasicMaterial({
            map: canvasTexture,
            // color: 0xff4545,
            transparent: true
        });

        const geometry = new PlaneBufferGeometry(1, 1);

        super(geometry, material);

        const max = Math.max(_text.width, _text.height);
        this.scale.set((options.size * _text.width) / max, (options.size * _text.height) / max, 1);

        this.size = options.size;
        this.text = _text;
        this.texture = canvasTexture;

        // this.text.updateCanvas();
    }

    setText(text) {
        const _text = this.text;
        _text.setText(text);
        _text.updateText();

        const max = Math.max(_text.width, _text.height);

        this.scale.set((this.size * _text.width) / max, (this.size * _text.height) / max, 1);

        this.texture.needsUpdate = true;
    }
}

Tiny.Text3D = Text3D;
