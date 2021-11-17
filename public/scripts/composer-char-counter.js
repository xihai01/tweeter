$(document).ready(function() {
  //assign the textarea an event handle for input
  $('#tweet-text').on('input',function(e) {
    //get the counter elm
    const counterElm = $(this).parent().find('.counter');
    //get the label inside the text box
    const label = $(this).parent().find('label');
    //get the length of value in text box
    const textLength = $(this).val().length;
    //updated the counter DOM elm
    //style the counter elm red if char count > 140
    (textLength > 140) ? counterElm.css('color', 'red') : counterElm.css('color', '#545149');
    (textLength > 140) ? counterElm.val('-' + textLength) : counterElm.val(textLength);
    //hide the label if there is chars in text box
    textLength ? label.css('display', 'none') : label.css('display', 'block');
  });
});

/* const text = document.getElementById('tweet-text');

text.addEventListener('input', (event) => {
  console.log(event.data);
}); */

/* Why are some of the event attributes in jQuery event listeners different from pure JS event listeners. (i.e some of the event object attributes return undefined in jQuery while they exist in pure JS).
Status
Your request is being  */