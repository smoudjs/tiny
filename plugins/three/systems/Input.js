
var THREE = require('three'),
    Vector3 = THREE.Vector3,
    Box3 = THREE.Box3,
    Raycaster = THREE.Raycaster;

const tempBox = new Box3(),
    hitBox = new Vector3(1, 1, 1),
    temp = new Vector3();

var ThreeInputSystem = {

    init: function() {
        this.raycaster = new Raycaster();
    },

    preHandle: function(x, y) {
        if (!this.game.camera) return;
        temp.set((x / this.game.width) * 2 - 1, -(y / this.game.height) * 2 + 1, 0);
        this.raycaster.setFromCamera(temp, this.game.camera);
    }
}

Tiny.Input.systems.push(ThreeInputSystem);

Tiny.Input.checkBounds3D = function(obj, x, y) {

    if (obj.input.hitBox) 
    {
        hitBox.copy(obj.input.hitBox);
    } 
    else 
    {
        obj.getWorldScale(hitBox);
    }

    tempBox.setFromCenterAndSize(obj.position, hitBox);

    if (this.raycaster.ray.intersectsBox(tempBox)) 
    {
        return true;
    }
}

Tiny.Input.prototype.add3d = function(object, options) {

    options = options || {};
    options.checkBounds = Tiny.Input.checkBounds3D;

    this.add(object, options);
}