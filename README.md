# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


# The application 

* The application read RSS feeds and display them once there are loaded. There are 4 hard coded feeds that user can choose in a menu. The menu's visibility is controlled by a hamburger button. Use can show or hide the menu with this button. At the initialization, the application load the first feed of an array of all Feeds which hard coded as stated above. When user chose a new feed, the application use Google feed API, Jquery and  Ajax to  asynchronously loaded the feed and update the DOM in order to display the articles of the feed. Every article contains a title and an url which is retrieved and  displayed when user click on it.

* Todo : load/add/remove/save feeds from a data base

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

* Todo tests 