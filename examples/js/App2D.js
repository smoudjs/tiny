
Tiny.CanvasTinter.cacheTint = false;

class App2D extends Tiny.App {

	constructor(width, height, parentNode, states) {

		super(states);

		this.width = width;
		this.height = height;

		this.renderer = new Tiny.CanvasRenderer(this.width, this.height,
	    {
	    	resolution: 1.25,
	        autoResize: true
	    });

	    this.renderer.setClearColor("#f4f4f4");

	    var view = this.inputView = this.renderer.domElement;

	    parentNode = parentNode ? document.getElementById(parentNode) : document.body;
	    parentNode.appendChild(view);
	    // view.style.position = 'absolute';

	    // view.style.top = "0px";
	    // view.style.left = "0px";

	    // view.style.transformOrigin = '0% 0%';
	    view.style.perspective = '1000px';

	    this.scene = new Tiny.Scene();
	}

	setPixelRatio(dpr) {
		this.renderer.setPixelRatio(dpr);
	}

	render() {
		this.renderer.render(this.scene);
	}

	resize(width, height) {
		
		super.resize(width, height);

		this.renderer.resize(width, height);
	}

	destroy(clearCache) {

		super.destroy(clearCache);

		this.scene.destroy();
	    this.renderer.destroy(true);
	}

}

Tiny.App2D = App2D;