import Bunny from '../bunny-mark/Bunny';

const random = (s = 5) => {
    return (Math.random() - 0.5) * s;
};

function rgbToInt(r, g, b) {
    return ((r * 255) << 16) + ((g * 255) << 8) + ((b * 255) | 0);
}
function toStyle(int) {
    return '#' + ('00000' + int.toString(16)).slice(-6);
}

function drawTexture(index) {
    const size = 32;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');

        var color = Math.random() * 0.3 + 0.2;

        ctx.fillStyle = toStyle(rgbToInt(color + random(0.1), color + random(0.1), color + random(0.1)));
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = toStyle(
            rgbToInt(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5)
        );
        ctx.save();
        ctx.rotate((Math.PI / 180) * random(60));
        var w = Math.floor((Math.random() * 0.65 + 0.3) * size);

        ctx.shadowBlur = size * 0.1 + 3;

        ctx.shadowColor = toStyle(
            rgbToInt(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5)
        );

        if (Math.random() > 0.5) {
            ctx.fillRect(
                Math.floor(Math.random() * size * 0.25),
                Math.floor(Math.random() * size * 0.25),
                w,
                w
            );
        } else {
            ctx.arc(
                Math.floor(Math.random() * size * 0.5),
                Math.floor(Math.random() * size * 0.5),
                w * 0.8,
                0,
                Math.PI * 2,
                true
            );
            ctx.fill();
        }
        ctx.restore();
        // ctx.fillStyle = '#ffffff';
        // ctx.font = 'bold 28px serif';
        var s = 0.5 - ('' + index).length * 0.2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#ffffff';

        ctx.font = 'bold 23px serif';
        ctx.fillStyle = '#000000';
        ctx.fillText(index, size * s, size * 0.6);

        // ctx.strokeRect(50, 50, 50, 50);
    }

    return canvas;
}

export default class BasicApp extends Tiny.App {
    constructor(width, height, parentNode, states) {
        super(states);

        this.width = width;
        this.height = height;

        this.renderer = new Tiny.WebGLRenderer({
            width: width,
            height: height,
            // resolution: 1.25,
            autoResize: true
        });

        this.renderer.setClearColor('#232323');

        var view = (this.inputView = this.renderer.domElement);

        parentNode = parentNode ? document.getElementById(parentNode) : document.body;
        parentNode.appendChild(view);
        // view.style.position = 'absolute';

        // view.style.top = "0px";
        // view.style.left = "0px";

        // view.style.transformOrigin = '0% 0%';
        view.style.perspective = '1000px';

        this.scene = new Tiny.Scene();
        this.camera = new Tiny.OrthographicCamera();
        this.camera.position.set(10, 10, 10);
        this.camera.lookAt(0, 0, 0);

        this.maxCount = 200000;
        this.amount = 100;
        this.count = 0;
        this.bunnies = [];

        this.bounds = {
            left: 0,
            top: 0,
            right: width,
            bottom: height
        };

        const counter = document.createElement('div');
        counter.className = 'disable';
        document.body.appendChild(counter);

        counter.id = 'counter';

        counter.innerText = `${this.count} BUNNIES`;

        // this.stats = {begin: function(){}, end: function(){}}
        this.stats = new Stats();
        this.stats.domElement.id = 'stats';
        document.body.appendChild(this.stats.domElement);

        this.counter = counter;
    }

