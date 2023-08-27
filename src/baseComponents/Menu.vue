<script setup>
import { ref } from "vue";

import FilterIcon from "vue-material-design-icons/FilterMultipleOutline";
import SearchIcon from "vue-material-design-icons/Magnify";
import CloseIcon from "vue-material-design-icons/Close";

const filterName = ref("");
const showCloseIcon = ref(false);

const emit = defineEmits([
  "startFilterCharacterName",
  "stopFilterCharacterName",
  "openFilter",
]);

const startFilterCharacterName = () => {
  if (filterName.value.length < 1) {
    stopFilterCharacterName();
    return;
  }
  showCloseIcon.value = true;
  emit("startFilterCharacterName", filterName.value.toLowerCase());
};
const stopFilterCharacterName = () => {
  showCloseIcon.value = false;
  filterName.value = "";
  emit("stopFilterCharacterName", filterName.value);
};

const openFilter = () => {
  emit("openFilter");
};
</script>

<template>
  <div class="card">
    <img
      class="mobile-hidden"
      src="../assets/images/logo-vertical-cut.png"
      alt="logo"
    />
    <div @click="openFilter" class="btn border icon">
      <span>Filter characters</span>
      <FilterIcon fillColor="#000" />
    </div>
    <div class="input-item">
      <input
        @keypress.enter="startFilterCharacterName"
        placeholder="Search by name"
        type="text"
        v-model="filterName"
      />
      <SearchIcon
        v-if="!showCloseIcon"
        @click="startFilterCharacterName"
        class="icon"
        fillColor="#000"
        :size="26"
      />
      <CloseIcon
        v-else
        @click="stopFilterCharacterName"
        class="icon"
        fillColor="#000"
        :size="26"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  top: -30px;
  width: 100%;
  padding: 2em 2.4em;
  background-color: #fff;
  border-radius: 12px;
  border: 1px solid #ececec;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  @media only screen and (max-width: 720px) {
    top: 0;
    padding: 1.2rem 1.8rem;
    background-color: transparent;
    border-radius: none;
    box-shadow: none;
    border: none;
    flex-direction: column;
    gap: 20px;
  }
}

img {
  position: relative;
  width: 20%;
}

.input-item {
  width: 25%;
  margin: 0;
  @media only screen and (max-width: 720px) {
    width: 70%;
  }
  input {
    border: 1px solid #cecece;
    background-color: transparent;
    color: #000;
    padding: 0.25rem 3rem 0.25rem 0.85rem;
    font-size: 0.95rem;
    &::placeholder {
      font-size: 0.95rem;
    }
    @media only screen and (max-width: 720px) {
      padding: 0.12rem 2.5rem 0.12rem 0.8rem;
    }
  }
  .icon {
    display: flex;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }
}

.btn {
  margin: 0;
  padding: 10px 24px;
  .material-design-icon {
    display: flex;
  }
  @media only screen and (max-width: 720px) {
    width: 70%;
  }
}
@media only screen and (max-width: 720px) {
  .mobile-hidden {
    display: none !important;
  }
}
</style>
