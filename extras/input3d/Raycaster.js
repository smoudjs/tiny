// TODO: barycentric code shouldn't be here, but where?
// TODO: SphereCast?

// var Vec2 = Tiny.Vec2;
// var Vec3 = Tiny.Vec3;
// var Mat4 = Tiny.Mat4;
//
// var tempVec2a = new Vec2();
// var tempVec2b = new Vec2();
// var tempVec2c = new Vec2();
//
// var tempVec3a = new Vec3();
// var tempVec3b = new Vec3();
// var tempVec3c = new Vec3();
// var tempVec3d = new Vec3();
// var tempVec3e = new Vec3();
// var tempVec3f = new Vec3();
// var tempVec3g = new Vec3();
// var tempVec3h = new Vec3();
// var tempVec3i = new Vec3();
// var tempVec3j = new Vec3();
// var tempVec3k = new Vec3();
//
// var tempMat4 = new Mat4();

export function Raycaster() {
    this.origin = new Tiny.Vec3();
    this.direction = new Tiny.Vec3();
}

Raycaster.prototype = {
    castMouse: function (camera, mouse) {
        if (camera.isOrthographicCamera) {
            // Set origin
            // Since camera is orthographic, origin is not the camera position
            var { left, right, bottom, top, zoom } = camera;
            var x = left / zoom + ((right - left) / zoom) * (mouse.x * 0.5 + 0.5);
            var y = bottom / zoom + ((top - bottom) / zoom) * (mouse.y * 0.5 + 0.5);

            this.origin.set(x, y, 0);
            this.origin.applyMatrix4(camera.worldMatrix);

            // Set direction
            // https://community.khronos.org/t/get-direction-from-transformation-matrix-or-quat/65502/2
            this.direction.x = -camera.worldMatrix.elements[8];
            this.direction.y = -camera.worldMatrix.elements[9];
            this.direction.z = -camera.worldMatrix.elements[10];
        } else {
            // Set origin
            camera.worldMatrix.getTranslation(this.origin);

            // Set direction
            this.direction.set(mouse.x, mouse.y, 0.5);
            camera.unproject(this.direction);
            this.direction.sub(this.origin).normalize();
        }
    },

    intersectBox: function (box, origin, direction) {
        origin = origin || this.origin;
        direction = direction || this.direction;

        var tmin, tmax, tYmin, tYmax, tZmin, tZmax;
        var invdirx = 1 / direction.x;
        var invdiry = 1 / direction.y;
        var invdirz = 1 / direction.z;
        var min = box.min;
        var max = box.max;
        tmin = ((invdirx >= 0 ? min.x : max.x) - origin.x) * invdirx;
        tmax = ((invdirx >= 0 ? max.x : min.x) - origin.x) * invdirx;
        tYmin = ((invdiry >= 0 ? min.y : max.y) - origin.y) * invdiry;
        tYmax = ((invdiry >= 0 ? max.y : min.y) - origin.y) * invdiry;
        if (tmin > tYmax || tYmin > tmax) return 0;
        if (tYmin > tmin) tmin = tYmin;
        if (tYmax < tmax) tmax = tYmax;
        tZmin = ((invdirz >= 0 ? min.z : max.z) - origin.z) * invdirz;
        tZmax = ((invdirz >= 0 ? max.z : min.z) - origin.z) * invdirz;
        if (tmin > tZmax || tZmin > tmax) return 0;
        if (tZmin > tmin) tmin = tZmin;
        if (tZmax < tmax) tmax = tZmax;
        if (tmax < 0) return 0;
        return tmin >= 0 ? tmin : tmax;
    }
}

