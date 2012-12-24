var canvas = new Canvas(),
    pointer = new Pointer(),
    loop = new Loop(canvas),
    numStars = 200,
    // objects
    cursor = new Star(20, "#000099"),
    snowfall = new Snowfall(numStars, canvas, pointer);

// Setup environment and loop
pointer.bind(canvas.el);

loop.register(function mainloop(canvas) {
    calc();
    canvas.clear();
    draw(canvas);
});

function calc() {
    cursor.color = pointer.down?"#0000ff":"#000099";
    cursor.move(pointer.x, pointer.y);
    snowfall.calc();
}

function draw(canvas) {
    var ctx = canvas.ctx;
    
    snowfall.draw(ctx);
    cursor.draw(ctx);
}

function init() {
    snowfall.init();
}

$(function() {
    var $win = $(window);
    canvas.resize($win.width(), $win.height());
    $win.on({
        resize: function() {
            canvas.resize($win.width(), $win.height());
        }
    });
    
    init();
    loop.start();
});

