/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const form = $('.new-tweet').find('form');
  form.submit(function(e) {
    e.preventDefault();
    let text = $(e.target).find('textarea').val();
    $('.error-msg').slideUp();
    //form validation for empty string and max char length
    if (text.trim() === '') {
      let msg = 'Please do not try submitting nothing..';
      $('.error-msg').slideDown();
      $('.error-msg').find('p').text(msg);
      return;
    }
    if ((140 - text.length) < 0) {
      let msg = "You are writing too much! Please keep tweets under limit.";
      $('.error-msg').slideDown();
      $('.error-msg').find('p').text(msg);
      return;
    }
    $('.error-msg').slideUp();
    //serialize the value in text box into a query string
    const textArea = form.find('textarea');
    const queryString = textArea.serialize();
    //send tweet to be saved in db and then refresh page to show it
    $.ajax('/tweets/', { method: 'POST', data: queryString })
      .then(function() {
        return loadTweets()
      })
      .then(function(data) {
        //do some cleaning up...
        //clear old tweets before rendering again - don't want duplicates
        //reset counter back to 140
        $('.tweet-container').empty();
        $('#tweet-text').val('');
        $('#tweet-text').parent().find('.counter').val(140);
        $('#tweet-text').parent().find('label').css('display', 'block');
        renderTweets(data);
      });
  });

  //use AJAX GET request to fetch tweets from /tweets
  //it has to handle a JSON request/response
  //upon success, render tweets
  const loadTweets = function() {
    return $.ajax('/tweets/', { method: 'GET', dataType: 'json' });
  };

  //append each tweet stored in data to our HTML
  const renderTweets = function(tweets) {
    let $tweet = '';
    for (const tweet of tweets) {
      $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
  };

  //escapes HTML char - prevent XSS
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //parse the tweet data and return an aricle HTML element
  const createTweetElement = function(data) {
    //get user info from tweet data
    const name = data.user.name;
    const avatar = data.user.avatars;
    const handle = data.user.handle;
    const content = escape(data.content.text);
    const timeStamp = timeago.format(data.created_at);

    //create the HTML element to hold tweet
    const header = `<header><div class="profile-pic"><img src=${avatar} />${name}</div><div>${handle}</div></header>`;
    const footer = `<footer><time>${timeStamp}</time><span class="footer-icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-heart"></i><i class="fa-solid fa-retweet"></i></footer>`;
    const $tweet = $(`<article>${header}<p class="word-wrap">${content}</p>${footer}</article>`);
    return $tweet;
  };

  //show/hide input form when clicked
  let isSelected = false;
  $('nav').click(function(e) {
    //only process click if correct area is clicked on nav
    let target = e.target.closest('#form-toggle');
    if (!target) {
      return;
    }
    //slide the form up/down depending on state
    if (!isSelected) {
      $('.new-tweet').slideDown();
      $('#tweet-text').focus();
      isSelected = true;
      return;
    } else {
      //clear any error messages as form closes
      $('.new-tweet').slideUp();
      $('.error-msg').css('display', 'none');
      isSelected = false;
      return;
    }
  });

  //load tweets and clear text area for first time visit
  $('#tweet-text').val('');
  $('.error-msg').css('display', 'none');
  loadTweets()
    .then(function(data) {
      renderTweets(data);
    });
});