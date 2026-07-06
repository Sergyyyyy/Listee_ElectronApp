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

    const newDeleteBtn = document.createElement('button');
    newDeleteBtn.classList.add('btnDelete');
    newDeleteBtn.textContent = 'delete'

    newBtnDiv.append(newEditBtn);
    newBtnDiv.append(newDeleteBtn);

    newTask.append(newBtnDiv);

    taskList.append(newTask);
    console.log(taskList)
}

btnAdd.addEventListener('click', addTask)

btnClear.onclick = () => {
    const tasks = document.querySelectorAll(".task");
    console.log(taskList)
    tasks.forEach(task => {
        task.remove();
    })
};