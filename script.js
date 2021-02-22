const artistApp = {};

artistApp.apiUrl = "https://ws.audioscrobbler.com/2.0/";
artistApp.apiKey = "e35219e4872d0f1dcee255f3768714bb";

const ulElement = document.getElementById("newArtists");

artistApp.getArtists = () => {

    const url = new URL(artistApp.apiUrl);
    url.search = new URLSearchParams({
        method: "artist.getSimilar",
        artist: "cave in",
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
      artistButton.setAttribute("href", item.url);

      // console.log(artistName);
      // console.log(artistButton);
     
      listElement.appendChild(artistName);
      listElement.appendChild(artistButton);

      //  add list elements to the ul
      ulElement.appendChild(listElement);
    });

}


// create init method
artistApp.init = () => {
  const formElement = document.querySelector("form");

  // attach event listener to get info on submit
  formElement.addEventListener("submit", function(e) {
    e.preventDefault();

    // clear out results section before adding new results
    ulElement.innerHTML = "";

    // get the value of what the user submits in form
    const artist = formElement.value;

    // call getArtists function by passing in the value
    artistApp.getArtists(artist);

    // clear out the search field upon submission
    document.getElementById("artistInput").value = "";
  });
}

artistApp.init();



