// Selecting the DOM elements
const $mainWrapper = $('#main-wrapper');


// This function displays the employee details according the ajax request
function displayEmployee(email) {
  let html = '';
  html += '<h2>';
  html += email;
  html += '</h2>';
  return html;
}

// This AJAX Request retrieve the info of the employee
function retrieveData() {
  $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      const employeeObject = data.results[0];
      const employeeEmail = employeeObject.email;
      $mainWrapper.append(displayEmployee(employeeEmail));
    }
  });
}

// This function uses the retrieveData function in order to display the ten employees.
function getEmployees() {
  for (let i = 0; i < 10; i++) {
    retrieveData();
  }
}

// Once the documents is fully loaded, run the initial function in order to get the employees list
$(document).ready(function() {
  getEmployees();
})
