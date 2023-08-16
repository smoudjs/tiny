/**
 * Renders a TilingSprite using the spriteBatch.
 *
 * @method renderTilingSprite
 * @param sprite {TilingSprite} the tilingSprite to render
 */

if (Tiny.SpriteBatch) {
    Tiny.SpriteBatch.prototype.renderTilingSprite = function (tilingSprite) {
        var texture = tilingSprite.tilingTexture;

        // check texture..
        if (this.currentBatchSize >= this.size) {
            //return;
            this.flush();
            this.currentBaseTexture = texture.base;
        }

        // set the textures uvs temporarily
        // TODO create a separate texture so that we can tile part of a texture

        if (!tilingSprite._uvs) tilingSprite._uvs = new Tiny.TextureUvs();

        var uvs = tilingSprite._uvs;

        tilingSprite.tilePosition.x %= texture.base.width * tilingSprite.tileScaleOffset.x;
        tilingSprite.tilePosition.y %= texture.base.height * tilingSprite.tileScaleOffset.y;

        var offsetX = tilingSprite.tilePosition.x / (texture.base.width * tilingSprite.tileScaleOffset.x);
        var offsetY = tilingSprite.tilePosition.y / (texture.base.height * tilingSprite.tileScaleOffset.y);

        var scaleX =
            tilingSprite.width /
            texture.base.width /
            (tilingSprite.tileScale.x * tilingSprite.tileScaleOffset.x);
        var scaleY =
            tilingSprite.height /
            texture.base.height /
            (tilingSprite.tileScale.y * tilingSprite.tileScaleOffset.y);

        uvs.x0 = 0 - offsetX;
        uvs.y0 = 0 - offsetY;

        uvs.x1 = 1 * scaleX - offsetX;
        uvs.y1 = 0 - offsetY;

        uvs.x2 = 1 * scaleX - offsetX;
        uvs.y2 = 1 * scaleY - offsetY;

        uvs.x3 = 0 - offsetX;
        uvs.y3 = 1 * scaleY - offsetY;

        // get the tilingSprites current alpha and tint and combining them into a single color
        var tint = tilingSprite.tint.int;
        var color =
            (tint >> 16) + (tint & 0xff00) + ((tint & 0xff) << 16) + ((tilingSprite.alpha * 255) << 24);

        var positions = this.positions;
        var colors = this.colors;

        var width = tilingSprite.width;
        var height = tilingSprite.height;

        // TODO trim??
        var aX = tilingSprite.anchor.x;
        var aY = tilingSprite.anchor.y;
        var w0 = width * (1 - aX);
        var w1 = width * -aX;

        var h0 = height * (1 - aY);
        var h1 = height * -aY;

        var index = this.currentBatchSize * 4 * this.vertSize;

        var resolution = texture.base.resolution;

        var worldTransform = tilingSprite.worldTransform;

        var a = worldTransform.a / resolution; //[0];
        var b = worldTransform.b / resolution; //[3];
        var c = worldTransform.c / resolution; //[1];
        var d = worldTransform.d / resolution; //[4];
        var tx = worldTransform.tx; //[2];
        var ty = worldTransform.ty; //[5];

        // xy
        positions[index++] = a * w1 + c * h1 + tx;
        positions[index++] = d * h1 + b * w1 + ty;
        // uv
        positions[index++] = uvs.x0;
        positions[index++] = uvs.y0;
        // color
        colors[index++] = color;

        // xy
        positions[index++] = a * w0 + c * h1 + tx;
        positions[index++] = d * h1 + b * w0 + ty;
        // uv
        positions[index++] = uvs.x1;
        positions[index++] = uvs.y1;
        // color
        colors[index++] = color;

        // xy
        positions[index++] = a * w0 + c * h0 + tx;
        positions[index++] = d * h0 + b * w0 + ty;
        // uv
        positions[index++] = uvs.x2;
        positions[index++] = uvs.y2;
        // color
        colors[index++] = color;

        // xy
        positions[index++] = a * w1 + c * h0 + tx;
        positions[index++] = d * h0 + b * w1 + ty;
        // uv
        positions[index++] = uvs.x3;
        positions[index++] = uvs.y3;
        // color
        colors[index++] = color;

        // increment the batchsize
        this.sprites[this.currentBatchSize++] = tilingSprite;
    };
}
