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



function reloadTable() {
  var newRow, newCell, len, index;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");

  books = JSON.parse(localStorage.getItem("books")) || [];
  books.forEach((book) => {
    len = newTableBody.rows.length;
    newRow = newTableBody.insertRow(len);
    index = 0;

    for (var prop in book) {
      if (typeof prop !== "function") {
        newCell = newRow.insertCell(index++);
        newCell.innerHTML = book[prop];
      }
    }

    newCell = newRow.insertCell(index++);
    newCell.innerHTML = `<input class="table-btn" onclick="showEditForm(${len})" ` +
                               `type="image" src="media/edit.png" alt="Edit">`;

    newCell = newRow.insertCell(index++);
    newCell.innerHTML = `<input class="table-btn" onclick="deleteFromIndex(${len})"` +
                               `type="image" src="media/delete.png" alt="Delete">`;
  });

  var tableBody = document.getElementById("table-body");
  var table = tableBody.parentNode;
  table.replaceChild(newTableBody, tableBody);
}

function saveData() {
  localStorage.setItem("books", JSON.stringify(books));
  reloadTable();
}

function showEditForm(index) {
  var editForm = document.edit;

  editForm.name.value = books[index].name;
  editForm.author.value = books[index].authorName;
  editForm.year.value = books[index].publicationYear;
  editForm.publisher.value = books[index].publisherName;
  editForm.pages.value = books[index].pagesNumber;
  editForm.copies.value = books[index].copiesLeft;

  popupOverlays[1].style.display = "flex";
  popupOverlays[1].style.height = `${document.documentElement.scrollHeight}px`;

  editForm.onsubmit = function() {
    if (editForm.checkValidity()) {
      books[index].name = editForm.name.value;
      books[index].authorName = editForm.author.value;
      books[index].publicationYear = editForm.year.value;
      books[index].publisherName = editForm.publisher.value;
      books[index].pagesNumber = editForm.pages.value;
      books[index].copiesLeft = editForm.copies.value;

      saveData();
      popupOverlays[1].style.display = "none";
    }
    e.preventDefault();
  };
}

function deleteFromIndex(index) {
  books.splice(index, 1);
  saveData();
}



var books = [];
Book.counter = localStorage.getItem("bookCounter") || 0;
reloadTable();

var addButton = document.getElementById("add-btn");
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
                        addForm.year.value, addForm.publisher.value,
                        addForm.pages.value, addForm.copies.value) );
    saveData();
    popupOverlays[0].style.display = "none";
    addForm.reset();
  }
  e.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.setItem("bookCounter", Book.counter);
});
