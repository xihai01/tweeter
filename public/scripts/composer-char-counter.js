$(document).ready(function() {
  //assign the textarea an event handle for input
  $('#tweet-text').on('input',function(e) {
    //get the counter elm
    const counterElm = $(this).parent().find('.counter');
    //get the label inside the text box
    const label = $(this).parent().find('label');
    //get the length of value in text box
    const textLength = (140 - $(this).val().length);
    //updated the counter DOM elm
    //style the counter elm red if char count < 0
    (textLength < 0) ? counterElm.css('color', 'red') : counterElm.css('color', '#545149');
    (textLength < 0) ? counterElm.val(textLength) : counterElm.val(textLength);
    //hide the label if there is chars in text box
    $(this).val() ? label.css('display', 'none') : label.css('display', 'block');
  });
});