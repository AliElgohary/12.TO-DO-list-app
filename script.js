class Task {
  constructor(taskName, priority) {
    this.taskName = taskName;
    this.priority = priority;
  }
}
let taskCount = 1;
const tasks = [];

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
          <tr">  
          <td scope="col">${i + 1}</td>
          <td scope="col" class="taskCol">${task.taskName}</td>
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
};

const deleteTask = function (i) {
  tasks.splice(i, 1);
  renderTaskTable();
};

const renderEdit = function (i) {
  document.getElementById(
"modifications"
  ).innerHTML = `<input type="text" class="form-control" placeholder="edit your task name here" id="editedTask"> 
  <button class="btn btn-secondary" onclick="cancelEdit()" >Cancel</button>
  <button class="btn btn-light" onclick="saveEdit(${i})" >Save</button>`;
};

const saveEdit = function (i){
  tasks[i].taskName = document.getElementById("editedTask").value;
  renderTaskTable();
}

const cancelEdit = function(){
  document.getElementById(
    "modifications"
      ).innerHTML = ""
  renderTaskTable();
}