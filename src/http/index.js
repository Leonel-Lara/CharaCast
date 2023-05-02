import axios from "axios";

let endpoint = "https://rickandmortyapi.com/api/";

const http = axios.create({
  baseURL: endpoint,
});

export default http;
