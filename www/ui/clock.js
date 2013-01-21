var Clock = function(el) {
	this.el = el;
	this.$el = $(el);
};

Clock.prototype = new UI();

Clock.prototype.update = function() {
    var time = new Date(),
        hour24 = time.getHours(),
        hour = (hour24 > 12) ? (hour24-12) : (hour24==0?12:hour24),
        ampm = (hour24 >= 12) ? 'pm' : 'am',
        minutes = time.getMinutes() < 10 ? ("0"+time.getMinutes()) : time.getMinutes(),
        timeStr = UI.wrap('span', 'hour', hour) + ":"
                + UI.wrap('span', 'minute', minutes)
                + UI.wrap('span', 'ampm', ampm);

    this.$el.html(timeStr);
};

