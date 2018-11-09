/*eslint-env jquery*/
'use strict';
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/scott/bookmarks';

  function getBookmarks(callbackfn) {

  }

  function createBookmark(name, successfn, errorfn) {

  }

  function deleteBookmark() {

  }

  function apiTest(){
    console.log('hello from api');
  }

  return {
    apiTest,
    getBookmarks,
    createBookmark,
    deleteBookmark,
  };
}() );
