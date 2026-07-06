const btnClear = document.querySelector(".btnClear");
const btnAdd = document.querySelector(".btnAdd");
const btnEdit = document.querySelector(".btnEdit");
const btnDelete = document.querySelector(".btnDelete");

const taskList = document.querySelector(".bottom-content");

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

    swal.fire({
        title: 'New task has been added!',
        icon: 'success',
        html: ` <h2>Title: ${task.title}</h2> `
    })

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

    parentSibling.textContent = newTask.newTitle;

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
    const olderParent = parent.parentElement;
    
    olderParent.remove();
}

btnAdd.addEventListener('click', addTask);

btnClear.addEventListener('click', async () => {
    const confirmation = await swal.fire({
        title: 'Are you sure you want to delete all tasks?',
        icon: 'warning',
        showCancelButton: true
    })

    if (!confirmation.isConfirmed) { return; }

    const tasks = document.querySelectorAll(".task");
    console.log(taskList)
    tasks.forEach(task => {
        task.remove();
    })
})

btnEdit.addEventListener('click', editTask);

btnDelete.addEventListener('click', deleteTask);