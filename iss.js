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

  needle.get(url, (error, res, body) => { // Make a GET request to the IP
    // code will be used to check for errors
    // first set of checks before we try to parse body
    if (error) {
      return callback(error, null); // return error and stop running code
    }

    if (res.statusCode !== 200) { // check if server responded with a non 200 code
      const msg = `Status code ${res.statusCode} when fetching IP. Response: ${body}`;
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

  needle.get(url, (error, res, body) => {
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
module.exports = { fetchMyIP, fetchCoordsByIP }; //curly braces means it's exporting more than one value as a single object, or possibly more values later

