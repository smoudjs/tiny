Tiny.ObjectCreator = function(game)
{
    this.game = game;
};

Tiny.ObjectCreator.prototype = {
    group: function(x, y)
    {
        var group = new Tiny.DisplayObjectContainer();
        this.game.stage.addChild(group);

        group.x = x || 0;
        group.y = y || 0;

        return group;
    },
    sprite: function(x, y, imagePath, key)
    {
        var sprite = new Tiny.Sprite(imagePath, key);
        sprite.frame = 0;

        this.game.stage.addChild(sprite)

        sprite.x = x || 0;
        sprite.y = y || 0;

        return sprite;
    },
    text: function(x, y, text, tyle)
    {
        var text = new Tiny.Text(text, tyle);

        this.game.stage.addChild(text);

        text.x = x || 0;
        text.y = y || 0;

        return text;
    },
    tileSprite: function(x, y, w, h, imagePath, key)
    {
        var tile = new Tiny.TilingSprite(imagePath, key, w, h);
        this.game.stage.addChild(tile);

        tile.x = x || 0;
        tile.y = y || 0;

        return tile;
    },
    graphics: function(x, y)
    {
        var graphics = new Tiny.Graphics();

        this.game.stage.addChild(graphics);

        graphics.x = x || 0;
        graphics.y = y || 0;

        return graphics;
    }
};