import axios from "axios";

const endpoint = "https://pokeapi.co/api/v2/";

const http = axios.create({
  baseURL: endpoint,
});

export default http;
