// import { Scene, OrthographicCamera, SpriteMaterial, CanvasTexture, Sprite, LinearFilter, sRGBEncoding } from "three";

import Core from './TinyCommon'

export default class Tiny extends Core {
	constructor (three, enableRAF, states, THREE) {
		super(enableRAF, states)

		this.height = 720;
		this.width = 430;

		this.parent = this.three = three 

		this.renderer = new Tiny.CanvasRenderer(this.width, this.height, {transparent: true})

		this.inputView = three.renderer.domElement

		this.scene = new THREE.Scene();

	    this.camera = new THREE.OrthographicCamera( - this.width / 2, this.width / 2, this.height / 2, - this.height / 2, 1, 10 );
		
		this.camera.position.z = 1;

	    this.texture = new THREE.CanvasTexture( this.renderer.view );
		this.texture.encoding = THREE.sRGBEncoding;
	    this.material = new THREE.SpriteMaterial({ map: this.texture })
	    this.sprite = new THREE.Sprite( this.material )

	    this.scene.add( this.sprite );

	 //    this.texture.generateMipmaps = false;
		// this.texture.wrapS = this.texture.wrapT = ClampToEdgeWrapping;
		this.texture.minFilter = THREE.LinearFilter;

		this.boot()
	}

	resize (width, height) {
		super.resize(width, height)

		this.camera.left = - this.width / 2;
		this.camera.right = this.width / 2;
		this.camera.top = this.height / 2;
		this.camera.bottom = - this.height / 2;
		this.camera.updateProjectionMatrix();

		this.sprite.scale.set(this.width, this.height, 1);
		
		this.render()
	}

	render () {
		this.renderer.render(this.stage)
		this.texture.needsUpdate = true
	}

	preload () {
		var _self = this
		this._preload_cb.call(this.callbackContext, function() {
			_self.state = 1
			if (Tiny.Loader)
				_self.load.start(_self.create)
			else
				_self.create()
		})
	}

	destroy () {
		super.destroy()

		this.scene.dispose()
		this.scene = null;
		this.camera = null
		this.material = this.sprite = this.texture = null
	}
}