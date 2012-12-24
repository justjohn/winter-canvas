
var Drawable = function() {
    this.x = 0;
    this.y = 0;
};

Drawable.prototype.setX = function(x) {
    this.x = x;
};

Drawable.prototype.setY = function(y) {
    this.y = y;
};

Drawable.prototype.move = function(x, y) {
    this.setX(x);
    this.setY(y);
};

Drawable.prototype.draw = function(ctx) {
    this.render(ctx, this.x, this.y);
};
