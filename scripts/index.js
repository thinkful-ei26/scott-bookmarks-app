'use strict';
/* global bookmarks, store, api */
/*eslint-env jquery*/
function main() {
  //console.log('Document is ready');
  api.apiTest();
  bookmarks.bookmarksTest();
  store.storeTest();
  bookmarks.bindEventListeners();
  bookmarks.render();

  api.getBookmarks((bookmark) => {
    //console.log(bookmark);

    bookmark.forEach(item => {
      item.condensed = true;
      store.addBookmark(item);
    });
    bookmarks.render();
  });
}

$(main);
