import Bunny from '../bunny-mark/Bunny';
import { drawTexture } from '../utils/drawTexture';

const random = (s = 5) => {
    return (Math.random() - 0.5) * s;
};

export default class BasicApp extends Tiny.App {

    static tests = []

    static registerTest(Test) {
        this.tests.push(Test)
    }

    constructor(width, height, parentNode, states) {
        super(states);

        this.width = width;
        this.height = height;

        this.renderer = new Tiny.WebGLRenderer({
            width: width,
            height: height,
            // resolution: 0.45,
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
        this.cameraO = new Tiny.OrthographicCamera(1, 1, 1, 1, 0.1, 1000); // OrthographicCamera
        this.cameraP = new Tiny.PerspectiveCamera(50, width / height, 0.1, 1000);
        this.camera = this.cameraP;
        this.camera.position.set(10, 10, 10);
        this.camera.lookAt(0, 0, 0);

        this.screen2d = new Tiny.Screen();
        this.scene.add(this.screen2d )

        this.scene2d = this.screen2d;

        // this.stats = {begin: function(){}, end: function(){}}
        this.stats = new Stats();
        this.stats.domElement.id = 'stats';
        document.body.appendChild(this.stats.domElement);

        this.tests = [];

        for (let ctor of BasicApp.tests) {
            var tst = new ctor(this);
            tst.name = ctor.name;
            this.tests.push(tst)
        }
    }

    preload() {
        console.log('preload');

        for (let i = 0; i < this.tests.length; i++){
            if (this.tests[i].preload) this.tests[i].preload();
        }
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

        this.load.image('box', require('examples/textures/crate.gif'));

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
            var canvas = drawTexture(32, i);

            var text = new Tiny.Texture(canvas);
            // text.base.flipY = false;
            text.addToCache('txt', i);
            // this.rabbitsTextures.push(text);
        }
    }

    create() {
        for (let i = 0; i < this.tests.length; i++){
            if (this.tests[i].create) this.tests[i].create();
        }

        // const cube2 = new Tiny.Mesh(new Tiny.BoxGeometry(), new Tiny.MeshLambertMaterial('box'));

        // // cube2.material.map.center.set(0.5, 0.5);
        // // cube2.material.map.rotation = 0.4
        // var t = 0;
        // var rot = 0;
        // setInterval(() => {
        //     rot += 0.01;
        //     t++;

        //     if (t > 119) t = 0;

        //     // cube2.material.map = Tiny.Cache.texture['spritesheet.' + t];
        //     // console.log(t)
        //     // cube2.material.map.rotation = rot;
        // }, 5);

        const alight = new Tiny.AmbientLight(0xffffff, 0.2);
        this.scene.add(alight);

        const dlight = new Tiny.DirectionalLight(0xffffff, 1);
        this.scene.add(dlight);
        dlight.position.set(20, 1, 10);
        dlight.lookAt(0, 0, 0);

        this.resize(this.width, this.height);
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

    update(time, delta) {
        for (let i = 0; i < this.tests.length; i++){
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

        for (let i = 0; i < this.tests.length; i++){
            if (this.tests[i].resize) this.tests[i].resize(width, height);
        }
    }

    destroy(clearCache) {
        super.destroy(clearCache);

        this.scene.destroy();
        this.renderer.destroy(true);
        for (let i = 0; i < this.tests.length; i++){
            if (this.tests[i].destroy) this.tests[i].destroy(width, height);
        }
        this.tests.length = 0;
    }
}
