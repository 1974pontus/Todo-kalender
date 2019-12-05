// global variables

let wrapper = document.querySelector("todoList")
let addTodoBtn = document.getElementById("add-icon")
let input = document.getElementById("input")
let list = document.getElementById("listForAllTodos")
let date = document.getElementById("date")
let id = new Date().getTime()
let todos = []


//on load 
window.addEventListener("load", beginpage)
function beginpage() {
    startTime()
    listAllTodosFromLS()
}

// changing name of day
let day = today.getDay()
switch (day) {
    case 0: document.getElementById("day").innerHTML = "Sunday"
        break;

    case 1: document.getElementById("day").innerHTML = "Monday"
        break;

    case 2: document.getElementById("day").innerHTML = "Tuesday"
        break;

    case 3: document.getElementById("day").innerHTML = "Wednesday"
        break;

    case 4: document.getElementById("day").innerHTML = "Thursday"
        break;

    case 5: document.getElementById("day").innerHTML = "Friday"
        break;

    case 6: document.getElementById("day").innerHTML = "Saturday"
        break;
}


//adding time under the day
window.addEventListener("load", startTime)
function startTime() {
    setInterval(() => {
        today.setSeconds(today.getSeconds() + 1);
        let hours = today.getHours()
        let minutes = today.getMinutes()
        let seconds = today.getSeconds()
        if (hours <= 9) {
            let time =
                `0${hours}:${minutes}:${seconds}`;
            document.getElementById('dateAndTime').innerText = time;
            if (minutes <= 9) {
                let time =
                    `0${hours}:0${minutes}:${seconds}`;
                document.getElementById('dateAndTime').innerText = time;
            }
            if (seconds <= 9) {
                let time =
                    `0${hours}:0${minutes}:0${seconds}`;
                document.getElementById('dateAndTime').innerText = time;
            }
        }
        else if (minutes <= 9) {
            let time = `${hours}:0${minutes}:${seconds}`;
            document.getElementById('dateAndTime').innerText = time;
            if (seconds <= 9) {
                let time =
                    `${hours}:0${minutes}:0${seconds}`;
                document.getElementById('dateAndTime').innerText = time;
            }
        }
        else if (seconds <= 9) {
            let time = `${hours}:${minutes}:0${seconds}`;
            document.getElementById('dateAndTime').innerText = time;
        }
        else {
            let time =
                `${hours}:${minutes}:${seconds}`;
            document.getElementById('dateAndTime').innerText = time;
        }
    }, 1000);
}

//adding enter as a key
input.addEventListener("keyup", function (event) {
    if (event.which == 13) {
        saveValuesOfTodo()
    }
})

// saving values of my object todo, that i will put in my array todos
addTodoBtn.addEventListener("click", saveValuesOfTodo)
function saveValuesOfTodo() {
    
    let userInput = input.value
    let chosenDate = date.options[date.selectedIndex].value
    
    const todo = {
        id: id++,
        title: userInput,
        date: chosenDate
    }
    createTodo(todo)
    saveElement(todo)
}
//creating small elements for my todo
function createTodo(todo) {
    
    let li = document.createElement("li")
    li.classList = "li"
    li.id = todo.id
    list.appendChild(li)

    let checkboxIcon = document.createElement("i")
    checkboxIcon.classList = "fas fa-check"
    checkboxIcon.id = "checkbox"
    li.appendChild(checkboxIcon)

    let span = document.createElement("span")
    span.innerHTML = todo.title
    li.appendChild(span)

    let dateOfTodo = document.createElement("p")
    dateOfTodo.innerHTML = todo.date
    li.appendChild(dateOfTodo)

    let trashcanIcon = document.createElement("span")
    trashcanIcon.addEventListener("click", deleteFromLocalStorage)
    trashcanIcon.innerHTML = `<i class="fas fa-trash"></i>`
    trashcanIcon.id = "trash"
    li.appendChild(trashcanIcon)
}

//saving the todo inside my array and inside localsstorage
function saveElement(todo) {
    todos.push(todo)
    let todoSerialized = JSON.stringify(todos)
    localStorage.setItem('todo', todoSerialized)
    input.value = ""
}
// marking each li
list.addEventListener("click", function (event) {
    const check = event.target

    if (check.className == "li") {
        if (check.style.background == "grey" || check.firstElementChild.style.color == "lime" || check.style.color == "red") {
            check.style.background = ""
            check.firstElementChild.style.color = ""
            check.lastElementChild.style.visibility = "hidden"
        }
        else {
            check.firstElementChild.style.color = "lime"
            check.style.background = "grey"
            check.lastElementChild.style.visibility = "visible"
        }
    }
})

// removing element
function deleteFromLocalStorage() {
    for (let i = 0; i < todos.length; i++) {

            if(todos[i].id == event.target.parentNode.parentNode.id) {
                todos.splice(i,1)
                localStorage.setItem('todo', JSON.stringify(todos))
                event.target.parentNode.parentNode.remove()
                break;
            }
        
    }
}
//listing all my todos
function listAllTodosFromLS() {
    todos = JSON.parse(localStorage.getItem('todo')) || [];
    todos.forEach(todo => {
        createTodo(todo)
    })
}

