
var Star = function(radius, color) {
    this.radius = radius || 10;
    this.color  = color  || "#eeeeee";
};

Star.prototype = new Drawable();

Star.prototype.render = function(ctx, x, y) {
    var offset = this.radius/2;
    
    ctx.beginPath();
    ctx.arc(x-offset, y-offset, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
};

