class Visitor {
  constructor(fullName, phone) {
    this.id = Visitor.counter++;
    this.fullName = fullName || "";
    this.phone = phone || "";
  }
}



function reloadTable() {
  var newRow, newCell, len, index;
  var newTableBody = document.createElement("tbody");
  newTableBody.setAttribute("id", "table-body");

  visitors = JSON.parse(localStorage.getItem("visitors")) || [];
  visitors.forEach((visitor) => {
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
    newCell.innerHTML = `<input class="table-btn" onclick="showEditForm(${len})" ` +
                               `type="image" src="media/edit.png" alt="Edit">`;
  });

  var tableBody = document.getElementById("table-body");
  tableBody.parentNode.replaceChild(newTableBody, tableBody);
}

function showEditForm(index) {
  var editForm = document.edit;

  editForm.name.value = visitors[index].fullName;
  editForm.phone.value = visitors[index].phone;

  popupOverlays[1].style.display = "flex";
  popupOverlays[1].style.height = `${document.documentElement.scrollHeight}px`;

  editForm.onsubmit = function() {
    if (editForm.checkValidity()) {
      visitors[index].fullName = editForm.name.value;
      visitors[index].phone = editForm.phone.value;

      localStorage.setItem("visitors", JSON.stringify(visitors));
      reloadTable();
      popupOverlays[1].style.display = "none";
    }
    e.preventDefault();
  };
}



var visitors = [];
Visitor.counter = localStorage.getItem("visitorCounter") || 1;
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
  reloadTable();
  popupOverlays[0].style.display = "none";
  addForm.clear();
  }
  e.preventDefault();
});

window.addEventListener("unload", () => {
  localStorage.setItem("visitorCounter", Visitor.counter);
});
