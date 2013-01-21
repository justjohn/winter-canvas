
var Canvas = function() {
    this.el = document.getElementById('canvas');
    this.ctx = this.el.getContext('2d');   
};

Canvas.prototype.width = function() {
    return this.el.width;
};

Canvas.prototype.height = function() {
    return this.el.height;
};

Canvas.prototype.resize = function(w, h) {
    this.el.width = 2*w;
    this.el.height = 2*h;
    this.el.style.width = w + "px";
    this.el.style.height = h + "px";
};

Canvas.prototype.clear = function() {
    var ctx = this.ctx;
    
    // Store the current transformation matrix
    ctx.save();
    
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.width(), this.height());
    
    // Restore the transform
    ctx.restore();
}