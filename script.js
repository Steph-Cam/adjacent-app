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
        console.log(data)
        artistApp.displayArtists(data);
    })
}

artistApp.displayArtists = (artistData) => {

    const ulElement = document.querySelector('ul').innerHTML = '';

    artistData.forEach((titleData) => {
        const listElement = document.createElement('li');

        const artistTitle = document.createElement('h2');

        artistTitle.textContent = titleData.similarartists[artist].name;

        // titleData.artist[0].name

        
        // listElement.appendChild(artistTitle);
        
        // ulElement.appendChild(listElement);
        
        // console.log(artistTitle);
    });

}


// create init method
artistApp.init = () => {
    artistApp.getArtists();
}

artistApp.init();



