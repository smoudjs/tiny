Tiny.Create.spritesheet = function spritesheet(options) {
    var resolution = options.resolution || 1;
    var frameWidth = (resolution * options.width) | 0;
    var frameHeight = (resolution * options.height) | 0;
    var frames = options.frames;
    var key = options.key;
    var lastFrame = frames - 1;

    var totalWidth = frameWidth * options.frames;
    var renderer = Tiny.defaultRenderer;

    var textureBuffer = new Tiny.CanvasBuffer(totalWidth, frameHeight);

    var tmpMatrix = new Tiny.Matrix();
    // var scale = 
    // tmpMatrix.scale(0.5, 0.5);

    var uuid, texture, frame, displayObject, bounds, wt, context;

    for (var index = 0; index < frames; index++) {
        frame = new Tiny.Rectangle(frameWidth * index, 0, frameWidth, frameHeight);

        context = textureBuffer.context;

        displayObject = options.draw((index + 1) / frames, context, frame);

        bounds = displayObject.getBounds();
        // console.log(bounds.x, bounds.y, bounds.width, bounds.height);

        // tmpMatrix.translate()
        tmpMatrix.tx = -bounds.x + frame.x;
        tmpMatrix.ty = -bounds.y;

        wt = displayObject.worldTransform;
        wt.tx = options.width * index + options.width / 2;
        wt.ty = options.height / 2;
        // wt.identity();
        // wt.scale(0.5, 0.5);
        // wt.a = 0.5;
        // wt.d = 0.5;

        // console.log(wt.a, wt.d)

        // wt.append(tmpMatrix);
        // console.log(wt.a, wt.d)
            
        // displayObject.width = 50;
        // displayObject.height = 50;

        // setWorld Alpha to ensure that the object is renderer at full opacity
        displayObject.worldAlpha = 1;

        // Time to update all the children of the displayObject with the new matrix..
        var children = displayObject.children;

        for (var i = 0, j = children.length; i < j; i++) {
            children[i].updateTransform();
        }

        var realResolution = renderer.resolution;

        renderer.resolution = resolution;

        renderer.renderObject(displayObject, context);

        // if (__DEBUG__) {
        //     context.resetTransform();
        //     context.rect(frame.x, frame.y, frame.width, frame.height);
        //     context.stroke();
        // }

        renderer.resolution = realResolution;

        uuid = key + '.' + index;

        texture = new Tiny.Texture(textureBuffer.canvas, frame);

        texture.key = key;
        texture.lastFrame = lastFrame;

        Tiny.Cache.texture[uuid] = texture;
    }

    Tiny.Cache.texture[key] = new Tiny.Texture(textureBuffer.canvas);

    // return renderTexture;
};
