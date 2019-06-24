class Book {
  constructor(name, authorName, yearOfPublish,
              publisherName, pagesNumber, copiesLeft) {
    if (Book.counter === undefined) Book.counter = 1;
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

  addAsTableRow() {

  }
}


class Visitor {
  constructor(fullName, phone) {
    if (Visitor.counter === undefined) Visitor.counter = 1;
    this.id = Visitor.counter++;
    this.fullName = fullName || "";
    this.phone = phone || "";
  }
}


class Card {
  constructor(visitorId, bookId, borrowDate) {
    if (Card.counter === undefined) Card.counter = 1;
    this.id = Card.counter++;
    this.visitorId = visitorId || 0;
    this.bookId = bookId || 0;
    this.borrowDate = borrowDate || this.stringifyDate();
    this.returnDate = null;
  }

  stringifyDate(date = new Date()) {
    var month = date.getMonth() + 1;
    return `${date.getDate()}.` +
           `${(month < 10 ? "0" + month : month)}.` +
           `${date.getFullYear()}`;
  }

  returnBook() {
    this.returnDate = this.stringifyDate();
  }
}

function reloadTable() {
  var table = document.getElementById("dataTable");
  var newRow, newCell, index;

  books = JSON.parse(localStorage.getItem("books"));
  if (books instanceOf Array)
      books = [];

  if (books !== null)
    books.forEach((book) => {
      newRow = table.insertRow(table.rows.length);
      index = 0;
      for (var key in book)
        if (typeof key !== "function") {
          newCell = newRow.insertCell(index++);
          newCell.innerHTML = book[key];
        }
    });
}

function addBook(book) {
  if (books == null)
    books = [];
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  reloadTable();
}

var books = [];
reloadTable();
var addButton = document.getElementById("add-btn");
var saveButton = document.getElementById("save-btn");
var cross = document.querySelector(".cross");
var popupOverlay = document.getElementById("popup-overlay");
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
