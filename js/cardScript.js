class Card {
  constructor(visitorId, bookId) {
    this.id = ++Card.counter;
    this.visitorId = visitorId || 1;
    this.bookId = bookId || 1;
    this.borrowDate = Card.stringifyDate();
    this.returnDate = null;
  }

  static stringifyDate(date = new Date()) {
    var month = date.getMonth() + 1;
    return `${date.getDate()}.` +
           `${(month < 10 ? "0" + month : month)}.` +
           `${date.getFullYear()}`;
  }
}



function fillTable() {
  var newRow, newCell, book, visitor;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");

  cards = JSON.parse(localStorage.getItem("cards")) || [];
  visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  books = JSON.parse(localStorage.getItem("books")) || [];

  cards.forEach((card) => {
    book = books.filter((book) => book.id == card.bookId)[0];
    visitor = visitors.filter((visitor) => visitor.id == card.visitorId)[0];
    if (book && visitor) {
      newRow = newTableBody.insertRow(newTableBody.rows.length);

      newCell = newRow.insertCell(0);
      newCell.innerHTML = card.id;

      newCell = newRow.insertCell(1);
      newCell.innerHTML = visitor.fullName;

      newCell = newRow.insertCell(2);
      newCell.innerHTML = book.name;

      newCell = newRow.insertCell(3);
      newCell.innerHTML = card.borrowDate;

      newCell = newRow.insertCell(4);
      if (card.returnDate === null) {
        newCell.innerHTML = `<input class="table-btn" onclick="returnBook(${card.id})" ` +
                                   `type="image" src="media/return.png" alt="Return">`;
      } else {
        newCell.innerHTML = card.returnDate;
      }
    }
  });

  var tableBody = document.getElementById("table-body");
  tableBody.parentNode.replaceChild(newTableBody, tableBody);
}

function fillOptions() {
  var addForm = document.add;
  books = JSON.parse(localStorage.getItem("books")) || [];

  for (var index in addForm.book.options) addForm.book.remove(index);

  visitors.forEach((visitor) => {
    addForm.visitor.add( new Option(visitor.fullName, visitor.id));
  });

  books.forEach((book) => {
    if (book.copiesLeft > 0) addForm.book.add( new Option(book.name, book.id) );
  });
}

function giveBookOut(id) {
  var book = books.filter((book) => book.id == id)[0];
  book.copiesLeft--;
  localStorage.setItem("books", JSON.stringify(books));
  fillOptions();
  return book;
}

function returnBook(id) {
  var card = cards.filter((card) => card.id == id)[0];
  var book = books.filter((book) => book.id == card.bookId)[0];
  card.returnDate = Card.stringifyDate();
  book.copiesLeft++;
  localStorage.setItem("cards", JSON.stringify(cards));
  localStorage.setItem("books", JSON.stringify(books));
  fillTable();
}



var cards, visitors, books;
Card.counter = localStorage.getItem("cardCounter") || 0;
fillTable();
fillOptions();

var addButton = document.getElementById("add-btn");
var cross = document.getElementsByClassName("cross")[0];
var popupOverlay = document.getElementsByClassName("popup-overlay")[0];
var addForm = document.add;

addButton.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
  popupOverlay.style.height = `${document.documentElement.scrollHeight}px`;
});

cross.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  addForm.reset();
});

addForm.addEventListener("submit", (e) => {
  if (addForm.checkValidity()) {
    var book = giveBookOut(addForm.book.value);
    cards.push( new Card(addForm.visitor.value, book.id) );

    localStorage.setItem("cards", JSON.stringify(cards));
    fillTable();
    popupOverlay.style.display = "none";
    addForm.reset();
  }
  e.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.setItem("cardCounter", Card.counter);
});
