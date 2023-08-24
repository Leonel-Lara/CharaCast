<script setup>
import { ref } from "vue";

import BannerList from "@/baseComponents/BannerList";
import Menu from "@/baseComponents/Menu";
import Form from "@/baseComponents/Form";
import PokemonList from "@/components/PokemonList";
import RickAndMortyList from "@/components/RickAndMortyList";

import ArrowIcon from "vue-material-design-icons/ArrowUpBold";

const bannerToShow = ref(0);
const openFilter = ref(false);
const filterName = ref("");
const banners = ref([
  require("../assets/images/pokemon.png"),
  require("../assets/images/rick-and-morty.png"),
]);

const changedBanner = (indexBanner) => {
  bannerToShow.value = indexBanner;
};

const startFilterCharacterName = (name) => {
  filterName.value = name;
};
const stopFilterCharacterName = (name) => {
  filterName.value = name;
};

const openMainFilter = () => {
  openFilter.value = true;
};
const closeMainFilter = () => {
  openFilter.value = false;
};

const goTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div class="divider"></div>
    <Form />
    <div @click="goTop" class="button-top">
      <ArrowIcon fillColor="#fff" :size="24" />
    </div>
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
.button-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 45px;
  height: 45px;
  border-radius: 100%;
  background-color: var(--green1);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  transition: transform 0.25s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
  }
  .material-design-icon {
    display: flex;
  }
}
</style>
