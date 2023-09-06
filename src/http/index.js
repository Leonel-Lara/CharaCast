import axios from "axios";

const endpoint = "https://rickandmortyapi.com/api";

const http = axios.create({
  baseURL: endpoint,
});

export default http;
