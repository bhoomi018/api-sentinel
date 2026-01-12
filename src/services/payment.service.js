const axios = require("axios");
const { PAYMENT_API } = require("../config/externalApis");

async function callPaymentAPI() {
  const url = `${PAYMENT_API.BASE_URL}${PAYMENT_API.PATH}`;
  return axios.get(url);
}

module.exports = { callPaymentAPI };
