import axios from "axios";
import { domain } from "../config/index";

export const shortenURL = (enteredURL) => {
  return axios.post(`api/shorten-url`, { enteredURL: enteredURL });
};

export const getShortenURL = (shortenedURL) => {
  return axios.get(`${domain}api/shorten-url/${shortenedURL}`);
};
