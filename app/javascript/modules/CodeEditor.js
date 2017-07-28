import CodeMirrorFactory from './CodeMirrorFactory';

class CodeEditor {
  constructor(selector, options, value) {
    $(selector).siblings().remove();
    
    this.editor = CodeMirrorFactory.create(
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
    this.editor.doc.setValue(value);
  }

  getValue() {
    this.save();
    return this.editor.doc.getValue();
  }

  clear() {
    this.setValue('');
  }

  save() {
    this.editor.save();
  }

  refresh() {
    this.editor.refresh();
  }
}

export default CodeEditor;