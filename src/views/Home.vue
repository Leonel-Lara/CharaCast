<script setup>
import { ref } from "vue";

import BannerList from "@/components/BannerList";
import Menu from "@/components/Menu";
import CardList from "@/components/CardList";

const banners = ref([
  require("../assets/images/pokemon.png"),
  require("../assets/images/rick-and-morty.png"),
]);
</script>

<template>
  <BannerList class="banner-list" :banners="banners" />
  <div class="container">
    <Menu />
    <CardList />
  </div>
</template>

<style lang="scss" scoped>
.banner-list {
  position: relative;
  width: 100%;
  object-fit: cover;
}
</style>
