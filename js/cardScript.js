class Card {
  constructor(visitorName, bookName, borrowDate) {
    this.id = Card.counter++;
    this.visitorName = visitorName || 0;
    this.bookName = bookName || 0;
    this.borrowDate = borrowDate || this.stringifyDate();
    this.returnDate = "<input class=\"table-btn\" type=\"image\" src=\"media/return.png\" alt=\"Return\">";
  }

  stringifyDate(date = new Date()) {
    var month = date.getMonth() + 1;
    return `${date.getFullYear()}-` +
           `${(month < 10 ? "0" + month : month)}-` +
           `${date.getDate()}.`;
  }

  returnCard() {
    this.returnDate = this.stringifyDate();
  }
}



function reloadTable() {
  var newRow, newCell, index;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");

  cards = JSON.parse(localStorage.getItem("cards"));
  if (cards === null) cards = [];

  cards.forEach((card) => {
    newRow = newTableBody.insertRow(newTableBody.rows.length);
    index = 0;
    for (var prop in card)
      if (typeof prop !== "function") {
        newCell = newRow.insertCell(index++);
        newCell.innerHTML = card[prop];
      }
      newCell = newRow.insertCell(index++);
      newCell.innerHTML = "<input class=\"table-btn\" type=\"image\" src=\"media/edit.png\" alt=\"Edit\">";
  });

  var tableBody = document.getElementById("table-body");
  tableBody.parentNode.replaceChild(newTableBody, tableBody);
}

function fillOptions() {
  var addForm = document.add;
  var visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  var books = JSON.parse(localStorage.getItem("books")) || [];

  for (var i = 0; i < addForm.book.options.length; i++) {
    addForm.book.remove(i);
  }

  for (var i = 0; i < visitors.length; i++) {
    addForm.visitor.add( new Option(visitors[i].fullName, i) );
  }

  for (var i = 0; i < books.length; i++)
    if (books[i].copiesLeft > 0) {
      addForm.book.add( new Option(books[i].name, i) );
    }
}

function addCard(card) {
  cards.push(card);
  localStorage.setItem("cards", JSON.stringify(cards));
  reloadTable();
}

function giveBookOut(index) {
  var books = JSON.parse(localStorage.getItem("books"));
  var book = books[index];
  book.copiesLeft--;
  localStorage.setItem("books", JSON.stringify(books));
  fillOptions();
  return book;
}



var cards = [];
Card.counter = localStorage.getItem("cardCounter") || 1;
reloadTable();
fillOptions();

var addButton = document.getElementById("add-btn");
var cross = document.querySelector(".cross");
var popupOverlay = document.querySelector(".popup-overlay");
var addForm = document.add;

addButton.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
});

cross.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});

addForm.addEventListener("submit", (e) => {
  if (addForm.checkValidity()) {
    var visitors = JSON.parse(localStorage.getItem("visitors"));
    var visitor = visitors[addForm.visitor.value];
    var book = giveBookOut(addForm.book.value);

    addCard( new Card(visitor.fullName, book.name, addForm.borrow.value) );
    popupOverlay.style.display = "none";
  }
  e.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.setItem("cardCounter", Card.counter);
});
