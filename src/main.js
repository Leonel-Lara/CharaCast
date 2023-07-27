import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";
import Vue3TouchEvents from "vue3-touch-events";
import "./assets/css/animate.css";

const app = createApp(App);

const options = {
  confirmButtonColor: "var(--primary)",
  cancelButtonColor: "#aaa",
  imageHeight: "90px",
  showClass: {
    popup: "animated zoomIn",
  },
  customClass: {
    title: "page-title",
    popup: "text-desc",
  },
};

const $toast = (options) => {
  let { icon, text } = options;
  if (!icon) icon = "success";
  if (!text) text = "";
  Swal.fire({
    toast: true,
    icon: icon,
    title: text,
    position: "top-right",
    showConfirmButton: false,
    timer: 3300,
    timerProgressBar: true,
  });
};

app.provide("$toast", $toast);
app.use(router);
app.use(VueSweetalert2, options);
app.use(Vue3TouchEvents);
app.mount("#app");
