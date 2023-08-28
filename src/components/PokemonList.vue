<script setup>
import { ref, onMounted, watch, inject } from "vue";

import Pokedex from "pokedex-promise-v2";
import analyze from "rgbaster";

import http from "@/http";

import Modal from "@/baseComponents/Modal";
import DefaultCardList from "@/components/DefaultCardList";
import Tabs from "@/components/Tabs";

import EyeIcon from "vue-material-design-icons/EyeOutline";
import PlusIcon from "vue-material-design-icons/Plus";

const swal = inject("$swal");

const emit = defineEmits(["closeMainFilter"]);

const P = new Pokedex();
const loading = ref(true);
const loadingMore = ref(false);
const loadingFilterName = ref(false);
const loadingFilterType = ref(false);
const page = ref(1);
const urlPokemon = ref("pokemon/?limit=20");
const allPokemonsFeteched = ref(false);
const pokemons = ref([]);
const pokemonsName = ref([]);
const quantityPokemons = ref(null);
const tabs = ref(["Stats", "About", "Move"]);
const pokemonNameMoves = ref([]);
const pokemonFiltredMoves = ref([]);
const showModal = ref(false);
const selectedFilterType = ref(null);
const filterTypes = ref([
  {
    id: 0,
    image: require("../assets/images/icons/icon-all.svg"),
    name: "All",
    color: "#3E75C3",
  },
  {
    id: 1,
    image: require("../assets/images/icons/normal.svg"),
    name: "Normal",
    color: "#909090",
  },
  {
    id: 2,
    image: require("../assets/images/icons/fighting.svg"),
    name: "Fighting",
    color: "#C44D61",
  },
  {
    id: 3,
    image: require("../assets/images/icons/flying.svg"),
    name: "Flying",
    color: "#758CBD",
  },
  {
    id: 4,
    image: require("../assets/images/icons/poison.svg"),
    name: "Poison",
    color: "#AC6ACA",
  },
  {
    id: 5,
    image: require("../assets/images/icons/ground.svg"),
    name: "Ground",
    color: "#CE8056",
  },
  {
    id: 6,
    image: require("../assets/images/icons/rock.svg"),
    name: "Rock",
    color: "#84BEB3",
  },
  {
    id: 7,
    image: require("../assets/images/icons/bug.svg"),
    name: "Bug",
    color: "#9BBA48",
  },
  {
    id: 8,
    image: require("../assets/images/icons/ghost.svg"),
    name: "Ghost",
    color: "#616EB7",
  },
  {
    id: 9,
    image: require("../assets/images/icons/steel.svg"),
    name: "Steel",
    color: "#6594A1",
  },
  {
    id: 10,
    image: require("../assets/images/icons/fire.svg"),
    name: "Fire",
    color: "#E96303",
  },
  {
    id: 11,
    image: require("../assets/images/icons/water.svg"),
    name: "Water",
    color: "#4F77BE",
  },
  {
    id: 12,
    image: require("../assets/images/icons/grass.svg"),
    name: "Grass",
    color: "#73B861",
  },
  {
    id: 13,
    image: require("../assets/images/icons/electric.svg"),
    name: "Electric",
    color: "#D4BC34",
  },
  {
    id: 14,
    image: require("../assets/images/icons/psychic.svg"),
    name: "Psychic",
    color: "#EB8B85",
  },
  {
    id: 15,
    image: require("../assets/images/icons/ice.svg"),
    name: "Ice",
    color: "#71BAAC",
  },
  {
    id: 16,
    image: require("../assets/images/icons/dragon.svg"),
    name: "Dragon",
    color: "#2C6AC1",
  },
  {
    id: 17,
    image: require("../assets/images/icons/dark.svg"),
    name: "Dark",
    color: "#595761",
  },
  {
    id: 18,
    image: require("../assets/images/icons/fairy.svg"),
    name: "Fairy",
    color: "#E296E1",
  },
]);

onMounted(() => {
  getPokemons();
});

const props = defineProps({
  openFilter: {
    type: Boolean,
    default: false,
  },
  filterName: {
    type: String,
    default: "",
  },
});

