class Book {
  constructor(name, authorName, yearOfPublish,
              publisherName, pagesNumber, copiesLeft) {
    this.id = Book.counter++;
    this.name = name || "";
    this.authorName = authorName || "";
    this.yearOfPublish = yearOfPublish || new Date().getFullYear();
    this.publisherName = publisherName || "";
    this.pagesNumber = pagesNumber || 100;
    this.copiesLeft = copiesLeft || 1;
  }
}



function reloadTable() {
  var newRow, newCell, index;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");

  books = JSON.parse(localStorage.getItem("books")) || [];
  books.forEach((book) => {
    newRow = newTableBody.insertRow(newTableBody.rows.length);
    index = 0;
    for (var prop in book)
      if (typeof prop !== "function") {
        newCell = newRow.insertCell(index++);
        newCell.innerHTML = book[prop];
      }
      newCell = newRow.insertCell(index++);
      newCell.innerHTML = "<input class=\"table-btn\" type=\"image\" src=\"media/edit.png\" alt=\"Edit\">";
      newCell = newRow.insertCell(index++);
      newCell.innerHTML = "<input class=\"table-btn\" type=\"image\" src=\"media/delete.png\" alt=\"Delete\">";
  });

  var tableBody = document.getElementById("table-body");
  var table = tableBody.parentNode;
  table.replaceChild(newTableBody, tableBody);
}

function addBook(book) {
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  reloadTable();
}



var books = [];
Book.counter = localStorage.getItem("bookCounter") || 1;
reloadTable();

var addButton = document.getElementById("add-btn");
var crosses = document.getElementsByClassName("cross");
var popupOverlays = document.getElementsByClassName("popup-overlay");
var addForm = document.add;

addButton.addEventListener("click", () => {
  popupOverlays[0].style.display = "flex";
  popupOverlays[0].style.height = `${document.documentElement.scrollHeight}px`;
});

crosses[0].addEventListener("click", () => {
  popupOverlays[0].style.display = "none";
});

crosses[1].addEventListener("click", () => {
  popupOverlays[1].style.display = "none";
});

addForm.addEventListener("submit", (e) => {
  if (addForm.checkValidity()) {
    addBook( new Book(addForm.name.value, addForm.author.value,
                        addForm.year.value, addForm.publisher.value,
                        addForm.pages.value, addForm.copies.value) );
    popupOverlays[0].style.display = "none";
  }
  e.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.setItem("bookCounter", Book.counter);
});
