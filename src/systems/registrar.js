var systems = [];

function registerSystem(name, system) {
    systems.push({
        name: name,
        _class_: system
    });
};

export { registerSystem, systems }