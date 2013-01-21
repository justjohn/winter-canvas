
var Snowfall = function(num, canvas, pointer) {
    this.num = num;
    this.stars = [];
    this.canvas = canvas;
    this.pointer = pointer;
};

Snowfall.prototype = new Drawable();

Snowfall.prototype.addStar = function(begin) {
    var canvas = this.canvas;
    
    var radius = Math.random() * 3 * 1,
        x = Math.random() * canvas.width(),
        v = Math.random() * 1.5 + 0.5,
        y = begin?(-v/2):(Math.random() * canvas.height()),
        star = new Star(radius);
        
    star.v = v;
    star.drift = Math.random() > 0.5;
    star.driftMagnitude = Math.random();
        
    star.move(x, y);
    
    return star;
};

Snowfall.prototype.init = function() {
    for (var i=0; i<this.num; i++) {
        var star = this.addStar();
        this.stars.push(star);
    }
};

Snowfall.prototype.calc = function() {
    var canvas = this.canvas,
        pointer = this.pointer,
        stars = this.stars;
    
    for (var i=0, l=stars.length; i<l; i++) {
        var star = stars[i],
            r = star.radius,
            y = star.y + star.v,
            driftX = star.drift?this.getFlakeX(y, star.driftMagnitude):0,
            x = star.x + driftX;
        
        star.move(x, y);
        
        // replace star if it's fallen off the edge of the world
        if (y-star.radius > canvas.height() || x-star.radius > canvas.width())
            stars[i] = this.addStar(true);
    }
};

Snowfall.prototype.getFlakeX = function(y, magnitude) {
    // x*sin(x*12*pi)
    var height = this.canvas.height(),
        percentY = y / height;
    
    return percentY * magnitude * Math.sin( percentY * 6 * Math.PI );
}

Snowfall.prototype.render = function(ctx, x, y) {
    var stars = this.stars;
    
    for (var i=0, l=stars.length; i<l; i++) {
        stars[i].draw(ctx);
    }
};

