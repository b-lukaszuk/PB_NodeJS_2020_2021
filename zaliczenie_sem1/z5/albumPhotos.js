const urlAlbumPhotos = "https://jsonplaceholder.typicode.com/photos?albumId=";
const request = require("request");

function getAlbumPhotos(albumId) {
  return new Promise((resolve, reject) => {
    request(urlAlbumPhotos + albumId, (error, response, body) => {
      if (response && response.statusCode === 200) {
        let photos = JSON.parse(body);
        resolve(
          photos.map((photo) => "\t" + photo.title).join((separator = "\n"))
        );
      } else {
        reject(error);
      }
    });
  });
}

module.exports = { getAlbumPhotos: getAlbumPhotos };
