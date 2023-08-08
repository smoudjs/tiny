import { Geometry } from '../../core/Geometry.js';
import { PlaneGeometry } from './PlaneGeometry.js';

export class BoxGeometry extends Geometry {
    constructor(width = 1, height = 1, depth = 1, widthSegments = 1, heightSegments = 1, depthSegments = 1) {
        const wSegs = widthSegments;
        const hSegs = heightSegments;
        const dSegs = depthSegments;

        const num = (wSegs + 1) * (hSegs + 1) * 2 + (wSegs + 1) * (dSegs + 1) * 2 + (hSegs + 1) * (dSegs + 1) * 2;
        const numIndices = (wSegs * hSegs * 2 + wSegs * dSegs * 2 + hSegs * dSegs * 2) * 6;

        const position = new Float32Array(num * 3);
        const normal = new Float32Array(num * 3);
        const uv = new Float32Array(num * 2);
        const index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);

        let i = 0;
        let ii = 0;

        // left, right
        PlaneGeometry.buildPlane(position, normal, uv, index, depth, height, width, dSegs, hSegs, 2, 1, 0, -1, -1, i, ii);
        i += (dSegs + 1) * (hSegs + 1);
        ii += dSegs * hSegs;

        PlaneGeometry.buildPlane(position, normal, uv, index, depth, height, -width, dSegs, hSegs, 2, 1, 0, 1, -1, i, ii);
        i += (dSegs + 1) * (hSegs + 1);
        ii += dSegs * hSegs;

        // top, bottom
        PlaneGeometry.buildPlane(position, normal, uv, index, width, depth, height, dSegs, wSegs, 0, 2, 1, 1, 1, i, ii);
        i += (wSegs + 1) * (dSegs + 1);
        ii += wSegs * dSegs;

        PlaneGeometry.buildPlane(position, normal, uv, index, width, depth, -height, dSegs, wSegs, 0, 2, 1, 1, -1, i, ii);
        i += (wSegs + 1) * (dSegs + 1);
        ii += wSegs * dSegs;

        // front, back
        PlaneGeometry.buildPlane(position, normal, uv, index, width, height, -depth, wSegs, hSegs, 0, 1, 2, -1, -1, i, ii);
        i += (wSegs + 1) * (hSegs + 1);
        ii += wSegs * hSegs;

        PlaneGeometry.buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs, 0, 1, 2, 1, -1, i, ii);

        super({
            position: { size: 3, data: position },
            normal: { size: 3, data: normal },
            uv: { size: 2, data: uv },
            index: { data: index },
        });
    }
}

Tiny.BoxGeometry = BoxGeometry;