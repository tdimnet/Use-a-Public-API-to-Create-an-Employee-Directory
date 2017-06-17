// Targeting the DOM elements
const mainWrapper = document.getElementById('main-wrapper');


//  Return the seed needed https://randomuser.me/api/?results=10&&seed=2ab6b57dfd8c77b4

// Fetch the data from the api
const randomUsersData = fetch('https://randomuser.me/api/?results=10');
randomUsersData
  .then(data => data.json())
  .then(data => displayResults(data))
  .catch(err => console.log(err));


const displayResults = data => {
  let html = '';
  html += '<main>';
  for (let i = 0; i < data.results.length; i++) {
    html += '<div onClick=(console.log(data)) >';
    html += '<img src="' + data.results[i].picture.thumbnail + '"/>';
    html += '<p>';
    html += '<strong>';
    html += data.results[i].email;
    html += '</strong>';
    html += '<br>';
    html += data.results[i].name.first + ' ' + data.results[i].name.last;
    html += '<br>';
    html += data.results[i].location.city;
    html += '</p>';
    html += '</div>';
  }
  html += '</main>';

  mainWrapper.innerHTML = html;
}
