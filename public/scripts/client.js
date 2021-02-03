/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Front-end JQuery render 
  const createTweetElement = function (tweet) {
    let $article = $('<article>');
    let $header = $('<header>');
    let $leftOfHeader = $('<div>');
    let $div = $('<div>');
    let $footer = $('<footer>');
    let $hr = $('<hr>');
    let $flag = $('<i>').addClass('fas fa-flag');
    let $fontAwsomeIcons = $('<span>').addClass('fontAwesome');
    let $retweet = $('<i>').addClass('fas fa-retweet');
    let $like = $('<i>').addClass('fas fa-heart');

    $fontAwsomeIcons.append($flag);
    $fontAwsomeIcons.append($retweet);
    $fontAwsomeIcons.append($like);

    $('<span>').text(tweet.user.name).addClass('person').appendTo($leftOfHeader);
    $('<span>').text(tweet.user.handle).addClass('atPerson').appendTo($header);

    $leftOfHeader.prepend($('<img>', {src: tweet.user.avatars}));
    $leftOfHeader.addClass('leftContent').prependTo($header);

    $('<p>').text(tweet.content.text).appendTo($article);

    $header.addClass('articleHeader').prependTo($article);
    $article.prependTo($div);

    $hr.addClass('line').appendTo($div);

    // creates proper timestamp of when the tweet is created
    let createdTime = new Date(tweet['created_at']).toString().slice(4, 24);
    
    $('<p>').addClass('footerText').text(createdTime).prependTo($footer);
    $footer.append($fontAwsomeIcons);
    $footer.appendTo($div);
    $div.addClass(tweet.user.name);
    $div.addClass('tweetBox');
  
    return $div;
  };
  //loops through tweet data array and render it to the tweetContainer
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      $('.tweetContainer').prepend(createTweetElement(tweet));
    }
  };
  //render added tweets which is the last element of the data array
  const loadTweets = () => {
    $.get('/tweets')
      .then(data => {
        renderTweets([data[data.length - 1]]);
      });
  };

  //main function
  $(document).ready(() => {
  
  const $errorBox = $('<p>').addClass('error').text("Empty tweets! You didn't input anything!");
  $errorBox.prependTo($('.container')).hide();
  const $errorBox2 = $('<p>').addClass('error').text('Tweets are too long (more than 140 characters)!');
  $errorBox2.prependTo($('.container')).hide();

    //arrow redirects to text box for new tweet
    $('.fa-angle-double-down').on('click', (event) => {
      $("#new-tweet-input").focus();
    });

    //post new tweets
   
   $('form').on('submit', (event) => {
    event.preventDefault();
    if ($('textarea').val().length === 0) {
      $errorBox.slideDown(); //Pops up an error message if no text is submitted to form
      $errorBox2.hide(); //Hides any existing error prompts
    } else if ($('textarea').val().length > 140) {
      $errorBox2.slideDown(); //Pops up an error if tweet exceeds character count
      $errorBox.hide(); 
    } else {
      $errorBox.slideUp(); //Clears all error messages if subsequent tweet meets criteria
      $errorBox2.slideUp();
      $.post('/tweets', $('form').serialize())
        .then(() => {
          $('.counter').text('140');
          $('textarea').val("");
          loadTweets();
        })
        .fail(error => console.log(error));
    }
  });
      //Renders the tweets
      $.get('/tweets')
        .then((data) => {
          renderTweets(data);
        });  
  });