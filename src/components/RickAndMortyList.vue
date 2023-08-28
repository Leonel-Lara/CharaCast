<script setup>
import { ref, onMounted, watch, inject } from "vue";

import analyze from "rgbaster";

import { httpRickAndMorty } from "@/http";

import Modal from "@/baseComponents/Modal";
import DefaultCardList from "@/components/DefaultCardList";
import Tabs from "@/components/Tabs";

import OpenIcon from "vue-material-design-icons/OpenInNew";
import PlusIcon from "vue-material-design-icons/Plus";

const swal = inject("$swal");

const emit = defineEmits(["closeMainFilter"]);

const loading = ref(false);
const loadingMore = ref(false);
const page = ref(1);
const allCharactersFeteched = ref(false);
const tabs = ref(["About", "Episodes"]);
const characters = ref([]);
const characterNameEpisodes = ref("");
const characterEpisodes = ref([]);
const quantityCharacters = ref(null);
const showModal = ref(false);
const nameFilter = ref("");
const statusFilter = ref("");
const genderFilter = ref("");
const filterStatus = ref([
  { name: "Alive", image: require("../assets/images/icons/happy.svg") },
  { name: "Dead", image: require("../assets/images/icons/dead.svg") },
  { name: "Unknown", image: require("../assets/images/icons/help-green.svg") },
]);
const filterGenders = ref([
  { name: "Female", image: require("../assets/images/icons/female.svg") },
  { name: "Male", image: require("../assets/images/icons/male.svg") },
  {
    name: "Genderless",
    image: require("../assets/images/icons/genderless.svg"),
  },
  { name: "Unknown", image: require("../assets/images/icons/help-blue.svg") },
]);

onMounted(() => {
  getCharacters();
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
  () => props.filterName,
  (val) => {
    nameFilter.value = val;
    allCharactersFeteched.value = false;
    confirmFilter();
  }
);

const changeTab = (tab, character) => {
  character.selectedTab = tab;
};

const getCharacters = () => {
  if (loading.value || loadingMore.value) return;

  if (page.value > 1) loadingMore.value = true;
  else loading.value = true;

  httpRickAndMorty
    .get(
      `character?page=${page.value}&name=${nameFilter.value}&status=${statusFilter.value}&gender=${genderFilter.value}`
    )
    .then((response) => {
      characters.value = [
        ...characters.value,
        ...response?.data?.results.map((character) => {
          const defaultCharacter = {
            id: character.id,
            name: character.name,
            image: character.image,
            selectedTab: 1,
            episodesId: character.episode.map((ep) =>
              ep.substring(ep.lastIndexOf("/") + 1)
            ),
            about: [
              { name: "status", value: character.status },
              { name: "Gender", value: character.gender },
              { name: "Specie", value: character.species },
              { name: "Origin", value: character.origin.name },
              { name: "Location", value: character.location.name },
            ],
          };
          return defaultCharacter;
        }),
      ];
      characters.value.map((el) => getDominantColor(el));
      quantityCharacters.value = response?.data?.info?.count;
      if (response?.data?.info?.next) page.value++;
      else allCharactersFeteched.value = true;
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status == 404) {
        errorAlert("We couldn't find any Pokémon");
        quantityCharacters.value = 0;
        allCharactersFeteched.value = true;
      }
    })
    .finally(() => {
      setTimeout(() => {
        loading.value = false;
        loadingMore.value = false;
      }, 500);
    });
};

