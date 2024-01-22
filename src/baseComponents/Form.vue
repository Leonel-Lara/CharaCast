<script setup>
import { ref, inject } from "vue";

import emailjs from "@emailjs/browser";

import WhatsappIcon from "vue-material-design-icons/Whatsapp";
import GitHubIcon from "vue-material-design-icons/Github";
import SendIcon from "vue-material-design-icons/Send";

const $toast = inject("$toast");
const swal = inject("$swal");

const sending = ref(false);
const form = ref("");
const user = ref({
  name: "",
  email: "",
  message: "",
});

const openWhatsapp = () => {
  window.innerWidth > 719
    ? window.open(
        `https://web.whatsapp.com/send?phone=5519981010472&text=Olá! Estou no CharaCast. Gostaria de conversar sobre o site!`
      )
    : window.open(
        `https://api.whatsapp.com/send?phone=5519981010472&text=Olá! Estou no CharaCast. Gostaria de conversar sobre o site!`
      );
};

const checkForm = () => {
  if (!user.value.message) {
    errorAlert("Please, complete all mandatory information *");
    return;
  }

  sendEmail();
};

const sendEmail = () => {
  if (sending.value) return;
  sending.value = true;

  emailjs
    .sendForm(
      "service_351lsq7",
      "template_lq0f1vu",
      form.value,
      "LBB3lKu7Zw3Vmleqq"
    )
    .then(
      () => {
        $toast({ text: "Menssage send!" });
      },
      () => {
        errorAlert("Something went wrong, try again later.");
      }
    )
    .finally(() => {
      sending.value = false;
    });
};

const errorAlert = (msg) => {
  swal.fire({
    position: "center",
    icon: "warning",
    title: "Ops...",
    text: msg,
    showConfirmButton: true,
  });
};
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
      <form class="form" ref="form" @submit.prevent="sendEmail">
        <div class="flex flex-between">
          <div class="input-item">
            <span>Name</span>
            <input type="text" name="user_name" v-model="user.name" />
          </div>
          <div class="input-item">
            <span>Email</span>
            <input type="email" name="user_email" v-model="user.email" />
          </div>
        </div>
        <div class="input-item">
          <span>Message *</span>
          <textarea name="message" v-model="user.message"></textarea>
        </div>
        <div class="footer-form">
          <div class="icons-holder">
            <div class="whats-item" @click="openWhatsapp" target="_blank">
              <WhatsappIcon />
            </div>
            <a
              href="https://github.com/Leonel-Lara"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
          </div>
          <div @click="checkForm" class="btn icon">
            <span v-show="!sending">Send</span>
            <SendIcon v-show="!sending" fillColor="#fff" />
            <div v-show="sending" class="loading white"></div>
          </div>
        </div>
      </form>
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
  padding-bottom: 5rem;
  .pokemon {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 250px;
    z-index: 2;
    @media only screen and (min-width: 721px) and (max-width: 1139px) {
      left: -30px;
      width: 190px;
    }
    @media only screen and (max-width: 720px) {
      display: none !important;
    }
  }
  .rick {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    width: 220px;
    z-index: 2;
    @media only screen and (min-width: 721px) and (max-width: 1139px) {
      right: -30px;
      width: 179px;
    }
    @media only screen and (max-width: 720px) {
      display: none !important;
    }
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
    @media only screen and (min-width: 721px) and (max-width: 1139px) {
      width: 70%;
    }
    @media only screen and (max-width: 720px) {
      width: 100%;
      padding: 1rem 2rem;
      .flex-between {
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 1.35rem;
        .input-item {
          width: 100% !important;
        }
      }
    }
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
      .icons-holder {
        position: relative;
        width: fit-content;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 20px;
        .whats-item,
        a {
          position: relative;
          display: flex;
          width: fit-content;
          justify-content: center;
          align-items: center;
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
