import axios from "axios";

export const shortenURL = (enteredURL) => {
  return axios.post(`api/shorten-url`, { enteredURL: enteredURL });
};

export const getShortenURL = (shortenedURL) => {};
