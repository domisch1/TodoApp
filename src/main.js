import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/store.js";
import router from "./router.js";
import "./index.css";

createApp(App).use(store).use(router).mount("#app");
