export function flipGeometryNormalsIndexed(geometry) {
    var index = geometry.attributes.index.data;

    for (var i = 0, il = index.length / 3; i < il; i++) {
        var x = index[i * 3]
        index[i * 3] = index[i * 3 + 2]
        index[i * 3 + 2] = x
    }

    geometry.attributes.index.needsUpdate = true
}