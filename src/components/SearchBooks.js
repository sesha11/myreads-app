import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import BookInfo from "./BookInfo";
import { debounce } from "throttle-debounce";

/*
This component will enable users to search for books and add them to the dashboard page
*/
class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.debouncedSearch = debounce(500, this.searchBooks);
  }

  // The search text box and search results are stored in the component's state
  state = {
    errorMessage: 'Please provide a query in the search textbox',
    searchText: "",
    books: []
  };
  /*
    1. Perform a search, based on the search text
    2. For each book returned in the search:
      2.a verify if the book is already added in App
      2.b if already added:
        - use the shelf info to eventually update the book's context menu
    3. Add the searchresult to component's state
  */
  searchBooks() {
    if(this.state.searchText === '') {
      this.setState({
        books: [],
        errorMessage: 'Please provide a query in the search textbox'
      });
    } else {
      BooksAPI.search(this.state.searchText).then(books => {
        if(books.error != null) {
          this.setState({books: [], errorMessage: 'No matching books found'});
        } else {
          books.forEach((book, index) => {
            const result = this.props.findBook(book);
            if (result != null) {
              books[index] = result;
            }
          });
          this.setState({
            books: books,
            errorMessage: ''
          });
        }
      }, err => {
        this.setState({books: [], errorMessage: 'Failed to perform the operation'});
      });
    }
  }

  // This function is called when the textbox contents are changed. The textbox value is added to the component's state
  handleChange(event) {
    this.setState({ searchText: event.target.value }, () => {
      this.debouncedSearch();
    })
  }

  /*
  This method is called when user selects a menu option from the Book's context menu
    1. Call Booksapi to update the shelf information
    2. check if the book is already added in App
      2a. if book is already added, then update the book's shelf info
      2b. if book is not added, then add book to the App along with shelf info
    3. Update state to re-render the book with the updated context menu value
  */
  updateBookShelf(book, shelfValue) {
    const shelf = this.props.shelves.find(
      shelf => shelf.value === shelfValue
    );
    BooksAPI.update(book, shelf.value).then(() => {
      const result = this.props.findBook(book);
      if (result == null) {
        this.props.addBook(book, shelf.value);
      } else {
        this.props.updateShelf(result, shelf.value);
      }
      this.setState(currentState => currentState.errorMessage = '');
    }, err => {
      this.setState({errorMessage: 'Failed to perform the operation'});
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
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchText}
              onChange={this.handleChange.bind(this)}
            />
          </div>
        </div>
        <div className="search-books-results">
        <p style={{color: 'red'}}>{this.state.errorMessage}</p>
          <ol className="books-grid">
            {this.state.books.map(book => (
              <li key={book.id}>
                <BookInfo
                  shelves={this.props.shelves}
                  book={book}
                  onContextMenuChange={shelfValue =>
                    this.updateBookShelf(book, shelfValue)
                  }
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
