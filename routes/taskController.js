const fs = require('fs');
const path = require('path');


const tasksFilePath = path.join(__dirname, '../data/taskData.json');


const editTask = (req, res)=>{
    try{
        let {newTaskName , newTaskDate, taskId} = req.body
        let tasks = readTaskFromFile()
        let updatedTask = tasks.map(task => {
            if(task.id == taskId){
                task.name = newTaskName
                task.date = newTaskDate
            }
            return task
        })
        writeToFile(updatedTask)
        res.status(200).json("TASK CHANGED SUCCESSFULLY")
    }catch(error){
        res.status(500).json({"error": "ERROR IN SERVER "})
    }
}

const readTaskFromFile = () =>{
    if(!fs.existsSync(tasksFilePath)){
        return []
    }
    let tasks = fs.readFileSync(tasksFilePath,'utf-8')
    return JSON.parse(tasks)
}

const writeToFile = (task)=>{
    try{
        const fileDir = path.dirname(tasksFilePath)
        if(!fs.existsSync(fileDir)){
            fs.mkdir(fileDir,{recursive: true})
        }

        fs.writeFileSync(tasksFilePath,JSON.stringify(task,null,2));

    }catch(error){
        console.log(error)
        throw error
    }


}

function addTask(req,res){
    const {taskName , taskDate} = req.body

    if(!taskName || !taskDate){
        console.log("Missing Field")
        return res.status(400).json({"error": "MISSING INPUT FIELD"})
    }

    let tasks = readTaskFromFile()

    try{
            const newTask = {
            id: Date.now().toString(),
            name: taskName,
            date: taskDate,
            completed: false
        }

        tasks.push(newTask)
        writeToFile(tasks)
        console.log("TASK SAVED SUCCESSFULLY")
        res.status(201).json(newTask)
    }catch(error){
        console.log("Error adding new task")
        res.status(500).json({"error": "Error adding new task"})
    }

}

function getTask(req,res){
    try{
        let task = readTaskFromFile()
        return res.status(200).json(task)
    }catch(error){
        res.status(500).json({"error": "error gettting data"})
    }

}

function deleteTask(req,res){
    try{
        let { id } = req.body
        let tasks = readTaskFromFile()

        let updatedTasks = tasks.filter(task => task.id != id)
        writeToFile(updatedTasks)
        res.status(200).json({message: "Task deleted successfully"})
    }catch(error){
        res.status(500).json({'error': "ERROR DELETING FILE"})
    }
}

function toggleComplete(req,res){
    try{
        const {id} = req.params;
        const tasks = readTaskFromFile()

        const updatedTask = tasks.map(task => {
            if(task.id === id){
                task.completed = !task.completed;
            }
            return task
        })

        writeToFile(updatedTask)

        res.status(200).json(updatedTask)

    }catch(error){
        console.log(error)
    }
}

module.exports = { addTask , getTask, deleteTask, toggleComplete, editTask}