/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1637178244000
}

$(document).ready(function() {
  //parse the tweet data and return an aricle HTML element
  const createTweetElement = function(tweetData) {
    //get user info from tweet data
    const name = tweetData.user.name;
    const avatar = tweetData.user.avatars;
    const handle = tweetData.user.handle;
    const content = tweetData.content.text;
    const timeStamp = timeago.format(tweetData.created_at);

    //create the HTML element to hold tweet
    const header = `<header><div class="profile-pic"><img src=${avatar} />${name}</div><div>${handle}</div></header>`;
    const footer = `<footer><time>${timeStamp}</time><span class="footer-icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-heart"></i><i class="fa-solid fa-retweet"></i></footer>`;
    const $tweet = $(`<article>${header}<p>${content}</p>${footer}</article>`);
    return $tweet;
  };

  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('.tweet-container').append($tweet);
});