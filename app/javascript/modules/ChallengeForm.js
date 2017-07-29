class ChallengeForm {
  constructor(rootSelector, editors) {
    this._rootSelector = rootSelector;
    this._editors = editors;

    this._attachEditors();
  }

  getData() {
    this._refreshEditors();
    return this._inputsToObject(this._getInputs());
  }

  getAction() {
    return $(`${this._rootSelector} input[name=_method]`).length > 0 ? 'patch' : 'post';
  }

  reset() {
    $('#challenge-form input').not(':hidden')
      .each((index, input) => input.value = '');

    this._forEachEditor((editor) => editor.clear());
  }

  _attachEditors() {
    // attach each editor object to the ChallengeManager instance
    this._forEachEditor(function(editor, editorName) {
      this[editorName] = editor;
    });
  }

  _forEachEditor(callback) {
    for(let editorName in this._editors) {
      if(this._editors.hasOwnProperty(editorName)) {     
        callback.call(this, this._editors[editorName], editorName);
      }
    }
  }

  _refreshEditors() {
    this._forEachEditor((editor) => editor.save());
  }

  _getInputs() {
    let selector = ['input', 'select', 'textarea']
      .map((name) => `${this._rootSelector} ${name}`)
      .join(', ');

    return $(selector).toArray();
  }

  _inputsToObject(inputs) {
    return inputs.reduce(function(prev, current) {
      if (current.name) {
        prev[current.name] = current.value;
      }
      return prev;
    }, {});
  }
}

export default ChallengeForm;