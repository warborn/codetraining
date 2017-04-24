$(document).ready(function() {
  // setup perfectScrollbar for practice exercise section
  $('#markdown-description').perfectScrollbar({wheelSpeed: 0.3, maxScrollbarLength: 80});
  $('#preview').perfectScrollbar({wheelSpeed: 0.3, maxScrollbarLength: 80});

  // setup marked and highlightjs library to use markdown for exercise details
  hljs.initHighlightingOnLoad();
  marked.setOptions({
    highlight: function(code, language) {
      result = hljs.getLanguage(language) ? hljs.highlight(language, code) : hljs.highlightAuto(code);
      return result.value;
    }
  });

  // setup exercise description preview tabs
  $('#description-preview-tab a').click(function (e) {
    e.preventDefault();
    let id = this.href.replace(/.+#/g, '');
    let tabContent = $('#' + id).parent();

    if(id === 'preview') {
      markdownMirror.save();
      markdownPreview.html(marked(markdownArea.value));
    }

    $(this).tab('show');
  });

  // setup code editor for markdown description
  let markdownPreview = $('#preview .content');
  let markdownArea = $('#markdown-area')[0];
  let markdownMirror = CodeMirror.fromTextArea(markdownArea, {
    'scrollbarStyle': 'overlay',
    'theme': 'material',
    'mode': 'markdown'
  });
  markdownMirror.setSize('100%', 330);

  // setup exercise description preview tabs
  $('#challenge-solution-tab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  $('#challenge-solution-tab a').on('shown.bs.tab', function() {
    completeSolutionMirror.refresh();
    initialSolutionMirror.refresh();
  });  

  // setup code editor for challenge solutions
  let completeSolutionArea = $('#complete-solution-area')[0];
  let completeSolutionMirror = CodeMirror.fromTextArea(completeSolutionArea, {
    lineNumbers: true,
    'scrollbarStyle': 'overlay',
    'theme': 'material',
    'mode': 'javascript',
    matchBrackets: true
  });

  // setup code editor for challenge solutions
  let initialSolutionArea = $('#initial-solution-area')[0];
  let initialSolutionMirror = CodeMirror.fromTextArea(initialSolutionArea, {
    lineNumbers: true,
    'scrollbarStyle': 'overlay',
    'theme': 'material',
    'mode': 'javascript',
    matchBrackets: true
  });



  // setup test cases tabs
  $('#test-cases-tab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  $('#test-cases-tab a').on('shown.bs.tab', function() {
    finalTestMirror.refresh();
    exampleTestMirror.refresh();
  });  

  // setup code editor for challenge solutions
  let finalTestArea = $('#final-test-area')[0];
  let finalTestMirror = CodeMirror.fromTextArea(finalTestArea, {
    lineNumbers: true,
    'scrollbarStyle': 'overlay',
    'theme': 'material',
    'mode': 'javascript',
    matchBrackets: true
  });

  // setup code editor for challenge solutions
  let exampleTestArea = $('#example-test-area')[0];
  let exampleTestMirror = CodeMirror.fromTextArea(exampleTestArea, {
    lineNumbers: true,
    'scrollbarStyle': 'overlay',
    'theme': 'material',
    'mode': 'javascript',
    matchBrackets: true
  });
});

