const form = document.getElementById("myform")
const input = document.getElementById("input")
const tasklist = document.getElementById("tasks-list")
const template = document.getElementById("template-tasks").content // siempre recordar el .content al final de los templates para acceder al contenido
const fragment = document.createDocumentFragment()
let tasks = {}

document.addEventListener("DOMcContentLoaded", () => {
    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }
    showtasks()
})

tasklist.addEventListener("click", e => {
    btnAction(e)
})


// console.log(Date.now())  // para tener un id

form.addEventListener("submit", e => {
    e.preventDefault()
    // console.log(input.value)
    setTask(e)
})

const setTask = e => {
    if(input.value.trim() === ""){
        // console.log("There"s not data")
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
    showtasks()
}

const showtasks = () => {

    localStorage.setItem("tasks", JSON.stringify(tasks))

      if (Object.values(tasks).length === 0) {
        tasklist.innerHTML = `
        <div class="alert alert-info m-0 py-1 text-center">
        There's no pending tasks!
        </div>
        `
        return
    }

    tasklist.innerHTML = ""
    Object.values(tasks).forEach(task =>{
        const clone = template.cloneNode(true)
        clone.querySelector("p").textContent = task.text

        if (task.state) {
            clone.querySelector(".alert").classList.replace("alert-warning", "alert-primary")
            clone.querySelectorAll(".fas")[0].classList.replace("fa-check", "fa-undo-alt")
            clone.querySelector("p").style.textDecoration = "line-through"
        }
        // se usó el clone aqui para evitar que use el template editado de una tarea anterior

        clone.querySelectorAll(".fas")[0].dataset.id = task.id
        clone.querySelectorAll(".fas")[1].dataset.id = task.id
        fragment.appendChild(clone)
    })
    tasklist.appendChild(fragment)
}

const btnAction = e =>{
    // console.log(e.target.classList.contains("fa-check"))
    if(e.target.classList.contains("fa-check")){
        // console.log(e.target.dataset.id)
        tasks[e.target.dataset.id].state = true
        showtasks()
        // console.log(tasks)
    }

    if(e.target.classList.contains("fa-trash-alt")){
        delete tasks[e.target.dataset.id]
        showtasks()
        // console.log(tasks)
    }

    if(e.target.classList.contains("fa-undo-alt")){
        tasks[e.target.dataset.id].state = false
        showtasks()
        // console.log(tasks)
    }


    e.stopPropagation()
}