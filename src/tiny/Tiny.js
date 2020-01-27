import Core from './TinyCommon'

export default class Tiny extends Core {
	constructor (width, height, parentNode, enableRAF, states) {
		parentNode = parentNode || document.body;

		super (enableRAF, states)

		this.height = height || 720;
		this.width = width || 430;

		this.renderer = new Tiny.CanvasRenderer(this.width, this.height, {autoResize: true})

		var view = this.inputView = this.renderer.view

		parentNode.appendChild(view);
		view.style.position = 'absolute'; 

		view.style.top="0px";
		view.style.left="0px";

		view.style.transformOrigin = '0% 0%';
		view.style.perspective = '1000px';

		this.boot()
	}

	preload () {
		this._preload_cb.call(this.callbackContext)
		this.state = 1
		if (Tiny.Loader)
			this.load.start(this.create)
		else
			this.create()
	}

	render () {
		this.renderer.render(this.stage)
	}
}

window.Tiny = Tiny;
