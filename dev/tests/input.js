import App from '../basic/App.js';

class InputTest {
  static name = 'input';

  constructor(app) {
    this.app = app;
  }

  preload() {
    this.app.load.image('coin', require('examples/textures/basics/coin.png'));
  }

  create() {
    var sprite = (this.sprite = new Tiny.Sprite('coin'));
    sprite.position.set(300, 200);
    // sprite.skew.set(0.5, 0);
    sprite.anchor.set(0.5);
    this.app.scene2d.add(sprite);

    this.app.input.add(sprite);

    sprite.on('down', () => {
      sprite.scale.x *= 1.2;
      sprite.scale.y *= 1.2;
    });
  }

  update(time, delta) {
    // this.sprite.skew.x += 0.001 * delta;
    // this.sprite.skew.y += 0.005 * delta;
    // this.sprite.rotation += 0.0003 * delta;
    // this.sprite.position.y = 200 + Math.sin(time * 0.001) * 100;
  }

  destroy() {}
}

App.registerTest(InputTest);
