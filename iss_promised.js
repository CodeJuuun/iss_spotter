const needle = require("needle");

//--------------------------------------------------------------
const fetchMyIP = () => {
  const url = "https://api.ipify.org?format=json";

  return needle("get", url) // shorthand of the method you want to use, instead of needle.get you call it like a function and pass in the method as a param
    .then((response) => {
      const body = response.body;
      const ip = body.ip;
      return ip;
    });
};
//--------------------------------------------------------------
const fetchCoordsByIP = (ip) => {
  const url = `http://ipwho.is/${ip}`;
  return needle('get', url)
    .then((response) => {
      const body = response.body; // extract info from the body of response since data is just huge
      const latitude = body.latitude;
      const longitude = body.longitude;
      return { latitude, longitude }; // return both as an object
    });
};

  
//--------------------------------------------------------------
const fetchISSFlyOverTimes = (coords) => {
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return needle("get", url)
    .then((response) => {
      // extract the body from the response
      const body = response.body;
      const passtimes = body.response; //renamed it for better clearer defined variable
      return passtimes;
    });
};
//--------------------------------------------------------------
const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP((ip))
      .then((coords) => fetchISSFlyOverTimes(coords))
      .then((passtimes) => passtimes)
    );
};

module.exports = {nextISSTimesForMyLocation}; //if exporting as an object {} then must be required as an object as well