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
let newArray = [];
artistApp.getArtists = (artist) => {
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
    .then((data) => {
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
      const newArtists = dataArray.map((artistImage) => {
        // console.log(artistImage);
        return fetch(
          `https://www.theaudiodb.com/api/v1/json/1/search.php/?s=${artistImage}`
        ).then((data) => {
          return data.json();
        });
      });
      // console.log(newArtists);
      Promise.all(newArtists).then((secondData) => {
        // console.log(secondData[0].artists[1].strArtistThumb); // a array of 9 similar artists data
        // console.log(secondData[1].artists);
        secondData.forEach((secondDataChild) => {
          secondDataChild.artists.map((artistThumb) => {
            newArray.push({
              name: artistThumb.strArtist,
              imgThumb: artistThumb.strArtistThumb,
              url: artistThumb.strLastFMChart,
            });
            // newArray.push(artistThumb.strArtistThumb + artistThumb.strArtist);
            // console.log(newArray);
          });
          // secondData[0].artists.map((artistThumb) => {
          //     newArray.push(artistThumb.strArtistThumb);
        });
        console.log(newArray);
        artistApp.displayArtists(newArray);
      });
      // console.log(newArray);
      // dataArray.push(newArtists);
      // console.log(dataArray);
    });
  // artistApp.displayArtists(newArray);
  // return newArray;
};
// artistApp.getArtists();
// Display Artists function
artistApp.displayArtists = (artistArray) => {
  // array of objects is looped over
  artistArray.forEach((item) => {
    // create these elements
    const listElement = document.createElement("li");
    const artistImage = document.createElement("img");
    const artistName = document.createElement("h3");
    const artistButton = document.createElement("a");
    artistImage.setAttribute("src", item.imgThumb);
    artistName.textContent = item.name;
    artistButton.setAttribute("href", item.url);
    // Susan's way:
    artistButton.append("Artist Profile");
    //  add list elements to the ul
    listElement.appendChild(artistButton);
    listElement.appendChild(artistName);
    listElement.appendChild(artistImage);
    ulElement.appendChild(listElement);
  });
};
artistApp.getUserInput = () => {

  const formElement = document.querySelector("form");
  // let artist = "";
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

    artistApp.getArtists(artist);

    // console.log(artistObjects);
    // artistApp.displayArtists(artistObjects);
    document.getElementById("artistInput").value = "";
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
