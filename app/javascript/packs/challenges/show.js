import { initMarked } from 'helpers/utils';

$(document).ready(function() {
	const marked = initMarked();

  let markdown = $('.markdown-preview .content input[type=hidden]').val();
  $('.markdown-preview .content')[0].innerHTML = marked(markdown);
});