document.addEventListener("DOMContentLoaded", function () {
  const tasksList = document.getElementById("tasks__list");
  const taskInput = document.getElementById("task__input");
  const tasksForm = document.getElementById("tasks__form");

  function createTask(text) {
    const task = document.createElement("div");
    task.className = "task";

    const title = document.createElement("div");
    title.className = "task__title";
    title.textContent = text;

    const removeBtn = document.createElement("a");
    removeBtn.className = "task__remove";
    removeBtn.innerHTML = "&times;";
    removeBtn.href = "#";

    removeBtn.addEventListener("click", function (e) {
      e.preventDefault();
      task.remove();
      saveTasks();
    });

    task.appendChild(title);
    task.appendChild(removeBtn);

    return task;
  }

  function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task__title").forEach((task) => {
      tasks.push(task.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      JSON.parse(savedTasks).forEach((taskText) => {
        tasksList.appendChild(createTask(taskText));
      });
    }
  }

  tasksForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (taskInput.value.trim() !== "") {
      const newTask = createTask(taskInput.value.trim());
      tasksList.appendChild(newTask);
      taskInput.value = "";
      saveTasks();
    }
  });

  taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && this.value.trim() !== "") {
      e.preventDefault();
      const newTask = createTask(this.value.trim());
      tasksList.appendChild(newTask);
      this.value = "";
      saveTasks();
    }
  });

  loadTasks();
});
