function Progressbar(config) {
	this.bar = progressJs();
	this.delay = config.delay;
	this.step = config.step;

	this.startInterval = function() {
		this.bar.start().autoIncrease(this.step, this.delay);
	}

	this.finished = function() {
		this.bar.end();
	}
}