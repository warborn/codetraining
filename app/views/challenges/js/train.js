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

  var sampleTestButton = $('#example-btn');
  var finalTestButton = $('#attempt-btn');

	RunnerUI.init({
		root: '#output',
		content: '#output-body'
	});
	
	sampleTestButton.click(function(e) {
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
		let matches = window.location.pathname.match(/challenges\/(\d+)\/train\/([a-zA-Z-_\+#]+)/);
		let matchGroup = { ChallengeID: 1, Language: 2 };

		let runnerData = {
			url: '/run',
			data: {
				code: codeEditor.getValue(),
				language:  matches[matchGroup.Language],
				challenge_id: matches[matchGroup.ChallengeID],
				attempt: true
			}
		}

		console.log(runnerData);

		RunnerUI.sendRequest(runnerData)
		.then(function(res) {
			//
		})
		.catch(function(error) {
			console.log(error);
		});
	});

});