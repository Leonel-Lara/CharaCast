<script setup>
import { ref } from "vue";

import Pokedex from "pokedex-promise-v2";

import http from "@/http";

import Tabs from "@/components/Tabs";

const pokemons = ref([]);
const pokemonsName = ref([]);
const P = new Pokedex();

http
  .get("pokemon/?limit=18")
  .then((response) => {
    pokemonsName.value = response?.data?.results.map((pokemon) => {
      return pokemon.name;
    });
    getPokemonsDetails();
  })
  .catch((err) => {
    console.log(err);
  });

const getPokemonsDetails = () => {
  P.getPokemonByName(pokemonsName.value)
    .then((response) => {
      pokemons.value = response;
    })
    .catch((err) => {
      console.log(err);
      // fieldRequiredAlert("Algo deu errado, tente novamente mais tarde.");
    });
};
</script>

<template>
  <div class="cards-holder">
    <div class="card-holder" v-for="pokemon in pokemons" :key="pokemon.id">
      <div class="card-name">{{ pokemon.name }}</div>
      <div class="card-img">
        <img
          :src="pokemon.sprites.other.dream_world.front_default"
          alt="imagem pokemon"
        />
      </div>
      <div class="details-holder">
        <Tabs />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cards-holder {
  position: relative;
  width: 100%;
  margin-top: 40px;
  display: grid;
  grid-template-columns: 260px 260px 260px;
  justify-content: space-between;
  gap: 4em;
  @media only screen and (max-width: 720px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

.card-holder {
  position: relative;
  height: 390px;
  background-color: var(--green1);
  border-radius: 12px;
  box-shadow: var(--box-shadow-default);
  padding: 1.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  .card-name {
    text-align: center;
    color: #eee;
    font-size: 1.6em;
  }
  .card-img {
    position: relative;
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    margin-top: 1.2em;
    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .details-holder {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 200px;
    background-color: #fff;
    border-radius: 20px 20px 12px 12px;
  }
}
</style>
