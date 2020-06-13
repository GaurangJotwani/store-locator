import axios from "axios";

const URL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com";

export default axios.create({
  baseURL: URL,
  headers: {
    Authorization: process.env.REACT_APP_YELP_API_KEY,
  },
});
