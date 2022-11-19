Tiny.Particles = function (game) {

    this.game = game;

    this.list = [];

};

Tiny.Particles.prototype = {

    add: function (emitter) {

        emitter.system = this;

        this.list.push(emitter);

        return emitter;

    },

    remove: function (emitter) {
    	var indexOf = this.list.indexOf(emitter)

        if (indexOf > -1) {
            var emitter = this.list.splice(indexOf, 1);
            emitter.system = null;
            return emitter;
        }

    },


    update: function ( delta ) {

    	var i = this.list.length;

	    while (i--)
	    {
	        this.list[i].update( delta );
	    }
    },

    destroy: function() {
        this.list.length = 0;
    }

};

Tiny.Particles.prototype.constructor = Tiny.Particles;

require('./Particle');
require('./Emitter');

Tiny.registerSystem("particles", Tiny.Particles);