function ChallengeManager(options) {
	this.action = options.save.action;
	this.saveBtn = $(options.save.selector);

	// editors references
	this.markdownEditor = options.editors.markdownEditor;
	this.initialSolutionEditor = options.editors.initialSolutionEditor;
	this.completeSolutionEditor = options.editors.completeSolutionEditor;
	this.exampleTestEditor = options.editors.exampleTestEditor;
	this.finalTestEditor = options.editors.finalTestEditor;

	this.onSave = function() {
		let that = this;
		this.saveBtn.click(function() {
	    let data = that.inputsToObject(that.getInputs());
	    let saveURL = that.generateURL();

	    axios[that.action](saveURL, {
	      challenge: data
	    }, { responseType: 'json' })
	    .then(function(response) {
	    	let translation = response.data;
	    	if(that.action === 'post') {
	    		that.action = 'patch';
	    		window.location.replace(that.generateURL(translation.challenge.id, translation.language));
	    	}
		  })
	    .catch(function(error) {
		    console.log(error);
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
		let that = this;
		['markdown', 'initialSolution', 'completeSolution', 'exampleTest', 'finalTest']
			.forEach(function(editorName) {
				editorName += 'Editor';
				that[editorName].save();
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

	this.init = function() {
		this.onSave();
	}

	this.init();
}