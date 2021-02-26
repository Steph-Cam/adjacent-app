const artistApp = {};

// LastFM API
artistApp.apiUrl = "https://ws.audioscrobbler.com/2.0/";
artistApp.apiKey = "e35219e4872d0f1dcee255f3768714bb";

// AudioDB API
artistApp.apiUrl2 = "https://www.theaudiodb.com/api/v1/json/1/search.php";

const ulElement = document.getElementById("newArtists");


// const url2 = new URL(artistApp.apiUrl2);
// url2.search = new URLSearchParams({
//   s: "cave in",
// });

artistApp.getArtists = (artist) => {
  let newArray = [];
    // console.log('hello');
    const url1 = new URL(artistApp.apiUrl);
    url1.search = new URLSearchParams({
        method: "artist.getSimilar",
        artist: artist,
        api_key: artistApp.apiKey,
        format: "json",
        limit: 5,
        // autocorrect: [1]
    });

    fetch(url1)
        .then((response) => {
            return response.json();
        })
        .then(data => {
            const artists = data.similarartists.artist;
            // console.log(artists);

            const dataArray = [];
            for (let i = 0; i < artists.length; i++) {
                dataArray.push(artists[i].name);
                // dataArray.push(artists[i].url);
            }
            // console.log(dataArray);
            // similar to the pokemon example where we had a array of URLS, you now have an array of artist names
            // that can be mapped over to send a fetch request for each one
            const newArtists = dataArray.map(artistImage => {
                // console.log(artistImage);
                return fetch(`https://www.theaudiodb.com/api/v1/json/1/search.php/?s=${artistImage}`)
                    .then(data => {
                        return data.json();
                    })
            });
            
            // console.log(newArtists);
            Promise.all(newArtists)
                .then(secondData => {
                    // console.log(secondData[0].artists[1].strArtistThumb); // a array of 9 similar artists data
                    // console.log(secondData[1].artists);
                    secondData.map(secondDataChild => {
                      secondDataChild.artists.map((artistThumb) => {
                        newArray.push(
                          artistThumb.strArtistThumb); 
                        // newArray.push(artistThumb.strArtistThumb + artistThumb.strArtist); 
                        // console.log(newArray);
                    })
                    // secondData[0].artists.map((artistThumb) => {
                    //     newArray.push(artistThumb.strArtistThumb);
                        
                      })
        })
        // console.log(newArray);
        
        // dataArray.push(newArtists);
        // console.log(dataArray);
      })
      
      // artistApp.displayArtists(dataArray);
      return newArray;
}
// artistApp.getArtists();


// Display Artists function

artistApp.displayArtists = (artistObjects) => {
console.log(artistObjects);

  artistObjects.map();
  const artistImage = document.createElement("img"); 
  artistImage.setAttribute("href", item.url);


  // turn artistObjects into an object


  artistObjects.forEach((item) => {
    console.log(item);

    const listElement = document.createElement("li");
    // const searchArtist = document.createElement("h2")
    const artistName = document.createElement("h3");
    const artistButton = document.createElement("a");
    

    artistName.textContent = item.name;
    // first attemp:
    //   artistButton.setAttribute("href", item.url);
    artistButton.setAttribute("href", item.url);

    // Cam's probably sketchy way:
    // artistButton.innerText = 'Artist Profile';

    // Susan's way:
    artistButton.append("Artist Profile");

    // console.log(artistName);
    // console.log(artistButton);

    listElement.appendChild(artistName);
    listElement.appendChild(artistButton);

    //  add list elements to the ul
    ulElement.appendChild(listElement);
  });
};

artistApp.getUserInput = () => {
    const formElement = document.querySelector("form");

    let artist = '';
    // attach event listener to get info on submit
    formElement.addEventListener("submit", function (e) {
        e.preventDefault();

        artist = e.target[0].value;
        // console.log(artist);





        // console.log(e);

        // clear out results section before adding new results
        ulElement.innerHTML = "";

        // get the value of what the user submits in form
        // const artist = formElement.value;

        // // alert user if they enter an empty string

        // // const artistResults = e.artists[0].strArtist;
        // // console.log(artistResults);

        // // clear out the search field upon submission
        // // call getArtists function by passing in the value
        let artistObjects = artistApp.getArtists(artist);
        // console.log(artistObjects);
        artistApp.displayArtists(artistObjects);
        // document.getElementById("artistInput").value = "";
        // console.log(artist);
    });
    // console.log(artist);
    // return artist;
};

// create init method
artistApp.init = () => {
    artistApp.getUserInput();
    // console.log(artist);
    // artistApp.displayArtists();
    // if (artist.length > 0) {
    //   console.log(artist);
    //   artistApp.getArtists(artist);

    // };
};

artistApp.init();
