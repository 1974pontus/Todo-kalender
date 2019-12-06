
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

monthAndYear = document.getElementById("monthAndYear");

// window.addEventListener('load', loadPage)
// function loadPage() {
//     loadCalendar()
// }


function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    loadCalendar()
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    loadCalendar()
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    loadCalendar()
}
function loadCalendar() {
    // API:et verkar skapa sin måndagsindexering på 1, men din kod använder default javascript index som börjar på 0.
    // Jag har lagt till +1 på currentMonth så du laddar in rätt månad. Var lite förvirrande tidigare när december fick
    // november månads datum

    listHolidaysWithAjaxCallback
    (currentMonth + 1, currentYear, (response) => {
        const allDays = response.responseJSON.dagar
        let redDays = getHolidays(allDays)
        showCalendar(currentMonth, currentYear, redDays);
    })
}

function showCalendar(month, year, redDays) {

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
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {
                cell = document.createElement("td");

                let divForCellText = document.createElement("div")
                divForCellText.id = "divForCellText"
                cell.appendChild(divForCellText)

                let divForRedDay = document.createElement("div")
                divForRedDay.id = "divForRedDay"
                cell.appendChild(divForRedDay)

                cellDate = document.createTextNode(date);
                const isToday = date === today.getDate() && year === today.getFullYear() && month === today.getMonth();
                // Använder en hashmap (object) för röda datum istället för en Array. På detta sätt så får du lite bättre
                // prestanda med en O(1) lookup vs O(n). Med andra ord så slipper du iterera igenom en array för varje datum
                // i denna loop
                const isRedDay = redDays[date] ? true : false;
                
                // Nedan kod märker inte upp en helgdag som är dagens datum annorlunda, det är kanske något du vill
                // implementera, har skapat booleans (ovan) för dig som du kan använda för att göra detta.
                
                if (isToday) {
                    cell.classList.add("bg-info");
                } // color today's date
                         
                if (isRedDay) {
                    cell.classList.add("bg-danger");
                    cellText = document.createTextNode(redDays[date].helgdag)
                    divForRedDay.appendChild(cellText);   
                }
                
                divForCellText.appendChild(cellDate);   
                row.appendChild(cell);
                date++;
            }
        }
        tbl.appendChild(row); // appending each row into calendar body.
    }
    checkArrayWithCalendar()
}


function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function listHolidaysWithAjaxCallback(currentMonth, currentYear, callback) {
    $.ajax({
        url: 'https://api.dryg.net/dagar/v2.1/' + currentYear + '/' + currentMonth,
        type: 'GET',
        complete: callback
    })
}


function getHolidays(allDays) {
    let redDays = {};
    
    Object.keys(allDays).forEach((key, index) => {
        if (allDays[key]["helgdag"]) {
            redDays[index + 1] = allDays[key];
        }
    });
    return redDays
}





