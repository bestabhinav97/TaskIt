const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');

const tasksFilePath = path.join(__dirname, '../data/taskData.json');


const readTaskFromFile = () =>{
    if(!fs.existsSync(tasksFilePath)){
        return []
    }
    let tasks = fs.readFileSync("taskFilePath",'utf-8')
    return json.parse(tasks)
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
        console.log("Missign Field")
        return res.status(400).json({"error": "MISSING INPUT FIELD"})
    }

    let tasks = readTaskFromFile()

    try{
            const newTask = {
            id: Date.now().toString,
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

module.exports = { addTask }