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
          <td scope="col">${task.taskName}</td>
          <td scope="col">${task.priority}</td>
          <td scope="col"><button class="btn btn-danger" id="delete" onclick="deleteTask(${i})" >delete</button> <button class="btn btn-success" id="edit" onclick="editTask(${i})" >Edit</button> </td>
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
