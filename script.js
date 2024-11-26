const taskManager = {
    tasks: [],
    
    addTask(taskName, dueDate) {
        const newTask = {
            name: taskName,
            dueDate: dueDate,
            completed: false,
        };
        this.tasks.push(newTask);
        this.renderTasks();
    },
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.renderTasks();
    },

    renderTasks() {
        const pendingTasksContainer = document.getElementById("pending-tasks");
        const completedTasksContainer = document.getElementById("completed-tasks");

        pendingTasksContainer.innerHTML = "";
        completedTasksContainer.innerHTML = "";

        this.tasks.forEach((task, index) => {
            // console.log(task.name , task.completed);
            const taskElement = document.createElement("li");

            taskElement.innerHTML = `
          <span>${task.name} (Due: ${task.dueDate})</span>
          <div>
            <button class="complete-btn" onclick="taskManager.toggleComplete(${index})">
              ${task.completed ? "Undo" : "Complete"}
            </button>
            <button class="delete-btn" onclick="taskManager.deleteTask(${index})">Delete</button>
          </div>
        `;

            if (task.completed) {
                completedTasksContainer.appendChild(taskElement);
            } else {
                pendingTasksContainer.appendChild(taskElement);
            }
        });
    }
};
document.getElementById("add-task-btn").addEventListener("click", () => {
    const taskName = document.getElementById("task-name").value;
    const dueDate = document.getElementById("due-date").value;

    if (taskName && dueDate) {
        taskManager.addTask(taskName, dueDate);
        document.getElementById("task-name").value = "";
        document.getElementById("due-date").value = "";
    } else {
        alert("Please enter both task name and due date.");
    }
});
taskManager.renderTasks();
