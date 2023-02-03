window["test.ThreeScreen2D"] = {
    preload: function () {
        this.load.image("base", baseImage);
        this.load.atlas("atlas", atlas, atlas_data);
    },

    create: function () {
        var debugText = new Tiny.Text("", {
            font: "bold 30pt Arial",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: 200,
            align: "center"
        });

        debugText.x = 200;
        debugText.y = 20;
        this.screen2d.add(debugText);

        const button = (this.button = new Tiny.Sprite("base"));
        button.x = 200;
        button.y = 100;

        this.input.add(button);
        button.input.on("click", function () {
            debugText.setText("Clicked Button");
            console.log("Clicked Button");
        });

        // this.input.attach(button);

        // button.input.on("click", function() {

        // })

        // this.input.objects.push(button);

        this.screen2d.add(button);

        button.add(new Tiny.Text("Button"));

        // this.screen2d.canvas.autoUpdate = true;
        // this.screen2d.canvas.update();

        this.screen2d.scene.add(
            new THREE.Mesh(
                new THREE.BoxBufferGeometry(1, 1, 1),
                new THREE.MeshLambertMaterial({ color: 0xffffff })
            )
        );

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(15, 59, 53);
        light.lookAt(0, 0, 0);
        this.scene.add(light);

        const mesh = (this.mesh = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1),
            new THREE.MeshLambertMaterial({ color: "#ff4534" })
        ));

        var clickMeT = new Tiny.Text3D("Click Me");
        clickMeT.position.z = 0.51;
        mesh.add(clickMeT);

        var clickMeF = new Tiny.Text3D("Click Me");
        clickMeF.position.y = 0.51;
        clickMeF.rotation.x = -Math.PI / 2;
        mesh.add(clickMeF);

        var clickMeB = new Tiny.Text3D("Click Me");
        clickMeB.position.y = -0.51;
        clickMeB.rotation.x = Math.PI / 2;
        mesh.add(clickMeB);
        // mesh.input = new Tiny.Input.Object3D();

        // mesh.input.on("click", function() {
        //  // body...
        // })

        // sprite.position.x = 10;
        // sprite.position.y = 4;

        this.input.add3d(mesh, {
            hitBox: new THREE.Vector3(2, 2, 2),
            transparent: true
        });

        mesh.input.on("click", function () {
            debugText.setText("Click from raycaster");
            console.log("Click from raycaster");
        });

        this.scene.add(mesh);

        var confetti = (this.confetti = new Tiny.Emitter(150));
        confetti.x = 350;
        confetti.width = 800;

        confetti.pattern = Tiny.ConfettiParticle;

        confetti.makeParticles();
        confetti.scale.set(0.7);

        confetti.flow(10000, 300, 5);

        this.particles.add(confetti);
        this.screen2d.add(confetti);

        var ribbon = (this.ribbon = new Tiny.Emitter(18));
        ribbon.x = 350;
        ribbon.width = 800;

        ribbon.pattern = Tiny.RibbonParticle;
        ribbon.makeParticles();
        ribbon.scale.set(0.7);

        ribbon.start(false, 5000, 300);

        this.particles.add(ribbon);
        this.screen2d.add(ribbon);

        this.bottomRightSprite = new Tiny.Sprite("base");
        this.bottomRightSprite.anchor.set(0.5);

        this.input.add(this.bottomRightSprite, { transparent: true });
        this.bottomRightSprite.input.on("click", function () {
            mesh.scale.set(Math.random() * 2 + 1, Math.random() * 2 + 1, Math.random() * 2 + 1);
        });

        this.screen2d.add(this.bottomRightSprite);

        this.bottomRightSprite.position.set(this.width - 100, this.height - 100);

        this.input.on(
            "move",
            function (e) {
                debugText.setText(Math.floor(e.x) + " : " + Math.floor(e.y));
            },
            this
        );

        // this.screen2d.scene.add(mesh);
    },

    update: function (time, delta) {
        this.button.scale.x = Math.sin(time * 0.001);
        this.mesh.rotation.x += delta * 0.005;
        this.mesh.position.x = Math.sin(time * 0.001);
        this.mesh.position.z = 1 + Math.sin(time * 0.001);
    },

    // update: function(time, delta) {

    //  this.sprite.tilePosition.x += 0.5 * delta;
    //  this.sprite.tilePosition.y += Math.sin(time * 0.01) * 10;

    //  this.sprite.tileScale.x = this.sprite.tileScale.y = Math.sin(time * 0.0007) * 1;
    // },

    resize: function (width, height) {
        this.bottomRightSprite.x = width - 100;
        this.bottomRightSprite.y = height - 100;
    }
};
