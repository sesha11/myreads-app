import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookInfo from './BookInfo';
import * as BooksAPI from "../BooksAPI";

/*
This is the main view of the My Reads application, which shows book shelves and the books they contain
*/
class ListBooks extends Component {
  state = {
    errorMessage: ''
  }
  /*
    call callback method from App to update book's shelf info
  */
  updateBookShelf(book, shelfValue) {
    const shelf = this.props.shelves.find(
      shelf => shelf.value === shelfValue
    );
    BooksAPI.update(book, shelf.value).then(() => {
      this.props.updateShelf(book, shelf.value);
      this.setState(currentState => currentState.errorMessage = '');
    }, err => {
      this.setState({errorMessage: 'Failed to perform the operation'});
    });
  }

  filterBooks(shelf) {
    return this.props.books.filter(book => book.shelf === shelf.value);
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <p style={{color: 'red'}}>{this.state.errorMessage}</p>
        {
          this.props.shelves.filter(shelf => shelf.value !== 'none').map(shelf => (
            <div className="list-books-content" key={shelf.value}>
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                      (() => {
                        const filteredBooks = this.filterBooks(shelf);
                        if(filteredBooks.length === 0) {
                          return <p>No Books added to this shelf</p>
                        } else {
                          return this.filterBooks(shelf).map(book =>
                          (
                            <li key={book.id}>
                              <BookInfo
                                shelves={this.props.shelves}
                                book={book}
                                onContextMenuChange={shelfValue => this.updateBookShelf(book, shelfValue)}
                              />
                            </li>
                          ))
                        }
                      })()
                    }
                    </ol>
                  </div>
                </div>
              </div>
            </div>                    
          ))
        }
        <div className="open-search">
          <Link to="search" />
        </div>
      </div>
    )
  }
}

export default ListBooks;