import CodeMirrorFactory from './CodeMirrorFactory';

class CodeEditor {
  constructor(selector, options, value) {
    $(selector).siblings().remove();
    
    this._editor = CodeMirrorFactory.create(
      $(selector)[0],
      options
    );

    if (value) {
     this.setValue(value);
    }

    setTimeout(() => {
      this.refresh();
    }, 100)
  }

  setValue(value) {
    this._editor.doc.setValue(value);
  }

  getValue() {
    this.save();
    return this._editor.doc.getValue();
  }

  clear() {
    this.setValue('');
  }

  save() {
    this._editor.save();
  }

  refresh() {
    this._editor.refresh();
  }
}

export default CodeEditor;