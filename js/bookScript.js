class Book {
  constructor(name, authorName, publicationYear,
              publisherName, pagesNumber, copiesLeft) {
    this.id = ++Book.counter;
    this.name = name || "";
    this.authorName = authorName || "";
    this.publicationYear = publicationYear || new Date().getFullYear();
    this.publisherName = publisherName || "";
    this.pagesNumber = pagesNumber || 100;
    this.copiesLeft = copiesLeft || 1;
  }
}



function fillTable(list) {
  var newRow, newCell, len, index;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");

  books = JSON.parse(localStorage.getItem("books")) || [];

  (list || books).forEach((book) => {
    newRow = newTableBody.insertRow(newTableBody.rows.length);
    index = 0;

    for (var prop in book) {
      if (typeof prop !== "function") {
        newCell = newRow.insertCell(index++);
        newCell.innerHTML = book[prop];
      }
    }

    newCell = newRow.insertCell(index++);
    newCell.innerHTML = `<input class="table-btn" onclick="showEditForm(${book.id})" ` +
                               `type="image" src="media/edit.png" alt="Edit">`;

    newCell = newRow.insertCell(index++);
    newCell.innerHTML = `<input class="table-btn" onclick="deleteFromBooks(${book.id})"` +
                               `type="image" src="media/delete.png" alt="Delete">`;
  });

  var tableBody = document.getElementById("table-body");
  var table = tableBody.parentNode;
  table.replaceChild(newTableBody, tableBody);
}

function saveData() {
  localStorage.setItem("books", JSON.stringify(books));
  fillTable();
}

function showEditForm(id) {
  var editForm = document.edit;
  var book = books.filter((book) => book.id == id)[0];

  editForm.name.value = book.name;
  editForm.author.value = book.authorName;
  editForm.year.value = book.publicationYear;
  editForm.publisher.value = book.publisherName;
  editForm.pages.value = book.pagesNumber;
  editForm.copies.value = book.copiesLeft;

  popupOverlays[1].style.display = "flex";
  popupOverlays[1].style.height = `${document.documentElement.scrollHeight}px`;

  editForm.onsubmit = function(e) {
    if (editForm.checkValidity()) {
      book.name = editForm.name.value;
      book.authorName = editForm.author.value;
      book.publicationYear = editForm.year.value;
      book.publisherName = editForm.publisher.value;
      book.pagesNumber = editForm.pages.value;
      book.copiesLeft = editForm.copies.value;

      saveData();
      popupOverlays[1].style.display = "none";
    }
    e.preventDefault();
  };
}

function deleteFromBooks(id) {
  for (var i = 0; i < books.length; i++) {
    if (books[i].id == id) {
      books.splice(i, 1);
      break;
    }
  }
  saveData();
}

function sortBooks(propName) {
  var sortedBooks = JSON.parse( JSON.stringify(books) );
  sortedBooks.sort((x, y) => {
    if (x[propName] == y[propName]) return 0;
    return x[propName] > y[propName] ? 1 : -1;
  });
  return sortedBooks;
}



var books = [];
Book.counter = localStorage.getItem("bookCounter") || 0;
fillTable();

var addButton = document.getElementById("add-btn");
var sortButton = document.getElementById("sort-btn");
var sortField = document.getElementById("sort-field");
var searchButton = document.getElementById("search-btn");
var searchField = document.getElementById("search-field");
var popupOverlays = document.getElementsByClassName("popup-overlay");
var crosses = document.getElementsByClassName("cross");
var addForm = document.add;

addButton.addEventListener("click", () => {
  popupOverlays[0].style.display = "flex";
  popupOverlays[0].style.height = `${document.documentElement.scrollHeight}px`;
});

for (let i = 0; i < crosses.length; i++) {
  crosses[i].addEventListener("click", () => {
    popupOverlays[i].style.display = "none";
    addForm.reset();
  });
}

addForm.addEventListener("submit", (e) => {
  if (addForm.checkValidity()) {
    books.push( new Book(addForm.name.value, addForm.author.value,
                         +addForm.year.value, addForm.publisher.value,
                         +addForm.pages.value, +addForm.copies.value) );
    saveData();
    popupOverlays[0].style.display = "none";
    addForm.reset();
  }
  e.preventDefault();
});

sortButton.addEventListener("click", () => {
  fillTable( sortBooks(sortField.value) );
});

searchButton.addEventListener("click", () => {
  var filteredBooks = [];
  var book;
  var foundIndex;

  fillTable();

  for (var i = 0; i < books.length; i++) {
    book = Object.assign({}, books[i]);

    foundIndex = book.name.indexOf(searchField.value);
    if (foundIndex >= 0) {
      filteredBooks.push(book);
      continue;
    }

    foundIndex = book.authorName.indexOf(searchField.value);
    if (foundIndex >= 0) {
      filteredBooks.push(book);
      continue;
    }

    foundIndex = book.publisherName.indexOf(searchField.value);
    if (foundIndex >= 0) filteredBooks.push(book);
  }

  fillTable(filteredBooks);
});

window.addEventListener("unload", () => {
  // localStorage.setItem("books", JSON.stringify( sortBooks("id") ));
  localStorage.setItem("bookCounter", Book.counter);
});
