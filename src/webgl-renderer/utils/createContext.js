// const contextNames = ['webgl2', 'webgl', 'experimental-webgl'];

function getContext(canvas, contextNames, contextAttributes) {
    for (let i = 0; i < contextNames.length; i++) {
        const contextName = contextNames[i];
        const context = canvas.getContext(contextName, contextAttributes);
        if (context !== null) return context;
    }

    return null;
}

export function createContext(canvas, contextAttributes, forceWebGL1) {
    const contextNames = ['webgl2', 'webgl', 'experimental-webgl'];

    if (forceWebGL1) contextNames.shift();

    let _gl = getContext(canvas, contextNames, contextAttributes);

    if (_gl === null) {
        if (getContext(canvas, contextNames)) {
            throw new Error('Error creating WebGL context with your selected attributes.');
        } else {
            throw new Error('Error creating WebGL context.');
        }
    }

    return _gl;
}
