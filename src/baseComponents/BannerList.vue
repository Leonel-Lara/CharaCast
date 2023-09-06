<script setup>
import { ref } from "vue";

import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";

const emit = defineEmits(["changedBanner"]);

const banners = ref([
  require("../assets/images/pokemon.png"),
  require("../assets/images/rick-and-morty.png"),
]);

const swiperInstance = ref(null);

const setSwiper = (swiper) => {
  swiperInstance.value = swiper;
  setTimeout(() => {
    swiperInstance.value.slideTo(0);
  }, 250);
};

const changedBanner = (evt) => {
  emit("changedBanner", evt.activeIndex);
};
</script>

<template>
  <swiper
    :modules="[Navigation]"
    navigation
    :slides-per-view="1"
    :space-between="0"
    :observer="true"
    :observeParents="true"
    :grab-cursor="true"
    class="slider"
    @swiper="setSwiper"
    @activeIndexChange="changedBanner"
  >
    <swiper-slide
      v-for="(banner, index) in banners"
      :key="index"
      class="animated fadeIn slide-item"
    >
      <img :src="banner" />
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
.slide-item {
  position: relative;
  background: transparent !important;
  border: none;
  padding: 0 !important;
  img {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
