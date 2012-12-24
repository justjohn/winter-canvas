
var Star = function(radius, color) {
    this.radius = radius || 10;
    this.color  = color  || "#eeeeee";
};

Star.prototype = new Drawable();

Star.prototype.copy = function() {
	return new Star(this.radius, this.color);
};

Star.prototype.render = function(ctx, x, y) {    
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
};

