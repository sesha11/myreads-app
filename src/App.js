import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';
import Shelf from './models/Shelf';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.findBook = this.findBook.bind(this);
    this.addBook = this.addBook.bind(this);
    this.updateShelf = this.updateShelf.bind(this);
  }

  shelves = [
    new Shelf('Currently Reading', 'currentlyReading'),
    new Shelf('Want to Read', 'wantToRead'),
    new Shelf('Read', 'read'),
    new Shelf('None', 'none')
  ];

  state = {
    books: []
  }

  findBook(searchBook) {
    return this.state.books.find(book => book.id === searchBook.id);
  }

  addBook(book, shelf) {
    book.shelf = shelf;
    this.setState(currentState => {
      currentState.books.push(book);
    })
  }

  updateShelf(book, shelf) {
    book.shelf = shelf;
    // this.setState(currentState => {

    // })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (<ListBooks shelves={this.shelves} books={this.state.books}/>)}/>
        <Route path='/search' render={() => (
          <SearchBooks shelves={this.shelves} findBook={this.findBook} addBook={this.addBook} updateShelf={this.updateShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
