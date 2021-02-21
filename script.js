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
        mbid: '',
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
// console.log(artistArray);

    // document.querySelector('ul').innerHTML = '';

    artistArray.forEach((item) => {
      // console.log(item.name);

      // const artistName = item.name;
      // const image = item.img;

      const listElement = document.createElement("li");
      const artistTitle = document.createElement("h2");
      const artistButton = document.createElement('a');

      artistTitle.textContent = item.name;
      artistButton.setAttribute("href", item.url);

      console.log(artistTitle);
      console.log(artistButton);
      // titleData.artist[0].name
      listElement.appendChild(artistTitle);
      listElement.appendChild(artistButton);

      // ulElement.appendChild(lis/tElement);

      // document.querySelector("newArtist").appendChild(listElement);
    });

}


// create init method
artistApp.init = () => {
    artistApp.getArtists();
}

artistApp.init();



