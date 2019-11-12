var ObjectFactory = function (game)
{
    this.game = game;
};

ObjectFactory.prototype = {
	sprite: function(x, y, imagePath, width, height) {
		var texture =  (typeof imagePath == "string" ? Tiny.TextureCache[imagePath] : imagePath)
		var _frames = null
		if (texture.frameData && texture.frameData.length > 0) {
			_frames = texture.frameData
			texture = Tiny.TextureCache[texture.frameData[0].uuid]
		}
		var sprite = new Tiny.Sprite( texture )
		sprite.game = this.game
		sprite._frames = _frames
		this.game.stage.addChild(sprite)
		sprite.x = x || 0, sprite.y = y || 0
		//game.objects.push(sprite)
		
		return sprite;
	},
	text: function(x, y, text, tyle) {
		var text = new Tiny.Text(text, tyle)
		text.game = this.game
		this.game.stage.addChild(text)
		text.x = x || 0, text.y = y || 0
		//game.objects.push(sprite)
		
		return text;
	},
	graphics: function(x, y) {
		var graphics = new Tiny.Graphics()
		graphics.game = this.game
		this.game.stage.addChild(graphics)
		graphics.x = x || 0, graphics.y = y || 0
		//game.objects.push(sprite)
		
		return graphics;
	},
};

module.exports = ObjectFactory