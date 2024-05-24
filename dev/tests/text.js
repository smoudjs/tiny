import App from '../basic/App.js';

class TextTest {
    static name = 'text';

    constructor(app) {
        this.app = app;
    }

    create() {
        var color = new Tiny.Color(0xffaf00); //Math.random() * 0xffffff)
        var text = new Tiny.Text('Hello Tiny', {
            fontFamily: 'Arial',
            fontSize: 43,
            // fontStyle: 'italic',
            fontWeight: 'bold',
            fill: color.toStyle(),
            stroke: '#ffffff',
            strokeThickness: 13,
            dropShadow: true,
            dropShadowColor: '#ffffff',
            dropShadowBlur: 8,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 8,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round'
        });

        text.position.set(100, 300);
        this.app.scene2d.add(text);

        this.timer = this.app.timer.loop(2000, () => {
            text.setStyle({ lineJoin: text.style.lineJoin == 'miter' ? 'round' : 'miter' });
        });
    }

    destroy() {
        this.app.timer.remove(this.timer)
    }
}

App.registerTest(TextTest);
