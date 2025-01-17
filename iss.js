// contains logic for fetching data from each API endpoint

const needle = require("needle");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  const url = "https://api.ipify.org?format=json";
  // console.log(myIP)

  needle.get(url, (error, response, body) => { // Make a GET request to the IP
    // code will be used to check for errors
    // first set of checks before we try to parse body
    if (error) {
      return callback(error, null); // return error and stop running code
    }

    if (response.statusCode !== 200) { // check if server responded with a non 200 code
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = body.ip;
    callback(null, ip);
  });
};
//----------------------------------------------------------
/**
 * @param {string} ip
 */
const fetchCoordsByIP = (ip, callback) => {
  const url = `http://ipwho.is/${ip}`;

  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // first check if the body data is a string, if so, convert JSON data into object via json.parse()
    let jsonParsedBody;
    if (typeof body === 'string') {
      jsonParsedBody = JSON.parse(body);
    } else {
      jsonParsedBody = body; // if its already an object, just use it as is
    }

    if (!jsonParsedBody.success) {
      const msg = `Success status was ${jsonParsedBody.success}. Server message says: ${jsonParsedBody.message} when fetching for IP ${jsonParsedBody.ip}`;
      callback(msg, null); // Return the message directly as a string
      return;
    }
    // check if longitude and latitude even exists in the response via an object and extract it
    if (jsonParsedBody.latitude && jsonParsedBody.longitude) {
      const coordinates = {
        latitude: jsonParsedBody.latitude,
        longitude: jsonParsedBody.longitude
      };
      callback(null, coordinates); // passing back
    } else {
      callback("Coordinates not found", null);
    }
  });
  
};

//----------------------------------------------------------

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
*/

const fetchISSFlyOverTimes = (coords, callback) => {

  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode}. Response: ${response.body}`;
      callback(Error(msg), null);
      return;
    }

    let jsonParsedBody;
    if (typeof body === 'string') {
      jsonParsedBody = JSON.parse(body);
    } else {
      jsonParsedBody = body; // if its already an object, just use it as is
    }

    if (!jsonParsedBody.response) {
      const msg = "No response field in the body";
      callback(Error(msg), null);
      return;
    }

    const passes = jsonParsedBody.response;
    callback(null, passes);
  });
};

//----------------------------------------------------------------------

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    console.log("IP fetched:", ip);

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      
      console.log("Coordinates fetched:", coords);

      fetchISSFlyOverTimes(coords, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        console.log("ISS Flyover times fetched:", nextPasses);
        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation }; //curly braces means it's exporting more than one value as a single object, or possibly more values later
