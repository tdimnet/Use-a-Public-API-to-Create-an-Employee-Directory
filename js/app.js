const randomUsersData = fetch('https://randomuser.me/api/?results=10');
randomUsersData
  .then(data => data.json())
  .then(data => console.log(data))
