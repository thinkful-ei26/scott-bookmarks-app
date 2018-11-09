'use strict';
/*eslint-env jquery*/
/* global index, store, api */
// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){

  function render() {
    console.log('render fired');
    const bookmarks = [ ...store.bookmarks ];
    console.log(bookmarks);
    $('ul').html(generateBookmarkListString(bookmarks));


  }

  function generateError(error) {
    let message = '';
    if (error.responseJSON && error.responseJSON.message) {
      message = error.responseJSON.message;
    } else {
      message = `${error.code} Server Error`;
    }

    return `
      <section class="error-message">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }

  function generateAddNewBookmarkForm() {
    return `
    <div class="row">
      <form>
        <input type="text" name="title" value="bookmark title"><br />
        <input type="text" name="url" value="http://"><br />
        <textarea name="description" rows="8" cols="50">put your description here</textarea><br />
        <label for="rating">rating:</label>
        <input type="radio" name="rating" value="1">1
        <input type="radio" name="rating" value="2">2
        <input type="radio" name="rating" value="3">3
        <input type="radio" name="rating" value="4">4
        <input type="radio" name="rating" value="5">5
        <br />

        <input type="submit" value="Submit">
        <section class="error-message js-error-message">
        <div class="error-container"></div>
        </section>
      </form>
    </div>

    `;
  }

  function generateBookmarkLi(bookmark) {
    console.log('generateBookmarkLi fired');
    if (bookmark.condensed) {
      return  `
        <li class="bookmark-item js-bookmark-item data-bookmark-id = "${bookmark.id}">
          <div>
            <h3>${bookmark.title}</h3>
            <div class="rating">${bookmark.rating} stars</div>
          </div>
        </li>
        `;
    }else{
      return `
      <li class="bookmark-item js-bookmark-item data-bookmark-id = "${bookmark.id}">
        <h3>${bookmark.title}</h3>
        <div class="rating">${bookmark.rating} stars</div>
        <button class="bookmark-delete js-bookmark-delete">delete</button>
        <p>bookmark.desctiption body</p>
        <a href="bookmark.url">visit site</a>
        </div>
      </li>
      `;
    }
  }

  function generateBookmarkListString(bookmarks) {
    return bookmarks.map(bookmark => generateBookmarkLi(bookmark)).join('');
  }

  function getIdFromBookmarkElem(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-item')
      .data('bookmark-id');
  }


  ///////////listeners

  function handleAddNewBookmarkFormClick() {
    $('.js-add-bookmark-button').on( 'click', event => {
      console.log('handleAddNewBookmarkFormClick was clicked');
      store.toggleAddingBookmark();
      $('.js-add-bookmark-form').html(generateAddNewBookmarkForm());
    });
  }

  function handleCreateNewBookmarkClick() {
    $('.js-add-bookmark-form').submit( event => {
      event.preventDefault();
      const newbookmarkObj = $(event.target).serializeJSON();
      $('.js-bookmark-form-entry').val('');
      api.createBookmark(newbookmarkObj,
        bookmark => {
          store.addBookmark(bookmark);

          render();
        },
        (err) => {
          console.log(err);
          store.setError(err);
          render();
        }
      );
    });
  }

  function handleDeleteBookmarkClick() {

  }

  function handleExpandBookmarkClick() {

  }

  function handleRatingsFilter() {

  }

  $.fn.extend({
    serializeJSON: function() {
      const obj = {};
      const data = new FormData( this[0] );
      data.forEach((value, key) => {
        obj[key] = value;
      });
      return obj;
    }
  });

  function bindEventListeners() {
    handleRatingsFilter();
    handleExpandBookmarkClick();
    handleDeleteBookmarkClick();
    handleCreateNewBookmarkClick();
    handleAddNewBookmarkFormClick();

  }

  function bookmarksTest(){
    console.log('hello from bookmarks');
  }
  return {
    render,
    bindEventListeners,
    bookmarksTest,
  };
}() );
