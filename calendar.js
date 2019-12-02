today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);


window.addEventListener('load', loadPage)

function loadPage() {

}


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
    listHolidaysWithAjaxCallback(currentMonth, currentYear, (response) => {
        const allDays = response.responseJSON.dagar
        let redDays = getHolidays(allDays)
        console.log(redDays)
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
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else if (date > daysInMonth(month, year)) {
                break;
            }

            else {

                // Forloop, itterera över redDays
                // Kolla om röd dag är samma datum som date
                // Isåfall skriv ut den röda dagen i nått element

                // redDays.forEach((redDay)=>{
                //     date = redDay.datum;
                    
                // })

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

function listHolidaysWithAjaxCallback(currentMonth, currentYear, callback) {
    $.ajax({
        url: 'https://api.dryg.net/dagar/v2.1/' + currentYear + '/' + currentMonth,
        type: 'GET',
        complete: callback
    })
}

/**
 * Helper function that prints all the holidays and it's date
 * for a given set of days.
 * @param {Array<Day>} allDays list of days to look through for holidays
 */
function getHolidays(allDays) {
    let helgDagar = []
    for (const day of allDays) {
        if (day.helgdag) {  
            helgDagar.push(day)
        }
    }
    return helgDagar
}