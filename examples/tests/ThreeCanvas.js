/**
 * import "h5tiny";
 * import "h5tiny/examples/js/App3D";
 * import "h5tiny/plugins/three";
 */

class MyGame extends Tiny.App3D {
    constructor(width, height) {
        super(width, height, 'game-container');
    }

    preload() {
        this.load.image('base', resources.baseImage);
    }

    create() {
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(15, 59, 53);
        light.lookAt(0, 0, 0);
        this.scene.add(light);

        const mesh = (this.mesh = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            new THREE.MeshLambertMaterial({
                color: '#ff4534'
            })
        ));

        mesh.material.color.convertSRGBToLinear();

        this.scene.add(mesh);

        const text = new Tiny.Text3D('Hello World', {
            font: 'bold 30pt Arial',
            fill: '#ffffff',
            wordWrap: true,
            wordWrapWidth: 100,
            align: 'center',
            size: 4
        });

        this.scene.add(text);

        const canvas2d = new Tiny.Canvas2D(300, 300);
        canvas2d.scale.set(4, 4, 1);
        canvas2d.position.z = 1.3;

        const sprite2d = new Tiny.Sprite('base');
        canvas2d.add(sprite2d);

        const text2d = new Tiny.Text('Hello From Canvas 2D', {
            font: 'bold 30pt Arial',
            fill: '#ffffff',
            wordWrap: true,
            wordWrapWidth: 200,
            align: 'center'
        });

        canvas2d.add(text2d);

        canvas2d.update();
        this.mesh.add(canvas2d);

        const canvas3d = new Tiny.Canvas3D(300, 300);
        canvas3d.scale.set(4, 4, 1);
        canvas3d.position.z = 1.3;
        canvas3d.position.x = 3.3;
        canvas3d.material.side = 2;

        canvas3d.add(sprite2d);
        text2d.setText('Hello From Canvas 3D');
        canvas3d.add(text2d);

        canvas3d.update();
        this.mesh.add(canvas3d);
    }

    update(time, delta) {
        this.mesh.rotation.x += delta * 0.005;
        this.mesh.position.x = Math.sin(time * 0.001);
        this.mesh.position.z = 1 + Math.sin(time * 0.001);
    }
}
