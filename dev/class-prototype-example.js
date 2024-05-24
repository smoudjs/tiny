import { EventTarget } from '../utils/EventTarget.js';

let entityId = 0;

function Entity() {

	Object.defineProperty( this, 'id', { value: entityId ++ } );

	this.name = '';
	this.type = 'Entity';
}

EventTarget.mixin(Entity);

Object.assign( Entity.prototype, {

	constructor: Entity,

	isEntity: true,

	customProgramCacheKey: function () {

		return this.onBeforeCompile.toString();

	},

	dispose: function () {

		this.emit( 'dispose' );

	}

} );

Object.defineProperty( Entity.prototype, 'needsUpdate', {

	set: function ( value ) {

		if ( value === true ) this.version ++;

	}

} );

export { Entity };
