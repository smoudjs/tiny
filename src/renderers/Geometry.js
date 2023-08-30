// attribute params
// {
//     data - typed array eg UInt16Array for indices, Float32Array
//     size - int default 1
//     instanced - default null. Pass divisor amount
//     type - gl enum default gl.UNSIGNED_SHORT for 'index', gl.FLOAT for others
//     normalized - boolean default false

//     buffer - gl buffer, if buffer exists, don't need to provide data - although needs position data for bounds calculation
//     stride - default 0 - for when passing in buffer
//     offset - default 0 - for when passing in buffer
//     count - default null - for when passing in buffer
//     min - array - for when passing in buffer
//     max - array - for when passing in buffer
// }

// TODO: fit in transform feedback

import {Mat3} from "../math/Mat3-3d";
import {Mat4} from "../math/Mat4";
import {Vec3} from '../math/Vec3.js';

import {Float32Attribute, Int16Attribute} from "./Attribute";

var _m1 = new Mat4();

var tempVec3 = new Vec3();

var ID = 1;

// To stop inifinite warnings
var isBoundsWarned = false;

function Geometry(attributes = {}) {
    this.id = ID++;

    this.attributes = attributes;

    this.index = null;

    // Store one VAO per program attribute locations order
    this.VAOs = {};

    this.drawRange = {start: 0, count: 0};
    this.instancedCount = 0;
}

