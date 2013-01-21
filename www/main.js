var canvas = new Canvas(),
    pointer = new Pointer(),
    loop = new Loop(canvas),
    numStars = 800,
    t = 0,
    // objects
    cursor = new Star(20, "#000099"),
    snow = new Snow(canvas, 100, 100, "#f0f0f0"),
    snow2 = new Snow(canvas, 100, 100, "#cccccc"),
    snowfall = new Snowfall(numStars, canvas, pointer),
    snowman = new Snowman(40, 7, 230, 10),
    tree = new Tree({
        depth: 6,
        length: 110,
        spread: 25,
        width: 20,
        color: 215,
        colorDecay: 10
    }),
    tree2 = new Tree({
        depth: 5,
        length: 75,
        spread: 25,
        width: 15,
        color: 150,
        colorDecay: 20
    }),
    App = {};

// Setup environment and loop
pointer.bind(canvas.el);

loop.register(function mainloop(canvas) {
    updateUi();
    calc();
    canvas.clear();
    draw(canvas);
});

function calc() {
    t++;

    var h = canvas.height(),
        w = canvas.width();

    var wind = Math.sin(t/40)/3 + 0.3,
        wind2 = Math.cos(t/40)/2.5 + 1/1.5;

    var per = 0.65, //pointer.x/canvas.width();
        groundHeight = 118,
        y = h - groundHeight;

    cursor.color = pointer.down?"#0000ff":"#000099";
    cursor.move(pointer.x, pointer.y);

    tree2.move(0.75 * w, h - groundHeight/1.5);
    tree.move(0.35 * w, h - groundHeight);

    tree2.blow(-2 + wind2);
    tree.blow(2 + wind);

    snowfall.calc();

    snow.move(0, y);
    snow.magnitudeX = per * 500;
    snow.magnitudeY = -per * 250;
    snow.calc();

    snow2.move(0, y + 25);
    snow2.magnitudeX = per * 500;
    snow2.magnitudeY = per * 250;
    snow2.calc();

    snowman.move(0.2 * w, h - groundHeight);
}

function draw(canvas) {
    var ctx = canvas.ctx;

    snow2.draw(ctx);
    tree2.draw(ctx);

    snowfall.draw(ctx);

    snow.draw(ctx);
    tree.draw(ctx);

    snowman.draw(ctx);

    // cursor.draw(ctx);

    pointer.reset();
}

function init() {
    snowfall.init();

    setupUi();
}

var $win = $(window);
canvas.resize($win.width(), $win.height());
$win.on({
    resize: function() {
        canvas.resize($win.width(), $win.height());
    }
});

init();
loop.start();

function wrap(tag, cls, content) {
    return '<'+tag+' class="'+cls+'">'+content+'</'+tag+'>';
}

function setupUi() {
    $(".newtab a").click(function() {
        chrome.tabs.update({url:"chrome-internal://newtab/"});
    });

    App.clock = new Clock(".time");
    App.weather = $(".weather");
}

function updateUi() {
    App.clock.update();
}
