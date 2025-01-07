import { Container } from './Container.js';
import { Mat3 } from '../math/Mat3.js';

function Scene(appContext) {
	Container.call(this);
	this.app = appContext;

	this.autoUpdate = true; // checked by the renderer

}

Scene.prototype = Object.assign(Object.create(Container.prototype), {
	constructor: Scene,

	isScene: true,
	
	updateChildren: function (force) {
		var children = this.children;

		for (var i = 0, l = children.length; i < l; i++) {
			children[i].updateTransform(force);
		}
	}
});

export { Scene };
