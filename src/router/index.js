import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "dashboard" },
  },
  //AUTHENTICACION
  {
    path: "/login",
    name: "Login",
    meta:{
      hiddeHeadAndFooter: true
    },
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta:{
      hiddeHeadAndFooter: true
    },
    component: () => import("../views/auth/Register.vue"),
  },
  // APP
  {
    path: "/home",
    name: "dashboard",
    meta: {
      title: "Home",
      requiresAuth: true,
    },
    component: () => import("../views/Dashboard.vue"),
    props: true,
  },
  {
    path: "/settings",
    name: "settings",
    meta: {
      title: "settings",
      //requiresAuth: true,
    },
    component: () => import("../views/settings.vue"),
    props: true,
  },
  {
    path: "/beer",
    name: "beer",
    meta: {
      title: "Gestion de deudores",
      /*
      requiresAuth: true,
      */
    },
    component: () => import("../views/beers/beers.vue"),
    props: true,
  },
  {
    path: '/DebtorDetails/:id',
    name: 'DebtorDetails',
    meta: {
      title: "Gestion de deudores",
      /*
      requiresAuth: true,
      */
    },
    component: () => import("../views/beers/debtorEdit.vue"),
    props: true,
  },
  {
    path: "/tablepackers",
    name: "tablepackers",
    meta: {
      title: "Plegados",
      /*
      requiresAuth: true,
      */
    },
    component: () => import("../views/packers/tablePackers.vue"),
    props: true,
  },
  {
    path: "/total",
    name: "packersGraphic",
    meta: {
      title: "Totales",
      /*
      requiresAuth: true,
      */
    },
    component: () => import("../views/modelViews/total.vue"),
    props: true,
  },
  // MANIFIESTO
  {
    path: "/tablemanifest",
    name: "tablemanifest",
    meta: {
      title: "Manifiesto",
    },
    component: () => import("../views/manifest/tableManifest.vue"),
    props: true,
  },
  // MANIFIESTO LISTADOS Y FORMULARIOS 

  //DOLAR HOY
  {
    path: "/manifest/dolarBlue",
    name: "dolarBlue",
    meta: {
      title: "Valor dolar hoy",
      //requiresAuth: true,
    },
    component: () => import("../views/manifest/dolarBlue.vue"),
    props: true,
  },
  // INSTRUCTORES
  {
    path: "/manifest/instructorsList",
    name: "instructorsList",
    meta: {
      title: "Listado de Instructores",
    },
    component: () => import("../views/manifest/instructorsList.vue"),
    props: true,
  },
  {
    path: "/manifest/instructorsForm",
    name: "instructorsForm",
    meta: {
      title: "formulario Instructores",
    },
    component: () => import("../views/manifest/instructorsForm.vue"),
    props: true,
  },
    // EQUIPOS

  {
    path: "/manifest/equipmentList",
    name: "equipmentList",
    meta: {
      title: "Listado de Equipos",
    },
    component: () => import("../views/manifest/equipmentList.vue"),
    props: true,
  },
  {
    path: "/manifest/equipmentForm",
    name: "equipmentForm",
    meta: {
      title: "formulario Equipos",
    },
    component: () => import("../views/manifest/equipmentForm.vue"),
    props: true,
  },
    // PACKERS

  {
    path: "/manifest/packersList",
    name: "packersList",
    meta: {
      title: "Listado de Packers",
    },
    component: () => import("../views/manifest/packersList.vue"),
    props: true,
  },
  {
    path: "/manifest/packersForm",
    name: "packersForm",
    meta: {
      title: "formulario Packers",
    },
    component: () => import("../views/manifest/packersForm.vue"),
    props: true,
  },
    // PILOTOS

  {
    path: "/manifest/pilotsList",
    name: "pilotsList",
    meta: {
      title: "Listulario pilotos",
    },
    component: () => import("../views/manifest/pilotsList.vue"),
    props: true,
  },
  {
    path: "/manifest/pilotsForm",
    name: "pilotsForm",
    meta: {
      title: "formulario pilotos",
    },
    component: () => import("../views/manifest/pilotsForm.vue"),
    props: true,
  },
    // AVIONES

  {
    path: "/manifest/planesList",
    name: "planesList",
    meta: {
      title: "Aviones",
    },
    component: () => import("../views/manifest/planesList.vue"),
    props: true,
  },
  {
    path: "/manifest/planesForm",
    name: "planesForm",
    meta: {
      title: "formulario Avión",
    },
    component: () => import("../views/manifest/planesForm.vue"),
    props: true,
  },

  // PRECIOS
  {
    path: "/manifest/pricesList",
    name: "pricesList",
    meta: {
      title: "Precios",
    },
    component: () => import("../views/manifest/pricesList.vue"),
    props: true,
  },
  {
    path: "/manifest/pricesForm",
    name: "pricesForm",
    meta: {
      title: "formulario Precios",
    },
    component: () => import("../views/manifest/pricesForm.vue"),
    props: true,
  },


  //TANDASSSS
  {
    path: "/tandasMain",
    name: "tandasMain",
    meta: {
      title: "Controlador",
      //requiresAuth: true,
    },
    component: () => import("../views/manifest/tandasMain.vue"),
    props: true,
  },
  {
    path: "/manifest/tandasForm",
    name: "tandasForm",
    meta: {
      title: "Tanda",
      //requiresAuth: true,
    },
    component: () => import("../views/manifest/tandasForm.vue"),
    props: true,
  }


  ,
  {
    path: "/manifest/newFlyer",
    name: "newFlyer",
    meta: {
      title: "newFlyer",
      //requiresAuth: true,
    },
    component: () => import("../views/manifest/newflyer.vue"),
    props: true,
  },
  {
    path: "/manifest/weight",
    name: "weight",
    meta: {
      title: "Calcular peso",
      //requiresAuth: true,
    },
    component: () => import("../views/manifest/weight.vue"),
    props: true,
  },
  {
    path: "/exit",
    name: "exit",
    meta: {
      requiresAuth: true,
    },
    component: () => import("../views/beers/exitRegister.vue"),
    props: true,
  },
  {
    path: "/reader",
    name: "reader",
    meta: {
      //requiresAuth: true,
    },
    component: () => import("../views/beers/reader.vue"),
    props: true,
  },
  {
    path: "/registerFlyer",
    name: "registerFlyer",
    meta: {
      title: "Alta de socio?",
      //requiresAuth: true,
    },
    component: () => import("../views/manifest/registerFlyer.vue"),
    props: true,
  },
  {
    path: "/flyersList",
    name: "flyersList",
    meta: {
      title: "Listado",
      //requiresAuth: true,
    },
    component: () => import("../views/manifest/flyersList.vue"),
    props: true,
  },
  {
    path: "/totalFlyer",
    name: "totalFlyer",
    meta: {
      title: "Total",
      //requiresAuth: true,
    },
    component: () => import("../views/manifest/totalFlyer.vue"),
    props: true,
  },
  {
    path: "/flyersTotal",
    name: "flyersTotal",
    meta: {
      title: "Total",
      //requiresAuth: true,
    },
    component: () => import("../views/manifest/flyersTotal.vue"),
    props: true,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async(to, from, next) => {
  //valida si la route existe
    if (to.matched.length > 0) {//si existe
      if(to.name == 'Login' && store.getters.isLoggedIn){
        next('/home')
      }
      //verifica si la route requiere login

      if(to.matched.some(record => record.meta.requiresAuth)) {//si requiere login
        if (store.getters.isLoggedIn) {
          next()
          return
        } else {
          next('/login')
          //next()
        }
        //next("/login");
      } else {//sino requiere login
        next()
      }

    } else {//sino existe
      next("/login");
    }
});

export default router;
