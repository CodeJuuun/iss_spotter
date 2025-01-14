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
  const myIP = "https://api.ipify.org?format=json";
  // console.log(myIP)

  needle.get(myIP, (error, res, body) => {
    // code will be used to check for errors
    // first set of checks before we try to parse body
    if (error) {
      return callback(error, null);
    }

    if (res.statusCode !== 200) {
      const msg = `Status code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = body.ip;
    callback(null, ip)
  });
};

module.exports = { fetchMyIP }; //curly braces means it's exporting more than one value as a single object, or possibly more values later