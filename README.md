# Task Manager (ToDo's application)
A simple browser-based Task Manager application that allows you to:
* Add new tasks
* Mark tasks as completed
* View the number of tasks completed
* Remove individual tasks
* Clear all tasks

The tasks are saved in the browser's *localStorage*, so your data persists even after refreshing the page.

# Features
1. Add tasks
* Enter a task in the input field and click the 'Add' button or press 'Enter' to add it in the list
* Tasks must be unique and not empty.
2. Mark tasks as completed
* Each task has a checkbox. Checking it will mark the task as complete and remove it from the list.
* The count of completed tasks is displayed dynamically.
3. Remove all tasks
* A button allows you to clear all tasks.
* Removing tasks will not increase the count of completed tasks.
4. Persistent storage
* All tasks and the count of completed tasks are saved in the browser's localStorage. This ensures that tasks remain saved even after the page is refreshed or reopened.

# File structure
`
project-directory/
├── index.html         # The main HTML file for the app
├── style.css          # The CSS file for styling the app
├── script.js          # The JavaScript file containing the app logic
└── README.md          # Documentation for the project
`

# Code highlights
Saving tasks to localStorage
```javascript
function saveTasksToLocalStorage(tasks, completedCount) {
    const data = {
        tasks: tasks,
        completedCount: completedCount,
    };
    localStorage.setItem('taskData', JSON.stringify(data));
}
```

Get tasks from localStorage
```javascript
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
```
