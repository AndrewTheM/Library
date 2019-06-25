class Visitor {
  constructor(fullName, phone) {
    if (Visitor.counter === null) Visitor.counter = 1;
    this.id = Visitor.counter++;
    this.fullName = fullName || "";
    this.phone = phone || "";
  }
}



function reloadTable() {
  var newRow, newCell, index;
  var tableBody = document.getElementById("table-body");
  var table = tableBody.parentNode;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");
  table.replaceChild(newTableBody, tableBody);

  visitors = JSON.parse(localStorage.getItem("visitors"));
  if (visitors === null) visitors = [];

  visitors.forEach((visitor) => {
    newRow = newTableBody.insertRow(newTableBody.rows.length);
    index = 0;
    for (var prop in visitor)
      if (typeof prop !== "function") {
        newCell = newRow.insertCell(index++);
        newCell.innerHTML = visitor[prop];
      }
      newCell = newRow.insertCell(index++);
      newCell.innerHTML = "<input class=\"table-btn\" type=\"image\" src=\"media/edit.png\" alt=\"Edit\">";
  });
}

function addVisitor(visitor) {
  visitors.push(visitor);
  localStorage.setItem("visitors", JSON.stringify(visitors));
  reloadTable();
}



var visitors = [];
Visitor.counter = localStorage.getItem("visitorCounter");
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

addForm.phone.addEventListener("keypress", (e) => {
  if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 32 && e.keyCode != 45) {
      e.preventDefault();
  }
});

addForm.addEventListener("submit", (e) => {
  if (addForm.checkValidity()) {
  addVisitor( new Visitor(addForm.name.value, addForm.phone.value) );
  popupOverlays[0].style.display = "none";
  }
  e.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.setItem("visitorCounter", visitor.counter);
});
