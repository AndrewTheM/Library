class Card {
  constructor(visitorId, bookId) {
    this.id = Card.counter++;
    this.visitorName = visitorId || 1;
    this.bookName = bookId || 1;
    this.borrowDate = this.stringifyDate();
    this.returnDate = null;
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
  var newRow, newCell, len;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");

  cards = JSON.parse(localStorage.getItem("cards")) || [];
  visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  books = JSON.parse(localStorage.getItem("books")) || [];

  cards.forEach((card) => {
    len = newTableBody.rows.length;
    newRow = newTableBody.insertRow(len);

    newCell = newRow.insertCell(0);
    newCell.innerHTML = visitors[card.visitorId - 1].fullName;

    newCell = newRow.insertCell(1);
    newCell.innerHTML = books.filter((book) => book.id == card.bookId)[0].name;

    newCell = newRow.insertCell(2);
    newCell.innerHTML = card.borrowDate;

    newCell = newRow.insertCell(3);
    newCell.innerHTML = `<input class="table-btn" onclick="" ` +
                               `type="image" src="media/return.png" alt="Return">`;

    newCell = newRow.insertCell(4);
    newCell.innerHTML = `<input class="table-btn" onclick="showEditForm(${len})" ` +
                               `type="image" src="media/edit.png" alt="Edit">`;
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

function giveBookOut(index) {
  var book = books[index];
  book.copiesLeft--;
  localStorage.setItem("books", JSON.stringify(books));
  fillOptions();
  return book;
}

function showEditForm(index) {
  var editForm = document.edit;

  editForm.visitor.selectedIndex = cards[index].visitorId;
  editForm.book.value = visitors[id].phone;

  popupOverlays[1].style.display = "flex";
  popupOverlays[1].style.height = `${document.documentElement.scrollHeight}px`;

  editForm.onsubmit = function() {
    if (editForm.checkValidity()) {
      visitors[id].fullName = editForm.name.value;
      visitors[id].phone = editForm.phone.value;

      localStorage.setItem("visitors", JSON.stringify(visitors));
      reloadTable();
      popupOverlays[1].style.display = "none";
    }
    e.preventDefault();
  };
}




var cards = [], visitors, books;
Card.counter = localStorage.getItem("cardCounter") || 1;
reloadTable();
fillOptions();

var addButton = document.getElementById("add-btn");
var crosses = document.getElementsByClassName("cross");
var popupOverlays = document.getElementsByClassName("popup-overlay");
var addForm = document.add;

addButton.addEventListener("click", () => {
  popupOverlays[0].style.display = "flex";
  popupOverlays[0].style.height = `${document.documentElement.scrollHeight}px`;
});

for (let i = 0; i < crosses.length; i++) {
  crosses[i].addEventListener("click", () => {
    popupOverlays[i].style.display = "none";
  });
}

addForm.addEventListener("submit", (e) => {
  if (addForm.checkValidity()) {
    var book = giveBookOut(addForm.book.value);
    cards.push( new Card(addForm.visitor.value, book.id) );

    localStorage.setItem("cards", JSON.stringify(cards));
    reloadTable();
    popupOverlays[0].style.display = "none";
  }
  e.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.setItem("cardCounter", Card.counter);
});
