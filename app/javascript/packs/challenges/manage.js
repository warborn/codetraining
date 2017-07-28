import TabComponent from 'modules/TabComponent';
import CodeEditor from 'modules/CodeEditor';
import RunnerUI from 'modules/RunnerUI';
import ChallengeManager from 'modules/ChallengeManager';
import { setupScrollbars, initMarked } from 'helpers/utils';

$(document).ready(function() { 
  // setup perfectScrollbar for markdown section
  setupScrollbars(['.scroll']);
  // setup marked for markdown
  const marked = initMarked();

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
    { mode: 'markdown', lineNumbers: false, theme: 'material' });

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

  RunnerUI.init({
    root: '#output',
    content: '#output-body'
  });

  const validateButton = $('#validate-btn');
  validateButton.click(function(e) {
    let runnerData = {
      url: '/run',
      data: {
        code: completeSolutionEditor.getValue(),
        fixture: finalTestEditor.getValue()
      }
    }

    RunnerUI.sendRequest(runnerData, function() {
      $('.collapse').show();
    })
    .then(function(res) {
      //
    }).
    catch(function(error) {
      console.log(error);
    });
  });

  // menu event handler
  let challengeManager = new ChallengeManager({ 
    selectors: { 
      root: '#challenge-form',
      save: '#save-btn',
      reset: '#reset-btn',
      delete: '#delete-btn',
      insert: '#insert-btn'
    },
    editors: {
      markdownEditor: markdownEditor,
      initialSolutionEditor: initialSolutionEditor,
      completeSolutionEditor: completeSolutionEditor,
      exampleTestEditor: exampleTestEditor,
      finalTestEditor: finalTestEditor
    }
  });

});