$(document).on('ready', function() {
// setup marked and highlightjs library to use markdown for exercise details
initMarked();

let markdown = $('.markdown-preview .content input[type=hidden]').val();
$('.markdown-preview .content')[0].innerHTML = marked(markdown);
});