import Ps from 'perfect-scrollbar/jquery';
import hljs from 'highlight.js';
import marked from 'marked';
import { WHEEL_SPEED, FAST_WHEEL_SPEED, MAX_SCROLLBAR_LENGTH } from 'config/constants';

export function setupScrollbars(selectors, fastSpeed = false) {
  // Use the jQuery adaptor
  Ps($)
  
  selectors.forEach(function(selector) {
    $(selector).perfectScrollbar({
      wheelSpeed: fastSpeed ? FAST_WHEEL_SPEED : WHEEL_SPEED,
      maxScrollbarLength: MAX_SCROLLBAR_LENGTH
    });
  });
}

export function initMarked() {
  // setup marked and highlightjs library to use markdown for challenge details
  hljs.initHighlightingOnLoad();
  marked.setOptions({
    highlight: function(code, language) {
      let result = hljs.getLanguage(language) ? hljs.highlight(language, code) : hljs.highlightAuto(code);
      return result.value;
    }
  });

  return marked;
}

export function bindCodeMirrorFullScreen(editors) {
  $('.expander-button').click(function(e) {
    const editorNumber = this.dataset.editor;
    editors[editorNumber - 1].setOption('fullScreen', true);
    $('.compress-button').attr('data-editor', editorNumber).show();
  });

  $('.compress-button').click(function() {
    const editorNumber = this.dataset.editor;
    editors[editorNumber - 1].setOption('fullScreen', false);
    $('.compress-button').removeAttr('data-editor').hide();
  });
}

// Expand the container to the full width of the screen
export function setFullScreenWindow() {
  $('.container-fluid').css({'height': 'calc(100% - 51.78px)'});
  $('.container-fluid').addClass('full-width');
  // remove perfect-scrollbar
  $('.container-fluid').perfectScrollbar('destroy');
}