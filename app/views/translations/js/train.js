$(document).ready(function() {
  // setup perfectScrollbar for practice exercise section
	setupScrollbars(['.scroll']);

  // setup marked and highlightjs library to use markdown for exercise details
  initMarked();

  let markdown = $('#description .content input[type=hidden]').val();
	$('#description .content')[0].innerHTML = marked(markdown);

  // setup codemirror code and test areas
  let codeEditor = new CodeEditor('#code-area', 
  	{ size: { width: '100%', height: 250 } }, $('#code-area').val());
  let testEditor = new CodeEditor('#test-area', 
  	{ size: { width: '100%', height: 150 } }, $('#test-area').val());

  // setup exercise details tabs
  let tabComponent = new TabComponent({
  	root: '#details-tab',
	  tabs: {
			output: function(tabContent) {
				tabContent.addClass('output').removeClass('description');
			},
			description: function(tabContent) {
				tabContent.addClass('description').removeClass('output');
			}
  	}
  });

  var resetChallengeButton = $('#reset-btn');
  var exampleTestButton = $('#example-btn');
  var finalTestButton = $('#attempt-btn');

	RunnerUI.init({
		root: '#output',
		content: '#output-body'
	});

	resetChallengeButton.click(function(e) {
		let progressbar = new Progressbar({ delay: 400, step: 10 });
		progressbar.start();

		axios.get(Router.challenge_path(), {}, { responseType: 'json' })
		.then(function(response) {
			console.log(response);
			codeEditor.setValue(response.data.initial_solution);
			testEditor.setValue(response.data.example_fixture);
			progressbar.finished();
		})
		.catch(function(error) {
			console.log(error.response);
			progressbar.finished();
		});
	});
	
	exampleTestButton.click(function(e) {
		$('#details-tab a[href="#output"]').tab('show');

		let runnerData = {
			url: '/run',
			data: {
				code: codeEditor.getValue(),
				fixture: testEditor.getValue()
			}
		}

		RunnerUI.sendRequest(runnerData)
		.then(function(res) {
			//
		})
		.catch(function(error) {
			console.log(error);
		});
	});

	finalTestButton.click(function(e) {
		$('#details-tab a[href="#output"]').tab('show');

		let runnerData = {
			url: '/run',
			data: {
				code: codeEditor.getValue(),
				fixture: testEditor.getValue(),
				language:  Router.getLanguage(),
				challenge_id: Router.getChallengeID(),
				attempt: true
			}
		}

		RunnerUI.sendRequest(runnerData)
		.then(function(response) {
			if(response.result.completed) {
				Notifier.success('Ejercicio Resuelto', 'Se ha registrado tu solución!');
				setTimeout(function() {
					Router.redirectTo(Router.challenge_solutions_path());
				}, 3000);
			}
		})
		.catch(function(error) {
			console.log(error);
		});
	});

});