'use strict';
/* global bookmarks, store, api */
/*eslint-env jquery*/
function main() {
  console.log('Document is ready');
  api.apiTest();
  bookmarks.bookmarksTest();
  store.storeTest();
}

$(main);
