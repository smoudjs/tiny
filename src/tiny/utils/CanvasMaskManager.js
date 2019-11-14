
Tiny.CanvasMaskManager = function()
{
};

Tiny.CanvasMaskManager.prototype.constructor = Tiny.CanvasMaskManager;

Tiny.CanvasMaskManager.prototype.pushMask = function(maskData, renderSession)
{
	var context = renderSession.context;

    context.save();
    
    var cacheAlpha = maskData.alpha;
    var transform = maskData.worldTransform;

    var resolution = renderSession.resolution;

    context.setTransform(transform.a * resolution,
                         transform.b * resolution,
                         transform.c * resolution,
                         transform.d * resolution,
                         transform.tx * resolution,
                         transform.ty * resolution);

    Tiny.CanvasGraphics.renderGraphicsMask(maskData, context);

    context.clip();

    maskData.worldAlpha = cacheAlpha;
};

Tiny.CanvasMaskManager.prototype.popMask = function(renderSession)
{
    renderSession.context.restore();
};