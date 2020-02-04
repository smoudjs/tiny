import { 
	WebGLRenderer,
	Scene, 
	OrthographicCamera, 
	SpriteMaterial, 
	CanvasTexture, 
	Sprite, 
	LinearFilter, 
	sRGBEncoding 
} from "three";

import Core from './TinyCommon'

export default class Tiny extends Core {
	constructor ( width, height, parentNode, enableRAF, states ) {
		parentNode = parentNode || document.body;

		super(enableRAF, states)

		this.height = width || 720;
		this.width = height || 430;

		this.renderer = new Tiny.CanvasRenderer(this.width, this.height, {transparent: true})

		this.setupWorld(parentNode)
		this.setupUI()


		this.boot()
	}

	setupUI () {
		this.ui_scene = new Scene();

	    this.ui_camera = new OrthographicCamera( - this.width / 2, this.width / 2, this.height / 2, - this.height / 2, 1, 10 );
		
		this.ui_camera.position.z = 1;

	    this.ui_texture = new CanvasTexture( this.renderer.view );
		this.ui_texture.encoding = sRGBEncoding;
	    var material = new SpriteMaterial({ map: this.ui_texture })
	    this.ui_sprite = new Sprite( material )

	    this.ui_scene.add( this.ui_sprite );

	 //    this.ui_texture.generateMipmaps = false;
		// this.ui_texture.wrapS = this.ui_texture.wrapT = ClampToEdgeWrapping;
		this.ui_texture.minFilter = LinearFilter;
	}

	setupWorld ( parentNode ) {

		this.trenderer = new WebGLRenderer({
            antialias: true
        });

        this.trenderer.setSize(this.width, this.height);

        this.inputView = this.canvas = this.trenderer.domElement

        parentNode.appendChild(this.trenderer.domElement);
	}

	setPixelRatio (dpr) {
		this.trenderer.setPixelRatio(dpr);
		super.setPixelRatio(dpr)
	}

	resize (width, height, scale) {
		super.resize(width, height, scale)

		this.ui_camera.left = - this.width / 2;
		this.ui_camera.right = this.width / 2;
		this.ui_camera.top = this.height / 2;
		this.ui_camera.bottom = - this.height / 2;
		this.ui_camera.updateProjectionMatrix();

		this.ui_sprite.scale.set(this.width, this.height, 1);

		this.trenderer.setSize(this.width, this.height);
		
		this._render()
	}

	_render () {
		this.renderer.render(this.stage)
		this.ui_texture.needsUpdate = true

		this.trenderer.autoClear = true;
        this.trenderer.render(this.scene, this.camera);
        this.trenderer.autoClear = false;
        this.trenderer.render(this.ui_scene, this.ui_camera);
	}

	_preload () {
		var _self = this
		this.preload.call(this.callbackContext, function() {
			_self.state = 1
			if (Tiny.Loader)
				_self.load.start(_self._create)
			else
				_self._create()
		})
	}

	destroy () {
		super.destroy()

		this.ui_scene.dispose()
		this.ui_scene = null;
		this.ui_camera = null
		this.ui_sprite = this.ui_texture = null

		if (this.trenderer.domElement.parentNode) {
		    this.trenderer.domElement.parentNode.removeChild(this.trenderer.domElement);
		}

		this.trenderer.dispose();

        this.trenderer = undefined;
	}
}