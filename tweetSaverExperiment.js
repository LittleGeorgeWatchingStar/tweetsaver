var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);

var tweetLookUp = function() {
    var tweetQuery = "";
    tweetQuery = $("#query").val();
    countQuery = $("#tweetCount option:selected").val()
    var params = {
        q: tweetQuery ,
        count: countQuery,
    }

    // Twitter.get('search/tweets', params, function(err, data, response) {
    //     console.log(data)
    //   })

    if (tweetQuery !== "") {
        Twitter.get('search/tweets', params, function(err, data, response) {
            if (response) {
            let result = function (response) {
                var tweetArray = response.tweets;
                var feedHTML = "";

                for (var i=0; i < tweetArray.length; i++) {
                    var tweetText = response.tweets[i].text;
                    var tweetUser = response.tweets[i].user.name;
                    var tweetHandle = response.tweets[i].user.screenName;
                    var tweetProfileImage = response.tweets[i].user.profileImageUrlHttps;

                    if (typeof response.tweets.retweetedStatus != "undefined") {
                        tweetText = response.tweets[i].retweetedStatus.text;
                        tweetUser = response.tweets[i].retweetedStatus.user.name;
                        tweetHandle = response.tweets[i].retweetedStatus.user.screenName;
                        tweetProfileImage = response.tweets[i].retweetedStatus.user.profileImageUrlHttps;
                    }

                    feedHTML += '<div class="twitter-item"><div class="tweet-image" width="20px"><span><a href="https://twitter.com/'+tweetHandle+'" target="_blank"><img src="'+tweetProfileImage+'" width="42" height="42" alt="twitter icon" /></a></span><span class="tweetprofilelink"><strong><a href="https://twitter.com/'+tweetHandle+'" target="_blank">'+tweetUser+'</a></strong><br /> <a href="https://twitter.com/'+tweetHandle+'" target="_blank">@'+tweetHandle+'</a></span></div><div class="twitter-text"><p>'+tweetText+'</p></div></div>';
                }

                $('.tweets-container').html(feedHTML);
                initDrag(".tweets-container .twitter-item", ".save-container");
            }
            }
            
            if(error){ 
                function inform (XMLHttpRequest, textStatus, errorThrown) {
                alert("error getting tweets");
                }
            }
        });
    } else { 
        $(".tweets-container").html("Enter a tweet keyword"); 
    }
}

function initDrag(a, b) {
    $(a).draggable({
        cursor: 'move',
        containment: '.tweetAndSave',
        snap: b,
        revert: true
    });

    $(b).droppable({
        accept: a,
        drop: function(event, ui) {
            ui.draggable.appendTo($(b));
            storeTweet();
        }
    });
}

function storeTweet() {
    var savedTweets = $(".save-container").html();
    localStorage.setItem('saved', savedTweets);
}

function clearSavedTweets() {
    if (confirm("Are you sure you want to clear your saved tweets?") == true) {
        window.localStorage.clear();
        $('.save-container').empty();
    }
}

for (var i in localStorage) {
    $('.save-container').append(localStorage[i]);
    $('.save-container .twitter-item').css('top', 0).css('left', 0);
}