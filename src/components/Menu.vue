<script setup>
import FilterIcon from "vue-material-design-icons/FilterMultipleOutline";
</script>

<template>
  <div class="card">
    <img src="../assets/images/logo-vertical-cut.png" alt="logo" />
    <div class="btn border icon">
      <span>Filter characters</span>
      <FilterIcon fillColor="#000" />
    </div>
    <div class="input-item">
      <input placeholder="Search by name" type="text" />
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
}

img {
  position: relative;
  width: 25%;
}

.input-item {
  width: 30%;
  margin: 0;
}

.btn {
  margin: 0;
}
</style>
