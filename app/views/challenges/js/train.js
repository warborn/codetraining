$(document).on('turbolinks:load', function() {
  // setup perfectScrollbar for practice exercise section
	setupScrollbars(['.scroll']);

  // setup marked and highlightjs library to use markdown for exercise details
  initMarked();

  let markdown = $('#markdown-test')[0].textContent;
	$('#description .content')[0].innerHTML = marked(markdown);

  // practice exercise 

  // setup codemirror code and test areas
  let codeStr = 'Array.prototype.numeroDeOcurrencias = function(val){\n  return this.filter(e => e === val).length; \n}';
  let testStr = "var arr = [4, 0, 4, 'a'];\n\ndescribe('Numeros', function() {\n  it('Deberia aceptar numeros', function() {\n    Test.assertEquals(arr.numeroDeOcurrencias(4), 2);\n    Test.assertEquals(arr.numeroDeOcurrencias(0), 1);\n  });\n});\n\ndescribe('Letras', function() {\n  it('Deberia aceptar letras', function() {\n    Test.assertEquals(arr.numeroDeOcurrencias('a'), 1);\n  });\n});";

  let codeEditor = new CodeEditor('#code-area', 
  	{ size: { width: '100%', height: 250 } }, codeStr);
  let testEditor = new CodeEditor('#test-area', 
  	{ size: { width: '100%', height: 150 } }, testStr);

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

		let progressbar = new Progressbar({
			root: '.progress-bar', delay: 800, step: 10
		});

		progressbar.startInterval();

		let runnerData = {
			url: '/run',
			code: codeEditor.getValue(),
			fixture: codeEditor.getValue()
		}

		let runner = new Runner(runnerData);
		runner.send()
		.then(function(res) {
			progressbar.finished();

			let response = new Response(res);
			RunnerUI.displayResponse(response);
		})
		.catch(function(error) {
			console.log(error);
			progressbar.finished();
		});
	});
});