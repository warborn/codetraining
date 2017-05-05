$(document).on('ready', function() {
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

  var submitButton = document.querySelector('button.test');

	RunnerUI.init({
		root: '#output',
		content: '#output-body'
	});
	
	submitButton.addEventListener('click', function(e) {
		$('#details-tab a[href="#output"]').tab('show');

		let runnerData = {
			url: '/run',
			code: codeEditor.getValue(),
			fixture: testEditor.getValue()
		}

		RunnerUI.sendRequest(runnerData)
		.then(function(res) {
			//
		})
		.catch(function(error) {
			console.log(error);
		});
	});
});