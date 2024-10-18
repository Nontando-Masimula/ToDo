let tasks = {
    todo: [],
    inProgress: [],
    done: []
};

function renderTasks() {
    const todoList = document.getElementById('todo-list');
    const inProgressList = document.getElementById('in-progress-list');
    const doneList = document.getElementById('done-list');

    // Clear current lists
    todoList.innerHTML = '';
    inProgressList.innerHTML = '';
    doneList.innerHTML = '';

    // Render To-Do tasks
    tasks.todo.forEach((task, index) => {
        const li = createTaskElement(task, index, 'todo');
        todoList.appendChild(li);
    });

    // Render In-Progress tasks
    tasks.inProgress.forEach((task, index) => {
        const li = createTaskElement(task, index, 'inProgress');
        inProgressList.appendChild(li);
    });

    // Render Done tasks
    tasks.done.forEach((task, index) => {
        const li = createTaskElement(task, index, 'done');
        doneList.appendChild(li);
    });
}

function createTaskElement(task, index, category) {
    const li = document.createElement('li');
    li.className = category;
    li.innerHTML = `
        <span>${task}</span>
        <div class="actions">
            ${category !== 'done' ? `<button class="edit" onclick="editTask('${category}', ${index})">Edit</button>` : ''}
            ${category === 'todo' ? `<button class="move" onclick="moveTask('${category}', ${index}, 'inProgress')">In Progress</button>` : ''}
            ${category === 'inProgress' ? `<button class="move" onclick="moveTask('${category}', ${index}, 'done')">Done</button>` : ''}
            <button class="delete" onclick="deleteTask('${category}', ${index})">Delete</button>
        </div>
    `;
    return li;
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.todo.push(taskText);
        taskInput.value = ''; // Clear input
        renderTasks();
    }
}

function editTask(category, index) {
    const newTask = prompt('Edit the task:', tasks[category][index]);
    if (newTask !== null) {
        tasks[category][index] = newTask.trim();
        renderTasks();
    }
}

function moveTask(fromCategory, index, toCategory) {
    const task = tasks[fromCategory].splice(index, 1)[0];
    tasks[toCategory].push(task);
    renderTasks();
}

function deleteTask(category, index) {
    tasks[category].splice(index, 1); // Remove task
    renderTasks();
}

document.addEventListener('DOMContentLoaded', () => {
    renderTasks(); // Initial render
});
