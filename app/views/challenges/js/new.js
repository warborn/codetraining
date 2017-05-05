 $(document).on('ready', function() {	
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

    axios.get('/challenges/example/' + language, {

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
    runner.send(function() {
      $('.collapse').show();
      RunnerUI.setup();
    })
    .then(function(res) {
      let response = new Response(res);
      RunnerUI.displayResponse(response);
    }).
    catch(function(error) {
      console.log(error);
    })
  });

  // menu event handler
  $('#save-btn').click(function() {
    let inputs = $('form input, form select').toArray();
    let data = inputs.reduce(function(prev, current) {
      prev[current.name] = current.value;
      return prev;
    }, {});

    data.description = markdownEditor.getValue();
    data.initial_solution = initialSolutionEditor.getValue();
    data.complete_solution = completeSolutionEditor.getValue();
    data.example_fixture = exampleTestEditor.getValue();
    data.final_fixture = finalTestEditor.getValue();

    axios.post('/challenges', {
      challenge: data
    }, { responseType: 'json' })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  });

 });