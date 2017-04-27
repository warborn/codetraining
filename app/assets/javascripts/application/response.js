function Response(response) {
  this.response = response;
  this.output = response.result.output;

  this.formatData = function() {
    this.convertProperties(this.output);
    return this.output;
  }

  this.hasErrors = function() {
    return this.response.result.errors > 0;
  }

  this.getErrors = function() {
    return this.response.result.error;
  }

  this.getResult = function() {
    return this.response.result;
  }

  this.generateText = function(block) {
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
  }

  this.passed = function(block) {
    return block.filter(object => object.t === 'passed');
  }

  this.failed = function(block) {
    return block.filter(object => object.t === 'failed');
  }

  this.generateStatsHTML = function(block) {
    return '(<span class="passed">' + this.passed(block).length + ' Pasados</span>, <span class="failed">' + this.failed(block).length + ' Fallidos</failed>)';
  }

  this.isDescribe = function(block) {
    return block.t === 'describe';
  }

  this.isIt = function(block) {
    return block.t === 'it';
  }

  this.isCompletedin = function(block) {
    return block.t === 'completedin';
  }

  this.getStatusClass = function(block) {
    return block.p ? 'passed' : 'failed';
  }

  this.convertProperties = function(output) {
    let that = this;
    output.forEach(function(block) {
      block.text = that.generateText(block);
      if(block.items) {
        block.children = block.items;
        delete block.items;
        that.convertProperties(block.children);
      }
    });
  }
}