const getEpisodes = (characterName, episodesId) => {
  if (showModal.value) return;
  characterNameEpisodes.value = characterName;
  httpRickAndMorty
    .get(`episode/${episodesId}`)
    .then((response) => {
      if (response?.data?.length > 1) characterEpisodes.value = response?.data;
      else characterEpisodes.value.push(response?.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showModal.value = true;
    });
};

const selectFilter = (type, filter) => {
  if (type == "stats")
    statusFilter.value =
      statusFilter.value == filter.toLowerCase() ? "" : filter.toLowerCase();
  else
    genderFilter.value =
      genderFilter.value == filter.toLowerCase() ? "" : filter.toLowerCase();
};

const confirmFilter = () => {
  page.value = 1;
  characters.value = [];
  allCharactersFeteched.value = false;
  getCharacters();
  closeFilter();
};

const closeFilter = () => {
  emit("closeMainFilter");
};

const closeModal = () => {
  showModal.value = false;
  characterNameEpisodes.value = "";
  characterEpisodes.value = [];
};

const getDominantColor = async (character) => {
  const result = await analyze(character.image, {
    ignore: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(238, 238, 239)"],
  });
  character.dominantColor = result[0].color;
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
    <div @click="closeFilter" v-show="openFilter" class="bg-cover"></div>
  </transition>
  <Modal @close="closeFilter" v-show="openFilter">
    <template v-slot:title>Filter characters</template>
    <span class="filter-title">Status</span>
    <div class="filter-holder">
      <div
        v-for="(stats, index) in filterStatus"
        :key="`stats${index}`"
        @click="selectFilter('stats', stats.name)"
        class="filter"
        :class="{ 'stats-active': statusFilter == stats.name.toLowerCase() }"
      >
        <img :src="stats.image" alt="stats" />
        <span>{{ stats.name }}</span>
      </div>
    </div>
    <span class="filter-title">Gender</span>
    <div class="filter-holder">
      <div
        v-for="(gender, index) in filterGenders"
        :key="`gender${index}`"
        @click="selectFilter('gender', gender.name)"
        class="filter"
        :class="{ 'gender-active': genderFilter == gender.name.toLowerCase() }"
      >
        <img :src="gender.image" alt="gender" />
        <span>{{ gender.name }}</span>
      </div>
    </div>

    <div class="flex">
      <div @click="confirmFilter" class="btn">
        <span>Confirmar</span>
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
    <template v-slot:title>All {{ characterNameEpisodes }} episodes</template>
    <ul>
      <li v-for="(episode, index) in characterEpisodes" :key="index">
        <span>{{ episode.name }} -> </span>{{ episode.air_date }} ->
        {{ episode.episode }}
      </li>
    </ul>
  </Modal>
  <DefaultCardList v-if="loading" />
  <div v-else class="character-holder">
    <div class="quantity-holder">
      <img src="../assets/images/portal.png" alt="portal" />
      <span>{{ quantityCharacters }} Characters</span>
    </div>
    <div class="cards-holder">
      <div
        v-for="character in characters"
        :key="character.id"
        class="card-holder"
        :style="`background-color:${character.dominantColor}`"
      >
        <div class="card-name" :title="character.name">
          {{ character.name }}
        </div>
        <div class="card-img">
          <img :src="character.image" alt="imagem" />
        </div>
        <div class="details-holder">
          <img class="portal" src="@/assets/images/portal.png" alt="portal" />
          <Tabs
            :character="character"
            :tabs="tabs"
            :selectedTab="character.selectedTab"
            :tabColor="character.dominantColor"
            @setActiveTab="changeTab"
          />
          <div class="details">
            <div
              v-if="character.selectedTab == 1"
              class="about style-scrollbar"
            >
              <ul>
                <li v-for="(item, index) in character.about" :key="index">
                  <span>{{ item.name }}:</span>{{ item.value }}
                </li>
              </ul>
            </div>
            <div
              v-if="character.selectedTab == 2"
              class="episode-holder style-scrollbar"
            >
              <div
                @click="getEpisodes(character.name, character.episodesId)"
                class="btn border icon"
              >
                <span>Check out all episodes</span>
                <OpenIcon :size="20" fillColor="#515151" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="!allCharactersFeteched"
      @click="getCharacters"
      class="btn border icon"
    >
      <span v-show="!loadingMore">Ver mais</span>
      <PlusIcon v-show="!loadingMore" fillColor="#000" />
      <div v-show="loadingMore" class="loading black"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-title {
  font-family: fontRegular;
  font-size: 1rem;
}
.filter-holder {
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  padding-bottom: 1.2rem;
  .filter {
    img {
      width: 28px;
    }
    &.stats-active {
      border: 1px solid var(--green1);
      img {
        filter: grayscale(0%);
      }
      span {
        color: var(--green1);
      }
    }
    &.gender-active {
      border: 1px solid #7bb1de;
      img {
        filter: grayscale(0%);
      }
      span {
        color: #7bb1de;
      }
    }
  }
}
.quantity-holder {
  img {
    position: relative;
    width: 35px;
  }
}
.card-img {
  border-radius: 50%;
  img {
    border-radius: 50%;
  }
}
.about {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: flex-start;
  width: 100%;
  height: 100%;
  padding: 14px 16px;
}
.episode-holder {
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

.portal {
  position: absolute;
  top: -40px;
  left: 10px;
  width: 35px;
  opacity: 0.6;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-wrap: wrap;
  li {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    span {
      font-size: 0.85rem;
      font-family: fontBold;
      color: #767676;
      margin-right: 10px;
    }
    font-size: 0.85rem;
    color: #767676;
  }
}
</style>
