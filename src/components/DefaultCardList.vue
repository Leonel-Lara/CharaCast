<script setup></script>

<template>
  <div class="cards-holder">
    <div
      class="card-holder loading-card"
      v-for="(n, index) in 20"
      :key="index"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.loading-card {
  opacity: 0.7;
  animation: skeleton-loading 2s linear infinite alternate;
}
@keyframes skeleton-loading {
  0% {
    background-color: hsl(204, 4%, 73%);
  }

  100% {
    background-color: hsl(210, 6%, 93%);
  }
}
</style>
