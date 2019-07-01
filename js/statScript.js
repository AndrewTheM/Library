function sortCountersDescending(x, y) {
  if (x.count == y.count) return 0;
  return (x.count < y.count) ? 1 : -1;
}



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
    if (counter.id == cards[m].bookId) counter.count++;
  }

  for (var j = 0; j < visitors.length; j++) {
    counter = visitorCounters.filter((elem) => elem.id == visitors[j].id)[0];
    if (counter.id == cards[m].visitorId) counter.count++;
  }
}

bookCounters.sort(sortCountersDescending);
visitorCounters.sort(sortCountersDescending);

var row, cell, elem;
for (var i = 0; i < 5 && i < bookCounters.length; i++) {
  row = booksBody.insertRow(i);
  elem = books.filter((book) => bookCounters[i].id == book.id)[0];
  cell = row.insertCell(0);
  cell.innerHTML = `"${elem.name}" by ${elem.authorName}`;
  cell = row.insertCell(1);
  cell.innerHTML = `${bookCounters[i].count} copies borrowed`;
}

for (var i = 0; i < 5 && i < visitorCounters.length; i++) {
  row = visitorsBody.insertRow(i);
  elem = visitors.filter((visitor) => visitorCounters[i].id == visitor.id)[0];
  cell = row.insertCell(0);
  cell.innerHTML = elem.fullName;
  cell = row.insertCell(1);
  cell.innerHTML = `${visitorCounters[i].count} visits`;
}
