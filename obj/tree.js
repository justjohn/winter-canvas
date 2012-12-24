var Tree = function(params) {
	this.params = params;

	this.depth = params.depth;
	this.length = params.length;
	this.spread = params.spread;
	this.color = params.color;
	this.colorDecay = params.colorDecay;

	this.wind = 0;
	this.width = params.width || 15;
	this.widthDecay = this.width/(params.depth+1);
};

Tree.prototype = new Drawable();

Tree.prototype.copy = function() {
	return new Tree(this.params);
};

Tree.prototype.render = function(ctx, x, y) {
	this.segment(ctx, x, y, 90, this.width, this.color, false, 0);
};

Tree.prototype.segment = function(ctx, x, y, angle, width, color, snowy, depth) {
	angle -= this.wind;

	var end = this.calcEnd(x, y, angle);

	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(end.x, end.y);
	ctx.closePath();

	ctx.lineWidth = width;
	ctx.strokeStyle = this.makeColor(color);
	ctx.stroke();

	// children
	if (depth < this.depth) {
		this.segment(ctx, end.x, end.y, angle+this.spread, width-this.widthDecay, color-this.colorDecay, this.isSnowy(), depth + 1);
		this.segment(ctx, end.x, end.y, angle-this.spread, width-this.widthDecay, color-this.colorDecay, this.isSnowy(), depth + 1);
	}
};

Tree.prototype.makeColor = function(color) {
	var hex = color.toString(16);
	return "#"+hex+hex+hex;
};

Tree.prototype.isSnowy = function() {
	return Math.random()>0.8;
};

Tree.prototype.blow = function(strength) {
	this.wind = strength;
};

Tree.prototype.calcEnd = function(x, y, angle) {
	var l = this.length,
		adj = l * Math.cos(angle * Math.PI/180),
		opp = l * Math.sin(angle * Math.PI/180);

	return {
		x: x + adj,
		y: y - opp
	};
};
