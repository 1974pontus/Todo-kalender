
// global variables

let wrapper = document.querySelector("todoList")
let addTodoBtn = document.getElementById("add-icon")
let input = document.getElementById("input")
let list = document.getElementById("listForAllTodos")
let date = document.getElementById("date")
let id = new Date().getTime()
let todos = []

//on load 
// window.addEventListener("load", beginpage)
// function beginpage() {
//     startTime()
//     listAllTodosFromLS()
// }

// changing name of day
let dateOftoday = new Date();
let day = dateOftoday.getDay()
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
    checkArrayWithCalendar()
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
    date.value = ""
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

    toggleEditMode(event)
})

//
function toggleEditMode(event) {
    let liAndIcons = document.querySelectorAll(".li")
    
    
    for(let i = 0; i < liAndIcons.length; i++){
        let eventTargetText = event.target.firstElementChild.nextElementSibling.innerText
        let liText = liAndIcons[i].firstElementChild.nextElementSibling.innerText
        
        if(eventTargetText == liText){
            console.log(liAndIcons[i].firstElementChild.nextElementSibling)
        }
    }
    
}

// removing element
function deleteFromLocalStorage(event) {
    for (let i = 0; i < todos.length; i++) {

        if (todos[i].id == event.target.parentNode.parentNode.id) {
            todos.splice(i, 1)
            localStorage.setItem('todo', JSON.stringify(todos))
            event.target.parentNode.parentNode.remove()
        
            loadCalendar()
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

function checkArrayWithCalendar() {
    let tds = document.querySelectorAll("td")

    for (let j = 0; j < tds.length; j++) {
        let secondDivInCalendar = tds[j].querySelector("#todoInCalendar")
        
        let countTodo = 0
        for (let i = 0; i < todos.length; i++) {
            if (tds[j].firstElementChild.innerText == todos[i].date) {
                countTodo++
            }
        }

        if (countTodo > 0) {
            
            if (!secondDivInCalendar) {
                secondDivInCalendar = document.createElement("div")
                secondDivInCalendar.id = "todoInCalendar"
                tds[j].appendChild(secondDivInCalendar)
                
                let spanForArray = document.createElement("span")
                spanForArray.classList = "spanForArray"
                secondDivInCalendar.appendChild(spanForArray)
            }
            secondDivInCalendar.firstElementChild.innerText = countTodo
        }
    }
}

let calendar = document.getElementById("hej")
calendar.addEventListener("click", showTodosForChosenDate)
function showTodosForChosenDate() {
    let listTodos = document.querySelectorAll(".li")
    for (let j = 0; j < listTodos.length; j++) {

        if (listTodos[j].lastChild.previousSibling.innerText != event.target.firstElementChild.innerText) {
            listTodos[j].style.display = "none"

        }
        else {
            listTodos[j].style.display = ""
        }
    }
}
