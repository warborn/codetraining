 $(document).on('turbolinks:load', function() {	
  // setup perfectScrollbar for markdown description section
  setupScrollbars(['#markdown-description', '#preview']);

  // setup exercise description preview tabs
  $('#description-preview-tab a').click(function (e) {
    e.preventDefault();
    let id = this.href.replace(/.+#/g, '');
    let tabContent = $('#' + id).parent();

    if(id === 'preview') {
      markdownEditor.save();
      markdownPreview.html(marked(markdownArea.value));
      tabContent.removeClass('output');
    } else {
      tabContent.addClass('output');
    }

    $(this).tab('show');
  });

  // setup code editor for markdown description
  let markdownPreview = $('#preview .content');
  let markdownArea = $('#markdown-area')[0];
  let markdownEditor = CodeMirrorFactory.create(markdownArea, 
    { mode: 'markdown', lineNumbers: false } );

  // setup exercise description preview tabs
  $('#challenge-solution-tab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  $('#challenge-solution-tab a').on('shown.bs.tab', function() {
    completeSolutionEditor.refresh();
    initialSolutionEditor.refresh();
  });  

  // setup code editor for challenge solutions
  let completeSolutionArea = $('#complete-solution-area')[0];
  let completeSolutionEditor = CodeMirrorFactory.create(completeSolutionArea);

  // setup code editor for challenge solutions
  let initialSolutionArea = $('#initial-solution-area')[0];
  let initialSolutionEditor = CodeMirrorFactory.create(initialSolutionArea);

  // setup test cases tabs
  $('#test-cases-tab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  $('#test-cases-tab a').on('shown.bs.tab', function() {
    finalTestEditor.refresh();
    exampleTestEditor.refresh();
  });  

  // setup code editor for challenge solutions
  let finalTestArea = $('#final-test-area')[0];
  let finalTestEditor = CodeMirrorFactory.create(finalTestArea);

  // setup code editor for challenge solutions
  let exampleTestArea = $('#example-test-area')[0];
  let exampleTestEditor = CodeMirrorFactory.create(exampleTestArea);

  // insert example functionality
  $('#insert-btn').click(retrieveExample);

  function retrieveExample() {
    let language = 'javascript';

    axios.get('/challenge/example/' + language, {

    }, { responseType: 'json' })
    .then(function(response) {
      console.log(response);
      example = response.data;
      initialSolutionEditor.doc.setValue(example.setup);
      completeSolutionEditor.doc.setValue(example.answer);
      finalTestEditor.doc.setValue(example.fixture);
    });
  }

  let outputSelector = '#output';

  RunnerUI.init({
    root: outputSelector,
    tree: '#output-body'
  });

  validateButton = $('#validate-btn');
  validateButton.click(function(e) {
    completeSolutionEditor.save();
    finalTestEditor.save();

    let runnerData = {
      url: '/run',
      code: completeSolutionArea.value,
      fixture: finalTestArea.value
    }

    let runner = new Runner(runnerData);
    runner.send()
    .then(function(res) {
      let response = new Response(res);
      $(outputSelector).show();
      RunnerUI.displayResponse(response);
    }).
    catch(function(error) {
      console.log(error);
    })
  });

 });