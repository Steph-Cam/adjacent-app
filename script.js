const artistApp = {};

artistApp.apiUrl = "https://ws.audioscrobbler.com/2.0/";
artistApp.apiKey = "e35219e4872d0f1dcee255f3768714bb";

const ulElement = document.getElementById("newArtists");

artistApp.getArtists = (artist) => {

    const url = new URL(artistApp.apiUrl);
    url.search = new URLSearchParams({
        method: "artist.getSimilar",
        artist: artist,
        api_key: artistApp.apiKey,
        format: "json",
        limit: 9,
        // autocorrect: [1]
    })
    
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      // console.log(data);
      // console.log(data.similarartists.artist);

      artistApp.displayArtists(data);
    })

  
}

artistApp.displayArtists = (artistData) => {
// console.log(artistData);

const artistArray = artistData.similarartists.artist;
console.log(artistArray);

    artistArray.forEach((item) => {
      // console.log(item.name);

      const listElement = document.createElement("li");
      // const searchArtist = document.createElement("h2")
      const artistName = document.createElement("h3");
      const artistButton = document.createElement("a");

      artistName.textContent = item.name;
      // first attemp:
    //   artistButton.setAttribute("href", item.url);
      artistButton.setAttribute('href', item.url);

      // Cam's probably sketchy way: 
      // artistButton.innerText = 'Artist Profile';

      // Susan's way:
      artistButton.append('Artist Profile');



      // console.log(artistName);
      // console.log(artistButton);
  
      listElement.appendChild(artistName);
      listElement.appendChild(artistButton);

      //  add list elements to the ul
      ulElement.appendChild(listElement);
    });

}

artistApp.getUserInput = () => {

  const formElement = document.querySelector("form");

  // attach event listener to get info on submit
  formElement.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // console.log(e);

    // clear out results section before adding new results
    ulElement.innerHTML = "";
    
    // get the value of what the user submits in form
    // const artist = formElement.value;
    const artist = e.target[0].value;
    console.log(artist);
    
    
    // clear out the search field upon submission
    // call getArtists function by passing in the value
    artistApp.getArtists(artist);
    document.getElementById("artistInput").value = "";
  });
  

}


// create init method
artistApp.init = () => {
  artistApp.getUserInput();
  // artistApp.getArtists();
}

artistApp.init();



// formElement.addEventListener("submit", function(e) {
//   e.preventDefault();
  
//   console.log(e);
  
//   // clear out results section before adding new results
//   ulElement.innerHTML = "";
  
//   // get the value of what the user submits in form
//   // const artist = formElement.value;
//   const artist = e.target;
//   console.log(artist);
  
  
//   document.getElementById("artistInput").value = "";
//   // clear out the search field upon submission
//   // call getArtists function by passing in the value
//   artistApp.getArtists(artist);
// });

