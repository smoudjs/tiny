import { Geometry } from '../Geometry.js';
import { PlaneGeometry } from './PlaneGeometry.js';

function BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments) {
    width = width || 1;
    height = height || 1;
    depth = depth || 1;

    const wSegs = widthSegments || 1;
    const hSegs = heightSegments || 1;
    const dSegs = depthSegments || 1;

    const num = (wSegs + 1) * (hSegs + 1) * 2 + (wSegs + 1) * (dSegs + 1) * 2 + (hSegs + 1) * (dSegs + 1) * 2;
    const numIndices = (wSegs * hSegs * 2 + wSegs * dSegs * 2 + hSegs * dSegs * 2) * 6;

    const position = new Float32Array(num * 3);
    const normal = new Float32Array(num * 3);
    const uv = new Float32Array(num * 2);
    const index = num > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);

    let i = 0;
    let ii = 0;

    // use later for non indexes implementation
    // position.set([
    //     // Передняя грань
    //     -0.5, -0.5, -0.5,
    //     0.5, -0.5, -0.5,
    //     -0.5, -0.5, 0.5,
    //
    //     0.5, -0.5, 0.5,
    //     -0.5, -0.5, 0.5,
    //     0.5, -0.5, -0.5,
    //
    //     // Задняя грань
    //     -0.5, 0.5, -0.5,
    //     -0.5, 0.5, 0.5,
    //     0.5, 0.5, -0.5,
    //
    //     0.5, 0.5, 0.5,
    //     0.5, 0.5, -0.5,
    //     -0.5, 0.5, 0.5,
    //
    //     // Нижняя грань
    //     -0.5, -0.5, -0.5,
    //     -0.5, 0.5, -0.5,
    //     0.5, -0.5, -0.5,
    //
    //     0.5, 0.5, -0.5,
    //     0.5, -0.5, -0.5,
    //     -0.5, 0.5, -0.5,
    //
    //     // Верхняя грань
    //     -0.5, -0.5, 0.5,
    //     0.5, -0.5, 0.5,
    //     -0.5, 0.5, 0.5,
    //
    //     0.5, 0.5, 0.5,
    //     -0.5, 0.5, 0.5,
    //     0.5, -0.5, 0.5,
    //
    //     // Левая грань
    //     -0.5, -0.5, -0.5,
    //     -0.5, -0.5, 0.5,
    //     -0.5, 0.5, -0.5,
    //
    //     -0.5, 0.5, 0.5,
    //     -0.5, 0.5, -0.5,
    //     -0.5, -0.5, 0.5,
    //
    //     // Правая грань
    //     0.5, -0.5, -0.5,
    //     0.5, 0.5, -0.5,
    //     0.5, -0.5, 0.5,
    //
    //     0.5, 0.5, 0.5,
    //     0.5, -0.5, 0.5,
    //     0.5, 0.5, -0.5
    // ]);
    //
    // normal.set([
    //     // Bottom
    //     0.0, -1.0, 0.0,
    //     0.0, -1.0, 0.0,
    //     0.0, -1.0, 0.0,
    //
    //     0.0, -1.0, 0.0,
    //     0.0, -1.0, 0.0,
    //     0.0, -1.0, 0.0,
    //
    //     // Top
    //     0.0, 1.0, 0.0,
    //     0.0, 1.0, 0.0,
    //     0.0, 1.0, 0.0,
    //
    //     0.0, 1.0, 0.0,
    //     0.0, 1.0, 0.0,
    //     0.0, 1.0, 0.0,
    //
    //     // Back
    //     0.0, 0.0, -1.0,
    //     0.0, 0.0, -1.0,
    //     0.0, 0.0, -1.0,
    //
    //     0.0, 0.0, -1.0,
    //     0.0, 0.0, -1.0,
    //     0.0, 0.0, -1.0,
    //
    //     // Front
    //     0.0, 0.0, 1.0,
    //     0.0, 0.0, 1.0,
    //     0.0, 0.0, 1.0,
    //
    //     0.0, 0.0, 1.0,
    //     0.0, 0.0, 1.0,
    //     0.0, 0.0, 1.0,
    //
    //     // Left
    //     -1.0, 0.0, 0.0,
    //     -1.0, 0.0, 0.0,
    //     -1.0, 0.0, 0.0,
    //
    //     -1.0, 0.0, 0.0,
    //     -1.0, 0.0, 0.0,
    //     -1.0, 0.0, 0.0,
    //
    //     // Right
    //     1.0, 0.0, 0.0,
    //     1.0, 0.0, 0.0,
    //     1.0, 0.0, 0.0,
    //
    //     1.0, 0.0, 0.0,
    //     1.0, 0.0, 0.0,
    //     1.0, 0.0, 0.0,
    // ]);

    // left, right
    PlaneGeometry.buildPlane(
        position,
        normal,
        uv,
        index,
        depth,
        height,
        width,
        dSegs,
        hSegs,
        2,
        1,
        0,
        -1,
        -1,
        i,
        ii
    );
    i += (dSegs + 1) * (hSegs + 1);
    ii += dSegs * hSegs;

    PlaneGeometry.buildPlane(
        position,
        normal,
        uv,
        index,
        depth,
        height,
        -width,
        dSegs,
        hSegs,
        2,
        1,
        0,
        1,
        -1,
        i,
        ii
    );
    i += (dSegs + 1) * (hSegs + 1);
    ii += dSegs * hSegs;

    // top, bottom
    PlaneGeometry.buildPlane(
        position,
        normal,
        uv,
        index,
        width,
        depth,
        height,
        dSegs,
        wSegs,
        0,
        2,
        1,
        1,
        1,
        i,
        ii
    );
    i += (wSegs + 1) * (dSegs + 1);
    ii += wSegs * dSegs;

    PlaneGeometry.buildPlane(
        position,
        normal,
        uv,
        index,
        width,
        depth,
        -height,
        dSegs,
        wSegs,
        0,
        2,
        1,
        1,
        -1,
        i,
        ii
    );
    i += (wSegs + 1) * (dSegs + 1);
    ii += wSegs * dSegs;

    // front, back
    PlaneGeometry.buildPlane(
        position,
        normal,
        uv,
        index,
        width,
        height,
        -depth,
        wSegs,
        hSegs,
        0,
        1,
        2,
        -1,
        -1,
        i,
        ii
    );
    i += (wSegs + 1) * (hSegs + 1);
    ii += wSegs * hSegs;

    PlaneGeometry.buildPlane(
        position,
        normal,
        uv,
        index,
        width,
        height,
        depth,
        wSegs,
        hSegs,
        0,
        1,
        2,
        1,
        -1,
        i,
        ii
    );

    Geometry.call(this, {
        position: { size: 3, data: position },
        normal: { size: 3, data: normal },
        uv: { size: 2, data: uv },
        index: { data: index }
    });
}

BoxGeometry.prototype = Object.create(Geometry.prototype);
BoxGeometry.prototype.constructor = BoxGeometry;

export { BoxGeometry };
