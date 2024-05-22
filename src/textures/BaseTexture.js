/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author szimek / https://github.com/szimek/
 */

import { EventTarget } from '../utils/EventTarget.js';
import { uid, getValue } from '../utils/index.js';
import {
	MirroredRepeatWrapping,
	ClampToEdgeWrapping,
	RepeatWrapping,
	LinearEncoding,
	UnsignedByteType,
	RGBAFormat,
	LinearMipmapLinearFilter,
	LinearFilter,
	UVMapping
} from '../constants.js';
import { Vec2 } from '../math/Vec2.js';
import { Mat3 } from '../math/Mat3.js';
// import { ImageUtils } from '../extras/ImageUtils.js';

var textureId = 0;

function BaseTexture(image, options) {
	options = options || {};
	Object.defineProperty(this, 'id', { value: textureId++ });

	this.uuid = uid();

	this.name = '';

	this.image = image !== undefined ? image : BaseTexture.DEFAULT_IMAGE;
	this.mipmaps = [];

	this.mapping = getValue(options, 'mapping', BaseTexture.DEFAULT_MAPPING);

	this.wrapS = getValue(options, 'wrapS', ClampToEdgeWrapping);
	this.wrapT = getValue(options, 'wrapT', ClampToEdgeWrapping);

	this.magFilter = getValue(options, 'magFilter', LinearFilter);
	this.minFilter = getValue(options, 'minFilter', LinearFilter);

	this.anisotropy = getValue(options, 'anisotropy', 1);

	this.format = getValue(options, 'format', RGBAFormat);
	this.internalFormat = null;
	this.type = getValue(options, 'type', UnsignedByteType);

	// this.offset = new Vec2(0, 0);
	// this.repeat = new Vec2(1, 1);
	// this.center = new Vec2(0, 0);
	// this.rotation = 0;

	// this.matrixAutoUpdate = true;
	// this.matrix = new Mat3();

	this.generateMipmaps = true;
	// this.premultiplyAlpha = false;
	this.flipY = false;
	this.unpackAlignment = 4; // valid values: 1, 2, 4, 8 (see http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml)

	// Values of encoding !== THREE.LinearEncoding only supported on map, envMap and emissiveMap.
	//
	// Also changing the encoding after already used by a Material will not automatically make the Material
	// update. You need to explicitly call Material.needsUpdate to trigger it to recompile.
	this.encoding = getValue(options, 'encoding', LinearEncoding);

	this.version = 0;
	this.onUpdate = null;

	/**
	 * The Resolution of the texture.
	 *
	 * @property resolution
	 * @type Number
	 */
	this.resolution = 1;

	/**
	 * [read-only] The width of the base texture set when the image has valid
	 *
	 * @property width
	 * @type Number
	 * @readOnly
	 */
	this.width = 100;

	/**
	 * [read-only] The height of the base texture set when the image has valid
	 *
	 * @property height
	 * @type Number
	 * @readOnly
	 */
	this.height = 100;

	// this.scaleMode = scaleMode || 0;
	this.valid = false;
	// this.source = source;

	// this._UID = uid();
	this.premultipliedAlpha = true;
	// this._glTextures = [];
	this.mipmap = false;
	// this._dirty = [true, true, true, true];
	this.imageUrl = null;
	this._powerOf2 = false;

	this._enabled = 0;
	this._virtalBoundId = -1;
	this.touched = 0;

	if (!image) return;

	let self = this;
	function onLoad() {
		self.valid = true;
		self.width = self.image.naturalWidth || self.image.width;
		self.height = self.image.naturalHeight || self.image.height;
		// self.dirty();
		self.version++;
		self.emit('load');
	}

	if ((image.complete || image.getContext) && image.width && image.height) {
		onLoad();
	} else {
		image.onload = onLoad;
	}
}

BaseTexture.DEFAULT_IMAGE = undefined;
BaseTexture.DEFAULT_MAPPING = UVMapping;

