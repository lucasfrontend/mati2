import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "./middlewares/index";
import moment from "moment";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
import VueApexCharts from 'vue-apexcharts'
//import i18n from "./i18n";

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

// Custom css
import "@/assets/global.css";
import "@/assets/ios.css";

Vue.use(require("vue-moment"));

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
    libraries: "places"
  }
});

// Directives
import longClick from "./directives/longclick.js";
import longPress from "./directives/longPress.js";
const longClickInstance = longClick({ delay: 400, interval: 50 });
const longPressInstance = longPress();
Vue.directive("longclick", longClickInstance);
Vue.directive("longpress", longPressInstance);

moment.updateLocale("es", {
  relativeTime: {
    future: "en %s",
    past: "%s atrás",
    s: "unos pocos segundos",
    ss: "%d segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    w: "una semana",
    ww: "%d semanas",
    M: "mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años",
  },
});

Vue.component('apexchart', VueApexCharts)

new Vue({
  vuetify,
  store: store,
  router,
  render: (h) => h(App),
}).$mount("#app");
