// // main fetch function
// const {fetchMyIP} = require("./iss");
// const {fetchCoordsByIP} = require("./iss");
// const {fetchISSFlyOverTimes} = require("./iss");
const {nextISSTimesForMyLocation} = require("./iss");
//-------------------------------------------
// const ip = "64.228.242.100";
// fetchMyIP((error, ip) => {
//   if (error) { // checks if error is truthy
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP: ", ip);
// });

// // //-------------------------------------------
// fetchCoordsByIP(ip, (error, data) => {
//   if (error) {
//     console.log("It did not work!", error);
//     return;
//   }

//   console.log("It worked. Received data:" , data);
// });

//-------------------------------------------

// const coords = {
//   latitude: '49.27670',
//   longitude: '-123.13000',
// };

// fetchISSFlyOverTimes(coords, (error, data) => {
//   if (error) {
//     console.log("It did not worked", error);
//     return;
//   }

//   console.log("It worked. Received data: ", data);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  console.log(passTimes);
});