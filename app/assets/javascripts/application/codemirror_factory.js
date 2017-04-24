// create code mirror editors with default configuration
let CodeMirrorFactory = {
	defaults: {
    lineNumbers: true,
		scrollbarStyle: 'overlay',
		theme: 'material',
		mode: 'javascript',
    matchBrackets: true,
	},
	// return an instance of CodeMirror
	create: function(textArea, options) {
		let config = options ? this.assign(this.defaults, options) : this.defaults;
		let editor = CodeMirror.fromTextArea(textArea, config);

		if(options && options.size) {
			editor.setSize(options.size.width, options.size.height);
		} else {
			editor.setSize('100%', 330);
		}
		return editor;
	},

	// assign two object properties into a new object
	assign: function(object, source) {
		cloned = this.merge({}, object);
		return this.merge(cloned, source);
	},

	// merge objects properties
	merge: function(object, source) {
		for(var key in source) {
			if(source.hasOwnProperty(key) && key !== 'size') {
				object[key] = source[key];
			}
		}
		return object;
	}
}