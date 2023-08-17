import axios from "axios";

const endpoint = "https://pokeapi.co/api/v2/";

const http = axios.create({
  baseURL: endpoint,
});

const httpRickAndMorty = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export { httpRickAndMorty };
export default http;
