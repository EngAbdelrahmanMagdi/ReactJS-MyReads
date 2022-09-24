import React from "react";
import { useState } from "react";
import { update} from "../BooksAPI";
import { Link } from "react-router-dom";
import { bookPreview, success, failed } from "./sweetAlert";
import defaultImage from "../assets/defaultImage.png";
import { BiShowAlt } from "react-icons/bi";

export default function Book({ books, onChangeShelf }) {

  const [shelfState, setShelfState] = useState(books.shelf);

  const updateBook = async (event) => {
    await update(books, event.target.value)
      .then((result) => {
        setShelfState(event.target.value);
        success();
      })
      .catch((error) => {
        failed();
      });
    onChangeShelf(books.id, event.target.value);
  };

  return (
    <div
      style={{ width: "15rem", margin: "0.8rem", border: "0.15rem solid" }}
      className={[
        "card p-0 mb-5",
        books.shelf === "wantToRead"
          ? "border border-success"
          : books.shelf === "read"
          ? "border border-danger"
          : books.shelf === "currentlyReading"
          ? "border border-primary"
          : "border border-dark",
      ]}
    >
      <img
        src={books?.imageLinks?.smallThumbnail || defaultImage}
        style={{ maxHeight: "270px" }}
        className="card-img-top"
        alt="dafaultImage"
      />
      <div

        style={{ width: "15rem"}}
        className="card-footer fs-6 font-weight-bold border border-bottom-2 text-center"
      >
        <p>
          <span>Title </span> :{books.title}
        </p>
        <p>
          <span>Author </span> :  {(books.authors)? books.authors:'Unknown'}
        </p>
        <p>
          <span>Rate </span> :{" "}
          {books.averageRating ? (
            <span
              className={
                books.shelf === "wantToRead"
                  ? "text-success"
                  : books.shelf === "read"
                  ? "text-danger"
                  : books.shelf === "currentlyReading"
                  ? "text-primary"
                  : "text-light"
              }
            >
              {books.averageRating}
            </span>
          ) : (
            "No Ratings"
          )}
        </p>

        <div className="change-shelf">
          <select
            id="change"
            defaultValue={shelfState}
            onChange={(event) => {
              updateBook(event);
            }}
          >
            <option value="disabled" disabled>
              Change Shelf
            </option>
            <option value="none">None</option>
            <option value="read">Add to Read</option>
            <option value="wantToRead">add to WantToRead</option>
            <option value="currentlyReading">Add to CurrentlyReading</option>
          </select>
        </div>
        <div className="col-5">
          <Link
            to="#"
            onClick={() => {
              bookPreview(books);
            }}
            title="Preview for the Book"
          >
            <BiShowAlt
              className={
                books.shelf === "wantToRead"
                  ? "text-success"
                  : books.shelf === "read"
                  ? "text-danger"
                  : books.shelf === "currentlyReading"
                  ? "text-primary"
                  : "text-dark"
              }
              style={{ width: "50px", height: "50px" }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
