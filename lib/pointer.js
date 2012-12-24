var Pointer = function() {
    this.x = 0;
    this.y = 0;
    this.clicked = false;
    this.down = false;
};

Pointer.prototype.reset = function() {
    this.clicked = false;
};

Pointer.prototype.touchStartEv = function(e) {
    this.down = true;
    this.touchMoveEv(e);
};

Pointer.prototype.touchEndEv = function(e) {
    this.down = false;
};


Pointer.prototype.touchMoveEv = function(ev) {
    var e = ev.originalEvent;
    
    e.preventDefault();
    
    var x = e.touches[0].pageX,
        y = e.touches[0].pageY;
    
    this.x = 2*x;
    this.y = 2*y;
};

Pointer.prototype.moveEv = function(e) {
    var x = e.offsetX,
        y = e.offsetY;
    
    this.x = 2*x;
    this.y = 2*y;
};

Pointer.prototype.clickEv = function(e) {
    this.clicked = true;
};

Pointer.prototype.downEv = function(e) {
    this.down = true;
};

Pointer.prototype.upEv = function(e) {
    this.down = false;
};

Pointer.prototype.bind = function(el) {
    this.el = el;
    
    $(el).on({
        'mousemove': this.moveEv.bind(this),
        'click': this.clickEv.bind(this),
        'mouseup': this.upEv.bind(this),
        'mousedown': this.downEv.bind(this),
        'touchend': this.touchEndEv.bind(this),
        'touchstart': this.touchStartEv.bind(this),
        'touchmove': this.touchMoveEv.bind(this)
    });
};
