# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


# The Application

* The application use Google Feed API to load RSS feeds and display them once there are loaded. There are 4 hard coded feeds that user can choose in a menu. The menu's visibility is controlled by a hamburger button locate on the top left of the window. User can show or hide the menu with this button.

* At the initialization, the application load the first feed of an array of hard coded feeds. The articles of the first feed are displayed to the user. The user can use the hamburger menu to display a menu. From this menu, the user can  chose a new feed,

* When a new feed is selected, the application use Google feed API, Jquery and  Ajax to  asynchronously loaded the feed and update the DOM in order to display the articles of the feed. Every article of the feed should contains a title and an url

* When the user click on an article, the application use the url of the artickle to fecth the article and display it.

# TODO LIST

* add a new feed  [addFeed()].  When the user type in the input text and click on the + button, the addFeed() function is called but do nothing right now. The implementation of the function addFeed() will be done later. The test of the addFeed() function compare the number of feeds after and before the function called and the difference should be +1. The test should fail  since no new feed is currently added

* delete a feed [ removeFeed()]. When the user click on the X button of a feed, the removeFeed() function is triggered to reduce the number of available feeds by one. The implementation of the function removeFeed() will be done later.  The test of the removeFeed() function compare the number of feeds before and after the function call and the difference whould be +1. The test should fail  since no feed has been actually removed

# Working application

* http://paulmatencio.github.io/frontend-nanodegree-feedreader/


# This project is to create test suites for testing our feed reader application

* The core of the application is the asynchronous loadFeed() function which  performs everything necessary to load a feed using the Google Feed Reader API.  Good tests give the ability to quickly analyze whether new code breaks an existing feature within your codebase, without having to manually test all of the functionality. The objective is to create test suites for this application in order to automate testing and improve the productivity.

* The first one is to test that the available RSS feeds( allFeeds object ) are well defined. Each RSS feed must have an identification (name) and a feed url.
    *The test should fail if the array of allFeeds object is empty or  a feed does not contain a name or an url.

* The second one is to test that the menu is working as designed. The menu should be hidden by default. A click on the hamburger button on the top right window  should toggle the visibility of the menu. Click to display the menu and click again to hide it.
    *The test should fail if clicking on the hamburger button, the  menu will either not displayed when it is hidden, or will not be hidden the menu when it was visible.

* The third one is to test when the application start, the first feed ( loadFeed(0) is aynchronously loaded and is sucessfully completed, the  feed's container should contain at least one article.
    * The test should fail with an error message if the first feed ( loadFeed(0) is not sucessfully loaded. A custom error message is displayed in the test log, and an alert box should be displayed to notify the error.
    * The test should fail if the feed does not contain at least an article
    * The test should fail if an article does not contain an url


* The fourth one is to test when a new feed is loaded, the list of articles should change.
    * The test should fail if a feed is not successfully loaded. A custom error message is displayed in the test log, and an alert box should be displayed to notify the error.
    * The test should fail if the list of articles does not change when a new feed is loaded


* The fifth one is to test the specification of the findFeeds(). A query string and a callback should be supplied


* **Test adding a  new feed. The  addFeed() function  is not actually implemented therefore this test should fail **

* ** Test deletet a feed. The  removeFeed() function is not actually implemented therefore this test should fail **

# Resources and Tools that are used

* [Intoduction to Ajax - Udacity ]  (https://www.udacity.com/course/intro-to-ajax--ud110)
* [Jasmine 2.1.2]  (http://jasmine.github.io/)
* [Google Feed Redaer API]  (https://developers.google.com/feed/)
