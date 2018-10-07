import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
/*
This component will enable users to search for books and add them to the dashboard page
*/
const ENTER_KEY = 13;
class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
  }

  state = {
    searchText: '',
    books: []
  }

  searchBooks() {
    BooksAPI.search(this.state.searchText).then(books => {
      books.forEach((book, index) => {
        const result = this.props.findBook(book);
        if(result != null) {
          books[index] = result;
        }
      })
      this.setState({
        books: books
      })
    })
  }

  handleSearch(event) {
    if(event.keyCode === ENTER_KEY) {
      this.searchBooks();
    }
  }

  handleChange(event) {
    this.setState({searchText: event.target.value})
  }

  updateBookShelf(book, event) {
    const shelf = this.props.shelves.find(shelf => shelf.value === event.target.value);
    BooksAPI.update(book, shelf.value).then(() => {
      const result = this.props.findBook(book);
      if(result == null) {
        this.props.addBook(book, shelf);
      } else {
        this.props.updateShelf(result, shelf);
      }
      this.setState(this.state);
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" />
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
                    placeholder="Search by title or author"
                    value = {this.state.searchText}
                    onChange = { this.handleChange.bind(this) }
                    onKeyDown={ this.handleSearch.bind(this) }/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.state.books.map(book =>
                (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover"
                        style={{ width: 128, height: 193, backgroundImage: 'url(' + book.imageLinks.thumbnail + ')' }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue={book.shelf == null ? 'none' : book.shelf.value} onChange={ event => this.updateBookShelf(book, event) }>
                            <option value="move" disabled>Move to...</option>
                            {
                              this.props.shelves.map(shelf => (
                                <option key={shelf.value}
                                        value={shelf.value}>
                                  {shelf.name}
                                </option>
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
    )
  }
}

export default SearchBooks;