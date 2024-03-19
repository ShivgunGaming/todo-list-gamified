const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const pointsDisplay = document.getElementById('points');
const targetDisplay = document.getElementById('target');
const diamondsDisplay = document.getElementById('diamonds');

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
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskSpan);
        taskList.appendChild(taskItem);
        taskInput.value = '';
    }
}

// Function to handle task completion
function completeTask() {
    const taskItem = this.parentElement;
    taskItem.classList.toggle('completed');
    if (this.checked) {
        points++; // Award 1 point for completing a task
        if (points >= targetPoints) {
            // Provide feedback when target is reached
            targetDisplay.textContent = "Congratulations! You've reached your target!";
            // Award diamonds when target is reached
            awardDiamonds(10);
            // Reset to-do list
            resetToDoList();
        }
    } else {
        points--; // Deduct 1 point if task is unchecked
        // Reset feedback if points go below target
        if (points < targetPoints) {
            targetDisplay.textContent = '';
        }
        if (points % targetPoints === targetPoints - 1) {
            // Remove diamonds if the remaining points become a multiple of targetPoints - 1
            removeDiamonds(1);
        }
    }
    updatePointsDisplay();
}


// Function to reset to-do list
function resetToDoList() {
    if (points >= targetPoints) {
        const completedTasks = document.querySelectorAll('.completed');
        completedTasks.forEach(task => {
            taskList.removeChild(task); // Remove completed tasks
        });
    }
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

// Add event listener for each checkbox to handle task completion
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', completeTask);
});
