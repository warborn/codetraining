import TabComponent from 'modules/TabComponent';
import CodeEditor from 'modules/CodeEditor';
import RunnerUI from 'modules/RunnerUI';
import Router from 'modules/Router';
import Progressbar from 'modules/Progressbar';
import Notifier from 'modules/Notifier';
import { initMarked } from 'helpers/utils';
import { 
  PROGRESSBAR_DELAY, PROGRESSBAR_STEP, CHALLENGE_PASSED_REDIRECT_TIME 
} from 'config/constants';
import Split from 'split.js';

$(document).ready(function() {
  // setup marked and highlightjs library to use markdown for challenge details
  const marked = initMarked();

  let markdown = $('#description .content input[type=hidden]').val();
  $('#description .content')[0].innerHTML = marked(markdown);

  // setup codemirror code and test areas
  let codeEditor = new CodeEditor('#code-area', { lineWrapping: true }, $('#code-area').val());
  let testEditor = new CodeEditor('#test-area', { lineWrapping: true }, $('#test-area').val());

  // setup challenge details tabs
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

  const resetChallengeButton = $('#reset-btn');
  const exampleTestButton = $('#example-btn');
  const finalTestButton = $('#attempt-btn');

  RunnerUI.init({
    root: '#output',
    content: '#output-body'
  });

  resetChallengeButton.click(function(e) {
    let progressbar = new Progressbar({ delay: PROGRESSBAR_DELAY, step: PROGRESSBAR_STEP });
    progressbar.start();
    
    RunnerUI.resetChallengeCode()
      .then(function(response) {
        codeEditor.setValue(response.initial_solution);
        testEditor.setValue(response.example_fixture);
        progressbar.finished();
      })
      .catch(function(error) {
        console.error(error.response);
        progressbar.finished();
      })

  });
  
  exampleTestButton.click(function(e) {
    $('#details-tab a[href="#output"]').tab('show');

    let runnerData = {
      url: '/run',
      data: {
        code: codeEditor.getValue(),
        fixture: testEditor.getValue()
      }
    }

    RunnerUI.sendRequest(runnerData)
    .then(function(res) {
      //
    })
    .catch(function(error) {
      console.error(error);
    });
  });

  finalTestButton.click(function(e) {
    $('#details-tab a[href="#output"]').tab('show');

    let runnerData = {
      url: '/run',
      data: {
        code: codeEditor.getValue(),
        fixture: testEditor.getValue(),
        language:  Router.getLanguage(),
        challenge_id: Router.getChallengeID(),
        attempt: true
      }
    }

    RunnerUI.sendRequest(runnerData)
    .then(function(response) {
      if (response.result.completed) {
        Notifier.success('Ejercicio Resuelto', 'Se ha registrado tu solución!');
        setTimeout(function() {
          Router.redirectTo(Router.challenge_solutions_path());
        }, CHALLENGE_PASSED_REDIRECT_TIME);
      }
    })
    .catch(function(error) {
      console.error(error);
    });
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
      codeEditor.refresh();
      testEditor.refresh();
    },
    sizes: [35, 65]
  });

  Split(['#panel-three', '#panel-four'], {
    direction: 'vertical',
    sizes: [60, 40]
  });

});