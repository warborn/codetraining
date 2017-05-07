function ChallengeManager(options) {
	this.action = 'post'; // default action
	this.saveBtn = $(options.selectors.save);
	this.insertBtn = $(options.selectors.insert);
	this.editors = options.editors;

	this.onSave = function() {
		let that = this;
		this.saveBtn.click(function() {
	    let data = that.inputsToObject(that.getInputs());
	    let saveURL = that.generateURL();

			let progressbar = new Progressbar({ delay: 400, step: 10 });
			progressbar.startInterval();
	    axios[that.action](saveURL, {
	      challenge: data
	    }, { responseType: 'json' })
	    .then(function(response) {
	    	let translation = response.data;
	    	if(that.action === 'post') {
	    		that.action = 'patch';
	    		window.location.replace(that.generateURL(translation.challenge.id, translation.language));
	    	}
	    	progressbar.finished();
		  })
	    .catch(function(error) {
		    console.log(error.response);
		    Notifier.fromError(error.response.data.errors);
	    	progressbar.finished();
		  });
		});
	}

	this.onInsertExample = function() {
		let language = 'javascript';
		let that = this;
		this.insertBtn.click(function() {
			axios.get('/challenges/example/' + language, {}, { responseType: 'json' })
	    .then(function(response) {
	      example = response.data;
	      that.initialSolutionEditor.setValue(example.setup);
	      that.completeSolutionEditor.setValue(example.answer);
	      that.finalTestEditor.setValue(example.fixture);
	    });
	  });
	}

	this.getInputs = function() {
	  this.refreshEditorValues();
		return $('form input, form select, form textarea').toArray();
	}

	this.inputsToObject = function(inputs) {
		return inputs.reduce(function(prev, current) {
			if(current.name) {
      	prev[current.name] = current.value;
      }
      return prev;
    }, {});
	}

	this.refreshEditorValues = function() {
		this.forEachEditor(function(editor) {
			editor.save();
		});
	}

	this.generateURL = function(challengeID, language) {
		if(this.action === 'post') {
			return '/challenges';
		} else {
			challengeID = challengeID || $('form').data('challenge-id');
			language = language || $('form').data('language');
			return '/challenges/' + challengeID + '/edit/' + language;
		}
	}

	this.getAction = function() {
		return $('input[name=_method]').length > 0 ? 'patch' : 'post';
	}

	this.attachEditors = function() {
		// attach each editor object to the ChallengeManager instance
		this.forEachEditor(function(editor) {
			this[editorName] = editor;
		})
	}

	this.forEachEditor = function(callback) {
		for(editorName in this.editors) {
			if(this.editors.hasOwnProperty(editorName)) {			
				callback.call(this, options.editors[editorName]);
			}
		}
	}

	this.init = function() {
		this.onSave();
		this.onInsertExample();
		this.action = this.getAction();
		this.attachEditors();
	}

	this.init();
}