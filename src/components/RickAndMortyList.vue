<script setup>
import { ref, onMounted } from "vue";

import analyze from "rgbaster";

import { httpRickAndMorty } from "@/http";

import DefaultCardList from "@/components/DefaultCardList";
import Tabs from "@/components/Tabs";

import PlusIcon from "vue-material-design-icons/Plus";

const loading = ref(true);
const loadingMore = ref(false);
const page = ref(1);
const allCharactersFeteched = ref(false);
const tabs = ref(["About", "Episodes"]);
const characters = ref([]);

onMounted(() => {
  getCharacters();
});

const changeTab = (tab, character) => {
  character.selectedTab = tab;
};

const getCharacters = () => {
  if (loadingMore.value) return;
  if (page.value > 1) loadingMore.value = true;

  httpRickAndMorty
    .get("character?page=1")
    .then((response) => {
      characters.value = [
        ...characters.value,
        ...response?.data?.results.map((character) => {
          const defaultCharacter = {
            id: character.id,
            name: character.name,
            image: character.image,
            selectedTab: 1,
            status: [
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
      if (response?.data?.info?.next) page.value++;
      else allCharactersFeteched.value = true;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const getDominantColor = async (character) => {
  const result = await analyze(character.image, {
    ignore: ["rgb(255,255,255)", "rgb(0,0,0)", "rgb(238, 238, 239)"],
  });
  character.dominantColor = result[0].color;
};
</script>

<template>
  <DefaultCardList v-if="loading" />
  <div v-else class="character-holder">
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
              class="status style-scrollbar"
            >
              <ul>
                <li v-for="(item, index) in character.status" :key="index">
                  <span>{{ item.name }}:</span>{{ item.value }}
                </li>
              </ul>
            </div>
            <div
              v-if="character.selectedTab == 2"
              class="move style-scrollbar"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div @click="getCharacters" class="btn border icon">
      <span v-show="!loadingMore">Ver mais</span>
      <PlusIcon v-show="!loadingMore" fillColor="#000" />
      <div v-show="loadingMore" class="loading black"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.character-holder {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  .btn {
    margin: 40px auto 0 auto;
  }
}
.cards-holder {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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
    width: 90%;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    cursor: default;
  }
  .card-img {
    position: relative;
    bottom: -10px;
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    border-radius: 50%;
    img {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
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
    .portal {
      position: absolute;
      top: -40px;
      left: 10px;
      width: 35px;
      opacity: 0.6;
    }
    .details {
      position: relative;
      width: 100%;
      height: 77%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      .status {
        position: relative;
        display: flex;
        flex-direction: column;
        text-align: flex-start;
        width: 100%;
        height: 100%;
        padding: 16px;
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
      }
      .move {
        position: relative;
        display: flex;
        flex-direction: column;
        text-align: flex-start;
        width: 100%;
        height: 100%;
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
    }
  }
}
</style>
