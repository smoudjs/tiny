import '@smoud/tiny/app';
import '@smoud/tiny/2d';
import '@smoud/tiny/webgl';
import '@smoud/tiny/extras/canvas-renderer';
import '@smoud/tiny/extras/canvas-graphics';
import '@smoud/tiny/extras/shapes';
import '@smoud/tiny/extras/tiling-sprite';
import '@smoud/tiny/extras/progress-bar';
import '@smoud/tiny/extras/anim';
import '@smoud/tiny/extras/sound';
import '@smoud/tiny/extras/create';
import '../../examples/js/App2D';
import '../../examples/js/App3D';
import '../../examples/js/objects/MiniMap';
import '../../examples/libs/howler';

import App from './Progress';

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
