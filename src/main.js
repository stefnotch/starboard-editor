import { createApp } from "vue";
import App from "./App.vue";
import { name, version } from "./../package.json";
import "bulma/css/bulma.css";

import "./index.css";

if (import.meta.env.PROD) {
  console.log(`${name} - ${version}`);
}

createApp(App).mount("#app");
