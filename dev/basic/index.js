import '@smoud/tiny/app';
import '@smoud/tiny/2d';
import '@smoud/tiny/extras/canvas-renderer';
// import '@smoud/tiny/extras/canvas-renderer';
import '@smoud/tiny/extras/canvas-graphics';
// import '@smoud/tiny/extras/shapes';

import App from './App';

// var renderer = new Tiny.CanvasRenderer(640, 320);
// document.body.appendChild(renderer.domElement);

// var scene = new Tiny.Scene();
// var text = new Tiny.Text("Hello World!");
// scene.add(text);
// renderer.render(scene);

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
