import { createApp } from "vue";
import App from "./App.vue";

import VueSmoothScroll from 'vue3-smooth-scroll'

import router from "./router";
import prismic from "./prismic";

createApp(App)
  .use(router)
  .use(prismic)
  .use(VueSmoothScroll)
  .mount("#app");