// @TODO Horch check if any methods needed
// export class Raycaster {
//     varructor() {
//         this.origin = new Vec3();
//         this.direction = new Vec3();
//     }
//
//     // Set ray from mouse unprojection
//     castMouse(camera, mouse = [0, 0]) {
//         if (camera.isOrthographicCamera) {
//             // Set origin
//             // Since camera is orthographic, origin is not the camera position
//             var { left, right, bottom, top, zoom } = camera;
//             var x = left / zoom + ((right - left) / zoom) * (mouse[0] * 0.5 + 0.5);
//             var y = bottom / zoom + ((top - bottom) / zoom) * (mouse[1] * 0.5 + 0.5);
//             this.origin.set(x, y, 0);
//             this.origin.applyMatrix4(camera.worldMatrix);
//
//             // Set direction
//             // https://community.khronos.org/t/get-direction-from-transformation-matrix-or-quat/65502/2
//             this.direction.x = -camera.worldMatrix.elements[8];
//             this.direction.y = -camera.worldMatrix.elements[9];
//             this.direction.z = -camera.worldMatrix.elements[10];
//         } else {
//             // Set origin
//             camera.worldMatrix.getTranslation(this.origin);
//
//             // Set direction
//             this.direction.set(mouse[0], mouse[1], 0.5);
//             camera.unproject(this.direction);
//             this.direction.sub(this.origin).normalize();
//         }
//     }
//
//     // intersectBounds(meshes, { maxDistance, output = [] } = {}) {
//     //     if (!Array.isArray(meshes)) meshes = [meshes];
//     //
//     //     var invWorldMat4 = tempMat4;
//     //     var origin = tempVec3a;
//     //     var direction = tempVec3b;
//     //
//     //     var hits = output;
//     //     hits.length = 0;
//     //
//     //     meshes.forEach((mesh) => {
//     //         // Create bounds
//     //         if (!mesh.geometry.bounds || mesh.geometry.bounds.radius === Infinity) mesh.geometry.computeBoundingSphere();
//     //         var bounds = mesh.geometry.bounds;
//     //         invWorldMat4.inverse(mesh.worldMatrix);
//     //
//     //         // Get max distance locally
//     //         let localMaxDistance;
//     //         if (maxDistance) {
//     //             direction.copy(this.direction).scaleRotateMatrix4(invWorldMat4);
//     //             localMaxDistance = maxDistance * direction.len();
//     //         }
//     //
//     //         // Take world space ray and make it object space to align with bounding box
//     //         origin.copy(this.origin).applyMatrix4(invWorldMat4);
//     //         direction.copy(this.direction).transformDirection(invWorldMat4);
//     //
//     //         // Break out early if bounds too far away from origin
//     //         if (maxDistance) {
//     //             if (origin.distance(bounds.center) - bounds.radius > localMaxDistance) return;
//     //         }
//     //
//     //         let localDistance = 0;
//     //
//     //         // Check origin isn't inside bounds before testing intersection
//     //         if (mesh.geometry.raycast === 'sphere') {
//     //             if (origin.distance(bounds.center) > bounds.radius) {
//     //                 localDistance = this.intersectSphere(bounds, origin, direction);
//     //                 if (!localDistance) return;
//     //             }
//     //         } else {
//     //             if (
//     //                 origin.x < bounds.min.x ||
//     //                 origin.x > bounds.max.x ||
//     //                 origin.y < bounds.min.y ||
//     //                 origin.y > bounds.max.y ||
//     //                 origin.z < bounds.min.z ||
//     //                 origin.z > bounds.max.z
//     //             ) {
//     //                 localDistance = this.intersectBox(bounds, origin, direction);
//     //                 if (!localDistance) return;
//     //             }
//     //         }
//     //
//     //         if (maxDistance && localDistance > localMaxDistance) return;
//     //
//     //         // Create object on mesh to avoid generating lots of objects
//     //         if (!mesh.hit) mesh.hit = { localPoint: new Vec3(), point: new Vec3() };
//     //
//     //         mesh.hit.localPoint.copy(direction).multiply(localDistance).add(origin);
//     //         mesh.hit.point.copy(mesh.hit.localPoint).applyMatrix4(mesh.worldMatrix);
//     //         mesh.hit.distance = mesh.hit.point.distance(this.origin);
//     //
//     //         hits.push(mesh);
//     //     });
//     //
//     //     hits.sort((a, b) => a.hit.distance - b.hit.distance);
//     //     return hits;
//     // }
//     //
//     // intersectMeshes(meshes, { cullFace = true, maxDistance, includeUV = true, includeNormal = true, output = [] } = {}) {
//     //     // Test bounds first before testing geometry
//     //     var hits = this.intersectBounds(meshes, { maxDistance, output });
//     //     if (!hits.length) return hits;
//     //
//     //     var invWorldMat4 = tempMat4;
//     //     var origin = tempVec3a;
//     //     var direction = tempVec3b;
//     //     var a = tempVec3c;
//     //     var b = tempVec3d;
//     //     var c = tempVec3e;
//     //     var closestFaceNormal = tempVec3f;
//     //     var faceNormal = tempVec3g;
//     //     var barycoord = tempVec3h;
//     //     var uvA = tempVec2a;
//     //     var uvB = tempVec2b;
//     //     var uvC = tempVec2c;
//     //
//     //     for (let i = hits.length - 1; i >= 0; i--) {
//     //         var mesh = hits[i];
//     //         invWorldMat4.inverse(mesh.worldMatrix);
//     //
//     //         // Get max distance locally
//     //         let localMaxDistance;
//     //         if (maxDistance) {
//     //             direction.copy(this.direction).scaleRotateMatrix4(invWorldMat4);
//     //             localMaxDistance = maxDistance * direction.len();
//     //         }
//     //
//     //         // Take world space ray and make it object space to align with bounding box
//     //         origin.copy(this.origin).applyMatrix4(invWorldMat4);
//     //         direction.copy(this.direction).transformDirection(invWorldMat4);
//     //
//     //         let localDistance = 0;
//     //         let closestA, closestB, closestC;
//     //
//     //         var geometry = mesh.geometry;
//     //         var attributes = geometry.attributes;
//     //         var index = attributes.index;
//     //         var position = attributes.position;
//     //
//     //         var start = Math.max(0, geometry.drawRange.start);
//     //         var end = Math.min(index ? index.count : position.count, geometry.drawRange.start + geometry.drawRange.count);
//     //         // Data loaded shouldn't haave stride, only buffers
//     //         // var stride = position.stride ? position.stride / position.data.BYTES_PER_ELEMENT : position.size;
//     //         var stride = position.size;
//     //
//     //         for (let j = start; j < end; j += 3) {
//     //             // Position attribute indices for each triangle
//     //             var ai = index ? index.data[j] : j;
//     //             var bi = index ? index.data[j + 1] : j + 1;
//     //             var ci = index ? index.data[j + 2] : j + 2;
//     //
//     //             a.fromArray(position.data, ai * stride);
//     //             b.fromArray(position.data, bi * stride);
//     //             c.fromArray(position.data, ci * stride);
//     //
//     //             var distance = this.intersectTriangle(a, b, c, cullFace, origin, direction, faceNormal);
//     //             if (!distance) continue;
//     //
//     //             // Too far away
//     //             if (maxDistance && distance > localMaxDistance) continue;
//     //
//     //             if (!localDistance || distance < localDistance) {
//     //                 localDistance = distance;
//     //                 closestA = ai;
//     //                 closestB = bi;
//     //                 closestC = ci;
//     //                 closestFaceNormal.copy(faceNormal);
//     //             }
//     //         }
//     //
//     //         if (!localDistance) hits.splice(i, 1);
//     //
//     //         // Update hit values from bounds-test
//     //         mesh.hit.localPoint.copy(direction).multiply(localDistance).add(origin);
//     //         mesh.hit.point.copy(mesh.hit.localPoint).applyMatrix4(mesh.worldMatrix);
//     //         mesh.hit.distance = mesh.hit.point.distance(this.origin);
//     //
//     //         // Add unique hit objects on mesh to avoid generating lots of objects
//     //         if (!mesh.hit.faceNormal) {
//     //             mesh.hit.localFaceNormal = new Vec3();
//     //             mesh.hit.faceNormal = new Vec3();
//     //             mesh.hit.uv = new Vec2();
//     //             mesh.hit.localNormal = new Vec3();
//     //             mesh.hit.normal = new Vec3();
//     //         }
//     //
//     //         // Add face normal data which is already computed
//     //         mesh.hit.localFaceNormal.copy(closestFaceNormal);
//     //         mesh.hit.faceNormal.copy(mesh.hit.localFaceNormal).transformDirection(mesh.worldMatrix);
//     //
//     //         // Optional data, opt out to optimise a bit if necessary
//     //         if (includeUV || includeNormal) {
//     //             // Calculate barycoords to find uv values at hit point
//     //             a.fromArray(position.data, closestA * 3);
//     //             b.fromArray(position.data, closestB * 3);
//     //             c.fromArray(position.data, closestC * 3);
//     //             this.getBarycoord(mesh.hit.localPoint, a, b, c, barycoord);
//     //         }
//     //
//     //         if (includeUV && attributes.uv) {
//     //             uvA.fromArray(attributes.uv.data, closestA * 2);
//     //             uvB.fromArray(attributes.uv.data, closestB * 2);
//     //             uvC.fromArray(attributes.uv.data, closestC * 2);
//     //             mesh.hit.uv.set(
//     //                 uvA.x * barycoord.x + uvB.x * barycoord.y + uvC.x * barycoord.z,
//     //                 uvA.y * barycoord.x + uvB.y * barycoord.y + uvC.y * barycoord.z
//     //             );
//     //         }
//     //
//     //         if (includeNormal && attributes.normal) {
//     //             a.fromArray(attributes.normal.data, closestA * 3);
//     //             b.fromArray(attributes.normal.data, closestB * 3);
//     //             c.fromArray(attributes.normal.data, closestC * 3);
//     //             mesh.hit.localNormal.set(
//     //                 a.x * barycoord.x + b.x * barycoord.y + c.x * barycoord.z,
//     //                 a.y * barycoord.x + b.y * barycoord.y + c.y * barycoord.z,
//     //                 a.z * barycoord.x + b.z * barycoord.y + c.z * barycoord.z
//     //             );
//     //
//     //             mesh.hit.normal.copy(mesh.hit.localNormal).transformDirection(mesh.worldMatrix);
//     //         }
//     //     }
//     //
//     //     hits.sort((a, b) => a.hit.distance - b.hit.distance);
//     //     return hits;
//     // }
//     //
//     // intersectPlane(plane, origin = this.origin, direction = this.direction) {
//     //     var xminp = tempVec3a;
//     //     xminp.sub(plane.origin, origin);
//     //
//     //     var a = xminp.dot(plane.normal);
//     //     var b = direction.dot(plane.normal);
//     //     // Assuming we don't want to count a ray parallel to the plane as intersecting
//     //     if (b == 0) return 0;
//     //     var delta = a / b;
//     //     if (delta <= 0) return 0;
//     //     return origin.add(direction.scale(delta));
//     // }
//     //
//     // intersectSphere(sphere, origin = this.origin, direction = this.direction) {
//     //     var ray = tempVec3c;
//     //     ray.sub(sphere.center, origin);
//     //     var tca = ray.dot(direction);
//     //     var d2 = ray.dot(ray) - tca * tca;
//     //     var radius2 = sphere.radius * sphere.radius;
//     //     if (d2 > radius2) return 0;
//     //     var thc = Math.sqrt(radius2 - d2);
//     //     var t0 = tca - thc;
//     //     var t1 = tca + thc;
//     //     if (t0 < 0 && t1 < 0) return 0;
//     //     if (t0 < 0) return t1;
//     //     return t0;
//     // }
//
//     // Ray AABB - Ray Axis aligned bounding box testing
//     intersectBox(box, origin = this.origin, direction = this.direction) {
//         let tmin, tmax, tYmin, tYmax, tZmin, tZmax;
//         var invdirx = 1 / direction.x;
//         var invdiry = 1 / direction.y;
//         var invdirz = 1 / direction.z;
//         var min = box.min;
//         var max = box.max;
//         tmin = ((invdirx >= 0 ? min.x : max.x) - origin.x) * invdirx;
//         tmax = ((invdirx >= 0 ? max.x : min.x) - origin.x) * invdirx;
//         tYmin = ((invdiry >= 0 ? min.y : max.y) - origin.y) * invdiry;
//         tYmax = ((invdiry >= 0 ? max.y : min.y) - origin.y) * invdiry;
//         if (tmin > tYmax || tYmin > tmax) return 0;
//         if (tYmin > tmin) tmin = tYmin;
//         if (tYmax < tmax) tmax = tYmax;
//         tZmin = ((invdirz >= 0 ? min.z : max.z) - origin.z) * invdirz;
//         tZmax = ((invdirz >= 0 ? max.z : min.z) - origin.z) * invdirz;
//         if (tmin > tZmax || tZmin > tmax) return 0;
//         if (tZmin > tmin) tmin = tZmin;
//         if (tZmax < tmax) tmax = tZmax;
//         if (tmax < 0) return 0;
//         return tmin >= 0 ? tmin : tmax;
//     }
//
//     // intersectTriangle(a, b, c, backfaceCulling = true, origin = this.origin, direction = this.direction, normal = tempVec3g) {
//     //     // from https://github.com/mrdoob/three.js/blob/master/src/math/Ray.js
//     //     // which is from http://www.geometrictools.com/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h
//     //     var edge1 = tempVec3h;
//     //     var edge2 = tempVec3i;
//     //     var diff = tempVec3j;
//     //     edge1.sub(b, a);
//     //     edge2.sub(c, a);
//     //     normal.cross(edge1, edge2);
//     //     let DdN = direction.dot(normal);
//     //     if (!DdN) return 0;
//     //     let sign;
//     //     if (DdN > 0) {
//     //         if (backfaceCulling) return 0;
//     //         sign = 1;
//     //     } else {
//     //         sign = -1;
//     //         DdN = -DdN;
//     //     }
//     //     diff.sub(origin, a);
//     //     let DdQxE2 = sign * direction.dot(edge2.cross(diff, edge2));
//     //     if (DdQxE2 < 0) return 0;
//     //     let DdE1xQ = sign * direction.dot(edge1.cross(diff));
//     //     if (DdE1xQ < 0) return 0;
//     //     if (DdQxE2 + DdE1xQ > DdN) return 0;
//     //     let QdN = -sign * diff.dot(normal);
//     //     if (QdN < 0) return 0;
//     //     return QdN / DdN;
//     // }
//     //
//     // getBarycoord(point, a, b, c, target = tempVec3h) {
//     //     // From https://github.com/mrdoob/three.js/blob/master/src/math/Triangle.js
//     //     // static/instance method to calculate barycentric coordinates
//     //     // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
//     //     var v0 = tempVec3i;
//     //     var v1 = tempVec3j;
//     //     var v2 = tempVec3k;
//     //     v0.sub(c, a);
//     //     v1.sub(b, a);
//     //     v2.sub(point, a);
//     //     var dot00 = v0.dot(v0);
//     //     var dot01 = v0.dot(v1);
//     //     var dot02 = v0.dot(v2);
//     //     var dot11 = v1.dot(v1);
//     //     var dot12 = v1.dot(v2);
//     //     var denom = dot00 * dot11 - dot01 * dot01;
//     //     if (denom === 0) return target.set(-2, -1, -1);
//     //     var invDenom = 1 / denom;
//     //     var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
//     //     var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
//     //     return target.set(1 - u - v, v, u);
//     // }
// }