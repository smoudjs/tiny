var ObjectFactory = function (game)
{
    this.game = game;
};

ObjectFactory.prototype = {
	sprite: function(x, y, imagePath, width, height) {
		var sprite = new Tiny.Sprite(this.game.textures[imagePath])
		this.game.stage.addChild(sprite)
		sprite.x = x || 0, sprite.y = y || 0
		//game.objects.push(sprite)
		
		return sprite;
	},
	text: function(x, y, text, tyle) {
		var text = new Tiny.Text(text, tyle)
		this.game.stage.addChild(text)
		text.x = x || 0, text.y = y || 0
		//game.objects.push(sprite)
		
		return text;
	},
	graphics: function(x, y) {
		var graphics = new Tiny.Graphics()
		this.game.stage.addChild(graphics)
		graphics.x = x || 0, graphics.y = y || 0
		//game.objects.push(sprite)
		
		return graphics;
	},
};

module.exports = ObjectFactory