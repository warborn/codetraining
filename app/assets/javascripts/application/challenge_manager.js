function ChallengeManager(options) {
	this.action = 'post'; // default action
	this.saveBtn = $(options.selectors.save);
	this.insertBtn = $(options.selectors.insert);
	this.resetBtn = $(options.selectors.reset);
	this.deleteBtn = $(options.selectors.delete);
	this.editors = options.editors;

	this.onSave = function() {
		let that = this;
		this.saveBtn.click(function(e) {
			e.preventDefault();
	    let data = that.inputsToObject(that.getInputs());
	    let saveURL = that.generateURL();

			let progressbar = new Progressbar({ delay: 400, step: 10 });
			progressbar.start();
	    axios[that.action](saveURL, {
	      challenge: data
	    }, { responseType: 'json' })
	    .then(function(response) {
	    	let translation = response.data;
	    	progressbar.finished();
	    	if(that.action === 'post') {
	    			Notifier.success('Se guardó correctamente', 'Ahora puedes editar tu reto!');
		    		setTimeout(function() {
			    	that.action = 'patch';
		    		that.redirectTo(that.generateURL(translation.challenge.id, translation.language));
		    	}, 2000);
	    	} else {
	    		Notifier.success('Se editó correctamente', 'Se han guardado tus cambios!');
	    	}
		  })
	    .catch(function(error) {
		    console.log(error.response);
		    Notifier.fromErrors('No se pudo guardar', error.response.data.errors);
	    	progressbar.finished();
		  });
		});
	}

	this.onReset = function() {
		let that = this;
		this.resetBtn.click(function(e) {
			e.preventDefault();
			$('form')[0].reset();
			that.forEachEditor(function(editor) {
				editor.clear();
			});
		})
	}

	this.onDelete = function() {
		let that = this;
		this.deleteBtn.click(function(e) {
			e.preventDefault();
			let deleteURL = that.generateURL();
			let progressbar = new Progressbar({ delay: 400, step: 10 });
			progressbar.start();
			axios.delete(deleteURL, {}, 
				{ responseType: 'json' })
			.then(function(response) {
				progressbar.finished();
	    	if(that.action === 'patch') {
    			Notifier.success('Se eliminó correctamente', 'Puedes crear un nuevo ejercico ahora!');
	    		setTimeout(function() {
		    	that.action = 'post';
	    		that.redirectTo('/challenges/new');
		    	}, 2000);
	    	}
			})
			.catch(function(error) {
				progressbar.finished();
		    console.log(error.response);
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
			challengeID = challengeID || this.getChallenge();
			language = language || this.getLanguage();
			return '/challenges/' + challengeID + '/edit/' + language;
		}
	}

	this.getChallenge = function() {
		return $('form').data('challenge-id');
	}

	this.getLanguage = function() {
		return $('form').data('language');
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
		this.onReset();
		this.onDelete();
		this.onInsertExample();
		this.action = this.getAction();
		this.attachEditors();
	}

	this.redirectTo = function(url) {
		window.location.replace(url);
	},

	this.init();
}