// Selecting the DOM elements
const $mainWrapper = $('#gallery');


// This function displays the employee details according the ajax request
function displayEmployee(seed, image, fullname, email, city) {
  let html = `
    <div class="card" >
      <a href="https://randomuser.me/api/?seed=${seed}">
          <img src="${image}" alt="Photograph of ${fullname}" />
          <h2>${fullname}</h2>
          <p>
            ${email}
            <br>
            ${city}
          </p>
      </a>
    </div>
  `;
  return html;
}

// This AJAX Request retrieve the info of the employee
function retrieveAllEmployeesData(url) {
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data) {
      const employeeObject = data.results[0];
      const employeeSeed = data.info.seed;
      const employeeThumbnail = employeeObject.picture.thumbnail;
      const employeeName = employeeObject.name.first + ' ' + employeeObject.name.last;
      const employeeEmail = employeeObject.email;
      const employeeCity = employeeObject.location.city;

      $mainWrapper.append(displayEmployee(employeeSeed, employeeThumbnail, employeeName, employeeEmail, employeeCity));

    }
  });
}

// This AJAX Request retrieves the info for one employee only
function retrieveEmployeeDetails(selectedUrl) {
  $.ajax({
    url: selectedUrl,
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  });
}

// This function uses the retrieveAllEmployeesData function in order to display the ten employees.
function getEmployees() {
  for (let i = 0; i < 12; i++) {
    retrieveAllEmployeesData('https://randomuser.me/api/');
  }
}

// When the user clicks an employee card
  // We retrieve which user has been clicked
  // Then we do the second ajax request
function showModalWindow(employeeTargeted) {
  const employeeUrl = $('a').attr('href');
  retrieveEmployeeDetails(employeeUrl);
}



// Run all the functions needed
getEmployees();

$mainWrapper.on('click', 'div', function(event) {
  event.preventDefault();
  showModalWindow(this);
})
