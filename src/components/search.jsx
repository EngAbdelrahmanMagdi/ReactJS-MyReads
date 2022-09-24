import React, { useState } from "react";
import { Link } from "react-router-dom";
import Book from "../components/books";
import { search } from "../BooksAPI";
import { FaBackward, FaSearchengin } from "react-icons/fa";
import notFound from "../assets/notFound.png";

export function Search() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [stillLoading, setStillLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const onChangeShelf = (bookID, shelf) => {
    let newBookState;
    newBookState = books.map((bookByBook) => {
      if (bookByBook.id === bookID) {
        bookByBook.shelf = shelf;
      }
      return bookByBook;
    });
    setBooks(newBookState);
  };

  const searchByKeyword = async () => {
    setStillLoading(true);
    const result = await search(searchKeyword, 10);
    console.log(searchKeyword);
    console.log(result);
    console.log(stillLoading);
    setBooks(result);
    setStillLoading(false);
  };

  const handelSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <>
      <div className="container-fluid col-12 m-4 text-center">
        <div className="btn-group" role="group">
          <div className="input-group">
            <div className="form-outline mx-5" style={{ width: "17rem" }}>
              <input
                onChange={(e) => handelSearch(e)}
                type="search"
                className="form-control"
                placeholder="Enter Book title, ISBN OR Author"
              />
            </div>
            <button
              className="btn btn-primary ms-3"
              onClick={() => {
                searchByKeyword();
              }}
            >
              <FaSearchengin
                style={{ width: "2rem", height: "2rem", color: "white" }}
              />
            </button>
            <Link
              to={"/"}
              className="btn btn-danger ms-3 "
              style={{ width: "5rem" }}
            >
              <FaBackward
                style={{ width: "2rem", height: "2rem", color: "white" }}
              />
            </Link>
          </div>
        </div>

        {stillLoading && (
          <div className="mt-5 d-flex text-center justify-content-center">
            <div className="loading text-center" />
          </div>
        )}

        <div className="row d-flex mt-5 text-center justify-content-center">
          {!stillLoading && books.length > 0 ? (
            books.map((books) => {
              return (
                <Book
                  key={books.id}
                  books={books}
                  onChangeShelf={onChangeShelf}
                />
              );
            })
          ) : (
            <div className="container align-items-center text-center pb-2">
              {!stillLoading && searchKeyword !== "" && (
                <div>
                  <img src={notFound} alt="there is no data to show" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
