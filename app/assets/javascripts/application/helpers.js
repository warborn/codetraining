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

function challengeURLMatches() {
  return window.location.pathname.match(/challenges\/(\d+)\/train\/([a-zA-Z-_\+#]+)/);
}

function getChallengeIDFromURL() {
  let matches = challengeURLMatches();
  return matches[1];
}

function getLanguageFromURL() {
  let matches = challengeURLMatches();
  return matches[2];
}


