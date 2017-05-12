function ChallengeManager(options) {
	this.action = 'post'; // default action
	this.saveBtn = $(options.selectors.save);
	this.insertBtn = $(options.selectors.insert);
	this.resetBtn = $(options.selectors.reset);
	this.deleteBtn = $(options.selectors.delete);
	this.form = new ChallengeForm(options.selectors.root, options.editors);

	this.onSave = function() {
		let that = this;
		this.saveBtn.click(function(e) {
			e.preventDefault();
	    let data = that.form.getData();
	    let saveURL = Router.save_challenge_path(that.action);

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
		    		Router.redirectTo(Router.edit_challenge_path(translation.challenge.id, translation.language));
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
			that.form.reset();
		})
	}

	this.onDelete = function() {
		let that = this;
		this.deleteBtn.click(function(e) {
			e.preventDefault();
			let deleteURL = Router.delete_challenge_path();
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
		    		Router.redirectTo(Router.new_challenge_path());
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
		let that = this;
		this.insertBtn.click(function() {
			axios.get(Router.example_path(), {}, { responseType: 'json' })
	    .then(function(response) {
	      example = response.data;
	      that.form.initialSolutionEditor.setValue(example.setup);
	      that.form.completeSolutionEditor.setValue(example.answer);
	      that.form.finalTestEditor.setValue(example.fixture);
	    });
	  });
	}

	this.init = function() {
		this.onSave();
		this.onReset();
		this.onDelete();
		this.onInsertExample();
		this.action = this.form.getAction();
	}

	this.init();
}