$(document).on('turbolinks:load', function() {
  // setup perfectScrollbar for practice exercise section
	setupScrollbars(['.scroll']);

  // setup marked and highlightjs library to use markdown for exercise details
  initMarked();

  let markdown = $('#markdown-test')[0].textContent;
	$('#description .content')[0].innerHTML = marked(markdown);

  // practice exercise 

  // setup codemirror code and test areas
  let codeArea = $('#code-area')[0];
  let testArea = $('#test-area')[0];

  let codeStr = 'Array.prototype.numeroDeOcurrencias = function(val){\n  return this.filter(e => e === val).length; \n}';
  let testStr = "var arr = [4, 0, 4, 'a'];\n\ndescribe('Numeros', function() {\n  it('Deberia aceptar numeros', function() {\n    Test.assertEquals(arr.numeroDeOcurrencias(4), 2);\n    Test.assertEquals(arr.numeroDeOcurrencias(0), 1);\n  });\n});\n\ndescribe('Letras', function() {\n  it('Deberia aceptar letras', function() {\n    Test.assertEquals(arr.numeroDeOcurrencias('a'), 1);\n  });\n});";

  let codeEditor = CodeMirrorFactory.create(codeArea, { size: { width: '100%', height: 250 } });
  let testEditor = CodeMirrorFactory.create(testArea, { size: { width: '100%', height: 150 } });
  codeEditor.doc.setValue(codeStr);
  testEditor.doc.setValue(testStr);

  // setup exercise details tabs
  $('#details-tab a').click(function (e) {
    e.preventDefault();
    let id = this.href.replace(/.+#/g, '');
    let tabContent = $('#' + id).parent();

    if(id === 'output') {
      tabContent.addClass('output');
      tabContent.removeClass('description');
    } else {
      tabContent.addClass('description');
      tabContent.removeClass('output');
    }

    $(this).tab('show');
  });

  var submitButton = document.querySelector('button.test');
	var progressBar = document.querySelector('.progress-bar');

	function setProgress(progressBar, value) {
		progressBar.style.width = value + '%';
	}

	function getProgress(progressBar) {
		return parseInt(progressBar.style.width.replace('/%/', ''));
	}

	RunnerUI.init({
		root: '#output',
		content: '#output-body'
	});

	submitButton.addEventListener('click', function(e) {
		$('#details-tab a[href="#output"]').tab('show')
		codeEditor.save();
		testEditor.save();
		setProgress(progressBar, 0);

		var interval = setInterval(function() {
			setProgress(progressBar, getProgress(progressBar) + 10);
			if(getProgress(progressBar) >= 100) {
				clearInterval(interval);
			}
		}, 800);

		let runnerData = {
			url: '/run',
			code: codeArea.value,
			fixture: testArea.value
		}

		let runner = new Runner(runnerData);
		runner.send()
		.then(function(res) {
			setProgress(progressBar, 100);
			clearInterval(interval);

			let response = new Response(res);
			RunnerUI.displayResponse(response);
		})
		.catch(function(error) {
			console.log(error)
			setProgress(progressBar, 100);
			clearInterval(interval);
		});
	});
});