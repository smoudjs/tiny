import '@smoud/tiny/2d';
import '@smoud/tiny/3d';
import '@smoud/tiny/webgl-renderer';
// import '@smoud/tiny/orbit-controls';
// import '@smoud/tiny/canvas-renderer';
import '@smoud/tiny/webgl-2d';
// import '@smoud/tiny/extras/canvas-renderer';
// import '@smoud/tiny/canvas-graphics';
// import '@smoud/tiny/extras/shapes';
// import '@smoud/tiny/anim';

import App from './App';

import '../tests/sprite';
import '../tests/text';
// import '../tests/orbitControls';
import '../tests/mesh';
// import '../tests/instancedMesh';
// import '../tests/graphics';
// import '../tests/graphicsDynamic';
// import '../tests/graphicsAdvanced';
import '../tests/spriteBlending';

window.addEventListener('load', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const app = (window.app = new App(width, height, 'game'));

    window.addEventListener('resize', () => {
        app.resize(window.innerWidth, window.innerHeight);
    });
});

if (__DEV__) {
    (function () {
        var script = document.createElement('script');
        script.src = 'https://mrdoob.github.io/stats.js/build/stats.min.js';
        document.head.appendChild(script);
    })();
}