Geometry.prototype = {
    constructor: Geometry,

    initialize: function (gl) {
        var {attributes} = this;

        this.gl = gl;

        // Unbind current VAO so that new buffers don't get added to active mesh
        this.gl.renderer.bindVertexArray(null);
        this.gl.renderer.currentGeometry = null;

        // Alias for state store to avoid redundant calls for global state
        this.glState = this.gl.renderer.state;

        // create the buffers
        for (var key in attributes) {
            this.setAttribute(key, attributes[key]);
        }
    },

    translate: function( x, y, z ) {
        _m1.makeTranslation( x, y, z );

        this.applyMatrix4( _m1 );

        return this;
    },

    clone: function() {
        return new this.constructor().copy( this );
    },

    scale: function( x, y, z ) {
        _m1.makeScale( x, y, z );

        this.applyMatrix4( _m1 );

        return this;
    },

    applyMatrix4: function( matrix ) {

        var position = this.attributes.position;

        if ( position !== undefined ) {

            position.applyMatrix4( matrix );

            position.needsUpdate = true;

        }

        var normal = this.attributes.normal;

        if ( normal !== undefined ) {

            var normalMatrix = new Mat3().getNormalMatrix( matrix );

            normal.applyNormalMatrix( normalMatrix );

            normal.needsUpdate = true;

        }

        if ( this.boundingBox !== null ) {

            this.computeBoundingBox();

        }

        if ( this.boundingSphere !== null ) {

            this.computeBoundingSphere();

        }

        return this;
    },

    copy: function( source ) {

        // reset

        this.index = null;
        this.attributes = {};
        this.boundingBox = null;
        this.boundingSphere = null;

        // name

        this.name = source.name;

        // attributes

        var attributes = source.attributes;

        for ( var name in attributes ) {
            this.attributes[name] = attributes[ name ].clone();
        }

        if (source.index) {
            this.setIndex(source.index.array);
        }

        // bounding box

        // var boundingBox = source.boundingBox;
        //
        // if ( boundingBox !== null ) {
        //
        //     this.boundingBox = boundingBox.clone();
        //
        // }
        //
        // // bounding sphere
        //
        // var boundingSphere = source.boundingSphere;
        //
        // if ( boundingSphere !== null ) {
        //
        //     this.boundingSphere = boundingSphere.clone();
        //
        // }

        // draw range

        this.drawRange.start = source.drawRange.start;
        this.drawRange.count = source.drawRange.count;

        return this;

    },

    setAttribute: function( name, attribute ) {
        this.attributes[ name ] = attribute;

        if (!this.index) {
            this.drawRange.count = Math.max(this.drawRange.count, attribute.count);
        }

        return this;
    },

    updateAttribute: function (attr, target = this.gl.ARRAY_BUFFER) {
        var isNewBuffer = !attr.buffer;
        if (isNewBuffer) attr.buffer = this.gl.createBuffer();
        if (this.glState.boundBuffer !== attr.buffer) {
            this.gl.bindBuffer(target, attr.buffer);
            this.glState.boundBuffer = attr.buffer;
        }
        if (isNewBuffer) {
            this.gl.bufferData(target, attr.array, attr.usage);
        } else {
            this.gl.bufferSubData(target, 0, attr.array);
        }
        attr.needsUpdate = false;
    },

    setIndex: function (array) {
        this.index = new Int16Attribute(array, 1);

        this.drawRange.count = array.length;
    },

    setDrawRange: function (start, count) {
        this.drawRange.start = start;
        this.drawRange.count = count;
    },

    setInstancedCount: function (value) {
        this.instancedCount = value;
    },

    createVAO: function (program) {
        this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
        this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
        this.bindAttributes(program);
    },

    bindAttributes: function (program) {
        // Link all attributes to program using gl.vertexAttribPointer
        program.attributeLocations.forEach((location, {name, type}) => {
            // If geometry missing a required shader attribute
            if (!this.attributes[name]) {
                console.warn(`active attribute ${name} not being supplied`);
                return;
            }

            var attr = this.attributes[name];

            if (!attr.buffer) {
                this.updateAttribute(attr);
            }

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attr.buffer);
            this.glState.boundBuffer = attr.buffer;

            // For matrix attributes, buffer needs to be defined per column
            var numLoc = 1;
            if (type === 35674) numLoc = 2; // mat2
            if (type === 35675) numLoc = 3; // mat3
            if (type === 35676) numLoc = 4; // mat4

            var size = attr.itemSize / numLoc;
            var stride = numLoc === 1 ? 0 : numLoc * numLoc * 4;
            var offset = numLoc === 1 ? 0 : numLoc * 4;

            for (var i = 0; i < numLoc; i++) {
                this.gl.vertexAttribPointer(location + i, size, this.gl.FLOAT, attr.normalized, attr.stride + stride, attr.offset + i * offset);
                this.gl.enableVertexAttribArray(location + i);

                // For instanced attributes, divisor needs to be set.
                // For firefox, need to set back to 0 if non-instanced drawn after instanced. Else won't render

                this.gl.renderer.vertexAttribDivisor(location + i, attr.instanced);
            }
        });

        // Bind indices if geometry indexed
        if (this.index) this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.index.buffer);
    },

    draw: function ({program, mode = WebGLRenderingContext.TRIANGLES}) {
        if (this.gl.renderer.currentGeometry !== `${this.id}_${program.attributeOrder}`) {
            if (!this.VAOs[program.attributeOrder]) this.createVAO(program);
            this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
            this.gl.renderer.currentGeometry = `${this.id}_${program.attributeOrder}`;
        }

        // Check if any attributes need updating
        program.attributeLocations.forEach((location, {name}) => {
            var attr = this.attributes[name];
            if (attr.needsUpdate) this.updateAttribute(attr);
        });

        if (this.index && this.index.needsUpdate) {
            this.updateAttribute(this.index, this.gl.ELEMENT_ARRAY_BUFFER);
        }

        // For drawElements, offset needs to be multiple of type size
        var indexBytesPerElement = 2;
        if (this.index?.type === this.gl.UNSIGNED_INT) indexBytesPerElement = 4;

        if (this.isInstanced) {
            if (this.index) {
                this.gl.renderer.drawElementsInstanced(
                    mode,
                    this.drawRange.count,
                    this.gl.UNSIGNED_SHORT,
                    this.index.offset + this.drawRange.start * indexBytesPerElement,
                    this.instancedCount
                );
            } else {
                this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
            }
        } else {
            if (this.index) {
                this.gl.drawElements(
                    mode,
                    this.drawRange.count,
                     this.gl.UNSIGNED_SHORT,
                    this.index.offset + this.drawRange.start * indexBytesPerElement
                );
            } else {
                this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
            }
        }
    },

    getPosition: function () {
        // Use position buffer, or min/max if available
        var attr = this.attributes.position;
        // if (attr.min) return [...attr.min, ...attr.max];
        if (attr.array) return attr;
        if (isBoundsWarned) return;
        console.warn('No position buffer data found to compute bounds');
        return (isBoundsWarned = true);
    },

    computeBoundingBox: function (attr) {
        if (!attr) attr = this.getPosition();
        var array = attr.array;
        // Data loaded shouldn't haave stride, only buffers
        // var stride = attr.stride ? attr.stride / array.BYTES_PER_ELEMENT : attr.itemSize;
        var stride = attr.itemSize;

        if (!this.bounds) {
            this.bounds = {
                min: new Vec3(),
                max: new Vec3(),
                center: new Vec3(),
                scale: new Vec3(),
                radius: Infinity,
            };
        }

        var min = this.bounds.min;
        var max = this.bounds.max;
        var center = this.bounds.center;
        var scale = this.bounds.scale;

        min.set(+Infinity,+Infinity,+Infinity);
        max.set(-Infinity,-Infinity,-Infinity);

        // TODO: check size of position (eg triangle with Vector2)
        for (var i = 0, l = array.length; i < l; i += stride) {
            var x = array[i];
            var y = array[i + 1];
            var z = array[i + 2];

            min.x = Math.min(x, min.x);
            min.y = Math.min(y, min.y);
            min.z = Math.min(z, min.z);

            max.x = Math.max(x, max.x);
            max.y = Math.max(y, max.y);
            max.z = Math.max(z, max.z);
        }

        scale.subVectors(max, min);
        center.subVectors(min, max).divideScalar(2);
    },

    computeBoundingSphere: function (attr) {
        if (!attr) attr = this.getPosition();
        var array = attr.array;
        // Data loaded shouldn't haave stride, only buffers
        // var stride = attr.stride ? attr.stride / array.BYTES_PER_ELEMENT : attr.itemSize;
        var stride = attr.itemSize;

        if (!this.bounds) this.computeBoundingBox(attr);

        var maxRadiusSq = 0;
        for (var i = 0, l = array.length; i < l; i += stride) {
            tempVec3.fromArray(array, i);
            maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.distanceToSquared(tempVec3));
        }

        this.bounds.radius = Math.sqrt(maxRadiusSq);
    },

    computeVertexNormals: function () {
        var index = this.index;
        var positionAttribute = this.attributes['position'];

        if (positionAttribute !== undefined) {

            var normalAttribute = this.attributes['normal'];

            if (normalAttribute === undefined) {
                this.setAttribute('normal', new Float32Attribute(new Float32Array(positionAttribute.count * 3), 3));

                normalAttribute = this.attributes['normal'];
            } else {
                // @TODO not sure is needed
                // for ( var i = 0, il = normalAttribute.count; i < il; i ++ ) {
                //     normalAttribute.setXYZ( i, 0, 0, 0 );
                // }
            }

            var pA = new Vec3(), pB = new Vec3(), pC = new Vec3();
            var nA = new Vec3(), nB = new Vec3(), nC = new Vec3();
            var cb = new Vec3(), ab = new Vec3();

            // indexed elements
            if (index) {
                for (var i = 0, il = index.count; i < il; i += 3) {
                    var vA = index.getX(i);
                    var vB = index.getX(i + 1);
                    var vC = index.getX(i + 2);

                    pA.fromAttribute(positionAttribute, vA);
                    pB.fromAttribute(positionAttribute, vB);
                    pC.fromAttribute(positionAttribute, vC);

                    cb.subVectors(pC, pB);
                    ab.subVectors(pA, pB);
                    cb.cross(ab);

                    nA.fromAttribute(normalAttribute, vA);
                    nB.fromAttribute(normalAttribute, vB);
                    nC.fromAttribute(normalAttribute, vC);

                    nA.add(cb);
                    nB.add(cb);
                    nC.add(cb);

                    normalAttribute.setXYZ(vA, nA.x, nA.y, nA.z);
                    normalAttribute.setXYZ(vB, nB.x, nB.y, nB.z);
                    normalAttribute.setXYZ(vC, nC.x, nC.y, nC.z);
                }
            } else {
                //@TODO add in future
                // non-indexed elements (unconnected triangle soup)

                // for ( var i = 0, il = positionAttribute.count; i < il; i += 3 ) {
                //
                //     pA.fromAttribute( positionAttribute, i + 0 );
                //     pB.fromAttribute( positionAttribute, i + 1 );
                //     pC.fromAttribute( positionAttribute, i + 2 );
                //
                //     cb.subVectors( pC, pB );
                //     ab.subVectors( pA, pB );
                //     cb.cross( ab );
                //
                //     normalAttribute.setXYZ( i + 0, cb.x, cb.y, cb.z );
                //     normalAttribute.setXYZ( i + 1, cb.x, cb.y, cb.z );
                //     normalAttribute.setXYZ( i + 2, cb.x, cb.y, cb.z );
                //
                // }
            }

            normalAttribute.needsUpdate = true;
        }
    },

    remove: function () {
        for (var key in this.VAOs) {
            this.gl.renderer.deleteVertexArray(this.VAOs[key]);
            delete this.VAOs[key];
        }
        for (var key in this.attributes) {
            this.gl.deleteBuffer(this.attributes[key].buffer);
            delete this.attributes[key];
        }
    }
};

Tiny.Geometry = Geometry;

export {Geometry};
