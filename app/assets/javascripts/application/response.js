let Response = {
  format: function(response) {
    this.response = response;
    this.output = response.result.output;
    this.convertProperties(this.output);
    return this.output;
  },

  hasErrors: function(response) {
    return response.result.errors > 0;
  },

  getErrors: function(response) {
    return response.result.error;
  },

  generateText: function(block) {
    let str = '<span';
    if(this.isCompletedin(block)) {
      str += '><small>Completado en ' + block.v + 'ms</small></span>'
    } else if(this.isDescribe(block) || this.isIt(block)) {
      str += ' class="block-' + this.getStatusClass(block) + '">' + block.v;
      if(this.isIt(block)) {
        str += ' ' + this.generateStatsHTML(block.items);
      } 
      str += '</span>'
    } else {
      str += ' class="' + block.t + '"><i class="fa fa-' + (block.t === 'passed' ? 'check' : 'close') + '"></i>'+ block.v + '</span>';
    }
    return str;
  },

  passed: function(block) {
    return block.filter(object => object.t === 'passed');
  },

  failed: function(block) {
    return block.filter(object => object.t === 'failed');
  },

  generateStatsHTML: function(block) {
    return '(<span class="passed">' + this.passed(block).length + ' Pasados</span>, <span class="failed">' + this.failed(block).length + ' Fallidos</failed>)';
  },

  isDescribe: function(block) {
    return block.t === 'describe';
  },

  isIt: function(block) {
    return block.t === 'it';
  },

  isCompletedin: function(block) {
    return block.t === 'completedin';
  },

  getStatusClass: function(block) {
    return block.p ? 'passed' : 'failed';
  },

  convertProperties: function(response) {
    let that = this;
    response.forEach(function(block) {
      block.text = that.generateText(block);
      if(block.items) {
        block.children = block.items;
        delete block.items;
        that.convertProperties(block.children);
      }
    });
  }
}