watch(
  () => props.openFilter,
  (val) => {
    if (val && !selectedFilterType.value) {
      const el = document.getElementById(filterTypes.value[0].id);
      el.style.border = `1px solid ${filterTypes.value[0].color}`;
      el.children[0].style.filter = "grayscale(0%)";
      el.children[1].style.color = filterTypes.value[0].color;
      selectedFilterType.value = filterTypes.value[0].id;
    }
  }
);
watch(
  () => props.filterName,
  (val) => {
    if (val) startFilterName(val);
    else stopFilterName();
  }
);

const changeTab = (tab, pokemon) => {
  pokemon.selectedTab = tab;
};

const getPokemons = () => {
  if (loadingMore.value) return;
  if (page.value > 1) loadingMore.value = true;

  http
    .get(urlPokemon.value)
    .then((response) => {
      pokemonsName.value = response?.data?.results.map((pokemon) => {
        return pokemon.name;
      });
      getPokemonsDetails();
      quantityPokemons.value = response?.data?.count;
      urlPokemon.value = response?.data?.next;
      if (response?.data?.next) page.value++;
      else allPokemonsFeteched.value = true;
    })
    .catch((err) => {
      console.log(err);
      errorAlert("Something went wrong, try again later.");
    });
};

const getPokemonsDetails = () => {
  P.getPokemonByName(pokemonsName.value)
    .then((response) => {
      pokemons.value = [
        ...pokemons.value,
        ...Object.values(response).map((pokemon) => {
          const defaultPokemon = {
            id: pokemon.id,
            name: pokemon.name[0].toUpperCase() + pokemon.name.substr(1),
            image: pokemon.sprites.other.dream_world.front_default
              ? pokemon.sprites.other.dream_world.front_default
              : pokemon.sprites.other["official-artwork"].front_default,
            stats: pokemon.stats.map((el) => {
              return { name: el.stat.name, value: el.base_stat };
            }),
            selectedTab: 1,
            moves: pokemon.moves,
            species: getPokemonSpecies(pokemon),
          };
          return defaultPokemon;
        }),
      ];
      pokemons.value.map((el) => {
        if (el.image) getDominantColor(el);
      });
    })
    .catch((err) => {
      console.log(err);
      errorAlert("Something went wrong, try again later.");
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false;
        loadingMore.value = false;
      }, 500);
    });
};

const closeFilterType = () => {
  emit("closeMainFilter");
};

const selectFilterType = (item) => {
  if (selectedFilterType.value === item.id) return;
  if (selectedFilterType.value || selectedFilterType.value == 0)
    cleanCssFilterType(selectedFilterType.value);

  selectedFilterType.value = item.id;
  const el = document.getElementById(selectedFilterType.value);
  el.style.border = `1px solid ${item.color}`;
  el.children[0].style.filter = "grayscale(0%)";
  el.children[1].style.color = item.color;
};

const cleanCssFilterType = (id) => {
  const el = document.getElementById(id);
  el.style.border = "1px solid var(--secondary)";
  el.children[0].style.filter = "grayscale(100%)";
  el.children[1].style.color = "#707070";
};

const confirmFilterType = () => {
  if (loadingFilterType.value) return;

  pokemonsName.value = [];
  pokemons.value = [];
  allPokemonsFeteched.value = true;
  closeFilterType();

  if (selectedFilterType.value == 0) {
    urlPokemon.value = "pokemon/?limit=20";
    page.value = 0;
    allPokemonsFeteched.value = false;
    loading.value = true;
    getPokemons();
    return;
  }

  http
    .get(`type/${selectedFilterType.value}`)
    .then((response) => {
      pokemonsName.value = response?.data?.pokemon.map((el) => {
        return el.pokemon.name;
      });
      loading.value = true;
      getPokemonsDetails();
      quantityPokemons.value = pokemonsName.value.length;
    })
    .catch((err) => {
      console.log(err);
      errorAlert("Something went wrong, try again later.");
    });
};

const startFilterName = (filter) => {
  if (loadingFilterName.value) return;
  loadingFilterName.value = true;
  pokemons.value = [];
  allPokemonsFeteched.value = true;
  getPokemonsDetailsByFilterName(filter);
};

