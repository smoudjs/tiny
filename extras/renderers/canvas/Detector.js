function autoDetectRenderer(width, height, options) {
    var webgl = (function () {
        try {
            var canvas = document.createElement('canvas');
            return (
                !!window.WebGLRenderingContext &&
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
            );
        } catch (e) {
            return false;
        }
    })();

    if (webgl) {
        return new Tiny.WebGLRenderer(width, height, options);
    }

    return new Tiny.CanvasRenderer(width, height, options);
}

export { autoDetectRenderer };
