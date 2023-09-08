import {Vec3} from "../../src/math/Vec3";
import {Raycaster} from "./Raycaster";

var tempBox = {
        min: new Vec3(),
        max: new Vec3(),
    },
    hitBox = new Tiny.Vec3(1, 1, 1),
    temp = new Tiny.Vec3();

var InputSystem3D = {
    init: function () {
        this.raycaster = new Raycaster();
    },

    preHandle: function (x, y) {
        if (!this.game.camera) return;
        temp.set((x / this.game.width) * 2 - 1, -(y / this.game.height) * 2 + 1, 0);
        this.raycaster.castMouse(this.game.camera, temp);
    }
};

Tiny.Input.systems.push(InputSystem3D);

Tiny.Input.checkBounds3D = function (obj) {
    if (obj.input.hitBox) {
        hitBox.copy(obj.input.hitBox);
    } else {
        obj.getWorldScale(hitBox);
    }

    var halfSize = temp.copy( hitBox ).multiplyScalar( 0.5 );

    tempBox.min.copy( obj.position ).sub( halfSize );
    tempBox.max.copy( obj.position ).add( halfSize );

    if (this.raycaster.intersectBox(tempBox)) {
        return true;
    }
};

Tiny.Input.prototype.add3d = function (object, options) {
    options = options || {};
    options.checkBounds = Tiny.Input.checkBounds3D;

    this.add(object, options);
};
