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

  returnCard() {
    this.returnDate = this.stringifyDate();
  }
}

function reloadTable() {
  var newRow, newCell, index;
  var tableBody = document.getElementById("table-body");
  var table = tableBody.parentNode;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");
  table.replaceChild(newTableBody, tableBody);

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
  });
}

function addCard(card) {
  cards.push(card);
  localStorage.setItem("cards", JSON.stringify(cards));
  reloadTable();
}

var cards = [];
Card.counter = localStorage.getItem("cardCounter");
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
  addCard( new Card(addForm.visitor.value, addForm.book.value, addForm.borrow.value) );
  popupOverlay.style.display = "none";
  e.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.setItem("cardCounter", Card.counter);
});