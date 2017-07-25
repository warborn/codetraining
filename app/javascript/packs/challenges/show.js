import { initMarked } from 'helpers/utils'

const marked = initMarked()

$(document).ready(function() {
  $('body').css('display', 'block');

  let markdown = $('.markdown-preview .content input[type=hidden]').val();
  $('.markdown-preview .content')[0].innerHTML = marked(markdown);
});