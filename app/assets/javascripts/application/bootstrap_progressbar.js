function BProgressbar(config) {

	this.bar = $(config.root);
	this.delay = config.delay;
	this.step = config.step;

	this.setProgress = function(value) {
		this.bar.width(value + '%');
	}

	this.getProgress = function() {
		return this.toPercentage(this.bar.width());
	}

	this.startInterval = function() {
		let that = this;
		this.interval = setInterval(function() {
			that.setProgress(that.getProgress() + that.step);
			if(that.getProgress() >= 100) {
				that.stopInterval();
			}
		}, this.delay);
	}

	this.stopInterval = function() {
		if(this.interval) { 
			clearInterval(this.interval);
			this.interval = null;
		}
	}

	this.finished = function() {
		this.setProgress(100);
		this.stopInterval();
	}

	this.toPercentage = function(width) {
		let parentWidth = this.bar.parent().width();
		return Math.floor(width * 100 / parentWidth);
	}

	this.setProgress(0);
}