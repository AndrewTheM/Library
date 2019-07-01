var booksBody = document.getElementById("books-body");
var visitorsBody = document.getElementById("visitors-body");

var books = JSON.parse(localStorage.getItem("books")) || [];
var visitors = JSON.parse(localStorage.getItem("visitors")) || [];
var cards = JSON.parse(localStorage.getItem("cards")) || [];

var bookCounters = [], visitorCounters = [], counter;

books.forEach((book) => {
  bookCounters.push( {id: book.id, count: 0} );
});

visitors.forEach((visitor) => {
  visitorCounters.push( {id: visitor.id, count: 0} );
})

for (var m = 0; m < cards.length; m++) {

  for (var i = 0; i < books.length; i++) {
    counter = bookCounters.filter((elem) => elem.id == books[i].id)[0];
    counter.count++;
  }

  for (var j = 0; j < visitors.length; j++) {
    counter = visitorCounters.filter((elem) => elem.id == visitors[i].id)[0];
    counter.count++;
  }
}

console.log(visitorCounters);
