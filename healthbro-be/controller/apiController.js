const axios = require("axios");

const baseURI = `https://api.spoonacular.com/`;

/**
 * description
 * @date 2021-09-18
 * @param {string} query
 * @returns {object}
 */
const apiController = async (query) => {
  const url = baseURI + query + `&apiKey=${process.env.API_KEY}`;

  const result = await axios.get(url);

  return result.data;
};

module.exports = apiController;
