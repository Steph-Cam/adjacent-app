const artistApp = {};

artistApp.apiUrl = "https://ws.audioscrobbler.com/2.0/";
artistApp.apiKey = "e35219e4872d0f1dcee255f3768714bb";

artistApp.getArtists = () => {

    const url = new URL(artistApp.apiUrl);
    url.search = new URLSearchParams({
        method: 'artist.getSimilar',
        artist: 'kanye',
        api_key: artistApp.apiKey,
        format: 'json',
        limit: 9,
        // autocorrect: [1]
    })
    
    fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      // console.log(data);

      const artistDataArray = Object.entries(data);
      console.log(artistDataArray);

      // artistApp.displayArtists(artistDataArray);
    })

  
}

artistApp.displayArtists = (artistData) => {

    document.querySelector('ul').innerHTML = '';

    artistData.forEach((item) => {
      const listElement = document.createElement("li");

      const artistTitle = document.createElement("h2");

      artistTitle.textContent = item[1].artist[0].name;

      console.log(artistTitle);
      // titleData.artist[0].name

      listElement.appendChild(artistTitle);

      ulElement.appendChild(listElement);

      // document.querySelector("newArtist").appendChild(listElement);
    });

}


// create init method
artistApp.init = () => {
    artistApp.getArtists();
}

artistApp.init();



