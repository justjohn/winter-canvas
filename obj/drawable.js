
var Drawable = function() {
    this.x = 0;
    this.y = 0;
};

Drawable.prototype.setX = function(x) {
    this.x = x;
    
    return this;
};

Drawable.prototype.setY = function(y) {
    this.y = y;

    return this;
};

Drawable.prototype.move = function(x, y) {
    this.setX(x);
    this.setY(y);

    return this;
};

Drawable.prototype.draw = function(ctx) {
    this.render(ctx, this.x, this.y);

    return this;
};
