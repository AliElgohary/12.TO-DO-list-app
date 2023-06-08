class Task {
  constructor(taskName, priority) {
    this.taskName = taskName;
    this.priority = priority;
    this.done = false; 
    this.checked = false;
  }
  add() {
    tasks.push(this);
  }
  valid(name, priority) {
    const regEx = /^[A-Za-z]/;
    if (!regEx.test(name)) {
      alert("Please input a valid task.");
      return false;
    } else if (isNaN(Number(priority)) || Number(priority) < 1 || Number(priority) > 5) {
      alert("Please input a valid priority number between 1 and 5.");
      return false;
    } else {
      return true;
    }
  }
  delete(i) {
    tasks.splice(i, 1);
  }
  markDone() {
    this.done = true;
  }
}

class TodoUI {
  static addTaskToList(i, task) {
    let taskNameClass = task.done ? 'taskDone' : '';
    let priorityClass = task.done ? 'taskDone' : '';
    let doneButton = task.done ? 'Undone' : 'Done';
    let checkBox = task.checked ? 'checked' : '';
    let tr = `
      <tr>  
        <td scope="col">${i + 1}</td>
        <div class="form-check">
        <td scope="col" id="task${i}" >
        <input type="checkbox" onchange="toggleTaskChecked(${i})" ${checkBox} class="form-check-input" id="flexCheckDefault">
        <label class="form-check-label ${taskNameClass}" for="flexCheckDefault">
        ${task.taskName}
        </label> 
        </td>
        </div>
        <td scope="col" class="${priorityClass}">
        ${task.priority}
      </td>
        <td scope="col">
          <button class="btn btn-success" onclick="renderEdit(${i})">Edit</button> 
          <button class="btn btn-danger" onclick="deleteTask(${i})">Delete</button>
          <button class="btn btn-outline-light" onclick="markTaskDone(${i})">${doneButton}</button>
        </td>
      </tr>
    `;
    return tr;
  }
  static renderTaskTable() {
    let tbody = "";
    for (let i = 0; i < tasks.length; i++) {
      tbody += TodoUI.addTaskToList(i, tasks[i]);
    }
    document.getElementById("tableContent").innerHTML = tbody;
    const taskName = (document.getElementById("newTask").value = "");
    const priority = (document.getElementById("priority").value = "");
  }
}

const markTaskDone = function (i) {
  tasks[i].done = !tasks[i].done;
  TodoUI.renderTaskTable();
};

const toggleTaskChecked = function (i) {
  tasks[i].checked = !tasks[i].checked;
};

const deleteCheckedTasks = function () {
  tasks = tasks.filter(task => !task.checked); 
  TodoUI.renderTaskTable();
};

let tasks = [];
const addTask = function () {
  const taskName = document.getElementById("newTask").value;
  const priority = document.getElementById("priority").value;
  const task = new Task(taskName, priority);
  if (task.valid(taskName, priority)) {
    task.add();
  }
};

document.getElementById("add").onclick = function (task) {
  addTask();
  TodoUI.renderTaskTable();
};

const deleteTask = function (i) {
  tasks[i].delete(i);
  TodoUI.renderTaskTable();
};



const renderEdit = function (i) {
  document.getElementById(
    `task${i}`
  ).innerHTML = `<input type="text" class="form-control w-50" placeholder="edit your task name here" id="editedTask"> 
  <button class="btn btn-secondary mx-2" onclick="cancelEdit()" >Cancel</button>
  <button class="btn btn-light" onclick="saveEdit(${i})" >Save</button>`;
};

const saveEdit = function (i) {
  if (document.getElementById("editedTask").value.length == 0) {
    alert("please enter a valid task");
  } else if (document.getElementById("editedTask").value.length > 0) {
    tasks[i].taskName = document.getElementById("editedTask").value;
  }
  cancelEdit();
  TodoUI.renderTaskTable();
};

const cancelEdit = function (i) {
  document.getElementById(`editedTask`).innerHTML = "";
  TodoUI.renderTaskTable();
};

const SortByName = function () {
  tasks = tasks.sort((n1, n2) =>
    n1.taskName > n2.taskName ? 1 : n2.taskName > n1.taskName ? -1 : 0
  );
  TodoUI.renderTaskTable();
};

const SortByPriority = function () {
  tasks = tasks.sort((p1, p2) =>
    p1.priority > p2.priority ? 1 : p2.priority > p1.priority ? -1 : 0
  );
  TodoUI.renderTaskTable();
};
