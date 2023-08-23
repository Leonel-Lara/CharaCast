<script setup>
import SendIcon from "vue-material-design-icons/Send";
</script>

<template>
  <div class="holder">
    <span class="title">
        Did you like our <span class="blue">platform</span>? <br />
        Give us <span class="purple">feedback</span>, or get in touch!
    </span>
    <div class="form-holder">
      <img src="../assets/images/contact-img.svg" alt="contact" />
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
          <div class="btn border icon">
            <span>Send</span>
            <SendIcon fillColor="#833396" />
            <!-- <div v-show="loadingMore" class="loading black"></div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.holder {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 2.6rem;
  gap: 80px;
  .title {
    text-align: center;
    font-size: 1.3rem;
    font-family: fontMedium;
  }
  .form-holder {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .form {
      position: relative;
      width: 50%;
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
          font-family: fontRegular;
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
            width: 25px;
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
          border: 1px solid #833396;
          span {
            color: #833396;
          }
        }
      }
    }
  }
}

.blue {
  color: #7595ec;
  font-size: 1.3rem;
  font-family: fontMedium;
}
.purple {
  color: #833396;
  font-size: 1.3rem;
  font-family: fontMedium;
}
</style>
