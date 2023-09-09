const calenderInput = document.getElementById('range-input');
let isCalendarOpen= false;

let rangeStartCell = null;
let rangeEndCell = null;
let table = null;
let tableBody = null;
let tableCells = null;

//adds a listener to the document that will close the calendar when the user clicks outside of it and will set the values of the input field
//if the calendar is not open, it will open the calendar
document.addEventListener('click', toggleCalendarVisibility);

/**
 * This function handles clicks on the input field and opens the calendar if it is not open
 * and closes the calendar if it is open and the user clicks outside of it
 * @param event the event that triggered the function ('click')
 */
function toggleCalendarVisibility(event){
    let isClickOnHTMLInput = event.target.id === 'range-input';
    if(isClickOnHTMLInput && !isCalendarOpen){
        openCalender();
        return;
    }

    let isClickOutsideCalender = !event.target.closest('#calendar-wrapper');
    if(isCalendarOpen && isClickOutsideCalender){
        removeCalender();
        updateInputValue();
    }
}

/**
 * Creates the calendar wrapper and appends it after the input field
 * then it initializes the calendar
 */
function openCalender() {
    let calendarWrapper = createCalenderWrapper();
    insertAfter(calenderInput, calendarWrapper);
    init(calendarWrapper);
    isCalendarOpen = true;
}

/**
 * Places the newElement after the targetElement in the DOM
 * @param targetElement HTML element after which the newElement will be placed
 * @param newElement HTML element that will be placed after the targetElement
 */
function insertAfter(targetElement, newElement) {
    targetElement.after(newElement);
}

/**
 * Creates the calendar wrapper
 * @returns {HTMLDivElement} the element that will hold the calendar wrapper inside it as a child
 */
function createCalenderWrapper() {
    let calendarWrapper = document.createElement('div');
    calendarWrapper.id = 'calendar-wrapper';

    return calendarWrapper;
}

/**
 * Removes the div element that holds inside it the calendar range picker.
 * And in this way the calendar range picker disappears
 */
function removeCalender(){
    let currentCalendarWrapper = document.getElementById('calendar-wrapper');
    currentCalendarWrapper.remove();
    isCalendarOpen = false;
}

/**
 * Sets the value inside the HTML input
 * 1. If the starting and ending dates are set it will set the value to be dd/mm/yyyy - dd/mm/yyyy
 * 2. If only the starting date is selected it will set the value to be dd/mm/yyyy
 */
function updateInputValue() {
    let dateRangeString = getDateRangeString()
    if(dateRangeString){
        setCalenderInputValue(dateRangeString);
        return;
    }

    if (rangeStartCell) {
        let dataString = getDateStringFromCell(rangeStartCell);
        setCalenderInputValue(dataString);
    }
}

/**
 * This will return the string only if the staring and ending date of the range are set
 * @returns {string} data range in format dd/mm/yyyy - dd/mm/yyyy
 */
function getDateRangeString(){
    if (rangeStartCell && rangeEndCell) {
        let rangeStartingDate = getDateStringFromCell(rangeStartCell);
        let rangeEndingDate = getDateStringFromCell(rangeEndCell);
        return `${rangeStartingDate} - ${rangeEndingDate}`;
    }
}

/**
 * Sets the value inside the HTML input
 * @param value the value that will be set inside the input field
 */
function setCalenderInputValue(value){
    calenderInput.value = value;
}

/**
 * Returns the date from cell of the calendar
 * @param cell the cell from which the date will be extracted
 * @returns {string} date in format dd/mm/yyyy
 */
function getDateStringFromCell(cell) {
    let cellDate = cell.getAttribute('date');
    const today = new Date(cellDate);
    const day = today.getDate().toString().padStart(2, '0'); // padStart ensures 2 digits
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // add 1 to get 1-12 range
    const year = today.getFullYear().toString();

    // date in "DD/MM/YYYY" format
    return `${day}/${month}/${year}`;
}

/**
 * Returns the date from cell of the calendar
 * @param cell the cell from which the date will be extracted
 * @returns {Date}
 */
function getDateFromCell(cell) {
    let cellDate = cell.getAttribute('date');
    return new Date(cellDate);
}

/**
 * Constructs the calendar range picker and assigns all event listeners to it
 * @param divRoot the div element that will hold the calendar range picker inside it as a child
 */
