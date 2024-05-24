import '@smoud/tiny/shapes-extras';
import App from '../basic/App.js';

class GraphicsAdnvancedTest {
    static name = 'graphicsAdvanced';

    constructor(app) {
        this.app = app;
    }

    create() {
        const realPath = new Tiny.Graphics();

        realPath.lineStyle(2, 0xffffff, 1);
        realPath.moveTo(0, 0);
        realPath.lineTo(100, 200);
        realPath.lineTo(200, 200);
        realPath.lineTo(240, 100);

        realPath.position.x = 50;
        realPath.position.y = 50;

        this.app.scene2d.add(realPath);

        const bezier = new Tiny.Graphics();

        bezier.lineStyle(5, 0xaa0000, 1);
        bezier.bezierCurveTo(100, 200, 200, 200, 240, 100);

        bezier.position.x = 50;
        bezier.position.y = 50;

        this.app.scene2d.add(bezier);

        // // BEZIER CURVE 2 ////
        const realPath2 = new Tiny.Graphics();

        realPath2.lineStyle(2, 0xffffff, 1);
        realPath2.moveTo(0, 0);
        realPath2.lineTo(0, -100);
        realPath2.lineTo(150, 150);
        realPath2.lineTo(240, 100);

        realPath2.position.x = 320;
        realPath2.position.y = 150;

        this.app.scene2d.add(realPath2);

        const bezier2 = new Tiny.Graphics();

        // bezier2.lineTextureStyle({ width: 10, texture: sprite.texture });
        bezier2.lineStyle(10, 0xfff434)
        bezier2.bezierCurveTo(0, -100, 150, 150, 240, 100);

        bezier2.position.x = 320;
        bezier2.position.y = 150;

        this.app.scene2d.add(bezier2);

        // // ARC ////
        const arc = new Tiny.Graphics();

        arc.lineStyle(5, 0xaa00bb, 1);
        arc.arc(600, 100, 50, Math.PI, 2 * Math.PI);

        this.app.scene2d.add(arc);

        // // ARC 2 ////
        const arc2 = new Tiny.Graphics();

        arc2.lineStyle(6, 0x3333dd, 1);
        arc2.arc(650, 270, 60, 2 * Math.PI, (3 * Math.PI) / 2);

        this.app.scene2d.add(arc2);

        // // ARC 3 ////
        const arc3 = new Tiny.Graphics();

        // arc3.lineTextureStyle({ width: 20, texture: sprite.texture });
        arc3.lineStyle(10, 0xfff434)
        arc3.arc(650, 420, 60, 2 * Math.PI, (2.5 * Math.PI) / 2);

        this.app.scene2d.add(arc3);

        // / Hole ////
        const rectAndHole = new Tiny.Graphics();

        rectAndHole.beginFill(0x00ff00);
        rectAndHole.drawRect(350, 350, 150, 150);
        rectAndHole.endFill();
        rectAndHole.beginFill(0x000000); //rectAndHole.beginHole();
        rectAndHole.drawCircle(375, 375, 25);
        rectAndHole.drawCircle(425, 425, 25);
        rectAndHole.drawCircle(475, 475, 25);
        // rectAndHole.endHole();
        rectAndHole.endFill();

        this.app.scene2d.add(rectAndHole);

        // // Line Texture Style ////
        const beatifulRect = new Tiny.Graphics();

        // beatifulRect.lineTextureStyle({ width: 20, texture: sprite.texture });
        beatifulRect.beginFill(0xff0000);
        beatifulRect.drawRect(80, 350, 150, 150);
        beatifulRect.endFill();

        this.app.scene2d.add(beatifulRect);
    }
}

App.registerTest(GraphicsAdnvancedTest);
