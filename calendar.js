let monthYear = new Date();
let months = [
    'January',
    'February',
    'March',
    'April',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
document.getElementById("month").innerHTML = months[monthYear.getMonth()];
document.getElementById("year").innerHTML = monthYear.getFullYear();

