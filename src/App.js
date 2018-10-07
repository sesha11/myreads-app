import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';
import Shelf from './models/Shelf';
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.findBook = this.findBook.bind(this);
    this.addBook = this.addBook.bind(this);
    this.updateShelf = this.updateShelf.bind(this);
  }

  // Maintaining the list of shelves in a variable instead of hard coding the strings
  shelves = [
    new Shelf('Currently Reading', 'currentlyReading'),
    new Shelf('Want to Read', 'wantToRead'),
    new Shelf('Read', 'read'),
    new Shelf('None', 'none')
  ];

  // The state of the app component will contain the list of books being used by the user
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      });
    }, err => {
      console.log('someething went wrong');
    })
  }

  // returns a book if present in the app component's state
  findBook(searchBook) {
    return this.state.books.find(book => book.id === searchBook.id);
  }

  // adds a book to the app component's state along with the shelf
  addBook(book, shelf) {
    book.shelf = shelf;
    this.state.books.push(book);
  }

  // Updates the shelfinfo inside a book. If the shelf value is none, then the book is removed from the app component's state
  updateShelf(book, shelf) {
    if(shelf.value === 'none') {
      const bookIndex = this.state.books.findIndex(bk => bk.id === book.id);
      this.state.books.splice(bookIndex, 1);
    } else {
      book.shelf = shelf;
    }
    this.setState(this.state);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (<ListBooks shelves={this.shelves} books={this.state.books} updateShelf={this.updateShelf}/>)}/>
        <Route path='/search' render={() => (
          <SearchBooks shelves={this.shelves} findBook={this.findBook} addBook={this.addBook} updateShelf={this.updateShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