function init(divRoot) {
    let currentDate = new Date();

    let headerButtons = createHeader(currentDate);
    divRoot.appendChild(headerButtons);

    let calendar = document.createElement('div');
    calendar.id = 'calendar';
    createMonth(currentDate.toDateString(), calendar);
    divRoot.appendChild(calendar);

    table = calendar.querySelector('table');
    tableBody = table.querySelector('tbody');
    tableCells = tableBody.querySelectorAll('td');
    addEventCellsListeners(tableCells);
    addHeaderButtonsListeners(headerButtons, calendar);
}

/**
 * Creates the header of the calendar range picker
 * @param currentDate the current date
 * @returns {HTMLDivElement} the element that will hold the header inside it as a child
 */
function createHeader(currentDate) {
    const headerButtons = document.createElement("div");
    headerButtons.id = "header-buttons";

    // create left button and add to header
    headerButtons.appendChild(createButton("left", "fas fa-arrow-left"));

    // create month/year div and add to header
    const monthYearDiv = createMonthYearDiv(currentDate);
    headerButtons.appendChild(monthYearDiv);

    // create right button and add to header
    headerButtons.appendChild(createButton("right", "fas fa-arrow-right"));

    return headerButtons;
}

/**
 * Creates a button with the given direction and icon class that will be used to navigate the calendar
 * @param direction left or right
 * @param iconClass the class of the icon that will be used for the button
 * @returns {HTMLButtonElement} the button that will be used to navigate the calendar
 */
function createButton(direction, iconClass) {
    const button = document.createElement("button");
    button.id = `${direction}-button`;
    const icon = document.createElement("i");
    icon.className = iconClass;
    button.appendChild(icon);
    return button;
}

/**
 * Creates a div that will hold the month and year of the calendar
 * @param currentDate the date that will be used to get the month and year
 * @returns {HTMLDivElement} the div that will hold the month and year of the calendar
 */
function createMonthYearDiv(currentDate) {
    const monthYearDiv = document.createElement("div");
    monthYearDiv.id = "month-year";
    monthYearDiv.innerHTML = getMonthYearString(currentDate);
    return monthYearDiv;
}

/**
 * Returns the month and year string
 * @param date the date from which the month and year will be extracted
 * @returns {string} the month and year in format Month YYYY
 */
function getMonthYearString(date) {
    const monthName = getMonthName(date.getMonth());
    const year = date.getFullYear();
    return `${monthName} ${year}`;
}

/**
 * Returns the month name from the given month index
 * @param monthIndex the index of the month
 * @returns {string} the name of the month
 */
function getMonthName(monthIndex) {
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthIndex];
}

/**
 * Adds event listeners to the header buttons
 * @param headerButtons the header buttons
 * @param calendar the calendar range picker
 */
function addHeaderButtonsListeners(headerButtons, calendar) {
    const leftButton = headerButtons.querySelector("#left-button");
    const rightButton = headerButtons.querySelector("#right-button");
    const monthYearDiv = headerButtons.querySelector("#month-year");

    leftButton.addEventListener("click", () => handleHeaderButton(leftButton, monthYearDiv, calendar, -1));
    rightButton.addEventListener("click", () => handleHeaderButton(rightButton, monthYearDiv, calendar, 1));
}

/**
 * Handles the click on the header buttons
 * @param button the button that was clicked
 * @param monthYearDiv the div that holds the month and year
 * @param calendar the calendar range picker
 * @param direction the direction of the button
 */
function handleHeaderButton(button, monthYearDiv, calendar, direction) {
    removeEventCellsListeners(tableCells);
    // clearRangeInput();

    const [month, year] = monthYearDiv.innerHTML.split(" ");
    const newDate = new Date(`${month} 1, ${year}`);
    newDate.setMonth(newDate.getMonth() + direction);
    monthYearDiv.innerHTML = getMonthYearString(newDate);
    createMonth(newDate.toDateString(), calendar);
    tableCells = getTableCells(calendar);
    addEventCellsListeners(tableCells);
}

/**
 * Returns the table cells of the calendar range picker
 * @param calendar the calendar range picker
 * @returns {*} the table cells of the calendar range picker
 */
function getTableCells(calendar) {
    const table = calendar.querySelector("table");
    const tableBody = table.querySelector("tbody");
    return tableBody.querySelectorAll("td");
}

/**
 * Constructs the whole body of the calendar range picker
 * @param monthToCreate the month that will be created
 * @param calendarWrapper the div element that will hold the calendar range picker inside it as a child
 */
