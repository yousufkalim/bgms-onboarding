import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// Bootstrap Init
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App)
  .use(router)
  .use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 3,
    newestOnTop: true,
    position: "bottom-right",
  })
  .mount("#app");
