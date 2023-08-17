<script setup>
import { computed } from "vue";

const dynamicPositionModal = computed(() => {
  return window.innerWidth >= 1160 ? "desktop" : "mobile";
});
const dynamicEnterActive = computed(() => {
  return window.innerWidth >= 1160 ? "fadeIn" : "fadeInUp";
});
const dynamicLeaveActive = computed(() => {
  return window.innerWidth >= 1160 ? "fadeOut" : "fadeOutDown";
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>
<template>
  <transition
    :enter-active-class="`animated ${dynamicEnterActive}`"
    :leave-active-class="`animated ${dynamicLeaveActive}`"
  >
    <div :class="`style-scrollbar holder ${dynamicPositionModal}`">
      <div class="title-holder">
        <h1>
          <slot name="title">Adicione um título</slot>
        </h1>
        <span @click="close" class="close">X</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.holder {
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 620px;
  max-height: 90vh;
  background-color: #fff;
  margin: 0 auto;
  z-index: 999;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.3em;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000;
    outline: 1px solid slategrey;
  }
  &.mobile {
    border-radius: 1em 1em 0 0;
  }
  &.desktop {
    bottom: initial;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 1em 1em 1em 1em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .content {
    position: relative;
    width: 100%;
    padding: 0 1.7rem 2rem 1.7rem;
  }
  .title-holder {
    position: sticky;
    top: 0;
    width: 100%;
    background-color: #fff;
    padding: 2rem 1.7rem 1.2rem 1.7rem;
    display: grid;
    grid-template-columns: 1fr 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
    z-index: 2;
    h1 {
      position: relative;
      font-family: fontLight;
      font-size: 1.25rem;
      color: #000;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      margin-right: 1rem;
      &.align-left {
        justify-content: flex-start;
        text-align: left;
      }
    }
    .close {
      position: relative;
      width: 30px;
      height: 30px;
      border-radius: 100%;
      background-color: #eee;
      display: grid;
      place-items: center;
      text-align: center;
      color: #000;
      cursor: pointer;
    }
  }
}
</style>
