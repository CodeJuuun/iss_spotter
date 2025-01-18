const {nextISSTimesForMyLocation}= require("./iss_promised"); // if exported as an object, then must be importede here as an object as well

const {printPassTimes} = require("./index");
//--------------------------------------------------------------
// fetchMyIP()
// // pass in the returned value that we wanted (IP address) as argument as well as fetchCoordsByIP
//   .then((ip) => {
//     return fetchCoordsByIP(ip);
//   })
//   .then((coords) => {
//     return fetchISSFlyOverTimes(coords);
//   })
//   .then((body) => {
//     console.log(body);
//   })
//--------------------------------------------------------------

nextISSTimesForMyLocation()
  .then((passtimes) => {printPassTimes(passtimes);
  })
