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
    return `${date.getFullYear()}-` +
           `${(month < 10 ? "0" + month : month)}-` +
           `${date.getDate()}`;
  }
}



function reloadTable() {
  var newRow, newCell, len, book;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");

  cards = JSON.parse(localStorage.getItem("cards")) || [];
  visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  books = JSON.parse(localStorage.getItem("books")) || [];

  cards.forEach((card) => {
    len = newTableBody.rows.length;
    book = books.filter((book) => book.id == card.bookId)[0];
    if (typeof book !== "undefined") {
      newRow = newTableBody.insertRow(len);

      newCell = newRow.insertCell(0);
      newCell.innerHTML = card.id;

      newCell = newRow.insertCell(1);
      newCell.innerHTML = visitors[card.visitorId - 1].fullName;

      newCell = newRow.insertCell(2);
      newCell.innerHTML = book.name;

      newCell = newRow.insertCell(3);
      newCell.innerHTML = card.borrowDate;

      newCell = newRow.insertCell(4);
      if (card.returnDate === null) {
        newCell.innerHTML = `<input class="table-btn" onclick="returnBook(${len})" ` +
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

  for (var i = 0; i < addForm.book.options.length; i++) {
    addForm.book.remove(i);
  }

  for (var i = 0; i < visitors.length; i++) {
    addForm.visitor.add( new Option(visitors[i].fullName, visitors[i].id) );
  }

  for (var i = 0; i < books.length; i++)
    if (books[i].copiesLeft > 0) {
      addForm.book.add( new Option(books[i].name, books[i].id) );
    }
}

function giveBookOut(id) {
  var book = books.filter((book) => book.id == id)[0];
  book.copiesLeft--;
  localStorage.setItem("books", JSON.stringify(books));
  fillOptions();
  return book;
}

function returnBook(index) {
  var card = cards[index];
  var book = books.filter((book) => book.id == card.bookId)[0];
  card.returnDate = Card.stringifyDate();
  book.copiesLeft++;
  localStorage.setItem("cards", JSON.stringify(cards));
  localStorage.setItem("books", JSON.stringify(books));
  reloadTable();
}



var cards = [], visitors, books;
Card.counter = localStorage.getItem("cardCounter") || 0;
reloadTable();
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
});

addForm.addEventListener("submit", (e) => {
  if (addForm.checkValidity()) {
    var book = giveBookOut(addForm.book.value);
    cards.push( new Card(addForm.visitor.value, book.id) );

    localStorage.setItem("cards", JSON.stringify(cards));
    reloadTable();
    popupOverlay.style.display = "none";
    addForm.clear();
  }
  e.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.setItem("cardCounter", Card.counter);
});
