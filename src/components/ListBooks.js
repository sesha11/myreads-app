import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/*
This is the main view of the My Reads application, which shows book shelves and the books they contain
*/
class ListBooks extends Component {
  updateBookShelf(book, event) {
    // const shelf = this.props.shelves[event.target.value];
    // BooksAPI.update(book, shelf.value).then(() => {
    //   const result = this.props.findBook(book);
    //   if(result == null) {
    //     this.props.addBook(book, shelf);
    //   } else {
        
    //   }
    // });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {
                  this.props.books.map(book =>
                    (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover"
                            style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
                            <div className="book-shelf-changer">
                              <select value="none" onChange={ event => this.updateBookShelf(book, event) }>
                                <option value="move" disabled>Move to...</option>
                                {
                                  this.props.shelves.map((shelf, index) => (
                                    <option key={shelf.value} value={index}>{shelf.name}</option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors == null ? '' : book.authors.join(', ')}</div>
                        </div>
                      </li>
                    )
                  )
                }
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="search" />
        </div>
      </div>
    )
  }
}

export default ListBooks;