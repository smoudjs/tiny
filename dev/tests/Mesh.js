import '@smoud/tiny/3d';
import App from '../basic/App.js';

class MeshTest {
    static name = 'mesh';

    constructor(app) {
        this.app = app;
    }

    preload() {
        this.app.load.image('crate', require('examples/textures/crate.gif'));
        this.app.load.image('uv', require('examples/textures/uv.jpg'));
    }

    create() {
        const cube1 = new Tiny.Mesh(new Tiny.BoxGeometry(1.3, 1.3, 1.3), new Tiny.MeshLambertMaterial('crate'));

        cube1.scale.set(1.2, 1.2, 1.2);
        cube1.position.x = -10;

        this.cube1 = cube1;
        this.app.scene.add(cube1);

        const cube2 = new Tiny.Mesh(new Tiny.BoxGeometry(), new Tiny.MeshLambertMaterial({color: 0xffffff, map: 'uv'}));

        this.cube2 = cube2;
        this.app.scene.add(cube2);

        this.timer = this.app.timer.loop(2000, () => {
            cube2.material.color.set(Math.random() * 0xffffff);
        });
    }

    update(time, delta) {
        delta *= 0.0004;
        this.cube1.rotation.x += delta;
        this.cube1.rotation.y += delta;

        this.cube2.rotation.x += delta;
        this.cube2.rotation.y += delta;

        this.cube2.position.y = Math.sin(time * 0.001) * 4;
        this.cube2.position.x = Math.sin(time * 0.002) * 2;
    }

    destroy() {
        this.app.timer.remove(this.timer)
    }
}

App.registerTest(MeshTest);
