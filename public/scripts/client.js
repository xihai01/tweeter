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
    //form validation for empty string and max char length
    if (text.trim() === '') {
      alert('You cannot leave text area blank!');
      return;
    }
    if (text.length > 140) {
      alert('You haved exceeded 140 characters!');
      return;
    }
    //serialize the value in text box into a query string
    const textArea = form.find('textarea');
    const queryString = textArea.serialize();
    //send tweet to be saved in db and then refresh page to show it
    $.ajax('/tweets/', { method: 'POST', data: queryString })
      .then(function() {
        return loadTweets()
      })
      .then(function(data) {
        //clear old tweets before rendering again - don't want duplicates
        $('.tweet-container').empty();
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

  //parse the tweet data and return an aricle HTML element
  const createTweetElement = function(data) {
    //get user info from tweet data
    const name = data.user.name;
    const avatar = data.user.avatars;
    const handle = data.user.handle;
    const content = data.content.text;
    const timeStamp = timeago.format(data.created_at);

    //create the HTML element to hold tweet
    const header = `<header><div class="profile-pic"><img src=${avatar} />${name}</div><div>${handle}</div></header>`;
    const footer = `<footer><time>${timeStamp}</time><span class="footer-icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-heart"></i><i class="fa-solid fa-retweet"></i></footer>`;
    const $tweet = $(`<article>${header}<p>${content}</p>${footer}</article>`);
    return $tweet;
  };

  //load tweets for first time visit
  loadTweets()
    .then(function(data) {
      renderTweets(data);
    });
});