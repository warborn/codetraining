import Runner from './Runner'
import Progressbar from './Progressbar'
import TreeView from './TreeView'
import Response from './Response'

let RunnerUI = {
  init: function(config) {
    this.rootSelector = config.root;
    this.contentSelector = config.content;
    this.treeView = null;
    this.runner = new Runner();
    this.progressbar = new Progressbar({ delay: 200, step: 5 });
  },

  sendRequest: function(config, callback) {
    let that = this;
    this.setup();
    this.runner.setConfig(config);
    if(typeof callback === 'function') callback();
    return new Promise(function(resolve, reject) {
      that.runner.send()
      .then(function(response) {
        that.successfulRequest.call(that, response);
        resolve(response);
      })
      .catch(function(error) {
        that.failedRequest.call(that, error);
        reject(error);
      });
    });
  },

  successfulRequest: function(res) {
    this.displayResponse(new Response(res));
    this.progressbar.finished();
  },

  failedRequest: function(error) {
    this.progressbar.finished();
  },

  setResponse: function(response) {
    this.response = response;
    this.result = this.response.getResult();
  },

  refreshTree: function() {
    this.destroyTreeBox();

    this.treeView = new TreeView({
      root: this.rootSelector,
      tree: this.contentSelector
    });
  },

  destroyTreeBox: function() {
    if(this.treeView && this.treeView.isAlive()) {
      this.treeView.destroy();
    }
  },

  setup: function() {
    this.displayPendingHeader();
    this.destroyTreeBox();
    $(this.contentSelector).empty();
    this.progressbar.start();
  },

  displayResponse: function(response) {
    this.refreshTree();
    this.setResponse(response);
    this.displayResponseHeader();
    
    if(this.response.hasEmptyCode()) {
      this.displayEmptyCodeError();
    } else if(this.response.hasErrors()) {
      this.displayErrors();
    } else {
      this.displayTree();
    }
    this.displayBorder(this.result.completed);
  },

  displayHeader: function(message) {
    $(this.rootSelector + ' .header').html(message);
  },

  displayResponseHeader: function() {
    this.displayHeader('Tiempo: ' + this.response.getExecutionTime() + 'ms Pasados: ' + this.result.passed + ' Fallidos: '  + this.result.failed);
  },

  displayPendingHeader: function() {
    this.displayHeader('<p class="loading-dots">Estado: Ejecutando tu código<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p>');
  },

  displayErrors: function() {
    this.displayErrorBox(this.response.getErrors());
  },

  displayEmptyCodeError: function() {
    this.displayErrorBox('No se envió código, no hay nada que ejecutar.');
  },

  displayErrorBox: function(message) {
    this.setOutputType('error-box');
    const $root = $(this.contentSelector);
    $root.empty();
    const $errorBlock = $('<div class="box"></div>');
    const $pre = $('<pre></pre>');
    $pre.text(message);
    $errorBlock.append($pre)
    $root.append($errorBlock);
  },

  displayTree: function() {
    this.setOutputType('treeview-box');
    this.treeView.display(this.response.formatData());
  },

  displayBorder: function(completed) {
    let $border = $(this.rootSelector + ' .body').removeClass('-passed -failed');
    $border.addClass(completed ? '-passed' : '-failed');
  },

  setOutputType: function(className) {
    $(this.contentSelector)
      .removeClass('treeview-box error-box')
      .addClass('content ' + className);
  }
}

export default RunnerUI