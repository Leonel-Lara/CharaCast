<script setup>
import { ref } from "vue";

import http from "@/http";

import Tabs from "@/components/Tabs";

const characters = ref([]);

http
  .get("character")
  .then((response) => {
    characters.value = response?.data?.results;
    console.log(characters.value);
  })
  .catch((err) => {
    console.log(err);
    // fieldRequiredAlert("Algo deu errado, tente novamente mais tarde.");
  });
</script>

<template>
  <div class="cards-holder">
    <div
      class="card-holder"
      v-for="character in characters"
      :key="character.id"
    >
      <div class="card-name">{{ character.name }}</div>
      <div class="card-img">
        <img :src="character.image" alt="imagem personagem" />
      </div>
      <div class="details-holder">
        <Tabs />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cards-holder {
  position: relative;
  width: 100%;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 0.5fr));
  gap: 2em;
  @media only screen and (max-width: 720px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

.card-holder {
  position: relative;
  height: 400px;
  background-color: var(--green1);
  border-radius: 12px;
  box-shadow: var(--box-shadow-default);
  padding: 1.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  .card-name {
    text-align: center;
    color: #eee;
    font-size: 1.6em;
  }
  .card-img {
    position: relative;
    width: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    margin-top: 1.2em;
    img {
      position: relative;
      width: 100%;
      border-radius: 100%;
      object-fit: cover;
    }
  }

  .details-holder {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 200px;
    background-color: #fff;
    border-radius: 20px 20px 12px 12px;
  }
}
</style>
