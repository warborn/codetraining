// initialize perfect-scrollbars
function setupScrollbars(selectors) {
	selectors.forEach(function(selector) {
		$(selector).perfectScrollbar({wheelSpeed: 0.3, maxScrollbarLength: 80});
	});
}

// initialize marked with default settings
function initMarked() {
	hljs.initHighlightingOnLoad();
  marked.setOptions({
    highlight: function(code, language) {
      result = hljs.getLanguage(language) ? hljs.highlight(language, code) : hljs.highlightAuto(code);
      return result.value;
    }
  });
}


