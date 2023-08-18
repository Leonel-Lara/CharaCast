<script setup>
import { ref } from "vue";

import BannerList from "@/components/BannerList";
import Menu from "@/baseComponents/Menu";
import PokemonList from "@/components/PokemonList";
import RickAndMortyList from "@/components/RickAndMortyList";

const bannerToShow = ref(0);

const banners = ref([
  require("../assets/images/pokemon.png"),
  require("../assets/images/rick-and-morty.png"),
]);

const changedBanner = (indexBanner) => {
  bannerToShow.value = indexBanner;
  console.log(bannerToShow.value);
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
    <Menu class="animated zoomIn" style="animation-delay: 400ms" />
    <PokemonList v-if="bannerToShow == 0" />
    <RickAndMortyList v-if="bannerToShow == 1" />
  </div>
</template>

<style lang="scss" scoped>
.banner-list {
  position: relative;
  width: 100%;
  object-fit: cover;
}
</style>
