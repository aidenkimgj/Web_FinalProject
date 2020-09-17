var employeeArray = [];
var searchBox1 = document.getElementById('searchByLastName');
var searchBox2 = document.getElementById('searchById');
var searchBox3 = document.getElementById('searchByAddress');

document.onload = loadFileForSearch();
document.onload = initialize();


function initialize() {

    // event listener for search by last name
    var searchByLastNameInput = document.getElementById('searchByLastName');
    searchByLastNameInput.addEventListener('keyup', function () {
        searchByLastName(employeeArray, searchByLastNameInput.value);
    });
    // Event listener for search by ID
    var searchByIdInput = document.getElementById('searchById');
    searchByIdInput.addEventListener('keyup', function () {
        searchById(employeeArray, searchByIdInput.value);
    });
    // event listener for search by address
    var searchByAddressInput = document.getElementById('searchByAddress');
    searchByAddressInput.addEventListener('keyup', function () {
        searchByAddress(employeeArray, searchByAddressInput.value);
    });
}

function loadFileForSearch() {

    var filePath = './assets/data/employeedata.json';

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log(ajax.responseText);
            employeeArray = JSON.parse(ajax.responseText);
            console.log(employeeArray); 
        }
    }

    ajax.open('GET', filePath, true);
    ajax.send();

}

function searchByLastName(searchArray, value) {
    var resultArray = [];
    // loop through all the employees
    if (searchBox1.value != "") {
        for (let i = 0; i < searchArray.length; i++) {
            // select current employee
            var thisEmployee = searchArray[i];
            // search for the value in the lastname string
            var searchFound = thisEmployee.lastname.search(value);
            // if the search did not return -1, that means it found something!
            if (searchFound == 0) {

                // if search was positive, add this employee to result list.
                resultArray.push(thisEmployee);
            }
        }
    } else {
        resultArray = [];
    }
    displayResults(resultArray);
}


function searchById(searchArray, value) {

    var resultArray = [];
    if (searchBox2.value != "") {
        // loop through all employees
        for (let i = 0; i < searchArray.length; i++) {
            // this is the current employee that we are looping through
            var thisEmployee = searchArray[i];
            // search for the value in the idnumber string
            var searchFound = thisEmployee.idnumber.search(value);
            // if the search did not return -1, that means it found something!
            if (searchFound == 0) {
                console.log(searchFound);
                // if the search is positive, then push the employee in to the result array.
                resultArray.push(thisEmployee);

            }
        }
    } else {
        resultArray = [];
    }
    displayResults(resultArray);
}

function searchByAddress(searchArray, value) {
    var resultArray = [];
    if (searchBox3.value != "") {
        // loop through all the employees
        for (let i = 0; i < searchArray.length; i++) {
            // select current employee
            var thisEmployee = searchArray[i];
            // search for the value in the address string
            var searchFound = thisEmployee.address.search(value);
            // if the search did not return -1, that means it found something!
            if (searchFound != -1) {

                // if search was positive, add this employee to result list.
                resultArray.push(thisEmployee);
            }
        }
    } else {
        resultArray = [];
    }

    displayResults(resultArray);
}


function displayResults(resultArray) {

    var resultDisplay = "";

    resultDisplay += '<table class="employee">';
    resultDisplay += '<tr>';
    resultDisplay += '<th>Name</th>';
    resultDisplay += '<th>ID number</th>';
    resultDisplay += '<th>Phone</th>';
    resultDisplay += '<th>Address</th>';
    resultDisplay += '</tr>';
    //loop through all the results coming in
    for (let i = 0; i < resultArray.length; i++) {
        // this is the current result we are looping through
        var thisResult = resultArray[i];
        // building the result display for this Client
        resultDisplay += '<tr>';
        resultDisplay += '<td>'+ thisResult.firstname + ' ' + thisResult.lastname + '</td>';
        resultDisplay += '<td>'+ thisResult.idnumber + '</td>';
        resultDisplay += '<td>'+ thisResult.phone +'</td>';
        resultDisplay += '<td>'+ thisResult.address + '</td>';
        resultDisplay += '</tr>';
    }
    resultDisplay += '</table>';
    // display the result variable in the search result box on the HTML page
    document.getElementById('search_results').innerHTML = resultDisplay;

}