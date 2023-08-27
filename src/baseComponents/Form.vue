<script setup>
import SendIcon from "vue-material-design-icons/Send";
</script>

<template>
  <div class="holder">
    <img
      class="pokemon"
      src="../assets/images/pokemon-form.webp"
      alt="pokémon"
    />
    <div class="card">
      <span class="title">
        Did you like our <span class="red">platform</span>? <br />
        Give us <span class="blue">feedback</span>, or get in touch!
      </span>
      <div class="form">
        <div class="flex flex-between">
          <div class="input-item">
            <span>Name</span>
            <input type="text" />
          </div>
          <div class="input-item">
            <span>Email *</span>
            <input type="mail" />
          </div>
        </div>
        <div class="input-item">
          <span>Message *</span>
          <textarea></textarea>
        </div>
        <div class="footer-form">
          <div class="image-holder">
            <img src="../assets/images/whatsapp.png" alt="whatsapp" />
            <img src="../assets/images/github.png" alt="github" />
          </div>
          <div class="btn icon">
            <span>Send</span>
            <SendIcon fillColor="#fff" />
            <!-- <div v-show="loadingMore" class="loading black"></div> -->
          </div>
        </div>
      </div>
    </div>
    <img
      class="rick"
      src="../assets/images/rick-and-morty-form.png"
      alt="rick and mory"
    />
  </div>
</template>

<style lang="scss" scoped>
.holder {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2.6rem;
  .pokemon {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 250px;
  }
  .rick {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    width: 220px;
  }
  .card {
    position: relative;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    box-shadow: var(--box-shadow-default);
    padding: 2.6rem 5rem;
    background-color: #fff;
    gap: 25px;
  }
  .title {
    text-align: center;
    font-size: 1.3rem;
    font-family: fontMedium;
  }
  .form {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .flex-between .input-item {
      width: 45%;
      margin-top: 0;
    }
    .input-item {
      width: 100%;
      span {
        font-size: 0.85rem;
        font-family: fontLight;
        color: var(--primary);
        margin-bottom: 5px;
      }
    }
    .footer-form {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1.35rem;
      .image-holder {
        position: relative;
        width: fit-content;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        img {
          position: relative;
          width: 21.5px;
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.25s ease;
          &:hover {
            transform: translateY(-3px);
          }
        }
      }
      .btn {
        margin: 0;
      }
    }
  }
}

.red {
  color: #ef3e32;
  font-size: 1.3rem;
  font-family: fontMedium;
}
.blue {
  color: #7bb1de;
  font-size: 1.3rem;
  font-family: fontMedium;
}
</style>
