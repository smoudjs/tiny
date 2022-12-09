window["test.Graphics"] = {

	create: function() {

		const graphics = new Tiny.Graphics();

		// Rectangle
		graphics.beginFill("#DE3249");
		graphics.drawRect(20, 20, 100, 100);
		graphics.endFill();

		// Rectangle + line style 1
		graphics.lineStyle(2, "#FEEB77", 1);
		graphics.beginFill("#650A5A");
		graphics.drawRect(140, 20, 100, 100);
		graphics.endFill();

		// Rectangle + line style 2
		graphics.lineStyle(10, "#FFBD01", 1);
		graphics.beginFill("#C34288");
		graphics.drawRect(260, 20, 100, 100);
		graphics.endFill();

		// Rectangle 2
		graphics.lineStyle(2, "#000000", 1);
		graphics.beginFill("#AA4F08");
		graphics.drawRect(410, 20, 140, 100);
		graphics.endFill();

		// Circle
		graphics.lineStyle(0); // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
		graphics.beginFill("#DE3249", 1);
		graphics.drawCircle(70, 190, 100);
		graphics.endFill();

		// Circle + line style 1
		graphics.lineStyle(2, "#FEEB77", 1);
		graphics.beginFill("#650A5A", 1);
		graphics.drawCircle(190, 190, 100);
		graphics.endFill();

		// Circle + line style 2
		graphics.lineStyle(10, "#FFBD01", 1);
		graphics.beginFill("#C34288", 1);
		graphics.drawCircle(310, 190, 100);
		graphics.endFill();

		// Ellipse + line style 2
		graphics.lineStyle(2, "#000000", 1);
		graphics.beginFill("#AA4F08", 1);
		graphics.drawEllipse(250, 350, 70, 40);
		graphics.endFill();

		// draw a shape
		graphics.beginFill("#FF3300");
		graphics.lineStyle(4, "#ffd900", 1);
		graphics.moveTo(50, 270);
		graphics.lineTo(250, 270);
		graphics.lineTo(100, 320);
		graphics.lineTo(50, 270);
		//graphics.closePath();
		graphics.endFill();

		// draw a rounded rectangle
		graphics.lineStyle(2, "#FF00FF", 1);
		graphics.beginFill("#f1f1f1", 0.25);
		graphics.drawRoundedRect(330, 270, 100, 100, 16);
		graphics.endFill();

		// draw star
		// graphics.lineStyle(2, "#FFFFFF");
		// graphics.beginFill("#35CC5A", 1);
		// graphics.drawStar(360, 370, 5, 50);
		// graphics.endFill();

		// draw star 2
		// graphics.lineStyle(2, "#FFFFFF");
		// graphics.beginFill("#FFCC5A", 1);
		// graphics.drawStar(280, 510, 7, 50);
		// graphics.endFill();

		// draw star 3
		// graphics.lineStyle(4, "#FFFFFF");
		// graphics.beginFill("#55335A", 1);
		// graphics.drawStar(470, 450, 4, 50);
		// graphics.endFill();

		// draw polygon
		const path = [450, 170, 550, 260, 630, 220, 580, 370, 440, 320];

		graphics.lineStyle(0);
		graphics.beginFill("#3500FA", 1);
		graphics.drawPolygon(path);
		graphics.endFill();

		this.scene.add(graphics);
	}

}