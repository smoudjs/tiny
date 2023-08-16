import { LoadingManager } from './LoadingManager';
import { ImageLoader } from './ImageLoader';
import { Texture } from '../textures/Texture';
import { Cache } from './Cache';

var SpritesheetLoader = function (resource, cb) {
    var key = resource.key;

    ImageLoader(resource, function (resource, base) {
        var lastFrame, uuid, texture;

        if (resource.data) {
            var frameData = resource.data;
            lastFrame = frameData.length - 1;

            for (var i = 0; i <= lastFrame; i++) {
                uuid = key + '.' + i;

                texture = new Texture(base, {
                    name: i,
                    x: Math.floor(frameData[i].x),
                    y: Math.floor(frameData[i].y),
                    width: Math.floor(frameData[i].width),
                    height: Math.floor(frameData[i].height),
                    duration: frameData[i].duration
                });

                texture.key = key;
                texture.lastFrame = lastFrame;

                Cache.texture[uuid] = texture;
            }
        } else {
            var width = base.width;
            var height = base.height;

            var frameWidth = resource.width;
            var frameHeight = resource.height;

            if (!frameWidth) frameWidth = Math.floor(width / (resource.cols || 1));
            if (!frameHeight) frameHeight = Math.floor(height / (resource.rows || 1));

            var cols = Math.floor(width / frameWidth);
            var rows = Math.floor(height / frameHeight);

            var total = cols * rows;

            if (total === 0) {
                return cb();
            }

            if (resource.total) total = Math.min(total, resource.total);

            var x = 0;
            var y = 0;
            lastFrame = total - 1;

            for (var i = 0; i < total; i++) {
                uuid = key + '.' + i;
                texture = new Texture(base, {
                    name: i,
                    x: x,
                    y: y,
                    width: frameWidth,
                    height: frameHeight,
                    duration: resource.duration
                });
                texture.key = key;
                texture.lastFrame = lastFrame;
                Cache.texture[uuid] = texture;

                x += frameWidth;

                if (x + frameWidth > width) {
                    x = 0;
                    y += frameHeight;
                }
            }
        }

        cb();
    });
};

LoadingManager.spritesheet = SpritesheetLoader;
LoadingManager.prototype.spritesheet = function (key, source, arg_1, arg_2, totalFrames, duration) {
    var res = {
        src: source,
        key: key,
        type: 'spritesheet'
    };

    if (typeof arg_1 == 'number') {
        res.width = arg_1;
        res.height = arg_2;
        res.total = totalFrames;
        res.duration = duration;
    } else if (arg_1.length > 0) {
        res.data = arg_1;
    }

    this.list.push(res);
};

export { SpritesheetLoader };
