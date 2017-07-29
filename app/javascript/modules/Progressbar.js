import { progressJs } from 'Progress.js';

class Progressbar {
	constructor(config) {
	  this._bar = progressJs();
	  this._delay = config.delay;
	  this._step = config.step;
	}

  start() {
    this._bar.start().autoIncrease(this._step, this._delay);
  }

  finished() {
    this._bar.end();
  }
}

export default Progressbar;