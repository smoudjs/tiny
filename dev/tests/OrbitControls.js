import '@smoud/tiny/orbit-controls';
import App from '../basic/App.js';

class OrbitControls {
    static name = 'orbitControls';

    constructor(app) {
        this.app = app;

        if (this.app.cameras) {
            this.control = new Tiny.OrbitControls(this.app.camera, app.inputView);
            this.control.enableDamping = true;
            // this.control2 = new Tiny.OrbitControls(this.cameraP, { element: view });
        }
    }

    update(time, delta) {
        if (this.control) this.control.update();
    }
}

App.registerTest(OrbitControls);
