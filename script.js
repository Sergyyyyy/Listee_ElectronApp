// Main references required
const btnClear = document.querySelector(".btnClear");
const btnAdd = document.querySelector(".btnAdd");
const btnEdit = document.querySelector(".btnEdit");
const btnDelete = document.querySelector(".btnDelete");

const taskList = document.querySelector(".bottom-content");
const btnToggle = document.querySelector('.btnLightDark');

// References required for the theme
let bottom = document.body;
let taskListTitle = document.querySelector('.top-content h3');
let taskMainTitleDiv = document.querySelector('nav');
let topContent = document.querySelector('.top-content');
let taskDivs = document.querySelectorAll('.task');
let topBtns = document.querySelectorAll('.btns-top-container button');
let botttomBtns = document.querySelectorAll('.btns-bottom-container button');

let darkState = true;

let tasks = [
    { title: 'Sample Task 1' }
];

function toggleTheme() {
    if (darkState == true) { darkState = false; }
    else { darkState = true; }
    addToStorage();
    applyTheme();
}

function applyTheme() {
    let botttomBtns = document.querySelectorAll('.btns-bottom-container button');
    let taskDivs = document.querySelectorAll('.task');

    if (darkState) {
        bottom.style.backgroundColor = '#3d3d3d';
        taskMainTitleDiv.style.backgroundColor = '#202020';
        topContent.style.backgroundColor = '#3d3d3d';

        taskDivs.forEach((task) => {
            task.style.backgroundColor = '#202020';
            task.style.color = '#FFF';
            taskListTitle.style.color = '#FFF';
        })

        topBtns.forEach(btn => {
            btn.style.backgroundColor = '#202020';
        })

        botttomBtns.forEach(btn => {
            btn.style.backgroundColor = '#202020';
        })
    }
    else {
        bottom.style.backgroundColor = '#FFF';
        taskMainTitleDiv.style.backgroundColor = '#2A3B7E';
        topContent.style.backgroundColor = '#FFF';

        taskDivs.forEach((task) => {
            task.style.backgroundColor = '#D9D9D9';
            task.style.color = '#000';
            taskListTitle.style.color = '#000';
        })

        topBtns.forEach(btn => {
            btn.style.backgroundColor = '#2A3B7E';
        })

        botttomBtns.forEach(btn => {
            btn.style.backgroundColor = '#FFF';
        })
    }
}

btnToggle.onclick = toggleTheme;


function addToStorage() {
    const taskStringify = JSON.stringify(tasks);
    const themeState = JSON.stringify(darkState);

    localStorage.setItem('tasks', taskStringify);
    localStorage.setItem('theme', themeState);
}

function renderElements() {
    const allTasks = document.querySelectorAll('.task');

    allTasks.forEach(task => {
        task.remove();
    })

    tasks.forEach((task) => {

        const newTask = document.createElement('div');
        newTask.classList.add('task');

        const newP = document.createElement('p');
        newP.textContent = task.title;

        newTask.append(newP);

        const newBtnDiv = document.createElement('div');
        newBtnDiv.classList.add('btns-bottom-container');

        const newEditBtn = document.createElement('button');
        newEditBtn.classList.add('btnEdit');
        newEditBtn.textContent = 'edit'

        newEditBtn.addEventListener('click', editTask)

        const newDeleteBtn = document.createElement('button');
        newDeleteBtn.classList.add('btnDelete');
        newDeleteBtn.textContent = 'delete'

        newDeleteBtn.addEventListener('click', deleteTask);

        newBtnDiv.append(newEditBtn);
        newBtnDiv.append(newDeleteBtn);

        newTask.append(newBtnDiv);

        taskList.append(newTask);
    });
}

function loadTasks() {

    if (localStorage.getItem('tasks') === null) {
        addToStorage();
    }

    if (localStorage.getItem('theme') === null) {
        addToStorage();
    }

    tasks = JSON.parse(localStorage.getItem('tasks'));
    darkState = JSON.parse(localStorage.getItem('theme'));
}

async function addTask() {
    const taskTitle = await swal.fire({
        inputLabel: 'Enter the task title',
        input: 'text',
        showCancelButton: true
    })

    if (!taskTitle.isConfirmed) { return; }

    const task = {
        title: taskTitle.value,
    }

    tasks.push(task)
    addToStorage();
    console.log(tasks);

    swal.fire({
        title: 'New task has been added!',
        icon: 'success',
        html: ` <h2>Title: ${task.title}</h2> `
    })

    renderElements();
}

async function editTask(e) {
    const parent = e.target.parentElement;
    const parentSibling = parent.previousElementSibling;

    const newTaskTitle = await swal.fire({
        inputLabel: 'Enter new task title',
        input: 'text',
        showCancelButton: true
    });

    if (!newTaskTitle.isConfirmed) { return };

    const newTask = {
        newTitle: newTaskTitle.value
    };

    swal.fire({
        title: 'Successfuly changed task!',
        icon: 'success',
    });

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title == parentSibling.textContent) {
            tasks[i].title = newTask.newTitle;
        }
    }

    addToStorage();
    renderElements();
}

async function deleteTask(e) {
    // first, ask the user for confirmation
    const confirmation = await swal.fire({
        title: 'Are you sure you want to delete this task?',
        icon: 'warning',
        showCancelButton: true
    })

    if (!confirmation.isConfirmed) { return; }

    // get the most parent container and get that parent container to delete the current task.

    const parent = e.target.parentElement;
    const sibling = parent.previousElementSibling;
    const olderParent = parent.parentElement;

    console.log(olderParent)

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title == sibling.textContent) {
            tasks.splice(i, 1);
        }
    }

    addToStorage();
    renderElements();
}

btnAdd.addEventListener('click', addTask);

btnClear.addEventListener('click', async () => {
    const confirmation = await swal.fire({
        title: 'Are you sure you want to delete all tasks?',
        icon: 'warning',
        showCancelButton: true
    })

    if (!confirmation.isConfirmed) { return; }

    tasks.length = 0;

    addToStorage();
    renderElements();
})

loadTasks();
renderElements();
applyTheme();