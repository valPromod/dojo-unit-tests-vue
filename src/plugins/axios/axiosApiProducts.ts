import axios from "axios";

const instanceForApi = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL_SHOP,
  headers: {
    "Accept-Language": "fr",
    "ocp-apim-subscription-key": process.env.VUE_APP_FRONT_ESTIMATED_MARKET_SUBSCRIPTION_KEY
  },
});
export default instanceForApi;
