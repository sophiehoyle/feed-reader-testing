/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {

    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable has been defined and
         that it is not empty.*/
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         /* Test loops through each feed, ensures that a URL is defined
         and is not empty */
          it('have an IRL', function() {
            for (let feed of allFeeds) {
              expect(feed.url).toBeDefined();
              expect(feed.url.length).not.toBe(0);
            };
          });

         /* Test loops through each feed, ensures that it has a name
         and is not empty*/
         it('have a name', function() {
           for (let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           };
         });
    });

         /* Test ensures the menu is hidden by default.*/
         it('is hidden by default', function(){
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });
          /* Test ensures menu shows up when menu is clicked, and
          menu hides when clicked again*/
          it('changes visibility when clicked', function() {
            /* simulate the first click and check menu */
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            /* simulate the second click and check menu */
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });

         /* Test ensures that when the loadFeed function is called and completes
          its work, there is at least a single .entry element within the .feed
          container.*/
         describe('Initial Entries', function() {
           beforeEach(function(done) {
             loadFeed(0, function (){
               done();
           });
         });
         /* Test it has at least one entry element within the feed container*/
         it('has at least one entry', function() {
           let entries = $('.feed .entry');
           expect(entries.length).toBeGreaterThan(0);
            });
         });

         /*Test ensures that when a new feed is loaded by the LoadFeed
         function that the content changes*/
         describe('Load another feed', function() {

           beforeEach(function(done){

             loadFeed(1,function(){
               firstFeed = $('.feed').html();

               loadFeed(0, function(){
                 secondFeed = $('.feed').html();
                 done();
               });
             });
           });
          /* Two feeds are now loaded, check that the html content of each feed
          are different */
           it('feed section has been loaded and is different', function() {
             expect(firstFeed).notToBe(secondFeed);
           });
         });
       });
}());
