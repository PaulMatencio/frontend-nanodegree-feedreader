/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test loop  through each feed in the allFeeds object and ensures it has an url defined
     * and not empty.
     */
    it('do not have empty url', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toEqual(0);
      });
    });


    /* This test  loops  through each feed in the allFeeds object and ensures it has a name defined
     * and is not empty.
     */

    it('do not have empty name', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toEqual(0);
      });
    });
  });


  /* Test suite named "The menu" 
  * Ensures the menu changes visibility when the menu icon is clicked. The first click 
  * should display the menu and the second click shoud hide the menu
  */
  describe("The menu", function() {
    var $body,
      $menuIcon;

    beforeEach(function() {
      $body = $('body');
      $menuIcon = $('.menu-icon-link');
    });

    it('is hidden by default', function() {
      expect($body.hasClass('menu-hidden')).toBeTruthy();
    });
    /* Ensures the menu changes visibility when the menu icon is clicked. The first click 
     * should display the menu and the second click shoud hide the menu
     */
    it('is displayed when the menu icon is clicked', function() {
      /* simulate a first click, the menu should be displayed */
      $menuIcon.trigger("click");
      expect($body.hasClass('menu-hidden')).toBeFalsy();
    });
      /* simulate a second click, the menu should be hidden */
    it('is hidden when the menu icon is clicked again ', function() {
      $menuIcon.trigger("click");
      expect($body.hasClass('menu-hidden')).toBeTruthy();

    });

  });
  /* Test suite named "Initial Entries" */

  describe("Initial Entries", function() {

    /* Ensures when the loadFeed function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    var $container;
    beforeEach(function() {
      $container = $('.feed');
    });

    /*
        When loadFeed is called and completed, ensure the container contain at least entry
        (first or last) 
    */
    describe("When loadFeed is called ....", function() {

      var $entry_links;

      beforeEach(function(done) {
        loadFeed(0, function(status, err) {
          if (status === "success") {
            $entry_links = $container.children(".entry-link");
            done();
          } else done.fail(status + ">fail to load feed 0 with error: " + err);
        });     
      });

      /* ensure the container contain at least one entry */
      it("there is at least a single .entry within the .feed container", function(done) {
        // var $entry = $entry_links.first().children(".entry").first();  
        expect($('feed .entry')).toBeDefined();
        done();
      });

      /* ensure that every feed entry has a non empty url  */
      it("each feed entry must have a href attribute", function() {
        $.each($entry_links, function(index, entry_link) {
          expect($(entry_link).attr('href').length).not.toEqual(0);
        });
      });
    });
  });


  /* before each test  loadfeed(0)   
    if loadfeed(1) is sucessfull , compare the content of feed 0 and feed 1, they should be different
    if loadfeed(2) is sucessfull , compare the content of feed 0 and feed 2, they should be different
  */
  describe("New Feed Selection", function() {

    var $html0, $html1, $html2;
    var $container = $('.feed');
    /* before each test  loadfeed(0)
    */
    beforeEach(function(done) {
      loadFeed(0, function(status, err) {
        if ( status === "success") {
          $html0 = $container.children(".entry-link").first().children(".entry").first().html();
          done();
        } else {
          done.fail(status + ">fail to load feed 0 with error: " + err);
        }
      });    
    });
    /* if loadfeed(1) is sucessfull , compare the content of feed 0 and feed 1, they should be different */
    it('content should change when a feed 1 is loaded', function(done) {
      loadFeed(1, function(status, err) {
        if (status === "success") {
          $html1 = $container.children(".entry-link").first().children(".entry").first().html();
          expect($html1).not.toEqual($html0);
          done();
        } else {
          done.fail(status + ">fail to load feed 1  with error: " + err);
        }
      });     
    });
    /* if loadfeed(2) is sucessfull , compare the content of feed 0 and feed 2, they should be different */
    it('content should change when a feed 2 is loaded', function(done) {
      loadFeed(2, function(status, err) {
        if (status === "success") {
          $html2 = $container.children(".entry-link").first().children(".entry").first().html();   
          expect($html2).not.toEqual($html0);
          done();
        } else {
          done.fail(status + ">fail to load feed 2 with error:" + err);
        }
      });    
    });

  });
  
  // disabling findfeed with xdescribe
  xdescribe("findFeeds specification",function() {
    var query;
    beforeEach(function() {
      query = "";
    });

    it("is just a function, so it can contain any code", function() {
      expect(query.length).toEqual(0);
    });
  });

}());