// Selecting the DOM elements
const $gallery = $('#gallery');
const $overlay = $('<div id="overlay"></div>');
const $employeeDetail = $('<div id="employee-detail"></div>');
const $image = $('<img>');
const $employeeFullname = $('<h2></h2>');

// Append the elements to the DOM
$employeeDetail.append($image);
$employeeDetail.append($employeeFullname);
$overlay.append($employeeDetail);
$('body').append($overlay);


// This AJAX Request retrieve the info of the employee
function retrieveAllEmployeesData(url) {
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data) {
      const employeeObject      = data.results[0];
      const employeeSeed        = data.info.seed;
      const employeeThumbnail   = employeeObject.picture.thumbnail;
      const employeeName        = employeeObject.name.first + ' ' + employeeObject.name.last;
      const employeeEmail       = employeeObject.email;
      const employeeCity        = employeeObject.location.city;

      // Complete the HTML gallery item
      let html = `
        <div class="card" >
          <a href="https://randomuser.me/api/?seed=${employeeSeed}">
              <img src="${employeeThumbnail}" alt="Photograph of ${employeeName}" />
              <h2>${employeeName}</h2>
              <p>
                ${employeeEmail}
                <br>
                ${employeeCity}
              </p>
          </a>
        </div>
      `;

      // Then display them
      $gallery.append(html);
    }
  });
}

// This function uses the retrieveAllEmployeesData function in order to display the ten employees.
function getEmployees() {
  for (let i = 0; i < 12; i++) {
    retrieveAllEmployeesData('https://randomuser.me/api/');
  }
}

// Run all the functions needed
$(document).ready(function() {
  getEmployees();
})


// The second Ajax Request
$gallery.on('click', 'div', function(event) {
  event.preventDefault();
  const employeeSeed = $(this).find('a').attr('href');
  getOneEmployeeDetails(employeeSeed);
})


// This AJAX Request retrieve the info of the employee
function getOneEmployeeDetails(url) {
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data) {
      console.log(data);
      const employeeImage = data.results[0].picture.large;
      const employeeFullname = data.results[0].name.first + ' ' + data.results[0].name.last;
      $image.attr('src', employeeImage);
      $employeeFullname.text(employeeFullname);
      $overlay.fadeIn('400');
    }
  });
}


$overlay.click(function() {
  $overlay.fadeOut();
})
