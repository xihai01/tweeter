/*For scroll to top button*/

$(document).ready(function() {
  //display button to scroll up
  $(window).scroll(function() {
    let scrolls = $(window).scrollTop();
    (scrolls > 500) ? $('#myBtn').css('display', 'inline-block') : $('#myBtn').css('display', 'none');
  });

  //scroll to top of the page when clicked
  $('#myBtn').click(function() {
    $(window).scrollTop(0);
  });
});