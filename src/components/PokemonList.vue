<script setup>
import { ref } from "vue";

import Pokedex from "pokedex-promise-v2";
import analyze from "rgbaster";

import http from "@/http";

import DefaultCardList from "@/components/DefaultCardList";
import Tabs from "@/components/Tabs";

const loading = ref(true);
const pokemons = ref([]);
const pokemonsName = ref([]);
const tabs = ref(["About", "Stats", "Moves", "Evolution"]);
const P = new Pokedex();

const changeTab = (tab, pokemon) => {
  pokemon.selectedTab = tab;
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
      pokemons.value = Object.values(response).map((pokemon) => {
        const defaultPokemon = {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other.dream_world.front_default,
          stats: pokemon.stats.map((el) => {
            return { name: el.stat.name, value: el.base_stat };
          }),
          selectedTab: 2,
        };
        return defaultPokemon;
      });
      pokemons.value.map((el) => getDominantColor(el));
    })
    .catch((err) => {
      console.log(err);
      // fieldRequiredAlert("Algo deu errado, tente novamente mais tarde.");
    })
    .finally(() => {
      loading.value = false;
    });
};

const setStatName = (stat) => {
  switch (stat) {
    case "hp":
      return "HP";
    case "attack":
      return "Attack";
    case "defense":
      return "Defence";
    case "special-attack":
      return "Sp. Attack";
    case "special-defense":
      return "Sp. Defence";
    case "speed":
      return "Speed";

    default:
      return "--";
  }
};

const getDominantColor = async (pokemon) => {
  const result = await analyze(pokemon.image, {
    ignore: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(238, 238, 239)"],
  });
  pokemon.dominantColor = result[0].color;
};
</script>

<template>
  <DefaultCardList v-if="loading" />
  <div v-else class="cards-holder">
    <div
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      class="card-holder"
      :style="`background-color:${pokemon.dominantColor}`"
    >
      <div class="card-name">{{ pokemon.name }}</div>
      <div class="card-img">
        <img :src="pokemon.image" alt="imagem pokemon" />
      </div>
      <div class="details-holder">
        <img
          class="pokebola"
          src="@/assets/images/pokebola.webp"
          alt="pokebola"
        />
        <Tabs
          :character="pokemon"
          :tabs="tabs"
          :selectedTab="pokemon.selectedTab"
          :tabColor="pokemon.dominantColor"
          @setActiveTab="changeTab"
        />
        <div class="details">
          <div v-if="pokemon.selectedTab == 2" class="stats">
            <div
              class="item-holder"
              v-for="(stat, index) in pokemon.stats"
              :key="index"
            >
              <span>
                {{ setStatName(stat.name) }}
              </span>
              <div class="bar-holder">
                <div
                  :title="`${stat.value}%`"
                  class="bar"
                  :style="`background-color:${pokemon.dominantColor};width:${stat.value}%`"
                ></div>
              </div>
            </div>
          </div>
        </div>
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
  height: 440px;
  background-color: var(--green1);
  border-radius: 12px;
  box-shadow: var(--box-shadow-default);
  padding-top: 1.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .card-name {
    text-align: center;
    color: #fff;
    font-size: 1.6rem;
  }
  .card-img {
    position: relative;
    bottom: -8px;
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    margin-top: 1rem;
    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .details-holder {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 220px;
    background-color: #fff;
    border-radius: 20px 20px 12px 12px;
    .pokebola {
      position: absolute;
      top: -40px;
      left: 10px;
      width: 25px;
      opacity: 0.2;
    }
    .details {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 16px;

      .stats {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        .item-holder {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 12px;
          span {
            font-size: 0.8rem;
            color: #767676;
            font-family: fontMedium;
          }
          .bar-holder {
            position: relative;
            width: 60%;
            height: 100%;
            background: var(--primary);
            border-radius: 10px;
            .bar {
              position: absolute;
              top: 0;
              left: 0;
              max-width: 100%;
              height: 100%;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
