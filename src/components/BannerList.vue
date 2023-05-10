<script setup>
import { ref, onMounted } from "vue";

import http from "@/http";

import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";

import "swiper/css";
import "swiper/css/bundle";
import Swiper, { Pagination, Navigation } from "swiper";
Swiper.use([Pagination, Navigation]);

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
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
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

    <div
      v-show="banners.length > 1"
      class="swiper-button-next banner-control-next"
    >
      <ChevronRight class="arrow" fillColor="#fff" />
    </div>
    <div
      v-show="banners.length > 1"
      class="swiper-button-prev banner-control-prev"
    >
      <ChevronLeft class="arrow" fillColor="#fff" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.swiper-container {
  position: relative;
  width: 100vw;
}
.intro-item {
  position: relative;
  width: 100%;
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

.overflow-initial {
  overflow: initial !important;
}

.banner-control-next,
.banner-control-prev {
  width: 40px !important;
  height: 40px !important;
  border-radius: 100%;
  margin: 0 auto;
  background-image: initial !important;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  transition: background-color 0.2s ease;
  pointer-events: initial !important;
}

.banner-control-prev {
  left: 25px !important;
  &::after {
    content: none;
  }
}

.banner-control-next {
  right: 25px !important;
  &::after {
    content: none;
  }
}

.banner-control-next .arrow,
.banner-control-prev .arrow {
  margin: 0 !important;
  display: flex;
}

.banner-control-next:hover,
.banner-control-prev:hover {
  background-color: rgba(0, 0, 0, 0.9);
}
</style>
