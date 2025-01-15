// // main fetch function
const {fetchMyIP} = require("./iss");
// const {fetchCoordsByIP} = require("./iss");

//-------------------------------------------
const ip = "64.228.242.100";
fetchMyIP((error, ip) => {
  if (error) { // checks if error is truthy
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP: ", ip);
});

//-------------------------------------------
// fetchCoordsByIP(ip, (error, data) => {
//   if (error) {
//     console.log("It did not work!", error);
//     return;
//   }

//   console.log("It worked. Received data:" , data);
// });