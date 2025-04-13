const input = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

window.onload = function() {
  const savedTheme = localStorage.getItem("theme") || "light";
  body.className = savedTheme;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToList);
};

themeToggle.onclick = function() {
  body.classList.toggle("dark");
  body.classList.toggle("light");
  localStorage.setItem("theme", body.className);
};

button.onclick = function() {
  const task = input.value.trim();
  if (task) {
    addTaskToList(task);
    saveTask(task);
    input.value = "";
  }
};

function addTaskToList(taskText) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;

  const btnGroup = document.createElement("div");
  btnGroup.className = "buttons";

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.className = "btn editBtn";
  editBtn.onclick = function() {
    const newTask = prompt("Изменить задачу:", span.textContent);
    if (newTask) {
      updateTask(span.textContent, newTask);
      span.textContent = newTask;
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.className = "btn deleteBtn";
  deleteBtn.onclick = function() {
    li.remove();
    removeTask(span.textContent);
  };

  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btnGroup);
  list.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(oldTask, newTask) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const index = tasks.indexOf(oldTask);
  if (index !== -1) {
    tasks[index] = newTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function removeTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updated = tasks.filter(t => t !== task);
  localStorage.setItem("tasks", JSON.stringify(updated));
}
