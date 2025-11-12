const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');


const tasksFilePath = path.join(__dirname, '../data/taskData.json');


const readTaskFromFile = () =>{
    if(!fs.existsSync(tasksFilePath)){
        return []
    }
    let tasks = fs.readFileSync(tasksFilePath,'utf-8')
    return JSON.parse(tasks)
}

const writeToFile = (tasks)=>{
    try{
        const fileDir = path.dirname(tasksFilePath)
        if(!fs.existsSync(fileDir)){
            fs.mkdir(fileDir,{recursive: true})
        }

        fs.writeFileSync(tasksFilePath, json.stringify(tasks,null,2));

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
            taskId: Date.now().toString(),
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

// function viewTask(req,res){
//     let tasks = readTaskFromFile()

//     try{
//         if(!tasks){
//             res.status(200).json([])
//             console.log("NO TASKS")
//         }else{
//             return res.status(200).json(tasks)
//         }
//     }catch(error){
//         console.error("ERROR READING THE FILES")
//         return res.status(500).json({ "error": "Failed to read tasks" });
//     }


// }

module.exports = { addTask }