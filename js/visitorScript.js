class Visitor {
  constructor(fullName, phone) {
    this.id = ++Visitor.counter;
    this.fullName = fullName || "";
    this.phone = phone || "";
  }
}



function fillTable(list) {
  var newRow, newCell, len, index;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");

  visitors = JSON.parse(localStorage.getItem("visitors")) || [];

  (list || visitors).forEach((visitor) => {
    len = newTableBody.rows.length;
    newRow = newTableBody.insertRow(len);
    index = 0;

    for (var prop in visitor) {
      if (typeof prop !== "function") {
        newCell = newRow.insertCell(index++);
        newCell.innerHTML = visitor[prop];
      }
    }

    newCell = newRow.insertCell(index++);
    newCell.innerHTML = `<input class="table-btn" onclick="showEditForm(${visitor.id})" ` +
                               `type="image" src="media/edit.png" alt="Edit">`;
  });

  var tableBody = document.getElementById("table-body");
  tableBody.parentNode.replaceChild(newTableBody, tableBody);
}

function showEditForm(id) {
  var editForm = document.edit;
  var visitor = visitors.filter((visitor) => visitor.id == id)[0];

  editForm.name.value = visitor.fullName;
  editForm.phone.value = visitor.phone;

  popupOverlays[1].style.display = "flex";
  popupOverlays[1].style.height = `${document.documentElement.scrollHeight}px`;

  editForm.onsubmit = function(e) {
    if (editForm.checkValidity()) {
      visitor.fullName = editForm.name.value;
      visitor.phone = editForm.phone.value;

      localStorage.setItem("visitors", JSON.stringify(visitors));
      fillTable();
      popupOverlays[1].style.display = "none";
    }
    e.preventDefault();
  };
}

function sortVisitors(propName) {
  var sortedVisitors = JSON.parse( JSON.stringify(visitors) );
  sortedVisitors.sort((x, y) => {
    if (x[propName] == y[propName]) return 0;
    return x[propName] > y[propName] ? 1 : -1;
  });
  return sortedVisitors;
}



var visitors = [];
Visitor.counter = localStorage.getItem("visitorCounter") || 0;
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

addForm.phone.addEventListener("keypress", (e) => {
  if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 32 && e.keyCode != 45) {
      e.preventDefault();
  }
});

addForm.addEventListener("submit", (e) => {
  if (addForm.checkValidity()) {
    visitors.push( new Visitor(addForm.name.value, addForm.phone.value) );

    localStorage.setItem("visitors", JSON.stringify(visitors));
    fillTable();
    popupOverlays[0].style.display = "none";
    addForm.reset();
  }
  e.preventDefault();
});

sortButton.addEventListener("click", () => {
  fillTable( sortVisitors(sortField.value) );
});

searchButton.addEventListener("click", () => {
  var filteredVisitors = [], visitorCopy, foundIndex;

  for (var visitor of visitors) {
    visitorCopy = Object.assign({}, visitor);

    foundIndex = visitorCopy.fullName.indexOf(searchField.value);
    if (foundIndex >= 0) {
      filteredVisitors.push(visitorCopy);
      continue;
    }

    foundIndex = visitorCopy.phone.indexOf(searchField.value);
    if (foundIndex >= 0) filteredVisitors.push(visitorCopy);
  }

  fillTable(filteredVisitors);
});

window.addEventListener("unload", () => {
  localStorage.setItem("visitorCounter", Visitor.counter);
});
