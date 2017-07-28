class ChallengeForm {
  constructor(rootSelector, editors) {
    this.rootSelector = rootSelector;
    this.editors = editors;

    this.attachEditors();
  }

  reset() {
    $('#challenge-form input').not(':hidden')
      .each((index, input) => input.value = '');

    this.forEachEditor((editor) => editor.clear());
  }

  getData() {
    this.refreshEditors();
    return this.inputsToObject(this.getInputs())
  }

  getAction() {
    return $(`${this.rootSelector} input[name=_method]`).length > 0 ? 'patch' : 'post';
  }

  attachEditors() {
    // attach each editor object to the ChallengeManager instance
    this.forEachEditor(function(editor, editorName) {
      this[editorName] = editor;
    });
  }

  forEachEditor(callback) {
    for(let editorName in this.editors) {
      if(this.editors.hasOwnProperty(editorName)) {     
        callback.call(this, this.editors[editorName], editorName);
      }
    }
  }

  refreshEditors() {
    this.forEachEditor((editor) => editor.save());
  }

  getInputs() {
    let selector = ['input', 'select', 'textarea']
      .map((name) => `${this.rootSelector} ${name}`)
      .join(', ');

    return $(selector).toArray();
  }

  inputsToObject(inputs) {
    return inputs.reduce(function(prev, current) {
      if(current.name) {
        prev[current.name] = current.value;
      }
      return prev;
    }, {});
  }
}

export default ChallengeForm;