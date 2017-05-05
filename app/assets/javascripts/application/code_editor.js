function CodeEditor(selector, options, value) {
	this.constructor = function() {
		$(selector).siblings().remove();
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

	this.save = function() {
		this.editor.save();
	}

	this.refresh = function() {
		this.editor.refresh();
	}

	this.constructor();
}