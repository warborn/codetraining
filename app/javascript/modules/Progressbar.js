import { progressJs } from 'Progress.js';

class Progressbar {
	constructor(config) {
	  this.bar = progressJs();
	  this.delay = config.delay;
	  this.step = config.step;
	}

  start() {
    this.bar.start().autoIncrease(this.step, this.delay);
  }

  finished() {
    this.bar.end();
  }
}

export default Progressbar;