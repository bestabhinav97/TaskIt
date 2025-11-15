

export class taskManager{
    constructor(){
        this.tasks = []
    }

    validateInput(taskDateInput){
        const today = new Date()
        today.setHours(0,0,0,0)
        console.log(today)
        return true
    }

    async deleteTask(taskId){
        try{
            const response = await fetch('/api/tasks',{
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: taskId
                })
            })
            if(response.ok){
                return await response.json()
            }
        }catch(error){
            console.log(error)
        }
    }

    async addTask(taskName, taskDate) {
        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    taskName: taskName,
                    taskDate: taskDate
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to add task");
            }

            const newTask = await response.json();
            console.log("Added new task", newTask);
            return newTask;

        } catch (error) {
            console.error("Error adding task:", error);
            throw error;
        }
    }

    async getTasks(){
        try{
            const response = await fetch("/api/tasks")
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            this.tasks = await response.json()
            return this.tasks

        }catch(error){
            console.log("ERROR DISPLAYING TASKS")
        }
    }

    async toggleComplete(taskId){
        try{
            const response = await fetch(`api/tasks/${taskId}/toggle`,{
            method: "PATCH",

        })
            if(response.ok){
                return await response.json()
            }
        }catch(error){
            console.log(error)
        }
    }

    async editTask(newTaskName,newTaskDate,taskId){
        try{
            const response = fetch('/api/tasks/',{
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newTaskName: newTaskName,
                    newTaskDate: newTaskDate,
                    taskId: taskId
                })

            })

            if(await response.ok){
                console.log("TASK UPDATED SUCCESSFULLY")
                return response.json()
            }

        }catch(error){
            console.log(error)
        }
    }

    displayTask(tasks){
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

            if (taskCompleted) {
                taskCard.classList.add("completed")
            }

            taskCard.innerHTML = `

            <div class="task-header">
                    <h3 class="task-name">${taskName}</h3>
                    <span class="task-status">
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

    }

}