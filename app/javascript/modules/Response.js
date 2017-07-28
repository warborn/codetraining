class Response {
  constructor(response) {
    this.response = response;
    this.output = response.result.output;
  }

  formatData() {
    this.convertProperties(this.output);
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

  generateText(block) {
    let str = '<span';
    if (this.isCompletedin(block)) {
      str += `><small>Completado en ${block.v}ms</small></span>`;
    } else if(this.isDescribe(block) || this.isIt(block)) {
      str += ` class="block-${this.getStatusClass(block)}">${block.v}`;
      if (this.isIt(block)) {
        str += ` ${this.generateStatsHTML(block.items)}`;
      } 
      str += '</span>';
    } else {
      str += ` class="${block.t}"><i class="fa fa-${(block.t === 'passed' ? 'check' : 'close')}"></i>${block.v}</span>`;
    }
    return str;
  }

  passed(block) {
    return block.filter((object) => object.t === 'passed');
  }

  failed(block) {
    return block.filter((object) => object.t === 'failed');
  }

  generateStatsHTML(block) {
    return `(
      <span class="passed">${this.passed(block).length} Pasados</span>, 
      <span class="failed">${this.failed(block).length} Fallidos</span>
    )`;
  }

  isDescribe(block) {
    return block.t === 'describe';
  }

  isIt(block) {
    return block.t === 'it';
  }

  isCompletedin(block) {
    return block.t === 'completedin';
  }

  getStatusClass(block) {
    return block.p ? 'passed' : 'failed';
  }

  convertProperties(output) {
    output.forEach((block) => {
      block.text = this.generateText(block);
      if (block.items) {
        block.children = block.items;
        delete block.items;
        this.convertProperties(block.children);
      }
    });
  }
}

export default Response;