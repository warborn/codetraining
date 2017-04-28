function CodeEditor(selector, options, value) {
	this.constructor = function() {
		this.editor = CodeMirrorFactory.create($(selector)[0], options);
		if(value) {
			this.editor.doc.setValue(value);
		}
	}

	this.setValue = function(value) {
		this.editor.doc.setValue(value);
	}

	this.getValue = function() {
		this.editor.save();
		return this.editor.doc.getValue();
	}

	this.refresh = function() {
		this.editor.refresh();
	}

	this.constructor();
}