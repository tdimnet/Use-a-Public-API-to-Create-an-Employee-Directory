// Fetch the data from the api
const randomUsersData = fetch('https://randomuser.me/api/?results=10');
randomUsersData
  .then(data => data.json())
  .then(data => displayResults(data))
  .catch(err => console.log(err));


const displayResults = (data) => {
  for (let i = 0; i < data.results.length; i++) {
    let picture = data.results[i].picture.thumbnail;
    let firstName = data.results[i].name.first;
    let lastName = data.results[i].name.last;
    let email = data.results[i].email;
    let city = data.results[i].location.city;
    console.log(picture, firstName, lastName, email, city);
  }
}
