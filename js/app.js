// Selecting the DOM elements
const $mainWrapper = $('#main-wrapper');


// This function displays the employee details according the ajax request
function displayEmployee(image, fullname, email, city) {
  let html = `
    <div class="employeeDetails" >
      <a>
        <img src="${image}" alt="" />
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
function retrieveData() {
  $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function(data) {
      const employeeObject = data.results[0];
      const employeeThumbnail = employeeObject.picture.thumbnail;
      const employeeName = employeeObject.name.first + ' ' + employeeObject.name.last;
      const employeeEmail = employeeObject.email;
      const employeeCity = employeeObject.location.city;

      $mainWrapper.append(displayEmployee(employeeThumbnail, employeeName, employeeEmail, employeeCity));

    }
  });
}

// This function uses the retrieveData function in order to display the ten employees.
function getEmployees() {
  for (let i = 0; i < 10; i++) {
    retrieveData();
  }
}


getEmployees();

$mainWrapper.on('click', 'div', function() {
  console.log(this)
})