function createMonth(monthToCreate, calendarWrapper) {
    const currentDate = new Date();
    const month = new Date(monthToCreate);
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay(); // 0 is Sunday, 1 is Monday, etc.

    let tableHTML = '<table><thead><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead><tbody>';

    let day = 1;
    for (let i = 0; i < 6; i++) {
        tableHTML += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDayOfMonth - 1) {
                tableHTML += '<td class="disabled"><i class="fas fa-times"></i></td>';
            } else if (day <= daysInMonth) {
                tableHTML += createTableCell(day, month, currentDate);
                day++;
            } else {
                tableHTML += '<td class="disabled"><i class="fas fa-times"></i></td>';
            }
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</tbody></table>';
    calendarWrapper.innerHTML = tableHTML;
}

/**
 * Creates a cell of the calendar range picker
 * @param day day of the cell
 * @param month month of the cell
 * @param currentDate the current date
 * @returns {string} the cell of the calendar range picker as HTML string
 */
function createTableCell(day, month, currentDate) {
    let date = new Date(month);
    date.setDate(day);

    return `<td date="${date}" class="${getClassList(day, month, date, currentDate)}">${day}</td>`;
}

/**
 * Returns the class list of the cell based on if the cell is the current date,
 * start date or end date and if the cell is between the start and end date if they are set
 * @param day the day of the cell
 * @param month the month of the cell
 * @param date the date of the cell
 * @param currentDate the current date
 * @returns {string} the class list of the cell
 */
function getClassList(day, month, date, currentDate) {
    //make an array of string
    let classList = [];
    if (day === currentDate.getDate() && month.getMonth() === currentDate.getMonth() && month.getFullYear() === currentDate.getFullYear()) {
        classList.push("today");
    }

    if (rangeStartCell !== null && getDateFromCell(rangeStartCell).getTime() === date.getTime()) {
        classList.push("selected start-date");
    }

    if (rangeEndCell !== null && getDateFromCell(rangeEndCell).getTime() === date.getTime()) {
        classList.push("selected end-date");
    }

    if (rangeStartCell !== null && rangeEndCell !== null) {
        if (date.getTime() > getDateFromCell(rangeStartCell).getTime() && date.getTime() < getDateFromCell(rangeEndCell).getTime()) {
            classList.push("selected");
        }
    }

    return classList.join(" ");
}

/**
 * Adds event listeners to the cells of the calendar range picker. This will handle the selection of the dates
 * @param tableCells the cells of the calendar range picker
 */
function addEventCellsListeners(tableCells) {
    tableCells.forEach(function (cell) {
        if (!cell.classList.contains('disabled')) {
            cell.addEventListener('click', function () {
                if (rangeStartCell === null) {
                    handleFirstClickedDate(cell);
                } else if (rangeEndCell === null) {
                    handleSecondClickedDate(cell);
                } else {
                    handleThirdClickedDate(cell);
                }
                updateInputValue();
            });
        }
    });
}

/**
 * Removes event listeners from the cells of the calendar range picker
 * @param tableCells the cells of the calendar range picker
 */
function removeEventCellsListeners(tableCells) {
    tableCells.forEach(function (cell) {
        if (!cell.classList.contains('disabled')) {
            cell.removeEventListener('click', function () {
                if (rangeStartCell === null) {
                    handleFirstClickedDate(cell);
                } else if (rangeEndCell === null) {
                    handleSecondClickedDate(cell);
                } else {
                    handleThirdClickedDate(cell);
                }
            });
        }
    });
}

/**
 * Handles the first clicked date and sets the rangeStartCell variable to the cell that was clicked
 * @param cell the cell that was clicked
 */
function handleFirstClickedDate(cell) {
    rangeStartCell = cell;
    cell.classList.add('start-date');
    cell.classList.add('selected');
}

/**
 * Handles the second clicked date and sets the rangeEndCell variable to the cell that was clicked
 * @param cell the cell that was clicked
 */
function handleSecondClickedDate(cell) {
    if (getDateFromCell(cell) < getDateFromCell(rangeStartCell)) {
        clearRangeInput();
    } else {
        rangeEndCell = cell;
        rangeEndCell.classList.add('end-date');
        rangeEndCell.classList.remove('selected');
        highlightCellsBetween(rangeStartCell, rangeEndCell);
    }
}

