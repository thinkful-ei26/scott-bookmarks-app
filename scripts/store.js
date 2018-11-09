'use strict';
/* global bookmarks, api */
/*eslint-env jquery*/
// eslint-disable-next-line no-unused-vars
const store = (function(){
  function addBookmark(bookmark) {
    //validation here?
  }

  function toggleAddingBookmark() {

  }

  function findById(bookmarkObjId) {

  }

  function findAndDeleteBookmark(bookmarkObjId) {

  }

  function toggleBookmarkView(bookmarkObjId) {

  }

  function setError(error) {

  }

  function setRatingFilter(val) {

  }

  function storeTest(){
    console.log('hello from store');
  }
  return {
    bookmarks: [],
    adding: false,
    filter: null,
    error: null,

    addBookmark,
    toggleAddingBookmark,
    findById,
    findAndDeleteBookmark,
    toggleBookmarkView,
    setError,
    setRatingFilter,
    storeTest,
  };
}() );
