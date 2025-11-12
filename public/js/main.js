
import { taskManager } from "./taskManager.js"

const manager = new taskManager()

//DOM ELEMENT


//ADD TASK MODAL
const addTaskModal = document.querySelector(".addTaskModal")
const closeTaskModal = document.querySelector(".closeModal")
const addTaskBtn = document.querySelector(".addTaskBtn")
const addTaskForm = document.querySelector('#addTaskForm')


//VIEW TASKS
const viewTaskBtn = document.querySelector('.viewTaskBtn')


//EVENT LISTENERS
// ADD TASKS
addTaskBtn.addEventListener("click",()=>{
    addTaskModal.style.display = "block"
})

closeTaskModal.addEventListener('click',()=>{
    addTaskModal.style.display = "none"
})

addTaskForm.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const addTaskStatus = document.querySelector(".addTaskStatus")
    const taskInputField = document.querySelector("#taskName")
    const taskDateInputField = document.querySelector("#taskDate")

    const taskInput = taskInputField.value
    const taskDateInput = taskDateInputField.value

    const response = await fetch("/api/tasks",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            taskName: taskInput,
            taskDate: taskDateInput
        })
    })

    if(!response.ok){
        const errorData = await response.json()
        console.log("ERROR: ", errorData)
    }else{
        const newTask = await response.json()
        console.log("added new task", newTask)



        taskDateInputField.value = ""
        taskInputField.value = ""

        addTaskStatus.innerText = "TASK ADDED SUCCESSFULLY"


    }

})


//VIEW TASK

// function displayTask(task){
//     const taskContainer = document.getElementById("taskContainer")

// }

// viewTaskBtn.addEventListener('click',async ()=>{
//     const task = []

//     const res = fetch('api/tasks')
//     if((await res).ok){
//         task = res.JSON()
//         displayTask(task)
//     }else{
//         console.log("ERROR LOADING TASK",error)
//     }

// })