/**
 * Handles the third clicked date and sets the rangeEndCell variable to the cell that was clicked
 * @param cell the cell that was clicked
 */
function handleThirdClickedDate(cell) {
    if (cell.classList.contains('selected')) {
        handleSelectedThirdClick(cell);
        return;
    }

    handleUnselectedThirdClick(cell);
}

/**
 * Handles the third clicked date if the cell that was clicked is already selected,
 * and it is a start date or end date the range will be cleared
 * @param cell the cell that was clicked
 */
function handleSelectedThirdClick(cell) {
    if (cell.classList.contains('start-date') || cell.classList.contains('end-date')) {
        clearRangeInput();
        return;
    }

    deselectFromCellToCell(cell, rangeEndCell);
    removeEndDateClassFromSecondClickedDate();
    rangeEndCell = cell;
    addEndDateClassToSecondClickedDate();
    rangeEndCell.classList.remove('selected');
    highlightCellsBetween(rangeStartCell, rangeEndCell);
}

function handleUnselectedThirdClick(cell) {
    if (getDateFromCell(cell) > getDateFromCell(rangeEndCell)) {
        removeEndDateClassFromSecondClickedDate();
        highlightCellsBetween(rangeEndCell, cell);
        rangeEndCell = cell;
        addEndDateClassToSecondClickedDate();

    } else if (getDateFromCell(cell) < getDateFromCell(rangeStartCell)) {
        clearRangeInput();
        handleFirstClickedDate(cell);

    } else {
        deselectFromCellToCell(rangeStartCell, cell);
        removeStartDateClassFromFirstClickedDate();
        rangeStartCell = cell;
        addStartDateClassToFirstClickedDate();
    }
}

/**
 * Removes the end-date class from the second clicked date
 */
function removeEndDateClassFromSecondClickedDate() {
    //get elements with class end-date and remove it
    let elements = document.getElementsByClassName('end-date');
    while (elements.length > 0) {
        elements[0].classList.remove('end-date');
    }
    // rangeEndCell.classList.remove('end-date');
}

/**
 * Adds the end-date class to the second clicked date
 */
function addEndDateClassToSecondClickedDate() {
    rangeEndCell.classList.add('end-date');
}

/**
 * Removes the start-date class from the first clicked date
 */
function removeStartDateClassFromFirstClickedDate() {
    rangeStartCell.classList.remove('start-date');
}

/**
 * Adds the start-date class to the first clicked date
 */
function addStartDateClassToFirstClickedDate() {
    rangeStartCell.classList.add('start-date');
}

/**
 * Highlights all the cells as selected range between the first and second date
 * @param firstDate the first date
 * @param secondDate the second date
 */
function highlightCellsBetween(firstDate, secondDate) {

    const firDate = getDateFromCell(firstDate);
    const secDate = getDateFromCell(secondDate);
    //get all the cells between the first and second date
    const cellsBetween = (Array.from(tableCells)).filter(function (cell) {
        let cellDate = getDateFromCell(cell);
        return cellDate >= firDate && cellDate <= secDate;
    });

    //add the selected class to all the cells between the first and second date
    cellsBetween.forEach(function (cell) {
        cell.classList.add('selected');
    });
}

/**
 * Clears the range input and removes the selected class from all the cells
 */
function clearRangeInput() {
    clearAllCells();
    clearValueInInput();
}

/**
 * Clears the selected class from all the cells
 */
function clearAllCells(){
    tableCells.forEach(function (cell) {
        cell.classList.remove('selected', 'start-date', 'end-date');
    });
    rangeStartCell = null;
    rangeEndCell = null;
}

/**
 * Clears the value of the input field
 */
function clearValueInInput(){
    calenderInput.value='';
}

function getCellIndex(cell) {
    return Array.from(tableCells).indexOf(cell);
}

/**
 * Deselects all the cells between the first and second date
 * @param startCell the first date
 * @param endCell the second date
 */
function deselectFromCellToCell(startCell, endCell) {

    const startDate = getDateFromCell(startCell);
    const endDate = getDateFromCell(endCell);

    const cellsBetween = (Array.from(tableCells)).filter(function (cell) {
        let cellDate = getDateFromCell(cell);
        return cellDate >= startDate && cellDate <= endDate;
    });

    cellsBetween.forEach(function (cell) {
        cell.classList.remove('selected');
    });
}
