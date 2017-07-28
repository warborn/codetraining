import Ps from 'perfect-scrollbar/jquery';
import hljs from 'highlight.js';
import marked from 'marked';
import { WHEEL_SPEED, MAX_SCROLLBAR_LENGTH } from 'config/constants';

export function setupScrollbars(selectors) {
  // Use the jQuery adaptor
  Ps($)
  
  selectors.forEach(function(selector) {
    $(selector).perfectScrollbar({wheelSpeed: WHEEL_SPEED, maxScrollbarLength: MAX_SCROLLBAR_LENGTH});
  });
}

export function initMarked() {
  // setup marked and highlightjs library to use markdown for exercise details
  hljs.initHighlightingOnLoad();
  marked.setOptions({
    highlight: function(code, language) {
      let result = hljs.getLanguage(language) ? hljs.highlight(language, code) : hljs.highlightAuto(code);
      return result.value;
    }
  });

  return marked;
}