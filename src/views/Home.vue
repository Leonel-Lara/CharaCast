<script setup>
import { ref } from "vue";

import BannerList from "@/components/BannerList";

const banners = ref([require("../assets/images/rick-and-morty.png")]);
</script>

<template>
  <div>
    <BannerList :banners="banners" />
  </div>
</template>

<style lang="scss" scoped></style>
