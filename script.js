class Task {
  constructor(taskNumber, taskName, priority) {
    this.taskName = taskName;
    this.priority = priority;
    this.taskNumber = taskNumber;
  }
}
function addTask() {
  let taskName = document.getElementById("newTask").value;
  let priority = document.getElementById("priority").value;
  let taskNumber = taskCount;
  let task = new Task(taskNumber, taskName, priority);
  tasks.push(task);
  document.querySelector("table").innerHTML += `
          <tr id="${task.taskNumber}">  
          <td scope="col">${taskCount}</td>
          <td scope="col">${task.taskName}</td>
          <td scope="col">${task.priority}</td>
          <td scope="col"><button class="btn btn-danger" id="delete" onclick="deleteTask(${task.taskNumber})" >delete</button></td>
          </tr>
          `;
  taskCount++;
}
function deleteTask(taskNumber) {
  tasks.splice(
    tasks.indexOf(tasks.find((task) => task.taskNumber == taskNumber)),
    1
  );
  console.log(tasks);
  document.getElementById(`${taskNumber}`).remove();
}

let taskCount = 1;
const tasks = [];

document.getElementById("add").onclick = function () {
  if (document.getElementById("newTask").value.length == 0) {
    alert("please input a valid task");
  }else if (document.getElementById("priority").value.length == 0){
    alert("please input a valid priority (low, med, or high)");
  }else if (document.getElementById("priority").value !== "low" && document.getElementById("priority").value !== "med" && document.getElementById("priority").value !== "high") {
    alert("please input a valid priority (low, med, or high)");
  } 
  else {
    addTask();
  }
};
