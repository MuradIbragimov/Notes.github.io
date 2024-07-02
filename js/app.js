const itemsContainer = document.getElementById('items');
const addButton = document.getElementById('add')
const item = document.querySelector('.item')
const addItem = document.getElementById('add-item');
const itemDescription = document.querySelector('.item-description');
const itemCompleted = document.querySelector('.item-completed');


const tasks = JSON.parse(localStorage.getItem('todo')) || [];

function getTasks() {
    let task;
    let completed;
    let div;
    itemsContainer.innerHTML = '';
   tasks.forEach((value) => {
    div = document.createElement('div');
    task = document.createElement('input');
    task.value = value.description;
    task.classList.add('item-description');
    completed = document.createElement('input');
    completed.type = 'checkbox';
    completed.classList.add('item-completed');
    completed.checked = value.completed;
    div.appendChild(completed);
    div.appendChild(task);
    itemsContainer.appendChild(div);
    task.addEventListener('change', (event) => {
        updateTask(value.id, 'completed', event.target.checked);
    });
   });
   return tasks;
}

getTasks();

function updateTask(id, key, value) {
    let index = tasks.findIndex((i) => i.id === id)
    if (index !== -1) {
        tasks[index][key] = value;
        setTasks(tasks)
    }
}

function setTasks(tasks) {
    const newTasks = JSON.stringify(tasks);
    localStorage.setItem('todo', newTasks);
}

function addTask(description, completed) {
    tasks.push({
        description: description,
        completed: completed,
        id: Date.now(),
    });
    setTasks(tasks);
    getTasks();
}

addButton.addEventListener("click", () => {
    item.style.display= "block";
});

addItem.addEventListener("click", () => {
    const description = itemDescription.value;
    const checked = itemCompleted.checked;
    addTask(description, checked);
    item.style.display = "none"
})