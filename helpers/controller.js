import axios from "axios";

export const shortenURL = (enteredURL) => {
  return axios.post(`api/shorten-url`, { enteredURL: enteredURL });
};

export const getShortenURL = (shortenedURL) => {
  return axios.get(`http://localhost:3000/api/shorten-url/${shortenedURL}`);
};
