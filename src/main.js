import { createApp } from "vue";
import App from "./App.vue";
//import VueGoogleMaps from '@fawmi/vue-google-maps'

import "./assets/main.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VueGoogleMaps from "@fawmi/vue-google-maps";

const vuetify = createVuetify({
  components,
  directives,
});
createApp(App)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyA9E8E_fyI--WM38h8uFWT7a_ZVbj02Fds",
    },
  })
  .use(vuetify)
  .mount("#app");
