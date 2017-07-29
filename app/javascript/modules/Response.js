class Response {
  constructor(response) {
    this.response = response;
    this.output = response.result.output;
  }

  formatData() {
    this._convertProperties(this.output);
    return this.output;
  }

  hasErrors() {
    return this.response.result.errors > 0 || this.response.exit_code === 1;
  }

  hasEmptyCode() {
    return this.response.status === 'empty_code';
  }

  getErrors() {
    return this.response.result.error || this.response.stderr;
  }

  getResult() {
    return this.response.result;
  }

  getExecutionTime() {
    return this.response.execution_time;
  }

  _generateText(block) {
    let str = '<span';
    if (this._isCompletedin(block)) {
      str += `><small>Completado en ${block.v}ms</small></span>`;
    } else if(this._isDescribe(block) || this._isIt(block)) {
      str += ` class="block-${this._getStatusClass(block)}">${block.v}`;
      if (this._isIt(block)) {
        str += ` ${this._generateStatsHTML(block.items)}`;
      } 
      str += '</span>';
    } else {
      str += ` class="${block.t}"><i class="fa fa-${(block.t === 'passed' ? 'check' : 'close')}"></i>${block.v}</span>`;
    }
    return str;
  }

  _passed(block) {
    return block.filter((object) => object.t === 'passed');
  }

  _failed(block) {
    return block.filter((object) => object.t === 'failed');
  }

  _generateStatsHTML(block) {
    return `(
      <span class="passed">${this._passed(block).length} Pasados</span>, 
      <span class="failed">${this._failed(block).length} Fallidos</span>
    )`;
  }

  _isDescribe(block) {
    return block.t === 'describe';
  }

  _isIt(block) {
    return block.t === 'it';
  }

  _isCompletedin(block) {
    return block.t === 'completedin';
  }

  _getStatusClass(block) {
    return block.p ? 'passed' : 'failed';
  }

  _convertProperties(output) {
    output.forEach((block) => {
      block.text = this._generateText(block);
      if (block.items) {
        block.children = block.items;
        delete block.items;
        this._convertProperties(block.children);
      }
    });
  }
}

export default Response;