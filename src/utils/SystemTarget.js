/**
 * Mixins functionality to make an object have "systems".
 *
 * @example
 *      function MyObject() {}
 *
 *      SystemTarget.mixin(MyObject);
 *
 * @mixin
 * @memberof Tiny.utils
 */
const SystemTarget = {
    /**
     * Mixes in the properties of the SystemTarget into another object
     *
     * @param {object} obj - The obj to mix into
     */
    mixin: function mixin(obj) {
        obj._systems = {};

        /**
         * Adds a system to an object
         *
         * @param {Function} ctor - The constructor function for the system.
         */
        obj.registerSystem = function registerSystem(ctor) {
            if (!ctor.system) throw new Error('.system is not defined for ' + ctor.name);
            if (!ctor.system.name) throw new Error('.system.name is not defined for ' + ctor.name);
            obj._systems[ctor.system.name] = ctor;
        };

        /**
         * Instantiates all the systems of this object
         *
         */
        obj.prototype.initSystems = function initSystems() {
            this.systems = this.systems || {};

            for (const systemName in obj._systems) {
                const ctor = obj._systems[systemName];
                let system = (this.systems[systemName] = new ctor(this));
                if (ctor.system.rooted) this[systemName] = system;
                if (ctor.system.states) {
                    for (let i = 0; i < ctor.system.states.length; i++) {
                        const state = ctor.systems.states[i];
                        this[state].push(system);
                    }
                }
            }
        };

        /**
         * Removes all the systems of this object
         *
         */
        obj.prototype.disposeSystems = function disposeSystems() {
            for (const systemName in this.systems) {
                this.systems[systemName].dispose();
                this.systems[systemName] = null;
            }

            this.systems = null;
        };
    }
};

export { SystemTarget };
