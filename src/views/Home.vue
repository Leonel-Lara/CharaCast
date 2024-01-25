<script setup>
import { ref, onMounted } from "vue";

import Modal from "@/baseComponents/Modal";
import BannerList from "@/baseComponents/BannerList";
import Menu from "@/baseComponents/Menu";
import Form from "@/baseComponents/Form";
import PokemonList from "@/components/PokemonList";
import RickAndMortyList from "@/components/RickAndMortyList";

import ArrowIcon from "vue-material-design-icons/HandPointingUp";

const showPopup = ref(false);
const bannerToShow = ref(0);
const openFilter = ref(false);
const filterName = ref("");

onMounted(() => {
  if (!localStorage.showPopupTips) {
    localStorage.showPopupTips = true;
    showPopup.value = true;
  }
});

const closePopup = () => {
  showPopup.value = false;
};

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
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div @click="closePopup" v-show="showPopup" class="bg-cover"></div>
  </transition>
  <Modal @close="closePopup" v-show="showPopup">
    <template v-slot:title>Dicas!!</template>
    <div class="text-holder">
      <span>
        O site foi desenvolvido para pesquisa e visualização de personagens, no
        qual oferece uma interface fácil e intuitiva.
      </span>
      <span>
        Para navegar por todas as séries disponíveis, basta trocar o banner da
        primeira seção!
      </span>
    </div>
    <div class="flex">
      <div @click="closePopup" class="btn">
        <span>Confirmar</span>
      </div>
    </div>
  </Modal>
  <BannerList
    class="banner-list animated fadeInDown"
    style="animation-delay: 200ms"
    @changedBanner="changedBanner"
  />
  <div class="container">
    <Menu
      @startFilterCharacterName="startFilterCharacterName"
      @stopFilterCharacterName="stopFilterCharacterName"
      @openFilter="openMainFilter"
      :bannerToShow="bannerToShow"
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
.text-holder {
  position: relative;
  text-align: center;
  span {
    font-size: 1rem;
    color: #767676;
  }
}
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
  @media only screen and (max-width: 720px) {
    right: 8px;
  }
  .material-design-icon {
    display: flex;
  }
}
</style>
