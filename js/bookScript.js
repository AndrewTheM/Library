class Book {
  constructor(name, authorName, yearOfPublish,
              publisherName, pagesNumber, copiesLeft) {
    if (Book.counter === null) Book.counter = 1;
    this.id = Book.counter++;
    this.name = name || "";
    this.authorName = authorName || "";
    this.yearOfPublish = yearOfPublish || new Date().getFullYear();
    this.publisherName = publisherName || "";
    this.pagesNumber = pagesNumber || 100;
    this.copiesLeft = copiesLeft || 1;
  }

  giveOut() {
    if (this.copiesLeft > 0) this.copiesLeft--;
  }

  takeBack() {
    this.copiesLeft++;
  }
}

function reloadTable() {
  var newRow, newCell, index;
  var tableBody = document.getElementById("table-body");
  var table = tableBody.parentNode;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");
  table.replaceChild(newTableBody, tableBody);

  books = JSON.parse(localStorage.getItem("books"));
  if (books === null) books = [];

  books.forEach((book) => {
    newRow = newTableBody.insertRow(newTableBody.rows.length);
    index = 0;
    for (var prop in book)
      if (typeof prop !== "function") {
        newCell = newRow.insertCell(index++);
        newCell.innerHTML = book[prop];
      }
  });
}

function addBook(book) {
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  reloadTable();
}

var books = [];
Book.counter = localStorage.getItem("bookCounter");
reloadTable();

var addButton = document.getElementById("add-btn");
var saveButton = document.getElementById("save-btn");
var cross = document.querySelector(".cross");
var popupOverlay = document.getElementsByClassName("popup-overlay")[0];
var addForm = document.add;

addButton.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
});

cross.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});

addForm.addEventListener("submit", (e) => {
  if (!addForm.checkValidity()) e.preventDefault();
  addBook( new Book(addForm.name.value, addForm.author.value,
                      addForm.year.value, addForm.publisher.value,
                      addForm.pages.value, addForm.copies.value) );
  popupOverlay.style.display = "none";
  e.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.setItem("bookCounter", Book.counter);
});