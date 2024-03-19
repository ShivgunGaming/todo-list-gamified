const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const pointsDisplay = document.getElementById('points');
const targetDisplay = document.getElementById('target');
const diamondsDisplay = document.getElementById('diamonds');

let points = 0;
const targetPoints = 10;
let diamonds = 0;

addTaskBtn.addEventListener('click', addTask);

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

function completeTask() {
    const taskItem = this.parentElement;
    taskItem.classList.toggle('completed');
    if (this.checked) {
        points += 1; // Award 1 point for completing a task
        if (points >= targetPoints) {
            // Provide feedback when target is reached
            targetDisplay.textContent = "Congratulations! You've reached your target!";
            // Award diamonds when target is reached
            awardDiamonds(10);
            // Reset to-do list
            resetToDoList();
        }
    } else {
        points -= 1; // Deduct 1 point if task is unchecked
        // Reset feedback if points go below target
        if (points < targetPoints) {
            targetDisplay.textContent = '';
        }
    }
    updatePointsDisplay();
}

function resetToDoList() {
    taskList.innerHTML = ''; // Clear the task list
    points = 0; // Reset points
    updatePointsDisplay();
}

function updatePointsDisplay() {
    pointsDisplay.textContent = `Points: ${points}`;
}

function awardDiamonds(amount) {
    diamonds += amount;
    diamondsDisplay.textContent = `Diamonds: ${diamonds}`;
}
