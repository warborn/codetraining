 $(document).on('turbolinks:load', function() {	
  // setup perfectScrollbar for markdown description section
  setupScrollbars(['.scroll']);

  // setup exercise description preview tabs
  let tabComponent = new TabComponent({
    root: '#description-preview-tab',
    tabs: {
      preview: function(tabContent) {
        markdownPreview.html(marked(markdownEditor.getValue()));
        tabContent.removeClass('output');
      },
      'markdown-preview': function(tabContent) {
        tabContent.addClass('output');
      }
    }
  });

  // setup code editor for markdown description
  let markdownPreview = $('#preview .content');
  let markdownEditor = new CodeEditor('#markdown-area', 
    { mode: 'markdown', lineNumbers: false });

  // setup test cases tabs
  new TabComponent({ root: '#challenge-solution-tab' })
      .shown(function() {
        completeSolutionEditor.refresh();
        initialSolutionEditor.refresh();
      });

  // setup code editor for challenge solutions
  let completeSolutionEditor = new CodeEditor('#complete-solution-area');

  // setup code editor for challenge solutions
  let initialSolutionEditor = new CodeEditor('#initial-solution-area');

  // setup test cases tabs
  new TabComponent({ root: '#test-cases-tab' })
      .shown(function() {
        finalTestEditor.refresh();
        exampleTestEditor.refresh();
      });

  // setup code editor for challenge solutions
  let finalTestEditor = new CodeEditor('#final-test-area');

  // setup code editor for challenge solutions
  let exampleTestEditor = new CodeEditor('#example-test-area');

  // insert example functionality
  $('#insert-btn').click(retrieveExample);

  function retrieveExample() {
    let language = 'javascript';

    axios.get('/challenge/example/' + language, {

    }, { responseType: 'json' })
    .then(function(response) {
      console.log(response);
      example = response.data;
      initialSolutionEditor.setValue(example.setup);
      completeSolutionEditor.setValue(example.answer);
      finalTestEditor.setValue(example.fixture);
    });
  }

  RunnerUI.init({
    root: '#output',
    content: '#output-body'
  });

  validateButton = $('#validate-btn');
  validateButton.click(function(e) {
    let runnerData = {
      url: '/run',
      code: completeSolutionEditor.getValue(),
      fixture: finalTestEditor.getValue()
    }

    let runner = new Runner(runnerData);
    runner.send()
    .then(function(res) {
      let response = new Response(res);
      $('.collapse').show();
      RunnerUI.displayResponse(response);
    }).
    catch(function(error) {
      console.log(error);
    })
  });

 });