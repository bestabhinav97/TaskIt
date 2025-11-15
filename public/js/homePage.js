import {taskManager} from "./taskManager.js"


const manager = new taskManager()


let pendingListContainer = document.getElementById("pendingTaskList")

pendingListContainer.addEventListener('click',async function (e) {
    if(e.target.classList.contains("completeBtnHome")){
        console.log("button lcicked")
        let taskId = e.target.getAttribute("data-id")
        console.log(taskId)
        const status = await manager.toggleComplete(taskId)
        console.log(status)

        displayPendingTaskList()
        setProgressMeter1()
        setProgressMeter2()
    }
})


async function displayPendingTaskList(){
    let tasks = await manager.getTasks()


    tasks = tasks.filter(task => task.completed === false)
    pendingListContainer.innerHTML = ""

    for(let task of tasks){
        let listElement = document.createElement("li")
        // listElement.innerText = task.name
        // pendingListContainer.appendChild(listElement)
        listElement.innerHTML = `${task.name}
        <button class='completeBtnHome' data-id = '${task.id}'>✓ </button>`
        pendingListContainer.appendChild(listElement)


    }
}


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

    let progressPercent1 = Math.floor(( completedTaskCounter / totalTaskCounter) * 100)
    console.log(progressPercent1)

    let radius = 90
    let circumference = 2 * Math.PI * radius

    progressCircle1.style.strokeDasharray = circumference;
    progressCircle1.style.strokeDashoffset = circumference - (progressPercent1 / 100) * circumference;




    percent1.innerText = `${progressPercent1}%`






}

async function setProgressMeter2(){
    let percent2 = document.getElementById("progressPercent2")
    let progressCircle2 = document.getElementById("progressCircle2")

    const tasks = await manager.getTasks()
    let totalTaskCounter = 0
    let incompletedTaskCounter = 0;

    for(let task of tasks){

        totalTaskCounter++


        if(task.completed === false){
            incompletedTaskCounter++
        }
    }
    console.log(totalTaskCounter,incompletedTaskCounter)

    let progressPercent2 = Math.floor(( incompletedTaskCounter / totalTaskCounter) * 100)
    console.log(progressPercent2)

    let radius = 90
    let circumference = 2 * Math.PI * radius

    progressCircle2.style.strokeDasharray = circumference;
    progressCircle2.style.strokeDashoffset = circumference - (progressPercent2 / 100) * circumference;




    percent2.innerText = `${progressPercent2}%`
}

await setProgressMeter1()
await setProgressMeter2()
await displayPendingTaskList()