    preload() {
        console.log('preload');
        // this.load.image('test', require('examples/textures/uv.jpg'));
        this.load.spritesheet('test3', require('examples/textures/basics/grid_atlas.png'), [
            { x: 0, y: 0, width: 230, height: 230 },
            { x: 0, y: 100, width: 230, height: 230 },
            { x: 0, y: 230, width: 230, height: 230 }
        ]);
        this.load.atlas(
            'atlas',
            require('examples/textures/basics/grid_atlas.png'),
            require('examples/textures/basics/grid_atlas_data.json')
        );
        this.load.spritesheet(
            'spritesheet',
            require('examples/textures/basics/gif.jpg'),
            require('examples/textures/basics/gif_data.json')
        );

        this.load.image(
            'box',
            require('examples/textures/crate.gif')
        );

        // this.load.all([
        //     {
        //         key: 'rabbitv3_ash',
        //         src: require('examples/textures/bunnies/bunnys.png'),
        //         type: 'spritesheet',
        //         data: [
        //             { x: 2, y: 47, width: 26, height: 37 },
        //             { x: 2, y: 86, width: 26, height: 37 },
        //             { x: 2, y: 125, width: 26, height: 37 },
        //             { x: 2, y: 164, width: 26, height: 37 },
        //             { x: 2, y: 2, width: 26, height: 37 }
        //         ]
        //     }
        // ]);

        /**
         * 100000 - 42-43   150000 - 28
         */
       // this.load.all([{ key: 'rabbitv3_ash', src: require('examples/textures/bunnies/lineup.png'), type: 'spritesheet', width: 35.83, height: 36 }])

        this.load.all([
            {
                key: 'rabbitv3_ash',
                src: require('examples/textures/bunnies/rabbitv3_ash.png'),
                type: 'image'
            },
            {
                key: 'rabbitv3_batman',
                src: require('examples/textures/bunnies/rabbitv3_batman.png'),
                type: 'image'
            },
            {
                key: 'rabbitv3_bb8',
                src: require('examples/textures/bunnies/rabbitv3_bb8.png'),
                type: 'image'
            },
            {
                key: 'rabbitv3_neo',
                src: require('examples/textures/bunnies/rabbitv3_neo.png'),
                type: 'image'
            },
            {
                key: 'rabbitv3_sonic',
                src: require('examples/textures/bunnies/rabbitv3_sonic.png'),
                type: 'image'
            },
            {
                key: 'rabbitv3_spidey',
                src: require('examples/textures/bunnies/rabbitv3_spidey.png'),
                type: 'image'
            },
            {
                key: 'rabbitv3_stormtrooper',
                src: require('examples/textures/bunnies/rabbitv3_stormtrooper.png'),
                type: 'image'
            },
            {
                key: 'rabbitv3_superman',
                src: require('examples/textures/bunnies/rabbitv3_superman.png'),
                type: 'image'
            },
            {
                key: 'rabbitv3_tron',
                src: require('examples/textures/bunnies/rabbitv3_tron.png'),
                type: 'image'
            },
            {
                key: 'rabbitv3_wolverine',
                src: require('examples/textures/bunnies/rabbitv3_wolverine.png'),
                type: 'image'
            },
            { key: 'rabbitv3', src: require('examples/textures/bunnies/rabbitv3.png'), type: 'image' },
            {
                key: 'rabbitv3_frankenstein',
                src: require('examples/textures/bunnies/rabbitv3_frankenstein.png'),
                type: 'image'
            }
        ]);

        this.rabbitsTextures = [];
        for (let i = 0; i < 10; i++) {
            var canvas = drawTexture(i);

            var text = new Tiny.Texture(canvas);
            // text.base.flipY = false;
            text.addToCache('txt', i);
            // this.rabbitsTextures.push(text);
        }
    }

