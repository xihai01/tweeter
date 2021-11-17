/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const form = $('.new-tweet').find('form');
  form.submit(function(e) {
    e.preventDefault();
    //serialize the value in text box into a query string
    const textArea = form.find('textarea');
    const queryString = textArea.serialize();
    //send tweet to be saved in db
    $.ajax('/tweets/', { method: 'POST', data: queryString });
  });

  //use AJAX GET request to fetch tweets from /tweets
  //it has to handle a JSON request/response
  //upon success, render tweets
  const loadTweets = function(callback) {
    $.ajax('/tweets/', { method: 'GET', dataType: 'json' })
      .then(function(data) {
        callback(data);
      });
  };

  //append each tweet stored in data to our HTML
  const renderTweets = function(tweets) {
    let $tweet = '';
    for (const tweet of tweets) {
      $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
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

  loadTweets(renderTweets);
});