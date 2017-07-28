import { initMarked } from 'helpers/utils';

$(document).ready(function(){
  const marked = initMarked();

  $('[id^="answer_"').toArray().forEach(function(answerBlock) {
    let code = $(`#${answerBlock.id} input[type=hidden]`).val();
    let markdown = "```js\n" + code + "\n```";
    
    $(`#${answerBlock.id} .content`)[0].innerHTML = marked(markdown);
  });
});