    create() {
        const txts = Object.keys(Tiny.Cache.texture);
        for (let tex of txts) {
            var txt = Tiny.Cache.texture[tex];
            if (tex.startsWith('rabbit') && txt.width === txt.base.width) {
                this.rabbitsTextures.push(tex);
                // break;
            }
        }

        // var texture = new Tiny.Texture('atlas', '');
        const cube1 = new Tiny.Mesh(new Tiny.BoxGeometry(), new Tiny.MeshBasicMaterial({ color: 0x0000ff, map: 'box' }));
        this.box1 = cube1;

        // Tiny.Cache.texture['atlas'].base.wrapS = 1000;
        // Tiny.Cache.texture['atlas'].base.wrapT = 1000;

        // Tiny.Cache.texture['atlas'].base.flipY = false;

        const cube2 = new Tiny.Mesh(new Tiny.BoxGeometry(), new Tiny.MeshLambertMaterial('box'));

        // cube2.material.map.center.set(0.5, 0.5);
        // cube2.material.map.rotation = 0.4
        var t = 0;
        var rot = 0;
        setInterval(() => {
            rot += 0.01;
            t++;

            if (t > 119) t = 0;

            // cube2.material.map = Tiny.Cache.texture['spritesheet.' + t];
            // console.log(t)
            // cube2.material.map.rotation = rot;
        }, 5);
        window.cube2 = cube2;

        this.box2 = cube2;
        cube2.scale.set(2, 2, 2);
        cube2.lookAt(3, 3, 3);

        cube2.position.x = -4;

        const alight = new Tiny.AmbientLight(0xffffff, 0.4);
        this.scene.add(alight);

        const dlight = new Tiny.DirectionalLight(0xffffff, 0.4);
        this.scene.add(dlight);
        dlight.position.set(20, 1, 10);
        dlight.lookAt(0, 0, 0);

        const instancedMesh = new Tiny.InstancedMesh(
            new Tiny.BoxGeometry(0.5, 0.5, 0.5),
            new Tiny.MeshLambertMaterial({
                // color: new Tiny.Color(1, 0, 0),
                map: 'txt.6'
            }),
            1000
        );

        const testMatrixes = [];

        const pos = 10;

        for (let i = 0; i < instancedMesh.count; i++) {
            const mat4 = new Tiny.Mat4();

            mat4.angleOffset = 50 * i;
            mat4.axis = new Tiny.Vec3(random(pos), random(pos), random(pos));

            const r = Math.random() * Math.PI * 2;

            const cos = Math.cos(r);
            const sin = Math.sin(r);

            mat4.makeRotationX(cos);
            mat4.setPosition(cos * mat4.axis.x, sin * mat4.axis.y, -sin * mat4.axis.z);

            testMatrixes.push(mat4);

            instancedMesh.setMatrixAt(i, mat4);
        }

        app.on('update', () => {
            for (let i = 0; i < instancedMesh.count; i++) {
                const mat4 = testMatrixes[i];

                const cos = Math.cos((app.time + mat4.angleOffset) * 0.001);
                const sin = Math.sin((app.time + mat4.angleOffset) * 0.001);

                mat4.makeRotationX((app.time + mat4.angleOffset) * 0.001);
                mat4.setPosition(cos * mat4.axis.x, sin * mat4.axis.y, -sin * mat4.axis.z);

                instancedMesh.setMatrixAt(i, mat4);
            }

            instancedMesh.instanceMatrix.needsUpdate = true;
        });

        instancedMesh.scale.set(0.5, 0.5, 0.5);

        const screen = (this.screen2d = new Tiny.Screen());

        let text = new Tiny.Sprite('txt.5');
        text.position.x = 112;
        text.position.y = 116;
        text.scale.set(1);
        // screen.add(text);

        let text2 = new Tiny.Sprite('txt.1');
        text2.position.x = 512;
        text2.position.y = 216;
        text2.scale.set(1);
        text2.anchor.set(0.5);
        // screen.add(text2);

        setInterval(() => {
            text2.rotation += 0.01;
        });

        this.text = text;
        // this.scene.add(text);
        // const ui = new Tiny.Screen();

        // ui.add(new Tiny.Text("Hello World"));
        // ui.add(new Tiny.Sprite("coin"));

        // this.scene.add(ui)

        screen.add(text);
        screen.add(text2);

        // app.cache.image.rabbitv3_ash.valid = false;
        // app.cache.image.rabbitv3_ash.version = 0;

        setTimeout(() => {
            text.tint.set(0xff0000);
            // screen.add(text);
            // app.cache.image.rabbitv3_ash.valid = true;
            // app.cache.image.rabbitv3_ash.version++;
        }, 3000);

        this.scene.add(cube1);
        // cube2.scale.set(6, 6, 6)
        this.scene.add(cube2);
        this.scene.add(instancedMesh);

        this.scene.add(screen);

        this.resize(this.width, this.height);
        // app.once('postrender', () => console.log("das"))

        // 1536x730 screen, resolution 1, 50000 bunnies, 12 textures 16x16, 57 fps, no babel, no prototypes
        // 1536x730 screen, resolution 1, 50000 bunnies, 12 textures 16x16, 51 fps, babel, no prototypes

        // 1536x730 screen, resolution 1, 50000 bunnies, 12 textures 16x16, 58 fps, no babel, prototypes
        // 1536x730 screen, resolution 1, 50000 bunnies, 12 textures 16x16, 54 fps, babel, prototypes

        // 1536x730 screen, resolution 1, 50000 bunnies, 20 textures 16x16, 37 fps, no babel, prototypes
        // 1536x730 screen, resolution 1, 50000 bunnies, 20 textures 16x16, 38 fps, babel, prototypes
        // this.addBunnies(2);

        // setInterval(() => {
        //     for (let i = 0; i < this.bunnies.length; i++) {
        //         this.bunnies[i].position.x += 0.05;
        //         this.bunnies[i].rotation += 0.01;
        //         this.bunnies[i].position.y += 0.05;
        //         // this.this.bunnies[i].update(delta);
        //     }
        // });
    }

