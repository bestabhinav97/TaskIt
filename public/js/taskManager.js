import {task} from "../model/task.js"

export class taskManager{
    constructor(){
        this.tasks = []
    }

    addTask = (taskName,taskDate)=>{
        let newTask = new task(taskName,taskDate)
        this.tasks.push(newTask)

    }

    getTasks(){
        return this.tasks
    }

}