Object.assign(BaseTexture.prototype, {
	constructor: BaseTexture,

	isBaseTexture: true,

	/**
	 * Sets all glTextures to be dirty.
	 *
	 * @method dirty
	 */
	// dirty: function () {
	// 	for (var i = 0; i < this._glTextures.length; i++) {
	// 		this._dirty[i] = true;
	// 	}
	// },

	// updateMatrix: function () {
	// 	this.matrix.setUvTransform(
	// 		this.offset.x,
	// 		this.offset.y,
	// 		this.repeat.x,
	// 		this.repeat.y,
	// 		this.rotation,
	// 		this.center.x,
	// 		this.center.y
	// 	);
	// },

	// clone: function () {

	// 	return new this.constructor().copy( this );

	// },

	// copy: function ( source ) {

	// 	this.name = source.name;

	// 	this.image = source.image;
	// 	this.mipmaps = source.mipmaps.slice( 0 );

	// 	this.mapping = source.mapping;

	// 	this.wrapS = source.wrapS;
	// 	this.wrapT = source.wrapT;

	// 	this.magFilter = source.magFilter;
	// 	this.minFilter = source.minFilter;

	// 	this.anisotropy = source.anisotropy;

	// 	this.format = source.format;
	// 	this.internalFormat = source.internalFormat;
	// 	this.type = source.type;

	// 	this.offset.copy( source.offset );
	// 	this.repeat.copy( source.repeat );
	// 	this.center.copy( source.center );
	// 	this.rotation = source.rotation;

	// 	this.matrixAutoUpdate = source.matrixAutoUpdate;
	// 	this.matrix.copy( source.matrix );

	// 	this.generateMipmaps = source.generateMipmaps;
	// 	this.premultiplyAlpha = source.premultiplyAlpha;
	// 	this.flipY = source.flipY;
	// 	this.unpackAlignment = source.unpackAlignment;
	// 	this.encoding = source.encoding;

	// 	return this;

	// },

	// toJSON: function ( meta ) {

	// 	var isRootObject = ( meta === undefined || typeof meta === 'string' );

	// 	if ( ! isRootObject && meta.textures[ this.uuid ] !== undefined ) {

	// 		return meta.textures[ this.uuid ];

	// 	}

	// 	var output = {

	// 		metadata: {
	// 			version: 4.5,
	// 			type: 'Texture',
	// 			generator: 'Texture.toJSON'
	// 		},

	// 		uuid: this.uuid,
	// 		name: this.name,

	// 		mapping: this.mapping,

	// 		repeat: [ this.repeat.x, this.repeat.y ],
	// 		offset: [ this.offset.x, this.offset.y ],
	// 		center: [ this.center.x, this.center.y ],
	// 		rotation: this.rotation,

	// 		wrap: [ this.wrapS, this.wrapT ],

	// 		format: this.format,
	// 		type: this.type,
	// 		encoding: this.encoding,

	// 		minFilter: this.minFilter,
	// 		magFilter: this.magFilter,
	// 		anisotropy: this.anisotropy,

	// 		flipY: this.flipY,

	// 		premultiplyAlpha: this.premultiplyAlpha,
	// 		unpackAlignment: this.unpackAlignment

	// 	};

	// 	if ( this.image !== undefined ) {

	// 		// TODO: Move to THREE.Image

	// 		var image = this.image;

	// 		if ( image.uuid === undefined ) {

	// 			image.uuid = _Math.generateUUID(); // UGH

	// 		}

	// 		if ( ! isRootObject && meta.images[ image.uuid ] === undefined ) {

	// 			var url;

	// 			if ( Array.isArray( image ) ) {

	// 				// process array of images e.g. CubeBaseTexture

	// 				url = [];

	// 				for ( var i = 0, l = image.length; i < l; i ++ ) {

	// 					url.push( ImageUtils.getDataURL( image[ i ] ) );

	// 				}

	// 			} else {

	// 				// process single image

	// 				url = ImageUtils.getDataURL( image );

	// 			}

	// 			meta.images[ image.uuid ] = {
	// 				uuid: image.uuid,
	// 				url: url
	// 			};

	// 		}

	// 		output.image = image.uuid;

	// 	}

	// 	if ( ! isRootObject ) {

	// 		meta.textures[ this.uuid ] = output;

	// 	}

	// 	return output;

	// },

	dispose: function () {
		this.emit('dispose');
	},

	// transformUv: function (uv) {
	// 	if (this.mapping !== UVMapping) return uv;

	// 	uv.applyMat3(this.matrix);

	// 	if (uv.x < 0 || uv.x > 1) {
	// 		switch (this.wrapS) {
	// 			case RepeatWrapping:
	// 				uv.x = uv.x - Math.floor(uv.x);
	// 				break;

	// 			case ClampToEdgeWrapping:
	// 				uv.x = uv.x < 0 ? 0 : 1;
	// 				break;

	// 			case MirroredRepeatWrapping:
	// 				if (Math.abs(Math.floor(uv.x) % 2) === 1) {
	// 					uv.x = Math.ceil(uv.x) - uv.x;
	// 				} else {
	// 					uv.x = uv.x - Math.floor(uv.x);
	// 				}
	// 				break;
	// 		}
	// 	}

	// 	if (uv.y < 0 || uv.y > 1) {
	// 		switch (this.wrapT) {
	// 			case RepeatWrapping:
	// 				uv.y = uv.y - Math.floor(uv.y);
	// 				break;

	// 			case ClampToEdgeWrapping:
	// 				uv.y = uv.y < 0 ? 0 : 1;
	// 				break;

	// 			case MirroredRepeatWrapping:
	// 				if (Math.abs(Math.floor(uv.y) % 2) === 1) {
	// 					uv.y = Math.ceil(uv.y) - uv.y;
	// 				} else {
	// 					uv.y = uv.y - Math.floor(uv.y);
	// 				}
	// 				break;
	// 		}
	// 	}

	// 	if (this.flipY) {
	// 		uv.y = 1 - uv.y;
	// 	}

	// 	return uv;
	// }
});

Object.defineProperty(BaseTexture.prototype, 'needsUpdate', {
	set: function (value) {
		if (value === true) this.version++;
	}
});

EventTarget.call(BaseTexture);

export { BaseTexture };
