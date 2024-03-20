const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const pointsDisplay = document.getElementById('points');
const targetDisplay = document.getElementById('target');
const diamondsDisplay = document.getElementById('gem');

let points = 0;
const targetPoints = 10;
let diamonds = 0;

// Function to add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', completeTask);
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-button'); // Add class to delete button
        deleteButton.addEventListener('click', deleteTask);
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
}

// Function to handle task completion
function completeTask() {
    const taskItem = this.parentElement;
    taskItem.classList.toggle('completed');
    if (this.checked) {
        points++; // Increment points when task is checked
        if (points >= targetPoints) {
            // Provide feedback when target is reached
            targetDisplay.textContent = "Congratulations! You've reached your target!";
            // Award diamonds when target is reached
            awardDiamonds(10);
            // Reset to-do list
            resetToDoList();
        }
    } else {
        points--; // Decrement points when task is unchecked
        if (points < 0) {
            points = 0; // Ensure points don't go below 0
        }
        if (points % targetPoints === targetPoints - 1) {
            // Remove diamonds if the remaining points become a multiple of targetPoints - 1
            removeDiamonds(1);
        }
        if (points < targetPoints) {
            // Reset feedback if points go below target
            targetDisplay.textContent = '';
        }
    }
    updatePointsDisplay();
}

// Function to delete task
function deleteTask() {
    const taskItem = this.parentElement;
    taskList.removeChild(taskItem);
}

// Function to reset to-do list
function resetToDoList() {
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach(task => {
        taskList.removeChild(task); // Remove completed tasks
    });
    points = 0; // Reset points
    updatePointsDisplay();
}

// Function to update points display
function updatePointsDisplay() {
    pointsDisplay.textContent = `Points: ${points}`;
}

// Function to award diamonds
function awardDiamonds(amount) {
    diamonds += amount;
    diamondsDisplay.textContent = `Diamonds: ${diamonds}`;
}

// Function to remove diamonds
function removeDiamonds(amount) {
    diamonds -= amount;
    if (diamonds < 0) {
        diamonds = 0; // Ensure diamonds don't go below 0
    }
    diamondsDisplay.textContent = `Diamonds: ${diamonds}`;
}

// Event listener for "Add Task" button click
addTaskBtn.addEventListener('click', addTask);

// Event listener for "Enter" key press in the input field
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initialize points display
updatePointsDisplay();
