import TabComponent from 'modules/TabComponent';
import CodeEditor from 'modules/CodeEditor';
import RunnerUI from 'modules/RunnerUI';
import ChallengeManager from 'modules/ChallengeManager';
import { initMarked } from 'helpers/utils';
import Split from 'split.js'

$(document).ready(function() { 
  // setup marked for markdown
  const marked = initMarked();

  // setup challenge description preview tabs
  let tabComponent = new TabComponent({
    root: '#manage-challenge-tab',
    tabs: {
      details: function(tabContent) {
        tabContent.removeClass('output');
      },
      preview: function(tabContent) {
        markdownPreview.html(marked(markdownEditor.getValue()));
        tabContent.removeClass('output');
      },
      'markdown-preview': function(tabContent) {
        tabContent.addClass('output');
      },
      output: function(tabContent) {
        tabContent.addClass('output');
      }
    }
  });

  tabComponent.shown(function() {
    markdownEditor.refresh();
  })

  // setup code editor for markdown description
  let markdownPreview = $('#preview .content');
  let markdownEditor = new CodeEditor('#markdown-area', 
    { mode: 'markdown', lineWrapping: true, theme: 'material' });

  // setup test cases tabs
  new TabComponent({ root: '#challenge-solution-tab' })
      .shown(function() {
        completeSolutionEditor.refresh();
        initialSolutionEditor.refresh();
      });

  // setup code editor for challenge solutions
  let completeSolutionEditor = new CodeEditor('#complete-solution-area', { lineWrapping: true });

  // setup code editor for challenge solutions
  let initialSolutionEditor = new CodeEditor('#initial-solution-area', { lineWrapping: true });

  // setup test cases tabs
  new TabComponent({ root: '#test-cases-tab' })
      .shown(function() {
        finalTestEditor.refresh();
        exampleTestEditor.refresh();
      });

  // setup code editor for challenge solutions
  let finalTestEditor = new CodeEditor('#final-test-area', { lineWrapping: true });

  // setup code editor for challenge solutions
  let exampleTestEditor = new CodeEditor('#example-test-area', { lineWrapping: true });

  RunnerUI.init({
    root: '#output',
    content: '#output-body'
  });

  const validateButton = $('#validate-btn');
  validateButton.click(function(e) {
    $('#manage-challenge-tab a[href="#output"]').tab('show');

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
      console.error(error);
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

  // Setup resizable panels
  Split(['#panel-one', '#panel-two'], {
    elementStyle: function (dimension, size, gutterSize) {
        return { 'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)' }
    },
    gutterStyle: function (dimension, gutterSize) {
        return { 'flex-basis':  gutterSize + 'px' }
    },
    onDragEnd: function() {
      markdownEditor.refresh();
      initialSolutionEditor.refresh();
      completeSolutionEditor.refresh();
      exampleTestEditor.refresh();
      finalTestEditor.refresh();
    },
    sizes: [35, 65]
  });

  Split(['#panel-three', '#panel-four'], {
    direction: 'vertical',
    sizes: [60, 40]
  });

});