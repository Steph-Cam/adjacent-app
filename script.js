const artistApp = {};

// LastFM API
artistApp.apiUrl = "https://ws.audioscrobbler.com/2.0/";
artistApp.apiKey = "e35219e4872d0f1dcee255f3768714bb";

// AudioDB API - Note to instructor/marker, any artist searched that yields no result is due to this API not being able to return the required number of artists (4) containing names with only alphabetical characters, or other required data that disrupted a successful call. Unfortunately we could not find a more robust, non-OAuth API that contained the data we needed so we did the best we could with this one.
artistApp.apiUrl2 = "https://www.theaudiodb.com/api/v1/json/1/search.php";
const ulElement = document.getElementById("newArtists");

let newArray = [];
artistApp.getArtists = (artist) => {
  
  const url1 = new URL(artistApp.apiUrl);
  url1.search = new URLSearchParams({
    method: "artist.getSimilar",
    artist: artist,
    api_key: artistApp.apiKey,
    format: "json",
    limit: 4,
    autocorrect: [1]
  });
  fetch(url1)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const artists = data.similarartists.artist;
    
      const dataArray = [];
      for (let i = 0; i < artists.length; i++) {
        dataArray.push(artists[i].name);
      }
      
      const newArtists = dataArray.map((artistImage) => {
        
        return fetch(
          `https://www.theaudiodb.com/api/v1/json/1/search.php/?s=${artistImage}`
        ).then((data) => {
          return data.json();
        });
      });
      
      Promise.all(newArtists).then((secondData) => {
        const artistsToDisplay = [];
      
        secondData.forEach((secondDataChild) => {
          secondDataChild.artists.map((artistThumb) => {
            artistsToDisplay.push({
              name: artistThumb.strArtist,
              imgThumb: artistThumb.strArtistThumb,
              url: `http://${artistThumb.strWebsite}`,
            });
          });
        });
        artistApp.displayArtists(artistsToDisplay);
      })
      .catch(error => {
        alert(`Sorry, that artist can't be found! Try another.`);
      })
    });
};

artistApp.displayArtists = (artistArray) => {

  ulElement.innerHTML = "";
  artistArray.forEach((item) => {

    const listElement = document.createElement("li");
    const artistImage = document.createElement("img");
    const artistName = document.createElement("h3");
    const artistButton = document.createElement("a");
    artistImage.setAttribute("src", item.imgThumb);
    artistImage.setAttribute("alt", `${item.name} Image`);
    artistButton.setAttribute("target", '_blank');
    artistButton.setAttribute('rel', 'noopener');
    artistButton.setAttribute("href", item.url);
    artistName.textContent = item.name;
    artistButton.append("Artist Website");
    listElement.appendChild(artistButton);
    listElement.appendChild(artistName);
    listElement.appendChild(artistImage);
    ulElement.appendChild(listElement);
  });
};

artistApp.getUserInput = () => {
  
  const formElement = document.querySelector("form");

  formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    artist = e.target[0].value;
    artistApp.getArtists(artist);
    document.getElementById("artistInput").value = "";
  });
};

artistApp.init = () => {
  artistApp.getUserInput();
};

artistApp.init();