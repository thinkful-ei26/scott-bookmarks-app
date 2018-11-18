/*eslint-env jquery*/
'use strict';
// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/scott/bookmarks';

  function getBookmarks(callbackfn) {
    //console.log('getting bookmarks from server');
    $.ajax({
      url: `${BASE_URL}`,
      method: 'GET',
      contentType: 'application/json',
      success: callbackfn,
    });
  }

  function createBookmark(newbookmarkObj, successfn, errorfn) {
    //console.log('createBookmark fired');
    //console.log(newbookmarkObj);
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(newbookmarkObj),
      success: successfn,
      error: errorfn,
    });
  }

  function deleteBookmark(id, successfn) {
    //console.log('deleteBookmark fired');
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',

      success: successfn,
    });
  }

  function apiTest(){
    //console.log('hello from api');
  }

  return {
    apiTest,
    getBookmarks,
    createBookmark,
    deleteBookmark,
  };
}() );
