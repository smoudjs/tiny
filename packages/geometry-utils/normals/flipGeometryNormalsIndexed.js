export function flipGeometryNormalsIndexed(geometry) {
    var index = geometry.index.array;

    for (var i = 0, il = index.length / 3; i < il; i++) {
        var x = index[i * 3]
        index[i * 3] = index[i * 3 + 2]
        index[i * 3 + 2] = x
    }

    geometry.index.needsUpdate = true
}