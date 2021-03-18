import axios from 'axios';

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
// axios
//   .get('https:api.github.com/users/Samantha-Dutcher1986');
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

// const followersArray = [];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

const users = ['Samantha-Dutcher1986', 'tetondan', 'justsml', 'luishrd', 'bigknell'];

const followersArray = users.map(item => {return `https://api.github.com/users/${item}`});

console.log(followersArray);

function Creation(api) {
  axios
    .get('https:api.github.com/users/Samantha-Dutcher1986')
    .then(res => {
      let data = res.data;
      let card = createCard(data);
      const cards = document.querySelector('.cards');
      cards.appendChild(card);

      let followers = `${api}/followers`

      axios
        .get(followers)
        .then(res => {
          let data = res.data;
          let error = 'Oops, there was an error!'
          data.forEach(item => {
            cards.appendChild(createCard(item))
          })
          return card;
        })
        .catch(err => {console.log(`There was an error ${error}`)})

        return card;
    })
    .catch(err => {console.log(`Error ${error}`)})
}

followersArray.forEach(item => Creation(item))

/*STEP 3*/

function createCard(obj){
  let card = document.createElement('div')
  let img = document.createElement('img')
  let subDiv = document.createElement('div')
  let header = document.createElement('h3')
  let username = document.createElement('p')
  let location = document.createElement('p')
  let profile = document.createElement('p')
  let link = document.createElement('a')
  let followers = document.createElement('p')
  let following = document.createElement('p')
  let bio = document.createElement('p')

  header.textContent = obj.name 
  username.textContent = obj.login
  location.textContent = obj.location
  link.textContent = obj.html_url
  profile.textContent = `Profile:`
  followers.textContent = `Followers: ${obj.followers}`
  following.textContent = `Folllowing: ${obj.following}`
  bio.textContent = `Bio: ${obj.bio}`

  card.setAttribute('class', 'card')
  img.setAttribute('src', obj.avatar_url)
  subDiv.setAttribute('class', 'card-info')
  link.setAttribute('href', obj.html_url)

  card.appendChild(img)
  card.appendChild(subDiv)
  subDiv.appendChild(header)
  subDiv.appendChild(username)
  subDiv.appendChild(location)
  subDiv.appendChild(profile)
  subDiv.appendChild(followers)
  subDiv.appendChild(following)
  subDiv.appendChild(bio)
  profile.appendChild(link)

  return card
}