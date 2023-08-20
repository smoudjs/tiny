class MyGame extends Tiny.App2D {
    constructor(width, height) {
        super(width, height, 'game');
    }

    preload() {
        this.load.image('base', require('examples/textures/basics/coin.png'));
        this.load.atlas(
            'atlas',
            require('examples/textures/basics/grid_atlas.png'),
            require('examples/textures/basics/grid_atlas_data.json')
        );
        // this.load.spritesheet("gifsprite", spritesheet, 222, 222);
        // this.load.spritesheet("gifsprite", spritesheet, spritesheet_data);

        this.load.all([
            // { key: "base", src: resources.baseImage, type: "image" },
            // { key: "atlas", src: resources.atlas, data: atlas_data, type: "atlas" },
            // { key: "gifsprite", src: spritesheet, cols: 12, rows: 1, total: 15, duration: 40, type: "spritesheet" },
            // { key: "gifsprite", src: spritesheet, width: 222, height: 222, duration: 40, type: "spritesheet" },
            {
                key: 'gifsprite',
                src: require('examples/textures/basics/spritesheet.png'),
                cols: 6,
                rows: 1,
                duration: 90,
                type: 'spritesheet'
            }
            // { key: "gifsprite", src: spritesheet, data: spritesheet_data, type: "spritesheet" }
        ]);
    }

    create() {
        this.anim.create({
            key: 'idle',
            type: 'spritesheet',
            data: {
                key: 'gifsprite'
                // from: 0,
                // to: 3
            },
            repeat: -1,
            yoyo: true,
            fps: 16
        });

        this.group = new Tiny.Object2D();
        this.group.x = 200;
        this.group.y = 200;

        this.group.add(new Tiny.Text('Hello World'));
        this.group.add(new Tiny.Sprite('base'));
        this.group.add(new Tiny.Text('Hello World', { fill: '#ff0000' }));
        this.group.cacheAsBitmap = true;
        this.group.children[2].y = 70;
        this.group.updateCache();

        var texture1 = (this.texture1 = this.group.generateTexture());
        var spriteFromGenerated = new Tiny.Sprite(texture1);

        spriteFromGenerated.x = this.group.x;
        spriteFromGenerated.y = this.group.y;
        spriteFromGenerated.alpha = 0.3;
        spriteFromGenerated.scale.set(0.7);

        this.scene.add(spriteFromGenerated);
        this.scene.add(this.group);

        var spriteFromGenerated2 = new Tiny.Sprite(texture1);
        spriteFromGenerated2.x = 70;
        spriteFromGenerated2.y = 70;
        spriteFromGenerated2.rotation = 0.5;
        spriteFromGenerated2.alpha = 0.3;
        spriteFromGenerated2.scale.set(0.7);

        this.group.add(spriteFromGenerated2);
        this.group.updateCache();

        this.input.add(this.group);
        this.group.input.on('click', function () {
            alert('Oup, you catched me !');
        });

        this.bottomRightSprite = new Tiny.Sprite('base');
        this.bottomRightSprite.anchor.set(0.5);
        this.scene.add(this.bottomRightSprite);
        this.bottomRightSprite.position.set(this.width - 100, this.height - 100);

        this.testCoin = new Tiny.Sprite('base');
        this.testCoin.x = 350;
        this.testCoin.y = 200;
        this.testCoin.scale.set(0.5);
        this.scene.add(this.testCoin);

        this.icon = new Tiny.Sprite('atlas', 'IH');
        this.icon.tint.set('#23f423');
        this.icon.scale.set(0.5);
        this.scene.add(this.icon);

        const animatedSprite = new Tiny.Sprite('gifsprite', 0);
        animatedSprite.anchor.set(0.5);
        animatedSprite.position.set(450, 120);
        animatedSprite.scale.set(0.7);
        animatedSprite.game = this;
        // animatedSprite.animate(60, true);

        this.anim.add(animatedSprite);
        this.input.add(animatedSprite);

        animatedSprite.play('idle');
        animatedSprite.input.once('down', function () {
            animatedSprite.play({ key: 'idle', yoyo: false, fps: 30 });
        });

        this.interval = setInterval(function () {
            // console.log('Rotate sprite!');
            // animatedSprite.rotation = 1 - Math.random() * 2;
        }, 1000);

        this.scene.add(animatedSprite);

        /**
         * Creating scene mini-map
         */
        this.miniMap = new Tiny.MiniMap(this);
        this.scene.add(this.miniMap);
    }

    update(time, delta) {
        this.testCoin.rotation += delta * 0.0001;
        this.testCoin.anchor.x = Math.sin(time * 0.001);

        this.group.scale.x = Math.sin(time / 500);
        this.group.scale.y = Math.cos(time / 500);

        this.group.x = Math.sin(time / 100) * 10 + 200;
        this.group.y = Math.cos(time / 100) * 10 + 200;

        this.miniMap.update(delta);
    }

    resize(width, height) {
        super.resize(width, height);
        this.bottomRightSprite.x = width - 100;
        this.bottomRightSprite.y = height - 100;

        this.miniMap.resize(width, height);
    }

    destroy(clearCache) {
        super.destroy(clearCache);
        clearInterval(this.interval);
    }
}

export default MyGame;
