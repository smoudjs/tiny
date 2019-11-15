
Tiny.TextureCache = {};
Tiny.FrameCache = {};

Tiny.TextureSilentFail = false;

Tiny.TextureCacheIdGenerator = 0;

Tiny.Texture = function(baseTexture, frame, crop, trim)
{
    this.noFrame = false;

    if (!frame)
    {
        this.noFrame = true;
        frame = new Tiny.Rectangle(0,0,1,1);
    }

    if (baseTexture instanceof Tiny.Texture)
    {
        baseTexture = baseTexture.baseTexture;
    }

    this.baseTexture = baseTexture;

    this.frame = frame;

    this.trim = trim;

    this.valid = false;

    this.requiresUpdate = false;

    this._uvs = null;

    this.width = 0;

    this.height = 0;

    this.crop = crop || new Tiny.Rectangle(0, 0, 1, 1);

    if (baseTexture.hasLoaded)
    {
        if (this.noFrame) 
            frame = new Tiny.Rectangle(0, 0, baseTexture.width, baseTexture.height);
        this.setFrame(frame);
    }
};

Tiny.Texture.prototype.constructor = Tiny.Texture;

Tiny.Texture.prototype.onBaseTextureLoaded = function()
{
    var baseTexture = this.baseTexture;

    if (this.noFrame) this.frame = new Tiny.Rectangle(0, 0, baseTexture.width, baseTexture.height);

    this.setFrame(this.frame);

};

Tiny.Texture.prototype.destroy = function(destroyBase)
{
    if (destroyBase) this.baseTexture.destroy();

    this.valid = false;
};

Tiny.Texture.prototype.setFrame = function(frame)
{
    this.noFrame = false;

    this.frame = frame;
    this.width = frame.width;
    this.height = frame.height;

    this.crop.x = frame.x;
    this.crop.y = frame.y;
    this.crop.width = frame.width;
    this.crop.height = frame.height;

    if (!this.trim && (frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height))
    {
        if (!Tiny.TextureSilentFail)
        {
            throw new Error('Texture Error: frame does not fit inside the base Texture dimensions ' + this);
        }

        this.valid = false;
        return;
    }

    this.valid = frame && frame.width && frame.height && this.baseTexture.source && this.baseTexture.hasLoaded;

    if (this.trim)
    {
        this.width = this.trim.width;
        this.height = this.trim.height;
        this.frame.width = this.trim.width;
        this.frame.height = this.trim.height;
    }
    
    if (this.valid) this._updateUvs();

};

Tiny.Texture.prototype._updateUvs = function()
{
    if(!this._uvs)this._uvs = new Tiny.TextureUvs();

    var frame = this.crop;
    var tw = this.baseTexture.width;
    var th = this.baseTexture.height;
    
    this._uvs.x0 = frame.x / tw;
    this._uvs.y0 = frame.y / th;

    this._uvs.x1 = (frame.x + frame.width) / tw;
    this._uvs.y1 = frame.y / th;

    this._uvs.x2 = (frame.x + frame.width) / tw;
    this._uvs.y2 = (frame.y + frame.height) / th;

    this._uvs.x3 = frame.x / tw;
    this._uvs.y3 = (frame.y + frame.height) / th;
};

Tiny.Texture.fromImage = function(key, imageUrl, crossorigin, scaleMode)
{
    var texture = Tiny.TextureCache[key];

    if(!texture)
    {
        texture = new Tiny.Texture(Tiny.BaseTexture.fromImage(key, imageUrl, crossorigin, scaleMode));
        texture.key = key
        Tiny.TextureCache[key] = texture;
    }

    return texture;
};

Tiny.Texture.fromFrame = function(frameId)
{
    var texture = Tiny.TextureCache[frameId];
    if(!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache ');
    return texture;
};

Tiny.Texture.fromCanvas = function(canvas, scaleMode)
{
    var baseTexture = Tiny.BaseTexture.fromCanvas(canvas, scaleMode);

    return new Tiny.Texture( baseTexture );

};

Tiny.Texture.addTextureToCache = function(texture, id)
{
    Tiny.TextureCache[id] = texture;
};


Tiny.Texture.removeTextureFromCache = function(id)
{
    var texture = Tiny.TextureCache[id];
    delete Tiny.TextureCache[id];
    delete Tiny.BaseTextureCache[id];
    return texture;
};

Tiny.TextureUvs = function()
{
    this.x0 = 0;
    this.y0 = 0;

    this.x1 = 0;
    this.y1 = 0;

    this.x2 = 0;
    this.y2 = 0;

    this.x3 = 0;
    this.y3 = 0;
};