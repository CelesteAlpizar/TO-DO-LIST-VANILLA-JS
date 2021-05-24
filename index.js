const form = document.getElementById("myform")
const input = document.getElementById("input")
const tasklist = document.getElementById("tasks-list")
const template = document.getElementById("template-tasks").content // siempre recordar el .content al final de los templates
const fragment = document.createDocumentFragment()
let tasks = {}

document.addEventListener("DOMcContentLoaded", () => {
    showtask()
})

tasklist.addEventListener("click", e => {
    btnAction(e)
})


// console.log(Date.now())  // para tener un id

form.addEventListener("submit", e => {
    e.preventDefault()
    console.log(input.value)
    setTask(e)
})

const setTask = e => {
    if(input.value.trim() === ""){
        // console.log("There's not data")
        return
    }
    const task = {
        id: Date.now(),
        text:input.value,
        state: false
    }
    tasks[task.id] = task
    form.reset()
    input.focus()
    showtask()
}

const showtask = () => {
    tasklist.innerHTML = ""
    Object.values(tasks).forEach(task =>{
        const clone = template.cloneNode(true)
        clone.querySelector("p").textContent = task.text
        fragment.appendChild(clone)
    })
    tasklist.appendChild(fragment)
}

const btnAction = e =>{}