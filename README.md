# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


## Why this Project?

Testing is an important part of the development process and many organizations practice a standard of development known as "test-driven development". This is when developers write tests first, before they ever start developing their application. All the tests initially fail and then they start writing application code to make these tests pass.

Whether you work in an organization that uses test-driven development or in an organization that uses tests to make sure future feature development doesn't break existing features, it's an important skill to have!


## What will I learn?

You will learn how to use Jasmine to write a number of tests against a pre-existing application. These will test the underlying business logic of the application as well as the event handling and DOM manipulation.


## How will this help my career?

* Writing effective tests requires analyzing multiple aspects of an application including the HTML, CSS and JavaScript - an extremely important skill when changing teams or joining a new company.
* Good tests give you the ability to quickly analyze whether new code breaks an existing feature within your codebase, without having to manually test all of the functionality.


# How will I complete this project?

1. Download the [required project assets](http://github.com/udacity/frontend-nanodegree-feedreader).
2. Review the functionality of the application within your browser.
3. Explore the application's HTML (*./index.html*), CSS (*./css/style.css*) and JavaScript (*./js/app.js*) to gain an understanding of how it works.
4. Explore the Jasmine spec file in *./jasmine/spec/feedreader.js*
5. Edit the allFeeds variable in *./js/app.js* to make the provided test fail and see how Jasmine visualizes this failure in your application.
6. Return the allFeeds variable to a passing state.


7. Write a test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.

 		it('do not have empty url',function() {
            allFeeds.forEach( function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toEqual(0);
            });
         });

8. Write a test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.

		it('do not have empty name',function() {
            allFeeds.forEach( function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toEqual(0);
            });
         });


9. Write a new test suite named "The menu".
10. Write a test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
11. Write a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.

		it('is hidden by default',function(){
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });   
        it('is displayed when the menu icon is clicked',function(){
            /* simulate a click */
            $menuIcon.trigger("click");
            expect($body.hasClass('menu-hidden')).toBeFalsy();
        });
        it('is hidden when the menu icon is clicked again ',function(){
            $menuIcon.trigger("click");
            expect($body.hasClass('menu-hidden')).toBeTruthy();

        });


12. Write a test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container. Remember, loadFeed() is asynchronous so this test wil require the use of Jasmine's beforeEach and asynchronous done() function.

		beforeEach(function(done) {
            loadFeed(0, function(status, err) {
                if (status === "success") {
                 $entry_links = $container.children(".entry-link");
                    done();
                } else done.fail(status + ">fail to load feed 0 with error: " + err);
            });     
        });

        /* ensure that the container contain at least one entry */
        it("there is at least a single .entry within the .feed container", function(done) {
            var $entry = $entry_links.first().children(".entry").first();
            expect($entry).toBeDefined();
            done();
        });

        /* ensure that every feed entry has a non empty url  */
        it("each feed entry must have a href attribute", function(done) {
            .each($entry_links, function(index, entry_link) {
             expect($(entry_link).attr('href').length).not.toEqual(0);
            });
         done();
         });

13. Write a test that ensures when a new feed is loaded by the loadFeed function that the content actually changes. Remember, loadFeed() is asynchronous.

        beforeEach(function(done) {
            /* before each test  loadfeed(0) */
            loadFeed(0, function(status, err) {
                if ( status === "success") {
                    $html0 = $container.children(".entry-link").first().children(".entry").first().html();
                    done();
                } else  done.fail(status + ">fail to load feed 0 with error: " + err);
            });    
        });

        /* if loadfeed(1) is sucessfull , compare the content of feed 0 and feed 1, they should be different */

        it('content should change when a feed 1 is loaded', function(done) {
         loadFeed(1, function(status, err) {
            if (status === "success") {
                $html1 = $container.children(".entry-link").first().children(".entry").first().html();
                expect($html1).not.toEqual($html0);
                done();
             } else done.fail(status + ">fail to load feed 1  with error: " + err);
            });     
        });

    /* if loadfeed(2) is sucessfull , compare the content of feed 0 and feed 2, they should be different */

    it('content should change when a feed 2 is loaded', function(done) {
        loadFeed(2, function(status, err) {
            if (status === "success") {
                $html2 = $container.children(".entry-link").first().children(".entry").first().html();   
                expect($html2).not.toEqual($html0);
                done();
            } else done.fail(status + ">fail to load feed 2 with error:" + err);
      });    
    });

14. When complete - all of your tests should pass.
        
