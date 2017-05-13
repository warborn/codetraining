$(document).ready(function(){
	// setup marked and highlightjs library to use markdown for exercise details
  initMarked();

	$('[id^="answer_"').toArray().forEach(function(answerBlock) {
		console.log(answerBlock);
		let code = $('#' + answerBlock.id + ' input[type=hidden]').val();
		let markdown = "```js\n" + code + "\n```";
		console.log(markdown);
		$('#' + answerBlock.id + ' .content')[0].innerHTML = marked(markdown);
	});
});