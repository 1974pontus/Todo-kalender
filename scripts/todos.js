let wrapper = document.querySelector("todoList")
let addTodoBtn = document.getElementById("add-icon")
let input = document.getElementById("input")
let list = document.getElementById("listForAllTodos")

let today = new Date();
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


window.addEventListener("load", startTime)

function startTime() {
    setInterval(() => {
        today.setSeconds(today.getSeconds() + 1);
        let hours = today.getHours()
        let minutes = today.getMinutes()
        let seconds = today.getSeconds()
        if (hours < 10){
            let time =
             `0${hours}:${minutes}:${seconds}`;
            document.getElementById('dateAndTime').innerText = time;
           }
           else{
            `${hours}:${minutes}:${seconds}`;
            document.getElementById('dateAndTime').innerText = time;
           }
        }, 1000);
    }



let id = 1

addTodoBtn.addEventListener("click", addTodoItem)
input.addEventListener("keyup", function (event) {
    if (event.which == 13) {
        addTodoItem()
    }
})

function addTodoItem() {
    let userInput = input.value
    let li = `<li id="li">
    <i id="checkbox" class="fas fa-check"></i> ${userInput}
    <i id="trash" class="fas fa-trash"></i>
     </li>`
    list.insertAdjacentHTML("beforeend", li)
    id++
    input.value = ""

}

list.addEventListener("click", function (event) {
    const check = event.target


    if (check.style.background === "grey" || check.firstElementChild.style.color === "lime") {
        check.style.background = ""
        check.firstElementChild.style.color = ""
        check.lastElementChild.style.visibility = "hidden"
    }
    // make this code work
    else {
        check.firstElementChild.style.color = "lime"
        check.style.background = "grey"
        check.lastElementChild.style.visibility = "visible"
    }



})

list.addEventListener("click", function (event, li) {
    const remove = event.target
    if (remove.id === 'trash') {
        remove.parentNode.remove()
    }
})

// // list.addEventListener("click", function (event, li) {
//     const checkbox = event.target
//     if (checkbox.id === 'checkbox') {
//         console.log("hi")
//         checkbox.parentNode.style.textDecoration = "line-through"
//         checkbox.style.textDecoration = "none"
//         checkbox.nextSibling.style.textDecoration = "none"
//     }
// })
