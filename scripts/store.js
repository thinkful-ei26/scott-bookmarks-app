'use strict';
/* global bookmarks, api */
/*eslint-env jquery*/
// eslint-disable-next-line no-unused-vars
const store = (function(){
  function addBookmark(bookmark) {
    this.bookmarks.push(bookmark);
  }

  function toggleAddingBookmark() {
    this.adding = !this.adding;
  }

  function findById(bookmarkObjId) {
    return this.bookmarks.find(bookmark => bookmark.id === bookmarkObjId);
  }

  function findAndDeleteBookmark(bookmarkObjId) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== bookmarkObjId);
  }

  function toggleBookmarkView(bookmarkObjId) {
    this.findById(bookmarkObjId).condensed = !this.findById(bookmarkObjId).condensed;
  }

  function setError(error) {
    this.error = error;
  }

  function setRatingFilter(val) {
    this.filter = val;
  }

  function storeTest(){
    console.log('hello from store');
  }
  return {
    bookmarks: [],
    adding: false,
    filter: null,
    error: null,
    condensed: true,

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
