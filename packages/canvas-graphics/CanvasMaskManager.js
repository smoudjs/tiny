var CanvasMaskManager = function () {};

CanvasMaskManager.prototype.constructor = CanvasMaskManager;

CanvasMaskManager.prototype.pushMask = function (maskData, renderSession) {
    var context = renderSession.context;

    context.save();

    var cacheAlpha = maskData.alpha;
    var transform = maskData.worldTransform;

    var resolution = renderSession.resolution;

    context.setTransform(
        transform.a * resolution,
        transform.b * resolution,
        transform.c * resolution,
        transform.d * resolution,
        transform.tx * resolution,
        transform.ty * resolution
    );

    Tiny.CanvasGraphics.renderGraphicsMask(maskData, context);

    context.clip();

    maskData.worldAlpha = cacheAlpha;
};

CanvasMaskManager.prototype.popMask = function (renderSession) {
    renderSession.context.restore();
};

export { CanvasMaskManager };
