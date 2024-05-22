import '@smoud/tiny/2d';
import '@smoud/tiny/webgl-renderer';
import '@smoud/tiny/canvas-renderer';
import '@smoud/tiny/canvas-graphics';
import '@smoud/tiny/shapes';
import '@smoud/tiny/tiling-sprite';
import '@smoud/tiny/progress-bar';
import '@smoud/tiny/anim';
import '@smoud/tiny/sound';
import '@smoud/tiny/create';
import '@smoud/tiny/addons/libs/howler';

import App from './Extended';

window.addEventListener('load', () => {
    const app = new App(window.innerWidth, window.innerHeight, 'game');
    window.app = app;
    window.game = app;

    window.addEventListener('resize', () => {
        app.resize(window.innerWidth, window.innerHeight);
    });
});

if (__DEV__) {
    (function () {
        var script = document.createElement('script');

        script.onload = function () {
            var stats = new Stats();
            document.body.appendChild(stats.dom);
            requestAnimationFrame(function loop() {
                stats.update();
                requestAnimationFrame(loop);
            });
        };

        script.src = 'https://mrdoob.github.io/stats.js/build/stats.min.js';
        document.head.appendChild(script);
    })();
}
