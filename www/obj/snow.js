var Snow = function(canvas, magnitudeX, magnitudeY, color) {
    if (color) this.color = color;
    this.magnitudeX = magnitudeX;
    this.magnitudeY = magnitudeY;
    this.canvas = canvas;
};

Snow.prototype = new Drawable();

Snow.prototype.calc = function() {
    var w = this.canvas.width(),
        h = this.canvas.height(),
        offsetX = this.magnitudeX,
        offsetY = this.magnitudeY;
    
    this.h = h;
    
    this.x2 = w;
    this.y2 = this.y;
    
    this.cpx1 = this.x + offsetX;
    this.cpy1 = this.y + offsetY;
    
    this.cpx2 = this.x2 - offsetX;
    this.cpy2 = this.y2 - offsetY;
    
    /* for (var i=0; i<w; i++) {
        var x = i/w,
            mag = this.magnitude,
            y = mag * Math.pow(2*x - 1, 4);
    } */
};

Snow.prototype.render = function(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.cpx1, this.cpy1, this.cpx2, this.cpy2, this.x2, this.y2);
    ctx.lineTo(this.x2, this.h);
    ctx.lineTo(this.x, this.h);
    ctx.lineTo(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    
    //(new Star(5, "#0000ff")).move(this.cpx1, this.cpy1).draw(ctx);
    //(new Star(5, "#00ff00")).move(this.cpx2, this.cpy2).draw(ctx);
};

