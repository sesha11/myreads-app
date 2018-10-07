import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import SearchBooks from './components/SearchBooks';
import ListBooks from './components/ListBooks';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (<ListBooks/>)}/>
        <Route path='/search' component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
