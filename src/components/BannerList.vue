<script setup>
import { ref, onMounted } from "vue";

import http from "@/http";

import "swiper/css";
import "swiper/css/bundle";
import Swiper, { Navigation } from "swiper";
Swiper.use([Navigation]);

const emit = defineEmits(["changeBanner"]);

const props = defineProps({
  banners: {
    type: Array,
    default: () => {
      return [];
    },
  },
});

onMounted(() => {
  startBannerSlider();
});

const startBannerSlider = () => {
  console.log("a");
  setTimeout(() => {
    const slider = new Swiper("#bannerSlider", {
      autoHeight: true,
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      grabCursor: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: "true",
      },
    });
  }, 150);
};
</script>

<template>
  <div
    v-show="banners.length > 0"
    id="bannerSlider"
    class="swiper-container overflow-initial"
  >
    <div class="swiper-wrapper">
      <div
        v-for="(banner, index) in props.banners"
        :key="index"
        class="intro-item swiper-slide"
      >
        <img :src="banner" alt="imagem banner" />
      </div>
    </div>

    <div id="bannerPagination" class="swiper-pagination"></div>
  </div>
</template>

<style lang="scss" scoped>
.intro-item {
  position: relative;
  width: 100vw;
  overflow: hidden;
  border-radius: 0 !important;
  img {
    position: relative;
    width: 100%;
  }
}

.swiper-slide {
  position: relative;
  display: block;
}

.swiper-pagination {
  transform: translateY(-50px);
  @media only screen and (max-width: 720px) {
    transform: translateY(-30px);
  }
}

.swiper-pagination-bullet {
  background: #fff !important;
  opacity: none !important;
}

.overflow-initial {
  overflow: initial !important;
}
</style>
