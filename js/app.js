/* app.js
 *
 * This is our RSS feed reader application. It uses the Google
 * Feed Reader API to grab RSS feeds as JSON object we can make
 * use of. It also uses the Handlebars templating library and
 * jQuery.
 */
// The names and URLs to all of the feeds we'd like available.
var allFeeds = [{
    name: 'Udacity Blog',
    url: 'http://blog.udacity.com/feed'
}, {
    name: 'CSS Tricks',
    url: 'http://css-tricks.com/feed'
}, {
    name: 'HTML5 Rocks',
    url: 'http://feeds.feedburner.com/html5rocks'
}, {
    name: 'Linear Digressions',
    url: 'http://feeds.feedburner.com/udacity-linear-digressions'
}];

if (localStorage.allFeeds) {
    try {
        allFeeds = JSON.parse(localStorage.allFeeds); // read allFeeds
    } catch (err) {
        console.log(err);
    }
}

/* save allFeeds */
localStorage.allFeeds = JSON.stringify(allFeeds);
var numberFeeds = allFeeds.length;

/* This function starts up our application. The Google Feed
 * Reader API is loaded asynchonously and will then call this
 * function when the API is loaded.
 */
function init() {
    // Load the first feed we've defined (index of 0).
    loadFeed(0);
}

/* This function performs everything necessary to load a
 * feed using the Google Feed Reader API. It will then
 * perform all of the DOM operations required to display
 * feed entries on the page. Feeds are referenced by their
 * index position within the allFeeds array.
 * This function all supports a callback as the second parameter
 * which will be called after everything has run successfully.
 *
 * Add  two paramters (status and err)  to  the callback, thus it can be used by the tests to check the status
 */
function loadFeed(id, cb) {
    var feedUrl = allFeeds[id].url,
        feedName = allFeeds[id].name;

    $.ajax({
        type: "POST",
        url: 'https://rsstojson.udacity.com/parseFeed',
        data: JSON.stringify({
            url: feedUrl
        }),
        contentType: "application/json",
        success: function(result, status) {

            var container = $('.feed'),
                title = $('.header-title'),
                entries = result.feed.entries,
                entriesLen = entries.length,
                entryTemplate = Handlebars.compile($('.tpl-entry').html());

            title.html(feedName); // Set the header text
            container.empty(); // Empty out all previous entries

            /* Loop through the entries we just loaded via the Google
             * Feed Reader API. We'll then parse that entry against the
             * entryTemplate (created above using Handlebars) and append
             * the resulting HTML to the list of entries on the page.
             */
            entries.forEach(function(entry) {
                container.append(entryTemplate(entry));
            });

            if (cb) {
                cb(status, null); // err = null
            }
        },
        error: function(result, status, err) {
            //run only the callback without attempting to parse result due to error
            if (cb) {
                cb(status, err);
            }
            window.alert("Load feed " + feedName + " ended with error:" + err);
        },
        dataType: "json"
    });
}

/* query ONE feed and append the result to the allFeeds array */
/* TODO */
function addFeed(input) {
    // ++numberFeeds;
}

/* remove a feed from the allFeeds array */
/* TODO */
function removeFeed(id) {
    // --numberFeeds;
}

/* Google API: Loads the Feed Reader API and defines what function
 * to call when the Feed Reader API is done loading.
 */
google.load('feeds', '1');
google.setOnLoadCallback(init);

/* All of this functionality is heavily reliant upon the DOM, so we
 * place our code in the $() function to ensure it doesn't execute
 * until the DOM is ready.
 */
$(function() {
    var container = $('.feed'),
        feedList = $('.feed-list'),
        feedItemTemplate = Handlebars.compile($('.tpl-feed-list-item').html()),
        feedId = 0,
        menuIcon = $('.menu-icon-link');

    /* Loop through all of our feeds, assigning an id property to
     * each of the feeds based upon its index within the array.
     * Then parse that feed against the feedItemTemplate (created
     * above using Handlebars) and append it to the list of all
     * available feeds within the menu.
     */
    allFeeds.forEach(function(feed) {
        feed.id = feedId;
        feedList.append(feedItemTemplate(feed));
        feedId++;
    });

    /* loop through the list of feeds and set the destroy button
       when  a destroy button is is clicked, removeFeed() is triggered
    */
    var lists = feedList.children('li');
    $.each(lists, function(idx, list) {
        var $button = $(list).children('button');
        $button.on('click', function(idx) {
            removeFeed(idx);
        });
    });

    /* When a link in our feedList is clicked on, we want to hide
     * the menu, load the feed, and prevent the default action
     * (following the link) from occurring.
     */
    feedList.on('click', 'a', function() {
        var item = $(this);

        $('body').addClass('menu-hidden');
        loadFeed(item.data('id'));
        return false;
    });

    /* When the menu icon is clicked on, we need to toggle a class
     * on the body to perform the hiding/showing of our menu.
     */
    menuIcon.on('click', function() {
        $('body').toggleClass('menu-hidden');
    });

    /* when the user type in a new feed */
    $('.add-feed').on('click', function() {
        var input = $('.new-feed').val();
        addFeed(input);
        $('.new-feed').val(''); // reset the input
    });

}());