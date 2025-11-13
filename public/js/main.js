import { taskManager } from "./taskManager.js"

const manager = new taskManager()


//ADD TASK BUTTON
const addTaskModal = document.querySelector(".addTaskModal")
const closeTaskModal = document.querySelector(".closeModal")
const addTaskBtn = document.querySelector(".addTaskBtn")
const addTaskForm = document.querySelector('#addTaskForm')

//EDIT TASK
const editTaskModal = document.querySelector(".editTaskModal")


//VIEW TASK
const viewTaskBtn = document.querySelector(".viewTaskBtn")



//EVENT LISTENER
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

   try {
        // Use the task manager to add the task
        await manager.addTask(taskInput, taskDateInput)

        // Clear input fields
        taskDateInputField.value = ""
        taskInputField.value = ""

        // Show success message
        addTaskStatus.innerText = "TASK ADDED SUCCESSFULLY"
        addTaskStatus.style.color = "green"

        // Close modal after successful addition
        setTimeout(() => {
            addTaskModal.style.display = "none"
            addTaskStatus.innerText = ""
        }, 2000)

    } catch (error) {
        console.error("Error:", error)
        addTaskStatus.innerText = "ERROR: " + error.message
        addTaskStatus.style.color = "red"
    }
})

viewTaskBtn.addEventListener('click', async () => {
    try {
        let tasks = await manager.getTasks()
        console.log(tasks)
        let taskContainer = document.getElementById("taskContainer")

        // Clear existing tasks before displaying new ones
        taskContainer.innerHTML = ''

        for(let task of tasks){
            let taskCard = document.createElement("div")
            taskCard.className = "task-card" // Add CSS class

            let taskName = task.name
            let taskDate = task.date
            let taskCompleted = task.completed


            const formattedDate = new Date(taskDate).toLocaleDateString()
            const statusClass = taskCompleted ? "completed" : "pending"

            taskCard.innerHTML = `

            <div class="task-header">
                    <h3 class="task-name">${taskName}</h3>
                    <span class="task-status ${statusClass}">
                        ${taskCompleted ? '✓ Completed' : '⏳ Pending'}
                    </span>
                </div>
                <div class="task-date">📅 ${formattedDate}</div>
                <div class="task-actions">
                    <button class = "edit-btn" data-id ="${task.id}"> EDIT </button>
                    <button class="complete-btn" data-id="${task.id}">
                        ${taskCompleted ? 'Undo' : 'Complete'}
                    </button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </div>

            `

            taskContainer.appendChild(taskCard)
        }

    } catch (error) {
        console.error("Error loading tasks:", error)
    }
})

document.getElementById("taskContainer").addEventListener('click',async function(e){
    if(e.target.classList.contains("delete-btn")){
        const taskId = e.target.getAttribute('data-id')
        console.log("DELETE BUTTON PRESSED")
        const status = await manager.deleteTask(taskId)
        console.log(status)

        viewTaskBtn.click()

    }

    if(e.target.classList.contains("complete-btn")){
        const taskId = e.target.getAttribute('data-id')
        const status = await manager.toggleComplete(taskId)
        console.log(status)



        const taskCard = e.target.closest(".task-card")
        if(taskCard){
            taskCard.classList.toggle("completed")
        }

        viewTaskBtn.click()
    }

    if(e.target.classList.contains("edit-btn")){
        const taskId = e.target.getAttribute('data-id')
        const closeEditTaskModal = document.querySelector(".closeEditModal")
        const editTaskForm = document.getElementById("editTaskForm")
        editTaskModal.style.display = "block"

        closeEditTaskModal.addEventListener('click',()=>{
        editTaskModal.style.display = "none"
        })

        editTaskForm.addEventListener('submit',(e)=>{
            e.preventDefault();
            const  newTaskInputField = document.getElementById("editTaskName");
            const newTaskDateInputField = document.getElementById("editTaskDate");
            const editTaskStatus = document.querySelector(".editTaskStatus")
            const newTaskName = newTaskInputField.value
            const newTaskDate = newTaskDateInputField.value

            console.log(newTaskName,newTaskDate)

            let editedTask = manager.editTask(newTaskName,newTaskDate,taskId);
            console.log(editedTask)


            editTaskStatus.innerText = "TASK EDITED SUCCESSFULY"

            setTimeout(()=>{
                editTaskModal.style.display = "none"
                editTaskStatus.innerText = ""


            },4000)

            newTaskInputField.value = ""
            newTaskDateInputField.value = ""

            viewTaskBtn.click()



        })


    }


})






