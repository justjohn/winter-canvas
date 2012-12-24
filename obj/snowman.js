var Snowman = function(size, decay, color, colorDecay, segments) {
	this.size = size;
	this.segments = segments || 3;
	this.decay = decay || 5;
	this.color = color || 235;
	this.colorDecay = colorDecay || 10;

	this.eyeColor = "#000000";
	this.noseColor = "#FF9640";
};

Snowman.prototype = new Drawable();

Snowman.prototype.render = function(ctx, x, y) {
	var size = this.size,
		color = this.color;

	for (var i=0; i<this.segments; i++) {
		if (i>0) {
			y -= 2*(size - this.decay);
			size -= this.decay;
			color += this.colorDecay;
		}

		var star = new Star(size, this.makeColor(color));
		star.move(x, y).draw(ctx);
	}

	// the last segment draw will be the head
	// here we add nose, eyes, etc...

	var eye = new Star(size/5, this.eyeColor),
		eyeOffset = Math.pow(2*Math.pow((size/4), 2), 0.5);

	eye.move(x+eyeOffset, y-eyeOffset).draw(ctx);
	eye.copy().move(x-eyeOffset, y-eyeOffset).draw(ctx);

	var noseSize = size/4;

	ctx.beginPath();
	ctx.moveTo(x - noseSize, y);
	ctx.lineTo(x + noseSize, y);
	ctx.lineTo(x, y+2*noseSize);
	ctx.closePath();
	ctx.fillStyle = this.noseColor;
	ctx.fill();
};

