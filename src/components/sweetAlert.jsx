import Swal from "sweetalert2";

export const bookPreview = (bookState) => {
  console.log(bookState);
  Swal.fire({
    title: bookState.title,
    width: "90%",
    html: `
          <div>
          <div class="d-flex justify-content-center align-items-center border-bottom mb-3">
          <div class="d-flex justify-content-center align-items-center col-lg-9 border ${
            bookState.shelf === "wantToRead"
              ? "border-success"
              : bookState.shelf === "read"
              ? "border-danger"
              : "border-primary"
          } border-4">
          <img src=${
            bookState.imageLinks.smallThumbnail
          } width="60%" alt='Image cannot be loaded' />
          <div>
          <div>
          <p class="fs-2 
          ${
            bookState.shelf === "wantToRead"
              ? "text-success"
              : bookState.shelf === "read"
              ? "text-danger"
              : "text-primary"
          }
          ">Author</p>
          <p class="fs-4">${bookState.authors}</p>
          </div><br>
          <div>
          <p class="fs-2 ${
            bookState.shelf === "wantToRead"
              ? "text-success"
              : bookState.shelf === "read"
              ? "text-danger"
              : "text-primary"
          }">Page Counts</p>
          <p class="fs-4">${bookState.pageCount}</p>
          </div>
          </div>
              </div>
              </div>
              <div class="container row justify-content-center text-center">
              <div class="col-lg-9 col-6 card">
                  <div class="card-header border-0 text-center font-weight-bold ${
                    bookState.shelf === "read"
                      ? "bg-danger text-white fs-1"
                      : bookState.shelf === "wantToRead"
                      ? "bg-success text-white fs-1"
                      : "bg-primary text-white fs-1"
                  }">${bookState.shelf}</div>
                  <div class="card-body ">
                      <div class="d-flex justify-content-between align-items-center border-bottom mb-3">
                          <span class="text-center fs-6">
                              ${
                                bookState.description ||
                                "There's no description"
                              }
                          </span >
                      </div >
                  </div >
              </div >
          </div >
          
          </div>
      `,
  });
};

export const failed = () => {
  Swal.fire({
    icon: "error",
    title: "Failure",
    text: "Shelf cannot be changed",
  });
};

export const success = () => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: "The shelf of the book has been changed successfully",
  });
};
