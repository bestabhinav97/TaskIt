

export class taskManager{
    constructor(){
        this.tasks = []
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
            const response = fetch(`api/tasks/${taskId}/toggle`,{
            method: "PATCH",

        })
            if(await response.ok){
                return response.json()
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

}