<script setup>
import { ref } from "vue";

import BannerList from "@/components/BannerList";
import Menu from "@/baseComponents/Menu";
import PokemonList from "@/components/PokemonList";
import RickAndMortyList from "@/components/RickAndMortyList";

const bannerToShow = ref(0);
const openFilter = ref(false);
const filterName = ref("");
const banners = ref([
  require("../assets/images/pokemon.png"),
  require("../assets/images/rick-and-morty.png"),
]);

const changedBanner = (indexBanner) => {
  bannerToShow.value = indexBanner;
  console.log(bannerToShow.value);
};

const startFilterCharacterName = (name) => {
  filterName.value = name;
};
const stopFilterCharacterName = (name) => {
  filterName.value = "";
};

const openMainFilter = () => {
  openFilter.value = true;
};
const closeMainFilter = () => {
  openFilter.value = false;
};
</script>

<template>
  <BannerList
    class="banner-list animated fadeInDown"
    style="animation-delay: 200ms"
    :banners="banners"
    @changedBanner="changedBanner"
  />
  <div class="container">
    <Menu
    @startFilterCharacterName="startFilterCharacterName"
    @stopFilterCharacterName="stopFilterCharacterName"
    @openFilter="openMainFilter"
    class="animated zoomIn"
    style="animation-delay: 400ms"
    />
    <PokemonList
      v-if="bannerToShow == 0"
      :filterName="filterName"
      :openFilter="openFilter"
      @closeMainFilter="closeMainFilter"
    />
    <RickAndMortyList
      v-if="bannerToShow == 1"
      :filterName="filterName"
      :openFilter="openFilter"
      @closeMainFilter="closeMainFilter"
    />
  </div>
</template>

<style lang="scss" scoped>
.banner-list {
  position: relative;
  width: 100%;
  object-fit: cover;
  @media only screen and (max-width: 720px) {
    height: 145px;
  }
}
</style>
