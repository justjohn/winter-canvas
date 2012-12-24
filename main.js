var canvas = new Canvas(),
    pointer = new Pointer(),
    loop = new Loop(canvas),
    numStars = 400,
    // objects
    cursor = new Star(20, "#000099"),
    snowfall = new Snowfall(numStars, canvas, pointer),
    tree = new Tree({
        depth: 5,
        length: 80, 
        spread: 25, 
        width: 15,
        color: 255,
        colorDecay: 10
    }),
    tree2 = new Tree({
        depth: 5,
        length: 50, 
        spread: 25, 
        width: 15,
        color: 190,
        colorDecay: 20
    });

// Setup environment and loop
pointer.bind(canvas.el);

loop.register(function mainloop(canvas) {
    calc();
    canvas.clear();
    draw(canvas);
});

function calc() {
    var h = canvas.height(),
        w = canvas.width();

    cursor.color = pointer.down?"#0000ff":"#000099";
    cursor.move(pointer.x, pointer.y);

    tree2.move(0.75 * w, h);
    tree.move(0.35 * w, h);

    tree2.blow(-2);
    tree.blow(2);

    snowfall.calc();
}

function draw(canvas) {
    var ctx = canvas.ctx;
    
    snowfall.draw(ctx);
    tree2.draw(ctx);
    tree.draw(ctx);
    cursor.draw(ctx);

    pointer.reset();
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
