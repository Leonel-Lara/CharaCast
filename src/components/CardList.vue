<script setup>
import { ref } from "vue";

import Pokedex from "pokedex-promise-v2";
import analyze from "rgbaster";

import http from "@/http";

import Tabs from "@/components/Tabs";

const pokemons = ref([]);
const pokemonsName = ref([]);
const tabs = ref(["About", "Stats", "Moves", "Evolution"]);
const selectedTab = ref(1);
const P = new Pokedex();

const changeTab = (tab) => {
  selectedTab.value = tab;
};

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

const getDominantColor = async (imgPokemon, index) => {
  const result = await analyze(imgPokemon, {
    ignore: ["rgb(255,255,255)", "rgb(0,0,0)"],
  });
  pokemons.value[index].dominantColor = result[0].color;
};
</script>

<template>
  <div class="cards-holder">
    <div
      v-for="(pokemon, index) in pokemons"
      :key="pokemon.id"
      class="card-holder"
      :style="`background-color:${pokemon.dominantColor}`"
    >
      <div class="card-name">{{ pokemon.name }}</div>
      <div class="card-img">
        <img
          @load="
            getDominantColor(
              pokemon.sprites.other.dream_world.front_default,
              index
            )
          "
          :src="pokemon.sprites.other.dream_world.front_default"
          alt="imagem pokemon"
        />
      </div>
      <div class="details-holder">
        <Tabs
          :tabs="tabs"
          :selectedTab="selectedTab"
          :tabColor="pokemon.dominantColor"
          @setActiveTab="changeTab"
        />
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
    color: #fff;
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
    height: 180px;
    background-color: #fff;
    border-radius: 20px 20px 12px 12px;
  }
}
</style>
