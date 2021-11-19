/*A collection of helper functions*/

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