/*eslint-env jquery*/
'use strict';
// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/scott/bookmarks';

  function getBookmarks(callbackfn) {
    $.getJSON(`${BASE_URL}`, callbackfn);
    console.log('getting bookmarks from server');
  }

  function createBookmark(newbookmarkObj, successfn, errorfn) {
    console.log(newbookmarkObj);
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      contentType: 'application/json',
      data: newbookmarkObj,
      success: successfn,
      error: errorfn,
    });
  }

  function deleteBookmark(id, successfn) {
    console.log('deleteBookmark fired');
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      success: successfn,
    });
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
