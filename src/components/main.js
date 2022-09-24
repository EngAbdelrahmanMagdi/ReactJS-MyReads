import React, { useState, useEffect } from "react";
import Book from "./books";
import { getAll } from "../BooksAPI";
import { FaSearchengin } from "react-icons/fa";
import { Search } from "./search";

export function Main() {
  const [bookState, setBookState] = useState([]);
  const [shelfState, setShelfState] = useState("");
  const [allOrShelfBooks, setAllOrShelfBooks] = useState(true);
  const [searchNotShelf, setSearchNotShelf] = useState(false);

  const [searchColor, setSearchColor] = useState("black");

  useEffect(() => {
    const retrieveAllBooksData = async () => {
      const booksAPIData = await getAll();
      setBookState(booksAPIData);
    };
    retrieveAllBooksData();
  }, []);

  const showShelfBook = (shelf) => {
    setAllOrShelfBooks(false);
    setShelfState(shelf);
  };

  const onChangeShelf = (bookID, shelf) => {
    let newBookState;
    if (shelf === "none") {
      newBookState = bookState.filter((book) => {
        return book.id !== bookID;
      });
    } else {
      newBookState = bookState.map((bookByBook) => {
        if (bookByBook.id === bookID) {
          bookByBook.shelf = shelf;
        }
        return bookByBook;
      });
    }
    setBookState(newBookState);
  };

  return (
    <>
      <div className="container-fluid mt-5 col-12 text-center">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            onClick={() => {
              setSearchNotShelf(false);
              setAllOrShelfBooks(true);
            }}
            className="btn btn-outline-secondary"
          >
            All
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchNotShelf(false);
              showShelfBook("currentlyReading");
            }}
            className="btn btn-outline-primary"
          >
            Currently Reading
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchNotShelf(false);
              showShelfBook("read");
            }}
            className="btn btn-outline-danger"
          >
            Read
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchNotShelf(false);
              showShelfBook("wantToRead");
            }}
            className="btn btn-outline-success"
          >
            Want to Read
          </button>
          <button
            type="button"
            onMouseEnter={() => setSearchColor("white")}
            className="btn btn-outline-dark books"
            onMouseLeave={() => setSearchColor("black")}
            onClick={() => {
              setSearchNotShelf(true);
            }}
          >
            <FaSearchengin
              style={{ width: "30px", height: "30px", color: searchColor }}
            />
          </button>
        </div>
        {bookState.length === 0 && (
          <div className="mt-5 d-flex justify-content-center text-center">
            <div className="loading text-center" />
          </div>
        )}

        <div className="row d-flex mt-3 justify-content-center text-center">
          {searchNotShelf ? (
            <Search books={bookState} />
          ) : allOrShelfBooks ? (
            bookState.map((books) => {
              return (
                <Book
                  key={books.id}
                  books={books}
                  onChangeShelf={onChangeShelf}
                />
              );
            })
          ) : (
            bookState.map((books) => {
              if (books.shelf === shelfState) {
                return (
                  <Book
                    key={books.id}
                    books={books}
                    onChangeShelf={onChangeShelf}
                  />
                );
              }
              return "";
            })
          )}
        </div>
      </div>
    </>
  );
}
