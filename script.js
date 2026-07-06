const btnClear = document.getElementById("btnClear");
const btnAdd = document.getElementById("btnAdd");
const btnEdit = document.getElementById("btnEdit");
const btnDelete = document.getElementById("btnDelete");

const taskList = document.querySelector(".bottom-content");

btnAdd.addEventListener('click', () => {
    const newTask = document.createElement('div');
    newTask.textContent = 'Testing';
    newTask.classList.add('task');

    taskList.append(newTask);
    console.log(taskList)
});

btnClear.onclick = () => {
    const tasks = document.querySelectorAll(".task");
    console.log(taskList)
    tasks.forEach(task => {
        task.remove();
    })
};