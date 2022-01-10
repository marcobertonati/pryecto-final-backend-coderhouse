const axios = require("axios");

module.exports = async function prefixService() {
    // API CREATED BY: https://github.com/marcelo-u
  const response = await axios.get(
    "https://api-prefixes.herokuapp.com/api/prefixes"
  );
  const result = response.data;
  return result.prefix;
};
