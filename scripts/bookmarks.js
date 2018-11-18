'use strict';
/*eslint-env jquery*/
/* global index, store, api */
// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){

  function render() {
    console.log('render fired');
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
    const bookmarks = [ ...store.bookmarks ];
    console.log(bookmarks);
    $('ul').html(generateBookmarkListString(bookmarks));


  }

  const renderAddBookmarkForm = function() {
    if(store.adding){
      $('.js-add-bookmark-form').html(generateAddNewBookmarkForm());
    }
    else{
      $('.js-add-bookmark-form').html('');
    }
  };

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
        <input type="text" name="title" placeholder="bookmark title"><br />
        <input type="text" name="url" placeholder="url"><br />
        <textarea name="desc" rows="8" cols="50" placeholder="put your description here"></textarea><br />
        <label for="rating">rating:</label>
        <input type="radio" name="rating" value="1" required>1
        <input type="radio" name="rating" value="2">2
        <input type="radio" name="rating" value="3">3
        <input type="radio" name="rating" value="4">4
        <input type="radio" name="rating" value="5">5
        <br />

        <input type="submit" value="Submit">

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
        <li class="bookmark-item js-bookmark-item" data-bookmark-id = "${bookmark.id}">
          <div>
            <h3>${bookmark.title}</h3>
            <div class="rating">${bookmark.rating} stars</div>
          </div>
        </li>
        `;
    }else{
      console.log(bookmark);
      return `
      <li class="bookmark-item js-bookmark-item" data-bookmark-id = "${bookmark.id}">
        <h3>${bookmark.title}</h3>
        <div class="rating">${bookmark.rating} star(s)</div>
        <button class="bookmark-delete js-bookmark-delete" type="button" name="button">delete</button>
        <p>${bookmark.desc}</p>
        <a href="${bookmark.url}">visit site</a>
        </div>
      </li>
      `;
    }
  }

  function generateBookmarkListString(bookmarks) {
    return bookmarks.map(bookmark => generateBookmarkLi(bookmark)).join('');
  }

  function getIdFromBookmarkElem(bookmark) {
    console.log(bookmark);
    console.log($(bookmark).closest('.js-bookmark-item'));
    return $(bookmark).closest('.js-bookmark-item').data('bookmark-id');
  }


  ///////////listeners

  function handleAddNewBookmarkFormClick() {
    $('.js-add-bookmark-button').on('click', event => {
      console.log('handleAddNewBookmarkFormClick was clicked');
      store.toggleAddingBookmark();
      $('.js-add-bookmark-form').html(generateAddNewBookmarkForm());
    });
  }

  function handleCreateNewBookmarkClick() {
    $('.js-add-bookmark-form').submit( event => {
      event.preventDefault();
      const newbookmarkObj = $(event.target).serializeJSON();
      store.toggleAddingBookmark();
      api.createBookmark(newbookmarkObj, bookmark => {
        bookmark.condensed = true;
        store.addBookmark(bookmark);
        renderAddBookmarkForm();
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
    console.log('handleDeleteBookmarkClick fired');
    $('.js-bookmarks').on( 'click', '.js-bookmark-delete',  event => {
      console.log('handleDeleteBookmarkClick was clicked');
      const id = getIdFromBookmarkElem(event.target);
      console.log(id);
      api.deleteBookmark(id, () => {
        console.log(id);
        store.findAndDeleteBookmark(id);
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

  function handleExpandBookmarkClick() {
    $('.js-bookmarks').on('click', '.js-bookmark-item', event => {
      const id = getIdFromBookmarkElem(event.target);
      store.toggleBookmarkView(id);
      render();
    });
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
