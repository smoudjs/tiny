import App from '../basic/App.js';
import { randomInt, random } from '../utils/Math'; 

const posX = 400;
const posY = 500;

class SpriteBlendingTest {
    static name = 'spriteBlending';

    constructor(app) {
        this.app = app;
    }

    preload() {
        this.app.load.image('sprites/snowflake7_alpha', require('examples/textures/sprites/snowflake7_alpha.png'))
    }

    create() {
        var text1 = new Tiny.Text('❤️', {
            fontFamily: 'Arial',
            fontSize: 43,
            fontWeight: 'bold',
            fill: '#ff0000', // gradient
            stroke: '#ffffff',
            strokeThickness: 3,
            dropShadow: true,
            dropShadowColor: '#ffffff',
            dropShadowBlur: 5,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 5,
            wordWrap: true,
            wordWrapWidth: 440
        });

        var text2 = new Tiny.Text('🔥', {
            fontFamily: 'Arial',
            fontSize: 43,
            fontWeight: 'bold',
            fill: '#ff0000', // gradient
            stroke: '#ffffff',
            strokeThickness: 3,
            dropShadow: true,
            dropShadowColor: '#ffffff',
            dropShadowBlur: 5,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 5,
            wordWrap: true,
            wordWrapWidth: 440
        });

        let smokes = this.smokes = [];
        for (let i = 0; i < 150; i++) {
            var sprite = new Tiny.Sprite('sprites/snowflake7_alpha');
            sprite.position.set(posX, posY);
            sprite.anchor.set(0.5);
            sprite.scale.set(1.5);
            sprite.opacity = 0.4;
            sprite.vel = 1;
            sprite.tint.set(Math.random() * 0xffffff)
            sprite.offset = random(10, 4000)
            sprite.speed = random(0.005, 0.01);
            sprite.blending = Tiny.AdditiveBlending;
            smokes.push(sprite);
            this.app.scene2d.add(sprite);
        }


        text1.position.set(posX, posY)
        text2.position.set(posX + 30, posY)

        text1.anchor.set(0.5);
        text2.anchor.set(0.5);

        text1.scale.set(2)
        text2.scale.set(2)

        text1.blending = Tiny.SubtractiveBlending;
        text2.blending = Tiny.MultiplyBlending;

        this.app.scene2d.add(text1);
        this.app.scene2d.add(text2);

    }

    update(time) {
        for (let i = 0; i< this.smokes.length; i++){
            var smoke = this.smokes[i];
            smoke.position.x = posX + Math.sin((time + smoke.offset * 0.8) * 0.002) * 140;
            smoke.position.y = posY + Math.sin((time + smoke.offset) * 0.005) * 110;
            // if (smoke.speed > 0.2 || smoke.speed < 0.0001) {
            //     smoke.vel = -smoke.vel;
            // }
            // smoke.speed += smoke.vel * 0.0001;
        }
    }

    destroy() {
        this.app.timer.remove(this.timer)
    }
}

App.registerTest(SpriteBlendingTest);
