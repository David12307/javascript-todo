let tasks = [];
let tasksCompleted = 0;

// If tasks.length === 0 that means that we either don't have any tasks or we didn't load them yet from the localStorage
if (tasks.length === 0) {
    const { tasks: storedTasks, completedCount: storedCompletedCount } = getTasksFromLocalStorage();
    tasks = storedTasks;
    tasksCompleted = storedCompletedCount;
    // If the length of the tasks we retrieved is not 0 then that means we have some tasks to load so we load them
    if (tasks.length !== 0) {
        tasks.forEach((task) => {
            const taskP = document.createElement("p");
            taskP.innerHTML = task;
            const checkBox = document.createElement("input");
            checkBox.type = 'checkbox';
            checkBox.className = 'taskCheck';
            checkBox.addEventListener("change", removeTask);

            const listItem = document.createElement("li");
            listItem.className = 'task';
            listItem.appendChild(taskP);
            listItem.appendChild(checkBox);

            document.getElementById("taskList").appendChild(listItem);
            document.getElementById("taskBox").value = '';
        });
    }
    // Check if the number of tasks completed is 0 or not in order to update it
    if (tasksCompleted !== 0) document.getElementById("noTasks").innerHTML = tasksCompleted; 
}

// Save tasks to localStorage using an object
function saveTasksToLocalStorage(tasks, completedCount) {
    const data = {
        tasks: tasks,
        completedCount: completedCount,
    };
    localStorage.setItem('taskData', JSON.stringify(data));
}

// Get tasks from localStorage and return them in object format
function getTasksFromLocalStorage() {
    const dataString = localStorage.getItem('taskData');
    if (dataString) {
        const data = JSON.parse(dataString);
        return {
            tasks: data.tasks || [],
            completedCount: data.completedCount || 0,
        };
    } else {
        return { tasks: [], completedCount: 0 };
    }
}

// Function to add a task and check if the task is valid
function addTask() {
    const task = document.getElementById("taskBox").value.trim();
    if (tasks.indexOf(task) === -1 && task !== '') {
        tasks.push(task);

        const taskP = document.createElement("p");
        taskP.innerHTML = task;
        const checkBox = document.createElement("input");
        checkBox.type = 'checkbox';
        checkBox.className = 'taskCheck';
        checkBox.addEventListener("change", removeTask);

        const listItem = document.createElement("li");
        listItem.className = 'task';
        listItem.appendChild(taskP);
        listItem.appendChild(checkBox);

        document.getElementById("taskList").appendChild(listItem);
        document.getElementById("taskBox").value = '';

        console.log(tasks);
        saveTasksToLocalStorage(tasks, tasksCompleted);
    } else {
        alert("Add a task that is valid or hasn't already been added.");
    }
}

// Add the task when you press Enter
const taskInput = document.getElementById("taskBox");
taskInput.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') document.getElementById('addButton').click();
});

// Function for task removal
function removeTask(event) {
    const checkbox = event.target;
    const task = checkbox.parentElement.children[0].innerText;

    tasks.splice(tasks.indexOf(task), 1);
    checkbox.parentElement.remove();
    tasksCompleted++;
    document.getElementById("noTasks").innerHTML = tasksCompleted;

    console.log(tasks);
    saveTasksToLocalStorage(tasks, tasksCompleted);
}

// Function to remove all tasks
function removeAll() {
    if (confirm("The tasks deleted won't count as completed. Are you sure you want to continue?")) {
        tasks = [];
        document.getElementById("taskList").innerHTML = '';
        console.log(tasks);
        saveTasksToLocalStorage(tasks, tasksCompleted);
    }
}