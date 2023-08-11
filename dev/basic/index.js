import '@smoud/tiny/app';
import '@smoud/tiny/2d';
import '@smoud/tiny/extras/renderers/canvas';

import App from './App';

window.addEventListener('load', () => {
    const app = new App(window.innerWidth, window.innerHeight, 'game');
    window.app = app;

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
