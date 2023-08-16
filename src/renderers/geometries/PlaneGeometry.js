import { Geometry } from '../Geometry.js';

function PlaneGeometry(width, height, widthSegments, heightSegments) {
    width = width || 1;
    height = height || 1;

    const wSegs = widthSegments || 1;
    const hSegs = heightSegments || 1;

    // Determine length of arrays
    const num = (wSegs + 1) * (hSegs + 1);
    const numIndices = wSegs * hSegs * 6;

    // Generate empty arrays once
    const position = new Float32Array(num * 3);
    const normal = new Float32Array(num * 3);
    const uv = new Float32Array(num * 2);
    const index = numIndices > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);

    PlaneGeometry.buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);

    Geometry.call(this, {
        position: { size: 3, data: position },
        normal: { size: 3, data: normal },
        uv: { size: 2, data: uv },
        index: { data: index }
    });
}

PlaneGeometry.prototype = Object.create(Geometry.prototype);
PlaneGeometry.prototype.constructor = PlaneGeometry;

PlaneGeometry.buildPlane = function (
    position,
    normal,
    uv,
    index,
    width,
    height,
    depth,
    wSegs,
    hSegs,
    u,
    v,
    w,
    uDir,
    vDir,
    i,
    ii
) {
    u = u || 0;
    v = v !== undefined ? v : 1;
    w = w !== undefined ? w : 2;
    uDir = uDir !== undefined ? uDir : 1;
    vDir = vDir !== undefined ? vDir : -1;
    i = i || 0;
    ii = ii || 0;

    const io = i;
    const segW = width / wSegs;
    const segH = height / hSegs;

    for (let iy = 0; iy <= hSegs; iy++) {
        let y = iy * segH - height / 2;
        for (let ix = 0; ix <= wSegs; ix++, i++) {
            let x = ix * segW - width / 2;

            position[i * 3 + u] = x * uDir;
            position[i * 3 + v] = y * vDir;
            position[i * 3 + w] = depth / 2;

            normal[i * 3 + u] = 0;
            normal[i * 3 + v] = 0;
            normal[i * 3 + w] = depth >= 0 ? 1 : -1;

            uv[i * 2] = ix / wSegs;
            uv[i * 2 + 1] = 1 - iy / hSegs;

            if (iy === hSegs || ix === wSegs) continue;
            let a = io + ix + iy * (wSegs + 1);
            let b = io + ix + (iy + 1) * (wSegs + 1);
            let c = io + ix + (iy + 1) * (wSegs + 1) + 1;
            let d = io + ix + iy * (wSegs + 1) + 1;

            index[ii * 6] = a;
            index[ii * 6 + 1] = b;
            index[ii * 6 + 2] = d;
            index[ii * 6 + 3] = b;
            index[ii * 6 + 4] = c;
            index[ii * 6 + 5] = d;
            ii++;
        }
    }
};

export { PlaneGeometry };
