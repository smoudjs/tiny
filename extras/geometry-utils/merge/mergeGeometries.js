/**
 * @param  {Array<Tiny.Geometry>} geometries
 * @return {Tiny.Geometry}
 */
export function mergeGeometries(geometries) {
    var isIndexed = geometries[0].index !== null;

    var attributesUsed = Object.keys(geometries[0].attributes);

    var attributes = {};

    var mergedGeometry = new Tiny.Geometry();

    for (var i = 0; i < geometries.length; ++i) {
        // @TODO remove this fix later, make merge don't require clone of geometry
        if (geometries[i].gl) {
            geometries[i] = geometries[i].clone();
        }

        var geometry = geometries[i];

        var attributesCount = 0;

        // ensure that all geometries are indexed, or none

        if (isIndexed !== (geometry.index !== null)) {
            console.error('Tiny.GeometryUtils.mergeGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.');
            return null;
        }

        // gather attributes, exit early if they're different

        for (var name in geometry.attributes) {

            if (attributesUsed.indexOf(name) === -1) {

                console.error('Tiny.GeometryUtils.mergeGeometries() failed with geometry at index ' + i + '. All geometries must have compatible attributes; make sure "' + name + '" attribute exists among all geometries, or in none of them.');
                return null;

            }

            if (attributes[name] === undefined) attributes[name] = [];

            attributes[name].push(geometry.attributes[name].clone());

            attributesCount++;

        }

        // ensure geometries have the same number of attributes
        if (attributesCount !== attributesUsed.length) {
            console.error('Tiny.GeometryUtils.mergeGeometries() failed with geometry at index ' + i + '. Make sure all geometries have the same number of attributes.');
            return null;
        }
    }

    // merge indices

    if (isIndexed) {
        var indexOffset = 0;
        var mergedIndex = [];

        for (var i = 0; i < geometries.length; ++i) {

            var index = geometries[i].index;

            for (var j = 0; j < index.count; ++j) {

                mergedIndex.push(index.getX(j) + indexOffset);

            }

            indexOffset += geometries[i].attributes.position.count;

        }

        mergedGeometry.setIndex(mergedIndex);
    }

    // merge attributes

    for (var name in attributes) {
        var mergedAttribute = mergeAttributes(attributes[name]);

        if (!mergedAttribute) {
            console.error('Tiny.GeometryUtils.mergeGeometries() failed while trying to merge the ' + name + ' attribute.');
            return null;

        }

        mergedGeometry.attributes[name] = mergedAttribute;

        mergedAttribute.count = null;
    }

    return mergedGeometry;
}

/**
 * @param {Array<Tiny.Attribute>} attributes
 * @return {Tiny.Attribute}
 */
function mergeAttributes( attributes ) {
    var TypedArray;
    var size;
    var normalized;
    var arrayLength = 0;

    for ( var i = 0; i < attributes.length; ++ i ) {

        var attribute = attributes[ i ];

        if ( TypedArray === undefined ) TypedArray = attribute.array.constructor;
        if ( TypedArray !== attribute.array.constructor ) {

            console.error( 'Tiny.GeometryUtils.mergeGeometries() failed. Attribute.array must be of consistent array types across matching attributes.' );
            return null;

        }

        if ( size === undefined ) size = attribute.itemSize;
        if ( size !== attribute.itemSize ) {

            console.error( 'Tiny.GeometryUtils.mergeGeometries() failed. Attribute.itemSize must be consistent across matching attributes.' );
            return null;

        }

        if ( normalized === undefined ) normalized = attribute.normalized;
        if ( normalized !== attribute.normalized ) {

            console.error( 'Tiny.GeometryUtils.mergeGeometries() failed. BufferAttribute.normalized must be consistent across matching attributes.' );
            return null;

        }

        arrayLength += attribute.array.length;
    }

    var array = new TypedArray( arrayLength );
    var offset = 0;

    for ( var i = 0; i < attributes.length; ++ i ) {
        array.set( attributes[ i ].array, offset );

        offset += attributes[ i ].array.length;
    }

    var result = attributes[0].clone();

    Object.assign(result, {
        array,
        itemSize: size,
        normalized
    });

    return result;
}