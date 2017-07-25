import CodeMirrorFactory from './CodeMirrorFactory'

function CodeEditor(selector, options, value) {
  this.constructor = function() {
    $(selector).siblings().remove();
    this.editor = CodeMirrorFactory.create($(selector)[0], options);
    if(value) {
      this.setValue(value);
    }
    this.refresh()
    let that = this
    setTimeout(function() {
        that.refresh();
    }, 100);
  }

  this.setValue = function(value) {
    this.editor.doc.setValue(value);
  }

  this.getValue = function() {
    this.editor.save();
    return this.editor.doc.getValue();
  }

  this.clear = function() {
    this.setValue('');
  }

  this.save = function() {
    this.editor.save();
  }

  this.refresh = function() {
    this.editor.refresh();
  }

  this.constructor();
}

export default CodeEditor