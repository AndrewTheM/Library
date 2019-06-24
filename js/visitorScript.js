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
  addVisitor( new Visitor(addForm.name.value, addForm.phone.value) );
  popupOverlay.style.display = "none";
  e.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.setItem("visitorCounter", visitor.counter);
});