
const url = new URL('https://ws.audioscrobbler.com/2.0/');
url.search = new URLSearchParams({
    method: 'artist.getSimilar',
    artist: 'kayne',
    api_key: 'e35219e4872d0f1dcee255f3768714bb',
    format: 'json'
})

fetch(url)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data)
})





// const url = new URL('http://ws.audioscrobbler.com/2.0/?method=artist.getSimilar');


// url.search = new URLSearchParams({
//     limit: 9,
//     artist: '',
//     match: 1,
//     api_key:'e35219e4872d0f1dcee255f3768714bb',
// })

// // console.log(url);

// fetch(url)
// .then(function (response) {
//     return response.json();
// })
// .then(function (jsonResponse) {
//     console.log(jsonResponse)
// })