import { Camera } from './Camera';

import { Mat4 } from '../math/Mat4.js';
import { Vec3 } from '../math/Vec3.js';

var tempMat4 = new Mat4();
var tempVec3a = new Vec3();
var tempVec3b = new Vec3();

function OrthographicCamera(near = 0.1, far = 100, left = -1, right = 1, bottom = -1, top = 1, zoom = 1) {
    Camera.call(this);

    this.near = near;
    this.far = far;
    this.left = left;
    this.right = right;
    this.bottom = bottom;
    this.top = top;
    this.zoom = zoom;

    this.view = null;

    this.projectionMatrix = new Mat4();
    this.viewMatrix = new Mat4();
    this.projectionViewMatrix = new Mat4();

    this.updateProjectionMatrix();
}

OrthographicCamera.prototype = Object.assign(Object.create(Camera.prototype), {
    constructor: OrthographicCamera,

    isOrthographicCamera: true,

    updateProjectionMatrix: function () {
        Camera.prototype.updateProjectionMatrix.call(this);

        var dx = (this.right - this.left) / (2 * this.zoom);
        var dy = (this.top - this.bottom) / (2 * this.zoom);
        var cx = (this.right + this.left) / 2;
        var cy = (this.top + this.bottom) / 2;

        var left = cx - dx;
        var right = cx + dx;
        var top = cy + dy;
        var bottom = cy - dy;

        if (this.view !== null && this.view.enabled) {
            var zoomW = this.zoom / (this.view.width / this.view.fullWidth);
            var zoomH = this.zoom / (this.view.height / this.view.fullHeight);
            var scaleW = (this.right - this.left) / this.view.width;
            var scaleH = (this.top - this.bottom) / this.view.height;

            left += scaleW * (this.view.offsetX / zoomW);
            right = left + scaleW * (this.view.width / zoomW);
            top -= scaleH * (this.view.offsetY / zoomH);
            bottom = top - scaleH * (this.view.height / zoomH);
        }

        this.projectionMatrix.makeOrthographic(left, right, top, bottom, this.near, this.far);
    },

    updateMatrixWorld: function () {
        Camera.prototype.updateMatrixWorld.call(this);

        this.viewMatrix.getInverse(this.worldMatrix);
        this.projectionViewMatrix.multiplyMatrices(this.projectionMatrix, this.viewMatrix);

        return this;
    },

    // Project 3D coordinate to 2D point
    project: function (v) {
        v.applyMatrix4(this.viewMatrix);
        v.applyMatrix4(this.projectionMatrix);
        return this;
    },

    // Unproject 2D point to 3D coordinate
    unproject: function (v) {
        v.applyMatrix4(tempMat4.inverse(this.projectionMatrix));
        v.applyMatrix4(this.worldMatrix);
        return this;
    },

    updateFrustum: function () {
        if (!this.frustum) {
            this.frustum = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()];
        }

        var m = this.projectionViewMatrix.elements;
        this.frustum[0].set(m[3] - m[0], m[7] - m[4], m[11] - m[8]).constant = m[15] - m[12]; // -x
        this.frustum[1].set(m[3] + m[0], m[7] + m[4], m[11] + m[8]).constant = m[15] + m[12]; // +x
        this.frustum[2].set(m[3] + m[1], m[7] + m[5], m[11] + m[9]).constant = m[15] + m[13]; // +y
        this.frustum[3].set(m[3] - m[1], m[7] - m[5], m[11] - m[9]).constant = m[15] - m[13]; // -y
        this.frustum[4].set(m[3] - m[2], m[7] - m[6], m[11] - m[10]).constant = m[15] - m[14]; // +z (far)
        this.frustum[5].set(m[3] + m[2], m[7] + m[6], m[11] + m[10]).constant = m[15] + m[14]; // -z (near)

        for (var i = 0; i < 6; i++) {
            var invLen = 1.0 / this.frustum[i].length();
            this.frustum[i].multiplyScalar(invLen);
            this.frustum[i].constant *= invLen;
        }
    },

    frustumIntersectsMesh: function (node, worldMatrix = node.worldMatrix) {
        // If no position attribute, treat as frustumCulled false
        if (!node.geometry.attributes.position) return true;

        if (!node.geometry.bounds || node.geometry.bounds.radius === Infinity)
            node.geometry.computeBoundingSphere();

        if (!node.geometry.bounds) return true;

        var center = tempVec3a;
        center.copy(node.geometry.bounds.center);
        center.applyMatrix4(worldMatrix);

        var radius = node.geometry.bounds.radius * worldMatrix.getMaxScaleOnAxis();

        return this.frustumIntersectsSphere(center, radius);
    },

    frustumIntersectsSphere: function (center, radius) {
        var normal = tempVec3b;

        for (var i = 0; i < 6; i++) {
            var plane = this.frustum[i];
            var distance = normal.copy(plane).dot(center) + plane.constant;
            if (distance < -radius) return false;
        }
        return true;
    }
});

export { OrthographicCamera };
