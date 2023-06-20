<script setup>
import { ref } from "vue";

import BannerList from "@/components/BannerList";
import Menu from "@/components/Menu";
import CardList from "@/components/CardList";

const banners = ref([
  require("../assets/images/rick-and-morty.png"),
  require("../assets/images/pokemon.png"),
]);
</script>

<template>
  <div class="all">
    <BannerList class="banner-list" :banners="banners" />
    <div class="container">
      <Menu />
      <CardList />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-list {
  position: relative;
  width: 100%;
  object-fit: cover;
}
</style>
