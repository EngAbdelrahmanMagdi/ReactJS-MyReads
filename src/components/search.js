import React, { useState } from "react";
import Book from "./books";
import { search } from "../BooksAPI";
import notFound from "../assets/notFound.png";

export function Search({ books }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [stillLoading, setStillLoading] = useState(false);
  const [newBooks, setBooks] = useState([]);

  const onChangeShelf = (bookID, shelf) => {
    let newBookState;
    if (shelf === "none") {
      newBookState = newBooks.filter((book) => {
        return book.id !== bookID;
      });
    } else {
      newBookState = newBooks.map((bookByBook) => {
        if (bookByBook.id === bookID) {
          bookByBook.shelf = shelf;
        }
        return bookByBook;
      });
    }
    setBooks(newBookState);
  };

  const searchByKeyword = async (event) => {
    setSearchKeyword(event.target.value);
    setStillLoading(true);
    console.log("books props are");
    console.log(books);
    const result = await search(searchKeyword, 10);
    let arr = [];
    console.log("result");
    console.log(result);
    for (let i = 0; i < result?.length; i++) {
      let flag = false;
      for (let j = 0; j < books.length; j++) {
        if (result[i].title === books[j].title) {
          arr.push(books[j]);
          flag = true;
          break;
        }
      }
      if (flag === false) {
        arr.push(result[i]);
      }
    }
    console.log("arrray are");
    console.log(arr);

    setBooks(arr);
    setStillLoading(false);
  };

  return (
    <>
      <div className="container-fluid col-12 m-4 text-center">
        <div className="btn-group" role="group">
          <div className="input-group">
            <div className="form-outline mx-5" style={{ width: "17rem" }}>
              <input
                onChange={(e) => searchByKeyword(e)}
                type="search"
                className="form-control"
                placeholder="Enter Book title, ISBN OR Author"
              />
            </div>
          </div>
        </div>

        {stillLoading && (
          <div className="mt-5 d-flex text-center justify-content-center">
            <div className="loading text-center" />
          </div>
        )}

        <div className="row d-flex mt-5 text-center justify-content-center">
          {!stillLoading ? (
            Array.isArray(newBooks) ? (
              newBooks?.map((newBook, index) => {
                return (
                  <Book
                    key={index}
                    books={newBook}
                    onChangeShelf={onChangeShelf}
                  />
                );
              })
            ) : (
              []
            )
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
