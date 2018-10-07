import React, { Component } from "react";

class BookInfo extends Component {
  render() {
    const { book, shelves, onContextMenuChange } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: "url(" + book.imageLinks.thumbnail + ")"
            }}
          />
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf == null ? "none" : book.shelf.value}
              onChange={event => onContextMenuChange(event.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              {shelves.map(shelf => (
                <option key={shelf.value} value={shelf.value}>
                  {shelf.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors == null ? "" : book.authors.join(", ")}
        </div>
      </div>
    );
  }
}

export default BookInfo;
