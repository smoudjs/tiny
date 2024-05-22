var ParticlesManager = function (game) {
    this.game = game;

    this.list = [];
};

ParticlesManager.prototype = {
    add: function (emitter) {
        emitter.system = this;

        this.list.push(emitter);

        return emitter;
    },

    remove: function (emitter) {
        var indexOf = this.list.indexOf(emitter);

        if (indexOf > -1) {
            var emitter = this.list.splice(indexOf, 1);
            emitter.system = null;
            return emitter;
        }
    },

    update: function (delta) {
        var i = this.list.length;

        while (i--) {
            this.list[i].update(delta);
        }
    },

    destroy: function () {
        this.list.length = 0;
    }
};

ParticlesManager.prototype.constructor = ParticlesManager;

Tiny.registerSystem('particles', ParticlesManager);

export { ParticlesManager };
