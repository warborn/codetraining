function ChallengeForm(rootSelector, editors) {
  this.rootSelector = rootSelector;
  this.editors = editors;

  this.reset = function() {
    $('#challenge-form input').not(':hidden').each(function(index, input) {
      input.value = '';
    });
    this.forEachEditor(function(editor) {
      editor.clear();
    });
  }

  this.getData = function() {
    this.refreshEditors();
    return this.inputsToObject(this.getInputs())
  }

  this.getAction = function() {
    return $(this.rootSelector + ' input[name=_method]').length > 0 ? 'patch' : 'post';
  }

  this.attachEditors = function() {
    // attach each editor object to the ChallengeManager instance
    this.forEachEditor(function(editor, editorName) {
      this[editorName] = editor;
    })
  }

  this.forEachEditor = function(callback) {
    for(let editorName in this.editors) {
      if(this.editors.hasOwnProperty(editorName)) {     
        callback.call(this, this.editors[editorName], editorName);
      }
    }
  }

  this.refreshEditors = function() {
    this.forEachEditor(function(editor) {
      editor.save();
    });
  }

  this.getInputs = function() {
    let that = this;
    let selector = ['input', 'select', 'textarea'].map(function(name) {
      return that.rootSelector + ' ' + name;
    }).join(', ')
    return $(selector).toArray();
  }

  this.inputsToObject = function(inputs) {
    return inputs.reduce(function(prev, current) {
      if(current.name) {
        prev[current.name] = current.value;
      }
      return prev;
    }, {});
  }

  this.constructor = function() {
    this.attachEditors();
  }

  this.constructor();
}

export default ChallengeForm