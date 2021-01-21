const urlAlbums = "https://jsonplaceholder.typicode.com/albums?userId=";
const request = require("request");

function getUsrAlbums(usrId) {
  return new Promise((resolve, reject) => {
    request(urlAlbums + usrId, (error, response, body) => {
      if (response && response.statusCode === 200) {
        let albums = JSON.parse(body);
        // zwrocimy sama tablice z id albumow
        resolve(albums.map((album) => album.id));
      } else {
        reject(error);
      }
    });
  });
}

module.exports = { getUsrAlbums: getUsrAlbums };
