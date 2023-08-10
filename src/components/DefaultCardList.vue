<script setup></script>

<template>
  <div class="cards-holder">
    <div
      class="card-holder loading-card"
      v-for="(n, index) in 18"
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
.cards-holder {
  position: relative;
  width: 100%;
  margin-top: 40px;
  display: grid;
  grid-template-columns: 260px 260px 260px;
  justify-content: space-between;
  gap: 4em;
  @media only screen and (max-width: 720px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

.card-holder {
  position: relative;
  height: 390px;
  border-radius: 12px;
  box-shadow: var(--box-shadow-default);
  padding: 1.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
