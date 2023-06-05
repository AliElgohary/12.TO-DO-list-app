class Task {
  constructor(taskName, priority) {
    this.taskName = taskName;
    this.priority = priority;
  }
}

let taskCount = 1;
let tasks = [];

const addTask = function () {
  const taskName = document.getElementById("newTask").value;
  const priority = document.getElementById("priority").value;
  const task = new Task(taskName, priority);
  tasks.push(task);
};

document.getElementById("add").onclick = function (task) {
  if (document.getElementById("newTask").value.length == 0) {
    alert("please input a valid task");
  } else if (
    isNaN(Number(document.getElementById("priority").value)) ||
    Number(document.getElementById("priority").value) < 1 ||
    Number(document.getElementById("priority").value) > 5
  ) {
    alert("please input a valid priority, number between 1 and 5.");
  } else {
    addTask();
    renderTaskTable();
    taskCount++;
  }
};

const addTaskToList = function (i, task) {
  let tr = `
          <tr >  
          <td scope="col">${i + 1}</td>
          <td scope="col" id="task${i}" class="d-flex justify-content-center">${
    task.taskName
  }</td>
          <td scope="col">${task.priority}</td>
    <td scope="col"><button class="btn btn-success" onclick="renderEdit(${i})" >Edit</button> 
    <button class="btn btn-danger" onclick="deleteTask(${i})" >delete</button>  </td>
          </tr>
          `;
  return tr;
};
const renderTaskTable = function () {
  let tbody = "";
  for (let i = 0; i < tasks.length; i++) {
    tbody += addTaskToList(i, tasks[i]);
  }
  document.getElementById("tableContent").innerHTML = tbody;
  const taskName = (document.getElementById("newTask").value = "");
  const priority = (document.getElementById("priority").value = "");
};

const deleteTask = function (i) {
  tasks.splice(i, 1);
  renderTaskTable();
};

const renderEdit = function (i) {
  document.getElementById(
    `task${i}`
  ).innerHTML = `<input type="text" class="form-control w-50" placeholder="edit your task name here" id="editedTask"> 
  <button class="btn btn-secondary mx-2" onclick="cancelEdit()" >Cancel</button>
  <button class="btn btn-light" onclick="saveEdit(${i})" >Save</button>`;
};

const saveEdit = function (i) {
  if(document.getElementById("editedTask").value.length == 0){
    alert("please enter a valid task");
    }
  else if(document.getElementById("editedTask").value.length > 0){
  tasks[i].taskName = document.getElementById("editedTask").value;
  }
  cancelEdit();
  renderTaskTable();
};

const cancelEdit = function (i) {
  document.getElementById(`editedTask`).innerHTML = "";
  renderTaskTable();
};

const SortByName = function () {
  tasks = tasks.sort((n1, n2) =>
    n1.taskName > n2.taskName ? 1 : n2.taskName > n1.taskName ? -1 : 0
  );
  renderTaskTable();
};

const SortByPriority = function () {
  tasks = tasks.sort((p1, p2) =>
    p1.priority > p2.priority ? 1 : p2.priority > p1.priority ? -1 : 0
  );
  renderTaskTable();
};
