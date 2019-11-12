
Tiny.CanvasRenderer = function(width, height, options)
{   
    options = options || {}

    this.resolution = (options.resolution != undefined ? options.resolution : 1);

    this.clearBeforeRender = (options.clearBeforeRender != undefined ? options.clearBeforeRender : true);

    this.transparent = (options.transparent != undefined ? options.transparent : false);

    this.autoResize = options.autoResize || false;

    this.width = width || 800;

    this.height = height || 600;

    this.width *= this.resolution;
    this.height *= this.resolution;

    this.view = options.view || document.createElement( "canvas" );

    this.context = this.view.getContext( "2d", { alpha: this.transparent } );

    this.refresh = true;

    this.view.width = this.width * this.resolution;
    this.view.height = this.height * this.resolution;

    this.count = 0;

    if (Tiny.CanvasMaskManager)
        this.maskManager = new Tiny.CanvasMaskManager();

    this.renderSession = {
        context: this.context,
        maskManager: this.maskManager,
        scaleMode: 0,
        smoothProperty: null,
        /**
         * If true Pixi will Math.floor() x/y values when rendering, stopping pixel interpolation.
         * Handy for crisp pixel art and speed on legacy devices.
         *
         */
        roundPixels: false
    };

    this.mapBlendModes();
    
    this.resize(width, height);

    if("imageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "imageSmoothingEnabled";
    else if("webkitImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "webkitImageSmoothingEnabled";
    else if("mozImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "mozImageSmoothingEnabled";
    else if("oImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "oImageSmoothingEnabled";
    else if ("msImageSmoothingEnabled" in this.context)
        this.renderSession.smoothProperty = "msImageSmoothingEnabled";
};

Tiny.CanvasRenderer.prototype.constructor = Tiny.CanvasRenderer;


Tiny.CanvasRenderer.prototype.render = function(stage)
{
    stage.updateTransform();

    this.context.setTransform(1,0,0,1,0,0);

    this.context.globalAlpha = 1;

    this.renderSession.currentBlendMode = Tiny.blendModes.NORMAL;
    this.context.globalCompositeOperation = Tiny.blendModesCanvas[Tiny.blendModes.NORMAL];

    if (navigator.isCocoonJS && this.view.screencanvas)
    {
        this.context.fillStyle = "black";
        this.context.clear();
    }
    
    if (this.clearBeforeRender)
    {
        if (this.transparent)
        {
            this.context.clearRect(0, 0, this.width, this.height);
        }
        else
        {
            this.context.fillStyle = stage.backgroundColorString;
            this.context.fillRect(0, 0, this.width , this.height);
        }
    }
    
    this.renderDisplayObject(stage);

};

Tiny.CanvasRenderer.prototype.destroy = function(removeView)
{
    if (typeof removeView === "undefined") { removeView = true; }

    if (removeView && this.view.parent)
    {
        this.view.parent.removeChild(this.view);
    }

    this.view = null;
    this.context = null;
    this.maskManager = null;
    this.renderSession = null;

};

Tiny.CanvasRenderer.prototype.resize = function(width, height)
{
    this.width = width * this.resolution;
    this.height = height * this.resolution;

    this.view.width = this.width;
    this.view.height = this.height;

    if (this.autoResize) {
        this.view.style.width = this.width / this.resolution + "px";
        this.view.style.height = this.height / this.resolution + "px";
    }
};

Tiny.CanvasRenderer.prototype.renderDisplayObject = function(displayObject, context)
{
    this.renderSession.context = context || this.context;
    this.renderSession.resolution = this.resolution;
    displayObject._renderCanvas(this.renderSession);
};

Tiny.CanvasRenderer.prototype.mapBlendModes = function()
{
    if(!Tiny.blendModesCanvas)
    {
        Tiny.blendModesCanvas = [];

        Tiny.blendModesCanvas[Tiny.blendModes.NORMAL]   = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.ADD]      = "lighter"; //IS THIS OK???
        // Tiny.blendModesCanvas[Tiny.blendModes.MULTIPLY] = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.SCREEN]   = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.OVERLAY]  = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.DARKEN]   = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.LIGHTEN]  = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.COLOR_DODGE] = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.COLOR_BURN] = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.HARD_LIGHT] = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.SOFT_LIGHT] = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.DIFFERENCE] = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.EXCLUSION] = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.HUE]       = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.SATURATION] = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.COLOR]      = "source-over";
        // Tiny.blendModesCanvas[Tiny.blendModes.LUMINOSITY] = "source-over";
    }
};