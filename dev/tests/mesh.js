import App from '../basic/App.js';

class MeshTest {
    static name = 'mesh';

    constructor(app) {
        this.app = app;
    }

    preload() {
        this.app.load.image('crate', require('examples/textures/crate.gif'));
        this.app.load.image('alphaMap', require('examples/textures/alphaMap.jpg'));
        this.app.load.spritesheet('sprites/run', require('examples/textures/sprites/run.png'), 64, 64);
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
            new Tiny.MeshLambertMaterial({ color: 0xffffff, alphaMap: 'alphaMap', map: 'sprites/run.0' })
        );

        cube2.scale.set(2, 2, 2);

        this.cube2 = cube2;
        this.app.scene.add(cube2);

        this.timer = this.app.timer.loop(2000, () => {
            cube2.material.color.set(Math.random() * 0xffffff);
        });

        let frame = 0;
        this.timer2 = this.app.timer.loop(80, () => {
            frame++;
            if (frame > Tiny.Cache.texture['sprites/run.0'].lastFrame) {
                frame = 0;
            }

            cube2.material.map = Tiny.Cache.texture['sprites/run.' + frame];
            cube2.material.needsUpdate = true;
            window.cube2 = cube2;
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
        this.app.timer.remove(this.timer2);
    }
}

App.registerTest(MeshTest);