const stopFilterName = () => {
  if (loading.value) return;
  loading.value = true;
  pokemons.value = [];
  urlPokemon.value = "pokemon/?limit=20";
  getPokemons();
  setTimeout(() => {
    allPokemonsFeteched.value = false;
  }, 500);
};

const getPokemonsDetailsByFilterName = (filter) => {
  P.getPokemonByName(filter)
    .then((response) => {
      const defaultPokemon = {
        id: response.id,
        name: response.name[0].toUpperCase() + response.name.substr(1),
        image: response.sprites.other.dream_world.front_default
          ? response.sprites.other.dream_world.front_default
          : response.sprites.other["official-artwork"].front_default,
        stats: response.stats.map((el) => {
          return { name: el.stat.name, value: el.base_stat };
        }),
        selectedTab: 1,
        moves: response.moves,
        species: getPokemonSpecies(response),
      };
      if (defaultPokemon.image) getDominantColor(defaultPokemon);
      pokemons.value.push(defaultPokemon);
      quantityPokemons.value = pokemons.value.length;
    })
    .catch((err) => {
      console.log(err);
      errorAlert("We couldn't find any Pokémon");
      quantityPokemons.value = 0;
    })
    .finally(() => {
      setTimeout(() => {
        loadingFilterName.value = false;
      }, 500);
    });
};

const setStatName = (stat) => {
  switch (stat) {
    case "hp":
      return "HP";
    case "attack":
      return "Attack";
    case "defense":
      return "Defense";
    case "special-attack":
      return "Sp. Attack";
    case "special-defense":
      return "Sp. Defense";
    case "speed":
      return "Speed";

    default:
      return "--";
  }
};

const getPokemonMoves = (pokemonName, pokemonMoves) => {
  if (showModal.value) return;
  pokemonNameMoves.value = pokemonName;
  const arrayMoves = pokemonMoves.map((el) => el.move.name);
  let result = { name: "", effect: "" };
  for (let index = 0; index < arrayMoves.length; index++) {
    const element = arrayMoves[index];
    P.getMoveByName(element)
      .then((response) => {
        result.name = response?.names[7]?.name;
        result.effect = response?.effect_entries[0]?.effect;
        pokemonFiltredMoves.value.push(result);
        result = { name: "", effect: "" };
      })
      .catch((error) => {
        console.log("There was an ERROR: ", error);
      })
      .finally(() => {
        showModal.value = true;
      });
  }
};

const closeModal = () => {
  showModal.value = false;
  pokemonNameMoves.value = "";
  pokemonFiltredMoves.value = [];
};

const getPokemonSpecies = (pokemon) => {
  const result = {
    text: "",
    habitat: "",
    parkEncounters: "",
    shape: "",
    weight: "",
  };
  P.getResource(pokemon.species.url)
    .then((response) => {
      result.text =
        response?.flavor_text_entries.length > 0
          ? response.flavor_text_entries.find((el) => el.language.name == "en")
              .flavor_text
          : "";
      result.habitat = response?.habitat?.name
        ? response.habitat.name
        : "undefined";
      result.parkEncounters = response?.pal_park_encounters[0]?.area?.name
        ? response.pal_park_encounters[0].area.name
        : "undefined";
      result.shape = response?.shape?.name ? response.shape.name : "undefined";
      result.weight = pokemon?.weight ? pokemon.weight / 10 : "undefined";
    })
    .catch((error) => {
      console.log("There was an ERROR: ", error);
    });
  return result;
};

const getDominantColor = async (pokemon) => {
  const result = await analyze(pokemon.image, {
    ignore: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(238, 238, 239)"],
  });
  pokemon.dominantColor = result[0].color;
};

const errorAlert = (msg) => {
  swal.fire({
    position: "center",
    icon: "warning",
    title: "Ops...",
    text: msg,
    showConfirmButton: true,
  });
};
</script>

