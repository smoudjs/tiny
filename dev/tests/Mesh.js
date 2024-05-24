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
        const cube1 = new Tiny.Mesh(
            new Tiny.BoxGeometry(1.3, 1.3, 1.3),
            new Tiny.MeshLambertMaterial('crate')
        );

        cube1.scale.set(1.2, 1.2, 1.2);
        cube1.position.x = -7;
        cube1.position.z = 1;

        this.cube1 = cube1;
        this.app.scene.add(cube1);

        const cube3 = new Tiny.Mesh(new Tiny.BoxGeometry(), new Tiny.MeshLambertMaterial('crate'));

        cube3.rotation.x = 0.8;
        cube3.rotation.y = 0.8;
        cube3.position.x = 2;
        cube1.add(cube3);

        const cube4 = new Tiny.Mesh(new Tiny.BoxGeometry(), new Tiny.MeshLambertMaterial('crate'));

        cube4.scale.set(0.6, 0.6, 0.6);
        cube4.rotation.x = 0.8;
        cube4.rotation.y = 0.8;
        cube4.position.x = 1.3;
        cube3.add(cube4);

        this.cube1 = cube1;
        this.cube3 = cube3;
        this.cube4 = cube4;
        this.app.scene.add(cube1);

        const cube2 = new Tiny.Mesh(
            new Tiny.BoxGeometry(),
            new Tiny.MeshLambertMaterial({ color: 0xffffff, map: 'uv' })
        );

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

        this.cube3.rotation.x -= delta * 5;
        this.cube3.rotation.z += delta * 5;

        this.cube4.rotation.z += delta * 10;
        this.cube4.rotation.y -= delta * 10;

        this.cube2.rotation.x += delta;
        this.cube2.rotation.y += delta;

        this.cube2.position.y = Math.sin(time * 0.001) * 4;
        this.cube2.position.x = Math.sin(time * 0.002) * 2;
    }

    destroy() {
        this.app.timer.remove(this.timer);
    }
}

App.registerTest(MeshTest);
