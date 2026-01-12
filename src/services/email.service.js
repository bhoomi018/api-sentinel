const axios = require("axios");
const { EMAIL_API } = require("../config/externalApis");

async function callEmailAPI() {
  const url = `${EMAIL_API.BASE_URL}${EMAIL_API.PATH}`;
  return axios.get(url);
}

module.exports = { callEmailAPI };
