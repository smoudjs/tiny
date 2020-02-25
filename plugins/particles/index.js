Tiny.Particles = function (game) {

    this.game = game;

    this.emitters = [];

};

Tiny.Particles.prototype = {

    add: function (emitter) {

        this.emitters.push(emitter);

        return emitter;

    },

    remove: function (emitter) {
    	var indexOf = this.emitters.indexOf(emitter)

        if (indexOf > -1) {
            return this.emitters.splice(indexOf, 1)
        }

    },


    update: function ( time, delta ) {

    	var i = this.emitters.length;

	    while (i--)
	    {
	        this.emitters[i].update( time, delta );
	    }
    }

};

Tiny.Particles.prototype.constructor = Tiny.Particles;

require('./Particle');
require('./Emitter');