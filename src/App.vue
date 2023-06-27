<template>
  <v-app id="inspire" :class="{ dark: darkMode }">
    <v-main>

      <HeadView @openDrawer="drawer = !drawer" v-if="!$route.meta.hiddeHeadAndFooter" :drawer="drawer" />
        <v-snackbar
          v-model="snackbar.show"
          :color="snackbar.color"
          timeout="3000"
        >
          {{ snackbar.text }}
        </v-snackbar>

        <router-view
          @goTo="goTo($event)"
          @goBack="goBack($event)"
          ref="routeRef"
          :class="($vuetify.breakpoint.mdAndUp && !$route.meta.hiddeHeadAndFooter) ? 'px-15' : ''"
        ></router-view>

      <Footer v-if="!$route.meta.hiddeHeadAndFooter" :class="{ dark: darkMode }"/>
      
      <v-navigation-drawer v-model="drawer" v-if="drawer && !$route.meta.hiddeHeadAndFooter" app class="navigation-custom" border="none"
    elevation="1">
      <Navigation></Navigation>
      <DarkModeToggle :dark-mode="darkMode" @toggle-dark-mode="toggleDarkMode" />
      </v-navigation-drawer>

      <!--Dialog para avisos-->
      <v-dialog v-model="noticeDialog.show" persistent max-width="300">
        <v-card class="rounded-lg text-center" v-if="noticeDialog.show">
          <v-icon :class="`text-h1 ${noticeDialog.color}--text`">{{
            noticeDialog.icon
          }}</v-icon>
          <v-card-title>{{ noticeDialog.title }}</v-card-title>
          <v-card-text>
            {{ noticeDialog.text }}
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="belgrano" text @click="closeNotice"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<script>
import eventBus from "./event-bus";
import { isIos, isSafari, isMac, isClient,isChrome, isMobileDetect, isPwa, goToFullscreen, coolFormateDate, isMozilla } from "./helpers/index";
import Footer from "./views/app/Footer.vue";
import HeadView from "./views/app/HeadView.vue";
import Navigation from "./views/app/Navigation.vue";
import DarkModeToggle from "./views/app/DarkModeToggle.vue"
export default {
  components: {
    HeadView,
    Footer,
    Navigation,
    DarkModeToggle
  },
  name: "App",
  mounted() {

    this.dispositivos()
    // Creo los eventos que debe leer desde react native
    if (window.ReactNativeWebView) {
      window.removeEventListener("message", this.webViewEventHandler); //android
      document.removeEventListener("message", this.webViewEventHandler); //ios
      window.addEventListener("message", this.webViewEventHandler); //android
      document.addEventListener("message", this.webViewEventHandler); //ios
    }
    let vm = this;
    eventBus.$on("toast", function (data) {
      vm.snackbar = data;
    });
    eventBus.$on("notice", function (data) {
      vm.noticeDialog = data;
    });
    eventBus.$on("goTo", function (view) {
      vm.goTo(view);
    });
    eventBus.$on("goBack", function () {
      vm.goBack();
    });
    this.drawer = this.$vuetify.breakpoint.mdAndUp
    
    // Suscribo a cambios en el tema oscuro
    this.$watch(
      function () {
        return vm.darkMode; // Utiliza 'vm' en lugar de 'this' para acceder correctamente a la variable darkMode
      },
      function (newVal) {
        this.$vuetify.theme.dark = newVal;
        vm.$store.commit('setDark', newVal); // Utiliza 'vm.$store' en lugar de 'this.$store'
      }
    );
  },
  data: () => ({
    drawer: true,
    darkMode: false,
    closeApp: false,
    metadata: null,
    loadDone: false,
    snackbar: { show: false, text: "", color: "red" },
    noticeDialog: { show: false, text: "", color: "red" },
    host: "https://" + window.location.host,
  }),
  watch: {},

  methods: {
    dispositivos(){
      let resultisMac = isMac()
      let resultisSafari = isSafari()
      let resultisClient = isClient()
      let resultisChrome = isChrome()
      let resultisMobileDetect = isMobileDetect()
      let resultisPwa = isPwa()
      let resultgoToFullscreen = goToFullscreen()
      let resultcoolFormateDate = coolFormateDate('01/01/2022')
      let resultisMozilla = isMozilla()
      console.log("resultisSafari", resultisSafari, "resultisMac:", resultisMac, "resultisClient:", resultisClient, "resultisChrome:", resultisChrome, "resultisMobileDetect:", resultisMobileDetect)
      console.log("isPwa:", resultisPwa, "resultgoToFullscreen:", resultgoToFullscreen)
      console.log("resultcoolFormateDate:", resultcoolFormateDate, "resultisMozilla:", resultisMozilla)
    },
    closeNotice() {
      // if(this.noticeDialog.redirect){
      //     if(this.noticeDialog.redirect == 'reactNavigate'){
      //         let navigate = this.noticeDialog.navigate;
      //         if(navigate.type != 2){
      //           if(navigate.url != '' && navigate.url != null && navigate.url != undefined)
      //               reactNavigate(navigate.url, navigate.type, navigate.inapp, navigate.screen, navigate.title);
      //             else this.dialog = true;
      //         }else eventBus.$emit('goTo', {view: `/${navigate.url}`});
      //     }else this.goTo({view: this.noticeDialog.redirect});
      // }
      // this.noticeDialog = { show: false, text: "", color: "red" };
    },
    webViewEventHandler(event) {
      const { origin = "", data: { result = "" } = {} } = event;
      if (origin === "dniScanner") {
        console.log("Aca llega el escaneo del dni", result); // NATI -> Aca llama al evento correspondiente
        eventBus.$emit('readDNI', result);
      }
    },
    goToQS(path, query) {
      this.$router.push({ path, query });
    },
    goTo(view) {
      if (view.view.includes("publications"))
        this.$store.commit("setCurrentCategory", parseInt(view.catId));
      this.$router.push(view.view);
    },
    goBack() {
      if (
        this.$store.state.view == "Publish" &&
        this.$store.state.currentPub != null &&
        this.$store.state.listPublications != null &&
        this.$store.state.scrollPublications != null
      ) {
        //Si viene de abrir una publicacion y esta el backup de la pagina /publications
        eventBus.$emit("closeNew");
      }
      this.$store.state.lastPage === "Spinner"
        ? this.$router.push({ name: this.$store.state.skipSpinnerPage })
        : this.$router.go(-1);
    },
    async initAll() {
      this.$store.commit("setLoadingPost", false);
      //Fix para safari
      if (isIos()) {
        document.body.addEventListener("touchmove", function (event) {
          event.preventDefault();
        });
      }
    },
    loadEventsPwa() {
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", function () {
          navigator.serviceWorker.register("firebase-messaging-sw.js").then(
            function (/*serviceWorker*/) {
              // Si es exitoso
              //vm.serviceWorker = serviceWorker;
              //console.log("SW registrado firebase-messaging-sw.js", registration);
            },
            function (err) {
              // Si falla
              console.log("SW fallo", err);
            }
          );
        });
      }
      this.initAll();
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      this.$store.commit('setDark', this.darkMode);
    }
  },
  computed: {
    realHost() {
      console.log("window.location.host", window.location.host)
      return window.location.host;
    },
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  
};
</script>
<style>
* {
  font-family: "Nunito", sans-serif;
}

.dark {
  background-color: rgb(29, 29, 29) !important;
  color: white;
}

.theme--light.v-application {
  background-color: #fafafa;
  color: rgba(0, 0, 0, 0.87);
  /* ------ COLOR DE FONDO ----- 
  color anterior blanco
  background-color: #121212 !important;

    */
}

</style>