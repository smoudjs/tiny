var Create = {};

Create.spritesheet = function spritesheet(options) {
    var resolution = options.resolution || 1;
    var frameWidth = (resolution * options.width) | 0;
    var frameHeight = (resolution * options.height) | 0;
    var frames = options.frames;
    var key = options.key;
    var lastFrame = frames - 1;

    var totalWidth = frameWidth * options.frames;

    var rt = new Tiny.RenderTexture(totalWidth, frameHeight, null);

    var tmpMatrix = new Tiny.Mat3();

    var uuid, texture, frame, displayObject;

    for (var index = 0; index < frames; index++) {
        frame = new Tiny.Rectangle(frameWidth * index, 0, frameWidth, frameHeight);

        displayObject = options.draw((index + 1) / frames, rt, frame);

        if (displayObject) {
            tmpMatrix.identity();
            tmpMatrix.translate(options.width * index + options.width / 2, options.height / 2)

            tmpMatrix.scale(resolution, resolution)

            rt.render(displayObject, tmpMatrix);

            // var gr = new Tiny.Graphics();
            // gr.lineStyle(5, 0);
            // gr.drawRect(frame.x, frame.y, frame.width, frame.height);

            // rt.render(gr);

        }

        uuid = key + '.' + index;

        texture = new Tiny.Texture(rt.base, frame);

        texture.key = key;
        texture.lastFrame = lastFrame;

        Tiny.Cache.texture[uuid] = texture;
    }

    Tiny.Cache.texture[key] = rt;
};

export { Create };
