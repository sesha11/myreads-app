import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';
import Shelf from './models/Shelf';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  shelves = ['Currently Reading', 'Want to Read', 'Read'];

  constructor(props) {
    super(props);
    this.state = this.shelves.reduce((hash, obj) => {
      hash[obj] = new Shelf(obj);
      return hash;
    }, {});
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (<ListBooks shelves={this.shelves}/>)}/>
        <Route path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
