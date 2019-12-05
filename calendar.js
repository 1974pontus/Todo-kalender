today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    let firstDay = (new Date(year, month)).getDay();

    tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("bg-info");
                } // color today's date
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row); // appending each row into calendar body.
    }

}
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}


<<<<<<< HEAD

let wrapper = document.querySelector("todoList")
let addTodoBtn = document.getElementById("add-icon")
let input = document.getElementById("input")
let list = document.getElementById("listForAllTodos")

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
            console.log("hiasd")
            let time = `${hours}:0${minutes}:${seconds}`;
            document.getElementById('dateAndTime').innerText = time;
            if (seconds <= 9) {
                let time =
                    `${hours}:0${minutes}:0${seconds}`;
                document.getElementById('dateAndTime').innerText = time;
            }
        }
        else if (seconds <= 9) {
            console.log("hiasd")
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
=======
>>>>>>> refs/heads/4-create-todo
