// import modules
const userModule = require("./user.js");
const userAlbums = require("./albums.js");
const albumPhotos = require("./albumPhotos.js");

// get functions from modules
const getUsrEmail = userModule.getUsrEmail;
const getUsrAlbums = userAlbums.getUsrAlbums;
const getAlbumPhotos = albumPhotos.getAlbumPhotos;

const userId = 1;

getUsrEmail(userId)
  .then((response) => {
    console.log("user email: " + response);
  })
  .catch((error) => console.log(error));

getUsrAlbums(userId)
  .then((response) => {
    console.log("No of albums: " + response.length);
    getAlbumPhotos(response[0])
      .then((response) => console.log("Album photos:\n" + response))
      .catch((err) => console.log(err));
  })
  .catch((error) => console.log(error));
