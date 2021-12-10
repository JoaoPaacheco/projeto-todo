// Database functions

// Creating or Reading database
function getLocalStorage() {
    return JSON.parse(localStorage.getItem("db_task")) ?? []
}

// Updating database
function setLocalStorage(dbTask) {
    localStorage.setItem("db_task", JSON.stringify(dbTask))
}

// Tasks' functions

// Creating task
function addTask(task) {
    let db = getLocalStorage()
    db.push(task)
    setLocalStorage(db)
}

// Reading task
function readTask(index) {
    let db = getLocalStorage()
    return db[index]
}

// Updating task
function updateTask(index) {
    let db = getLocalStorage()
    let text = db[index].todo
    deleteTask(index)
    return text
}

// Deleting task
function deleteTask(index) {
    let db = getLocalStorage()
    db.splice(index, 1)
    setLocalStorage(db)
}

// Saving tasks

function saveTaskBtn(event) {
    if (document.getElementById("form").reportValidity()) {
        let text = document.getElementById("todoText")
        let task = {
            todo: text.value,
            done: false
        }
        addTask(task)
        updateList()
    }
}

// Creating list items

function newListItem(item, index) {
    let newItem = document.createElement('li')
    let list = document.getElementById("tasksList")
    let checked = item.done ? 'checked' : ''
    newItem.innerHTML = `
        <input type="checkbox" name="taskComplete" id="taskComplete-${index}" ${checked}>
        ${item.todo}
        <img src="assets/editIcon.png" alt="edit item" id ="edit-${index}">
        <img src="assets/cancelIcon.png" alt="delete item" id="delete-${index}">
    `
    list.appendChild(newItem)
    document.querySelector(`#taskComplete-${index}`).addEventListener("click", completeTask)
    document.querySelector(`#edit-${index}`).addEventListener("click", editItem)
    document.querySelector(`#delete-${index}`).addEventListener("click", deleteItem)
}

// Updating list

function updateList() {
    let list = document.getElementById("tasksList")
    let db = getLocalStorage()
    let completed = document.getElementById("tasksCompleted")
    if (db.length) {
        let count = 0
        list.innerHTML = ''
        db.forEach(newListItem)
        // Counting how many tasks are done
        for (let index = 0; index < db.length; index++) {
            if (db[index].done) {
                count++
            }
        }
        completed.innerText = `${count} out of ${db.length} completed`
    }else {
        list.innerHTML = '<li><input type="checkbox" name="taskComplete" id="taskComplete">Create New Tasks<img src="assets/editIcon.png" alt="edit item"><img src="assets/cancelIcon.png" alt="cancel item"></li>'
        completed.innerText = `Start getting things done!`
    }

    document.getElementById("todoText").focus()
}

// Checking if key presses === enter

function checkEnter(key) {
    if (key === "Enter") {
        saveTaskBtn()
    }
}

// Editing item

function editItem(event) {
    let text = document.getElementById("todoText")
    text.value = updateTask(event.target.id.split('-')[1])
    updateList()
}

// Deleting item

function deleteItem(event) {
    deleteTask(event.target.id.split('-')[1])
    updateList()
}

// Completing task

function completeTask(event) {
    let index = event.target.id.split('-')[1]
    let db = getLocalStorage()
    db[index].done = !db[index].done
    setLocalStorage(db)
    updateList()
}

// Checking all tasks

function checkAllTasks() {
    let db = getLocalStorage()
    db.forEach(element => {
        element.done = true
    })
    setLocalStorage(db)
    updateList()
}

// Deleting all completed tasks

function removeCompleted() {
    let db = getLocalStorage()
    db = db.filter(task => !task.done)
    setLocalStorage(db)
    updateList()
}

// Adding event listeners

document.getElementById("saveBtn").addEventListener("click", saveTaskBtn)

document.getElementById("todoText").addEventListener("keyup", checkEnter)

document.getElementById("checkAllBtn").addEventListener("click", checkAllTasks)

document.getElementById("removeCompleted").addEventListener("click", removeCompleted)