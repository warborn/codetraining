import $ from 'jquery'
import Ps from 'perfect-scrollbar/jquery'
import hljs from 'highlight.js'
import marked from 'marked'

export function setupScrollbars(selectors) {
  // Use the jQuery adaptor
  Ps($)
  
  selectors.forEach(function(selector) {
    $(selector).perfectScrollbar({wheelSpeed: 0.3, maxScrollbarLength: 80});
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

  return marked
}