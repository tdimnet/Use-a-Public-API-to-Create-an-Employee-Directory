// Selecting the DOM elements
const $searchInput = $('#search-input');
const $gallery = $('#gallery');
const $overlay = $('<div id="overlay"></div>');
const $employeeDetail = $('<div id="employee-detail"></div>');
const $closeBtn = $('<p id="close">X</p>');
const $previousBtn = $('<p id="previous"><</p>');
const $nextBtn = $('<p id="next">></p>');
const $image = $('<img>');
const $employeeFullname = $('<h2></h2>');
const $employeeEmail = $('<p class="email"></p>');
const $employeeCity = $('<p></p>');
const $horizontalBreak = $('<hr>');
const $employeePhone = $('<p></p>');
const $employeeLocation = $('<p></p>');
const $employeeBirthDay = $('<p></p>');

// Append the elements to the DOM
$employeeDetail.append($closeBtn);
$employeeDetail.append($previousBtn);
$employeeDetail.append($nextBtn);
$employeeDetail.append($image);
$employeeDetail.append($employeeFullname);
$employeeDetail.append($employeeEmail);
$employeeDetail.append($employeeCity);
$employeeDetail.append($horizontalBreak);
$employeeDetail.append($employeePhone);
$employeeDetail.append($employeeLocation);
$employeeDetail.append($employeeBirthDay);
$overlay.append($employeeDetail);
$('body').append($overlay);


// Tracking variables
var objectPosition;
var activeObjects;


// This function uses the retrieveAllEmployeesData function in order to display the ten employees.
function getEmployees() {
  for (let i = 0; i < 12; i++) {
    retrieveAllEmployeesData('https://randomuser.me/api/');
  }
}

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
        <div class="card active">
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



// This AJAX Request retrieve the info of the employee
function getOneEmployeeDetails(url, currentObj) {

  prevAndNextBtn(currentObj);

  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data) {
      $image.attr('src', data.results[0].picture.large);
      $employeeFullname.text(data.results[0].name.first + ' ' + data.results[0].name.last);
      $employeeEmail.text(data.results[0].email);
      $employeeCity.text(data.results[0].location.city);
      $employeePhone.text(data.results[0].cell);
      $employeeLocation.text(data.results[0].location.street + ' ' + data.results[0].location.city + ' ' + data.results[0].location.state + ' ' + data.results[0].location.postcode + ' ' + data.results[0].nat);
      $employeeBirthDay.text("Birthday: " + data.results[0].dob.substring(0,10));
      $overlay.fadeIn('400');
    }
  });
}


function prevAndNextBtn(employeeObj) {

  objectPosition = $('.active').index(employeeObj);
  activeObjects = $('.active').length;

  console.log($('.active').length)

  if ($('.active').length === 1) {
    $previousBtn.hide();
    $nextBtn.hide();
  } else if (objectPosition === 0) {
    $previousBtn.hide();
    $nextBtn.show();
  } else if (objectPosition === ( activeObjects -1 )) {
    $previousBtn.show();
    $nextBtn.hide();
  } else {
    $previousBtn.show();
    $nextBtn.show();
  }
}


// The second Ajax Request
$gallery.on('click', 'div', function(event) {
  event.preventDefault();
  const employeeSeed = $(this).find('a').attr('href');
  const employeeObj = $(this);
  getOneEmployeeDetails(employeeSeed, employeeObj);
})


// When prevArrow is clicked
$previousBtn.click(function() {
  // Show the previous image
  let prevObject = $('.active').eq(objectPosition - 1);
  let prevObjectSeed = $('.active').eq(objectPosition - 1).find('a').attr('href');
  getOneEmployeeDetails(prevObjectSeed, prevObject);
});

// When nextArrow is clicked
$nextBtn.click(function() {
  // Show the next image
  let nextObject = $('.active').eq(objectPosition + 1);
  let nextObjectSeed = $('.active').eq(objectPosition + 1).find('a').attr('href');
  getOneEmployeeDetails(nextObjectSeed, nextObject);
});


$closeBtn.on('click', function() {
  $overlay.fadeOut();
})


// The searching function
$searchInput.keyup(function() {
  let searchName = $searchInput.val().toLowerCase();
  $('.card').each(function() {
    let fullname = $(this).find('h2').text();
    if (fullname.indexOf(searchName) === -1 ) {
      $(this).removeClass('active');
      $(this).fadeOut('fast');
    } else {
      $(this).addClass('active');
      $(this).fadeIn('fast');
    }
  })
}).keydown();



// Run all the functions needed
$(document).ready(function() {
  getEmployees();
})