<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div @click="closeFilterType" v-show="openFilter" class="bg-cover"></div>
  </transition>
  <Modal @close="closeFilterType" v-show="openFilter">
    <template v-slot:title>Filter Pokémon</template>
    <div class="filter-holder">
      <div
        class="filter"
        v-for="item in filterTypes"
        :key="item.id"
        @click="selectFilterType(item)"
        :id="item.id"
      >
        <img :src="item.image" alt="type" />
        <span>{{ item.name }}</span>
      </div>
    </div>
    <div class="flex">
      <div @click="confirmFilterType" class="btn">
        <span v-show="!loadingFilterType">Confirmar</span>
        <div v-show="loadingFilterType" class="loading white"></div>
      </div>
    </div>
  </Modal>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div @click="closeModal" v-show="showModal" class="bg-cover"></div>
  </transition>
  <Modal @close="closeModal" v-show="showModal">
    <template v-slot:title>All {{ pokemonNameMoves }} moves</template>
    <div
      class="move-modal"
      v-for="(move, index) in pokemonFiltredMoves"
      :key="index"
    >
      <span class="title">{{ move.name }}</span>
      <span class="desc">
        {{ move.effect }}
      </span>
    </div>
  </Modal>
  <DefaultCardList
    v-if="loading"
    class="animated fadeInUp"
    style="animation-delay: 600ms"
  />
  <div v-else class="character-holder">
    <div v-show="loadingFilterName" class="loading black"></div>
    <div v-show="!loadingFilterName" class="quantity-holder">
      <img src="../assets/images/icons/icon-poke-red.svg" alt="pokeball" />
      <span>{{ quantityPokemons }} Pokémons</span>
    </div>
    <div v-show="!loadingFilterName" class="cards-holder">
      <div
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        class="card-holder"
        :style="`background-color:${pokemon.dominantColor}`"
      >
        <div class="card-name" :title="pokemon.name">{{ pokemon.name }}</div>
        <div class="card-img">
          <img :src="pokemon.image" alt="image Pokémon" loading="lazy" />
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
            <div v-if="pokemon.selectedTab == 1" class="stats">
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
            <div
              v-if="pokemon.selectedTab == 2"
              class="species-holder style-scrollbar"
            >
              <ul>
                <li><span>Habitat:</span>{{ pokemon.species.habitat }}</li>
                <li>
                  <span>Where to find:</span
                  >{{ pokemon.species.parkEncounters }}
                </li>
                <li><span>Species:</span>{{ pokemon.species.shape }}</li>
                <li><span>Weight:</span>{{ pokemon.species.weight }}kg</li>
              </ul>
              <span class="desc">{{ pokemon.species.text }}</span>
            </div>

            <div v-if="pokemon.selectedTab == 3" class="move-holder">
              <div
                @click="getPokemonMoves(pokemon.name, pokemon.moves)"
                class="btn border icon"
              >
                <span>Check out all moves</span>
                <EyeIcon :size="23" fillColor="#515151" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="!allPokemonsFeteched"
      @click="getPokemons"
      class="btn border icon"
    >
      <span v-show="!loadingMore">Load more Pokémons</span>
      <PlusIcon v-show="!loadingMore" fillColor="#000" />
      <div v-show="loadingMore" class="loading black"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pokebola {
  position: absolute;
  top: -40px;
  left: 10px;
  width: 25px;
  opacity: 0.2;
}
.stats {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 14px 16px;
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
      background: var(--secondary);
      border-radius: 10px;
      .bar {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 100%;
        height: 100%;
        border-radius: 10px;
        background-color: var(--green1);
      }
    }
  }
}
.species-holder {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: flex-start;
  width: 100%;
  height: 100%;
  padding: 14px 16px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex-wrap: wrap;
    li {
      display: flex;
      align-items: center;
      gap: 10px;
      span {
        font-size: 0.85rem;
        font-family: fontBold;
        color: #767676;
      }
      font-size: 0.85rem;
      color: #767676;
    }
  }
  .desc {
    margin-top: 10px;
    font-size: 0.85rem;
    color: #767676;
  }
}
.move-holder {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  .btn {
    margin: 0;
    padding: 8px 12px;
    border: 1px solid #515151;
    span {
      font-size: 0.85rem;
      font-family: fontMedium;
      color: #515151;
    }
    .material-design-icon {
      display: flex;
    }
  }
}
.move-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 0;
  gap: 5px;
  .title {
    font-size: 0.85rem;
    font-family: fontBold;
    color: #767676;
  }
  .desc {
    font-size: 0.85rem;
    color: #767676;
  }
}
</style>
