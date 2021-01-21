const urlUser = "https://jsonplaceholder.typicode.com/users/";
const request = require("request");

function getUsrEmail(usrId) {
  return new Promise((resolve, reject) => {
    request(urlUser + usrId, (error, response, body) => {
      if (response && response.statusCode === 200) {
        resolve(JSON.parse(body).email);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = { getUsrEmail: getUsrEmail };
