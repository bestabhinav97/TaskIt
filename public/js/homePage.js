import {taskManager} from "./taskManager.js"

const manager = new taskManager()

async function setProgressMeter1(){
    let percent1 = document.getElementById("progressPercent1")
    let progressCircle1 = document.getElementById("progressCircle1")

    const tasks = await manager.getTasks()
    let totalTaskCounter = 0
    let completedTaskCounter = 0;

    for(let task of tasks){

        totalTaskCounter++


        if(task.completed === true){
            completedTaskCounter++
        }
    }
    console.log(totalTaskCounter,completedTaskCounter)

    let progressPercent1 = ( completedTaskCounter / totalTaskCounter) * 100
    console.log(progressPercent1)

    let radius = 90
    let circumference = 2 * Math.PI * radius

    progressCircle1.style.strokeDasharray = circumference;
    progressCircle1.style.strokeDashoffset = circumference - (progressPercent1 / 100) * circumference;




    percent1.innerText = `${progressPercent1}%`






}

await setProgressMeter1()