import React, { Component } from "react";

class BookInfo extends Component {
  getThumbnail() {
    const {book} = this.props;
    return (book.imageLinks == null || book.imageLinks.thumbnail == null) ? '' : book.imageLinks.thumbnail;
  }

  getAuthors() {
    const {book} = this.props;
    return book.authors == null ? "" : book.authors.join(", ");
  }

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
              backgroundImage: "url(" + this.getThumbnail() + ")"
            }}
          />
          <div className="book-shelf-changer">
            <select
              defaultValue={book.shelf == null ? "none" : book.shelf}
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
          {this.getAuthors()}
        </div>
      </div>
    );
  }
}

export default BookInfo;
