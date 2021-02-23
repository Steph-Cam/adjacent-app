const artistApp = {};

// LastFM API
artistApp.apiUrl = "https://ws.audioscrobbler.com/2.0/";
artistApp.apiKey = "e35219e4872d0f1dcee255f3768714bb";

// AudioDB API
artistApp.apiUrl2 = "https://www.theaudiodb.com/api/v1/json/1/search.php";


const ulElement = document.getElementById("newArtists");

// AudioDB API 
artistApp.getPhotos = (artist) => {
  const url = new URL(artistApp.apiUrl2);
  url.search = new URLSearchParams({
    s: artist 
  })
  
  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data2) {
    console.log(data2);
    
  })
  
  // 1 take the data from array of new artists from first API call 
  // 2 pass those artists into a second API call to retreive images for those artists 
  // display images in ul on the page




  // const artistArray = artistData.similarartists.artist;
  // console.log(artistArray);  
  
}

// LastFM API 
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
    formElement.addEventListener("submit", function (e) {
        e.preventDefault();

        // console.log(e);

        // clear out results section before adding new results
        ulElement.innerHTML = "";

        // get the value of what the user submits in form
        // const artist = formElement.value;
        const artist = e.target[0].value;
        console.log(artist);

        // alert user if they enter an empty string
        if (artist === '') {
            alert('please enter an artist')
        };
        
        // const artistResults = e.artists[0].strArtist;
        // console.log(artistResults);

        // clear out the search field upon submission
        // call getArtists function by passing in the value
        artistApp.getPhotos(artist);
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

