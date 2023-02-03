window["test.Graphics2"] = {
    create: function () {
        this.graphics = new Tiny.Graphics();
        this.graphics.x = 100;
        this.graphics.y = 100;
        this.graphics.beginFill("#0a6dc1");
        this.graphics.drawCircle(0, 0, 182);
        this.graphics.beginFill("#04589e");
        this.graphics.drawCircle(0, 0, 170);

        for (var i = 0; i < 40; i++) {
            this.graphics.beginFill("#5500c5", 0.06);
            this.graphics.drawCircle(0, 0, i * 4);
        }

        // this.scene.add(this.graphics);

        const texture1 = this.graphics.generateTexture();

        const sprite = new Tiny.Sprite(texture1);
        this.scene.add(sprite);

        this.graphics.destroy();

        this.graphics = new Tiny.Graphics();
        this.graphics.position.set(100, 100);
        this.graphics.beginFill("#45a187");
        this.graphics.drawCircle(34, 100, 125);
        this.graphics.beginFill("#ff4545");
        this.graphics.drawRect(120, 45, 50, 50);
        this.graphics.scale.set(2, 1);
        this.graphics.rotation = 0.3;

        var texture2 = this.graphics.generateTexture(0.5);

        const sprite2 = new Tiny.Sprite(texture2);
        this.scene.add(sprite2);

        this.scene.add(this.graphics);

        this.graphics.lineStyle(4, "#232323", 0.5);
        this.graphics.moveTo(23, 100);
        this.graphics.lineTo(150, 150);

        this.graphics.moveTo(200, 30);

        this.graphics.quadraticCurveTo(100, 134, 220, 145);
        this.graphics.bezierCurveTo(30, 5, 140, 10, 100, 50);
        this.graphics.arcTo(200, -0, 250, -120, 150);

        this.graphics.beginFill("#f4a187", 0.5);

        this.graphics.drawRoundedRect(120, 0, 100, 60, 15);
        // this.graphics.drawRoundedRect2(120, 70, 100, 60, 15);
    }
};
