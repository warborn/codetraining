import Runner from './Runner';
import Progressbar from './Progressbar';
import TreeView from './TreeView';
import Response from './Response';
import { 
  RUNNER_PROGRESSBAR_DELAY, RUNNER_PROGRESSBAR_STEP 
} from 'config/constants';

let RunnerUI = {
  init(config) {
    this.rootSelector = config.root;
    this.contentSelector = config.content;
    this.treeView = null;
    this.runner = new Runner();
    this.progressbar = new Progressbar({ delay: RUNNER_PROGRESSBAR_DELAY, step: RUNNER_PROGRESSBAR_STEP });
  },

  sendRequest(config, callback) {
    this.setup();
    this.runner.setConfig(config);

    if (typeof callback === 'function') { 
      callback();
    }

    return new Promise((resolve, reject) => {
      this.runner.send()
      .then((response) => {
        this.successfulRequest.call(this, response);
        resolve(response);
      })
      .catch((error) => {
        this.failedRequest.call(this, error);
        reject(error);
      });
    });
  },

  successfulRequest(res) {
    this.displayResponse(new Response(res));
    this.progressbar.finished();
  },

  failedRequest(error) {
    this.progressbar.finished();
  },

  setResponse(response) {
    this.response = response;
    this.result = this.response.getResult();
  },

  refreshTree() {
    this.destroyTreeBox();

    this.treeView = new TreeView({
      root: this.rootSelector,
      tree: this.contentSelector
    });
  },

  destroyTreeBox() {
    if (this.treeView && this.treeView.isAlive()) {
      this.treeView.destroy();
    }
  },

  setup() {
    this.displayPendingHeader();
    this.destroyTreeBox();
    $(this.contentSelector).empty();
    this.progressbar.start();
  },

  displayResponse(response) {
    this.refreshTree();
    this.setResponse(response);
    this.displayResponseHeader();
    
    if (this.response.hasEmptyCode()) {
      this.displayEmptyCodeError();
    } else if (this.response.hasErrors()) {
      this.displayErrors();
    } else {
      this.displayTree();
    }
    this.displayBorder(this.result.completed);
  },

  displayHeader(message) {
    $(`${this.rootSelector} .header`).html(message);
  },

  displayResponseHeader() {
    this.displayHeader(`
      Tiempo: ${this.response.getExecutionTime()}ms Pasados: ${this.result.passed} Fallidos: ${this.result.failed}
    `);
  },

  displayPendingHeader() {
    this.displayHeader(`
      <p class="loading-dots">
        Estado: Ejecutando tu código<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
      </p>
    `);
  },

  displayErrors() {
    this.displayErrorBox(this.response.getErrors());
  },

  displayEmptyCodeError() {
    this.displayErrorBox('No se envió código, no hay nada que ejecutar.');
  },

  displayErrorBox(message) {
    this.setOutputType('error-box');
    const $root = $(this.contentSelector);
    $root.empty();
    const $errorBlock = $('<div class="box"></div>');
    const $pre = $('<pre></pre>');
    $pre.text(message);
    $errorBlock.append($pre);
    $root.append($errorBlock);
  },

  displayTree() {
    this.setOutputType('treeview-box');
    this.treeView.display(this.response.formatData());
  },

  displayBorder(completed) {
    let $border = $(`${this.rootSelector} .body`).removeClass('-passed -failed');
    $border.addClass(completed ? '-passed' : '-failed');
  },

  setOutputType(className) {
    $(this.contentSelector)
      .removeClass('treeview-box error-box')
      .addClass(`content ${className}`);
  }
}

export default RunnerUI;