import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueAxios from "vue-axios";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import WinstonLog from "@/plugins/winston";
import "@/plugins/vue-input-mask";
import "@/assets/scss/main.scss";


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.use(
  new WinstonLog({
    context: "Name Application",
  })
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
