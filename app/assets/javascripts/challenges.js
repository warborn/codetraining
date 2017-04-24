$(document).ready(function() {
  // setup perfectScrollbar for practice exercise section
  setupScrollbars(['#markdown-description', '#preview']);

  // setup marked and highlightjs library to use markdown for exercise details
  initMarked();

  // setup exercise description preview tabs
  $('#description-preview-tab a').click(function (e) {
    e.preventDefault();
    let id = this.href.replace(/.+#/g, '');
    let tabContent = $('#' + id).parent();

    if(id === 'preview') {
      markdownEditor.save();
      markdownPreview.html(marked(markdownArea.value));
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
  let finalTestEditor = CodeMirrorFactory.create(finalTestArea)

  // setup code editor for challenge solutions
  let exampleTestArea = $('#example-test-area')[0];
  let exampleTestEditor = CodeMirrorFactory.create(exampleTestArea)
});

