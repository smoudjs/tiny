// if (this._prevTint !== this.tint.int) {
//       this._boundsDirty = true;
//       this._prevTint = this.tint.int;
//   }

Object.assign(Tiny.Graphics.prototype, {
    /**
     * Useful function that returns a texture of the graphics object that can then be used to create sprites
     * This can be quite useful if your geometry is complicated and needs to be reused multiple times.
     *
     * @method generateTexture
     * @param resolution {Number} The resolution of the texture being generated
     * @param scaleMode {Number} Should be one of the PIXI.scaleMode consts
     * @return {Texture} a texture of the graphics object
     */
    generateTexture: function (resolution, scaleMode) {
        resolution = resolution || 1;

        var bounds = this.getBounds();

        var canvasBuffer = new Tiny.CanvasBuffer(bounds.width * resolution, bounds.height * resolution);

        var texture = new Tiny.Texture(canvasBuffer.canvas, scaleMode);
        texture.base.resolution = resolution;

        canvasBuffer.context.scale(resolution, resolution);

        canvasBuffer.context.translate(-bounds.x, -bounds.y);

        Tiny.CanvasGraphics.renderGraphics(this, canvasBuffer.context);

        return texture;
    },

    /**
     * Renders the object using the Canvas renderer
     *
     * @method renderCanvas
     * @param renderSession {RenderSession}
     * @private
     */
    renderCanvas: function (renderSession) {
        // if the sprite is not visible or the alpha is 0 then no need to render this element
        if (this.visible === false || this.alpha === 0 || this.isMask === true) return;

        if (this._cacheAsBitmap) {
            if (this.dirty || this.cachedSpriteDirty) {
                this._generateCachedSprite();

                // we will also need to update the texture
                this.updateCachedSpriteTexture();

                this.cachedSpriteDirty = false;
                this.dirty = false;
            }

            this._cachedSprite.alpha = this.alpha;
            Tiny.Sprite.prototype.renderCanvas.call(this._cachedSprite, renderSession);

            return;
        } else {
            var context = renderSession.context;
            var transform = this.worldTransform;

            if (this._prevTint !== this.tint.int) {
                this.dirty = true;
                this._prevTint = this.tint.int;
            }

            if (this.blendMode !== renderSession.currentBlendMode) {
                renderSession.currentBlendMode = this.blendMode;
                context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];
            }

            if (this._mask) {
                renderSession.maskManager.pushMask(this._mask, renderSession);
            }

            var resolution = renderSession.resolution;
            context.setTransform(
                transform.a * resolution,
                transform.b * resolution,
                transform.c * resolution,
                transform.d * resolution,
                transform.tx * resolution,
                transform.ty * resolution
            );

            Tiny.CanvasGraphics.renderGraphics(this, context);

            // simple render children!
            for (var i = 0, j = this.children.length; i < j; i++) {
                this.children[i]._renderCanvas(renderSession);
            }

            if (this._mask) {
                renderSession.maskManager.popMask(renderSession);
            }
        }
    },

    /**
     * Generates the cached sprite when the sprite has cacheAsBitmap = true
     *
     * @method _generateCachedSprite
     * @private
     */
    _generateCachedSprite: function () {
        var bounds = this.getLocalBounds();

        if (!this._cachedSprite) {
            var canvasBuffer = new Tiny.CanvasBuffer(bounds.width, bounds.height);
            var texture = new Tiny.Texture(canvasBuffer.canvas);

            this._cachedSprite = new Tiny.Sprite(texture);
            this._cachedSprite.buffer = canvasBuffer;

            this._cachedSprite.worldTransform = this.worldTransform;
        } else {
            this._cachedSprite.buffer.resize(bounds.width, bounds.height);
        }

        // leverage the anchor to account for the offset of the element
        this._cachedSprite.anchor.x = -(bounds.x / bounds.width);
        this._cachedSprite.anchor.y = -(bounds.y / bounds.height);

        // this._cachedSprite.buffer.context.save();
        this._cachedSprite.buffer.context.translate(-bounds.x, -bounds.y);

        // make sure we set the alpha of the graphics to 1 for the render..
        this.worldAlpha = 1;

        this.dirty = true;
        // now render the graphic..
        Tiny.CanvasGraphics.renderGraphics(this, this._cachedSprite.buffer.context);
        this._cachedSprite.alpha = this.alpha;
    },

    /**
     * Updates texture size based on canvas size
     *
     * @method updateCachedSpriteTexture
     * @private
     */
    updateCachedSpriteTexture: function () {
        var cachedSprite = this._cachedSprite;
        var texture = cachedSprite.texture;
        var canvas = cachedSprite.buffer.canvas;

        texture.base.width = canvas.width;
        texture.base.height = canvas.height;
        texture.crop.width = texture.frame.width = canvas.width;
        texture.crop.height = texture.frame.height = canvas.height;

        cachedSprite._width = canvas.width;
        cachedSprite._height = canvas.height;

        // update the dirty base textures
        texture.base.dirty();
    },

    /**
     * Destroys a previous cached sprite.
     *
     * @method destroyCachedSprite
     */
    destroyCachedSprite: function () {
        this._cachedSprite.texture.destroy(true);

        // let the gc collect the unused sprite
        // TODO could be object pooled!
        this._cachedSprite = null;
    }
});
