
class App3D extends Tiny.App {

	constructor(width, height, parentNode, states) {

		super(states);

		this.width = width;
		this.height = height;

		this.renderer = new THREE.WebGLRenderer({
	        antialias: true
	    });

	    this.renderer.outputEncoding = THREE.sRGBEncoding;

	    this.renderer.setSize(this.width, this.height);
	    this.renderer.setClearColor("#232323");

	    var view = this.canvas = this.inputView = this.renderer.domElement;

	    parentNode = parentNode ? document.getElementById(parentNode) : document.body;
	    parentNode.appendChild(view);
	    // view.style.position = 'absolute';

	    // view.style.top = "0px";
	    // view.style.left = "0px";

	    // view.style.transformOrigin = '0% 0%';
	    view.style.perspective = '1000px';

	    this.scene = new THREE.Scene();
		this.camera = new THREE.OrthographicCamera(1, 1, 1, 1, 0.3, 500);
    	// this.camera = new PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);

        this.camera.position.set(40, 50, 40);
        this.camera.lookAt(0, 0, 0);
        this.camera.distance = 4;

        this.screen2d = new Tiny.Screen2D(this.width, this.height);

        this.setupCamera();
	}

	setupCamera() {

        var aspect = this.width / this.height;
        var distance = this.camera.distance;

        if (this.camera)
        {
            if (this.camera.isOrthographicCamera)
            {
                this.camera.left = -distance * aspect;
                this.camera.right = distance * aspect;
                this.camera.top = distance;
                this.camera.bottom = -distance;
            }
            else
            {
                this.camera.fov = distance * 1.2;
                this.camera.aspect = aspect;
            }

            this.camera.updateProjectionMatrix();
        }
    }

    setPixelRatio(dpr) {
		this.renderer.setPixelRatio(dpr);
		this.screen2d.renderer.setPixelRatio(dpr);
	}

	render() {
		this.renderer.autoClear = true;
	    this.renderer.render(this.scene, this.camera);
	    this.renderer.autoClear = false;
	    this.renderer.render(this.screen2d.scene, this.screen2d.camera);
	}

	resize(width, height) {
		
		super.resize(width, height);

		this.screen2d.setSize(width, height)
		this.renderer.setSize(width, height);
		this.setupCamera();
	}

	destroy(clearCache) {

		super.destroy(clearCache);

		// console.log("dasdasd")

	    this.screen2d.scene.dispose();
	    this.scene.dispose();
	    // this.ui_scene = null;
	    // this.ui_camera = null;
	    // this.ui_sprite = this.ui_texture = null;

	    if (this.renderer.domElement.parentNode)
	    {
	        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
	    }

	    this.renderer.dispose();
	    this.renderer = undefined;

	}

}

Tiny.App3D = App3D;