var Loop = function(canvas) {
    this.loops = [];
    this.canvas = canvas;
    this.requestAnimationFrame =
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                null ;
};

Loop.prototype.start = function() {
    var that = this,
        canvas = this.canvas.el;
        
    if ( this.requestAnimationFrame !== null ) {
        var recursiveAnim = function() {
            that.loop();
            that.requestAnimationFrame.call(window, recursiveAnim, canvas );
        };
        
        // start the mainloop
        this.requestAnimationFrame.call(window, recursiveAnim, canvas );
        
    } else {
        var ONE_FRAME_TIME = 1000.0 / 60.0 ;
        setInterval( this.loop, ONE_FRAME_TIME );
    }
};

Loop.prototype.register = function(fn) {
    this.loops.push(fn);
};

Loop.prototype.loop = function() {
    for (var i=0; i<this.loops.length; i++) {
        var loop = this.loops[i];
        loop(this.canvas);
    }
};
