import CodeMirror from 'codemirror';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';

// create code mirror editors with default configuration
let CodeMirrorFactory = {
  _defaults: {
    lineNumbers: true,
    scrollbarStyle: 'overlay',
    theme: 'one-dark',
    mode: 'javascript',
    matchBrackets: true,
  },
  // return an instance of CodeMirror
  create(textArea, options) {
    let config = options ? {...this._defaults, ...options} : this._defaults;
    let editor = CodeMirror.fromTextArea(textArea, config);

    if (options && options.size) {
      editor.setSize(options.size.width, options.size.height);
    } else {
      editor.setSize('100%', 330);
    }

    return editor;
  }
}

export default CodeMirrorFactory;