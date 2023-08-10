<script setup>
import FilterIcon from "vue-material-design-icons/FilterMultipleOutline";
import SearchIcon from "vue-material-design-icons/Magnify";
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
      <SearchIcon class="search-icon" fillColor="#000" :size="28" />
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
  input {
    border: 1px solid #CECECE;
    background-color: transparent;
    color: #000;
    padding: 0.25rem 3rem 0.25rem 0.85rem;
    font-size: 0.95rem;
    &::placeholder {
      font-size: 0.95rem;
    }
  }
  .search-icon {
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
}
</style>
