<script setup>
import { ref } from "vue";

import BannerList from "@/components/BannerList";
import Menu from "@/components/Menu";
import PokemonList from "@/components/PokemonList";

const banners = ref([
  require("../assets/images/pokemon.png"),
  require("../assets/images/rick-and-morty.png"),
]);

const loading = ref(false);
</script>

<template>
  <BannerList class="banner-list" :banners="banners" />
  <div class="container">
    <Menu />
    <PokemonList v-show="!loading" />
  </div>
</template>

<style lang="scss" scoped>
.banner-list {
  position: relative;
  width: 100%;
  object-fit: cover;
}
</style>