    create2d() {
        console.log('create');

        this.text = new Tiny.Text('Hello World !', { fill: '#ffff00' });

        // this.text.cacheAsBitmap = true;
        this.text.tint.set(0xa1a100);
        this.text.position.set(400, 200);
        this.scene.add(this.text);

        var sprite = new Tiny.Sprite('spritesheet', 2);

        sprite.x = 500;
        sprite.scale.set(2);

        this.anim.create({
            key: 'idle',
            type: 'spritesheet',
            data: {
                key: 'spritesheet'
                // from: 0,
                // to: 3
            },
            repeat: -1,
            // yoyo: true,
            fps: 34
        });

        this.anim.add(sprite);

        sprite.play('idle');

        this.scene.add(sprite);

        // var graphics = new Tiny.Graphics();
        // // graphics.tint.set(0x45f223);

        // graphics.beginFill('#f23', 1);
        // graphics.drawRect(100, 100, 100, 100);
        // graphics.endFill();

        // graphics.lineStyle(23, 0x45ff45);
        // graphics.drawCircle(400, 200, 100);

        // graphics.moveTo(10, 10);
        // graphics.lineStyle(23, 0x4545ff, 0.1);
        // graphics.lineTo(400, 200);
        // graphics.lineTo(400, 500);
        // graphics.lineTo(100, 500);
        // graphics.bezierCurveTo(400, 500, 23, 32, 45, 12);

        //   // graphics.cacheAsBitmap = true

        // setInterval(() => {
        //     this.text.tint.set(Math.floor(Math.random() * 0xffffff));
        //     graphics.tint.set(Math.floor(Math.random() * 0xffffff));
        //     // graphics.dirty = true;
        // }, 1000)

        // this.scene.add(graphics);
    }

    setPixelRatio(dpr) {
        this.renderer.setPixelRatio(dpr);
    }

    /** Add an arbitrary amount of bunnies */
    addBunnies(num) {
        for (let i = 0; i < num; i++) {
            // const texture = this.rabbitsTextures[this.count % this.rabbitsTextures.length];
            const texture = this.rabbitsTextures[Math.floor(Math.random() * this.rabbitsTextures.length)];
            const bunny = new Bunny(texture, this.bounds);

            // bunny.blending = 2//Math.floor(Math.random() * 5);

            // bunny.tint.set(0x00ff00)
            // bunny.tint.set(Math.random() * 0xffffff);
            // bunny.alpha = 0.1
            bunny.anchor.set(0.5);
            bunny.position.x = (this.count % 2) * this.width;

            // bunny.position.x = 100 + Math.random() * 400;
            // bunny.position.y = Math.random() * 400;

            this.bunnies.push(bunny);
            this.screen2d.add(bunny);
            this.count++;
        }
        this.counter.innerText = `${this.count} BUNNIES`;
    }

    update(time, delta) {
        this.stats.begin();
        // this.text.rotation += delta * 0.01;
        delta *= 0.001;
        //

        this.text.position.x += 0.1;
        this.text.position.y += 0.1;

        for (let child of this.scene.children) {
            if (!child.isMesh) continue;
            child.rotation.x += delta;
            child.rotation.y += delta;
        }

        this.updateBunnies(time, delta);
    }

    updateBunnies(time, delta) {
        if (this.input.isDown) {
            if (this.count < this.maxCount) {
                this.addBunnies(100);
            }
        }

        // delta *= 0.1;

        for (let i = 0; i < this.bunnies.length; i++) {
            this.bunnies[i].update(delta);
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.stats.end();
    }

    resize(width, height) {
        width = w;
        height = h;
        super.resize(width, height);

        this.renderer.resize(width, height);

        const { camera } = this;

        const aspect = width / height;
        const distance = 5;

        camera.left = -distance * aspect;
        camera.right = distance * aspect;
        camera.top = distance;
        camera.bottom = -distance;

        camera.updateProjectionMatrix();
    }

    resize2d(width, height) {
        super.resize(width, height);

        this.renderer.resize(width, height);
    }

    destroy(clearCache) {
        super.destroy(clearCache);

        this.scene.destroy();
        this.renderer.destroy(true);
    }
}
