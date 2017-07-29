import Progressbar from './Progressbar';
import TreeView from './TreeView';
import Response from './Response';
import { runCode, resetChallengeCode } from 'helpers/api'
import { RUNNER_PROGRESSBAR_DELAY, 
  RUNNER_PROGRESSBAR_STEP } from 'config/constants';

let RunnerUI = {
  init(config) {
    this._rootSelector = config.root;
    this._contentSelector = config.content;
    this._treeView = null;
    this._progressbar = new Progressbar({ delay: RUNNER_PROGRESSBAR_DELAY, step: RUNNER_PROGRESSBAR_STEP });
  },

  sendRequest(config, callback) {
    this._setup();

    if (typeof callback === 'function') { 
      callback();
    }

    return new Promise((resolve, reject) => {
      runCode(config.url, config.data)
      .then((response) => {
        this._successfulRequest.call(this, response);
        resolve(response);
      })
      .catch((error) => {
        this._failedRequest.call(this, error);
        reject(error);
      });
    });
  },

  resetChallengeCode() {
    return resetChallengeCode();
  },

  _successfulRequest(res) {
    this._displayResponse(new Response(res));
    this._progressbar.finished();
  },

  _failedRequest(error) {
    this._progressbar.finished();
  },

  _setResponse(response) {
    this._response = response;
    this._result = this._response.getResult();
  },

  _refreshTree() {
    this._destroyTreeBox();

    this._treeView = new TreeView({
      root: this._rootSelector,
      tree: this._contentSelector
    });
  },

  _destroyTreeBox() {
    if (this._treeView && this._treeView.isAlive()) {
      this._treeView.destroy();
    }
  },

  _setup() {
    this._displayPendingHeader();
    this._destroyTreeBox();
    $(this._contentSelector).empty();
    this._progressbar.start();
  },

  _displayResponse(response) {
    this._refreshTree();
    this._setResponse(response);
    this._displayResponseHeader();
    
    if (this._response.hasEmptyCode()) {
      this._displayEmptyCodeError();
    } else if (this._response.hasErrors()) {
      this._displayErrors();
    } else {
      this._displayTree();
    }
    this._displayBorder(this._result.completed);
  },

  _displayHeader(message) {
    $(`${this._rootSelector} .header`).html(message);
  },

  _displayResponseHeader() {
    this._displayHeader(`
      Tiempo: ${this._response.getExecutionTime()}ms Pasados: ${this._result.passed} Fallidos: ${this._result.failed}
    `);
  },

  _displayPendingHeader() {
    this._displayHeader(`
      <p class="loading-dots">
        Estado: Ejecutando tu código<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
      </p>
    `);
  },

  _displayErrors() {
    this._displayErrorBox(this._response.getErrors());
  },

  _displayEmptyCodeError() {
    this._displayErrorBox('No se envió código, no hay nada que ejecutar.');
  },

  _displayErrorBox(message) {
    this._setOutputType('error-box');
    const $root = $(this._contentSelector);
    $root.empty();
    const $errorBlock = $('<div class="box"></div>');
    const $pre = $('<pre></pre>');
    $pre.text(message);
    $errorBlock.append($pre);
    $root.append($errorBlock);
  },

  _displayTree() {
    this._setOutputType('treeview-box');
    this._treeView.display(this._response.formatData());
  },

  _displayBorder(completed) {
    let $border = $(`${this._rootSelector} .body`).removeClass('-passed -failed');
    $border.addClass(completed ? '-passed' : '-failed');
  },

  _setOutputType(className) {
    $(this._contentSelector)
      .removeClass('treeview-box error-box')
      .addClass(`content ${className}`);
  }
}

export default RunnerUI;