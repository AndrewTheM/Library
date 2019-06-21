class Book {
  constructor(name, authorName, yearOfPublish,
              publisherName, pagesNumber, copiesLeft) {
    if (Book.counter === undefined) Book.counter = 0;
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


class Visitor {
  constructor(fullName, phone) {
    if (Visitor.counter === undefined) Visitor.counter = 0;
    this.id = Visitor.counter++;
    this.fullName = fullName || "";
    this.phone = phone || "";
  }
}


class Card {
  constructor(visitorId, bookId, borrowDate) {
    if (Card.counter === undefined) Card.counter = 0;
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


var addButton = document.getElementById("add-btn");
var cross = document.querySelector(".cross");
var popupOverlay = document.getElementById("popup-overlay");
addButton.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
});
cross.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});
