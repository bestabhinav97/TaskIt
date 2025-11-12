import { taskManager } from "./taskManager.js"

const manager = new taskManager()

const addTaskModal = document.querySelector(".addTaskModal")
const closeTaskModal = document.querySelector(".closeModal")
const addTaskBtn = document.querySelector(".addTaskBtn")
const addTaskForm = document.querySelector('#addTaskForm')

addTaskBtn.addEventListener("click",()=>{
    addTaskModal.style.display = "block"
})

closeTaskModal.addEventListener('click',()=>{
    addTaskModal.style.display = "none"
})

addTaskForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const taskInputField = document.querySelector("#taskName")
    const taskDateInputField = document.querySelector("#taskDate")

    const taskInput = taskInputField.value
    const taskDateInput = taskDateInputField.value

    manager.addTask(taskInput,taskDateInput)








})

let task = manager.getTasks()
console.log(task)