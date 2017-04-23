$(document).ready(function() {
  // setup perfectScrollbar for practice exercise section
  $('#output').perfectScrollbar({wheelSpeed: 0.3, maxScrollbarLength: 80});
  $('#description').perfectScrollbar({wheelSpeed: 0.3, maxScrollbarLength: 80});

  // setup marked and highlightjs library to use markdown for exercise details
  hljs.initHighlightingOnLoad();
  marked.setOptions({
    highlight: function(code, language) {
      result = hljs.getLanguage(language) ? hljs.highlight(language, code) : hljs.higlightAuto(code);
      return result.value;
    }
  });

  // // setup exercise details tabs
  $('#details-tab a').click(function (e) {
    e.preventDefault();
    let id = this.href.replace(/.+#/g, '');
    let tabContent = $('#' + id).parent();

    if(id === 'output') {
      tabContent.addClass('output');
      tabContent.removeClass('description');
    } else {
      tabContent.addClass('description');
      tabContent.removeClass('output passed failed');
    }

    $(this).tab('show');
  });
});

